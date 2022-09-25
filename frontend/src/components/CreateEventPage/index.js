import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../../store/events';
import { useHistory, useParams } from 'react-router-dom';
import './createEventPage.css';



export default function CreateEventPage() {

    const padNum = (num) => {
        return num.toString().padStart(2, '0');
    }

    const dateTimeTmrw = (date = new Date()) => {
        return [
            date.getFullYear(),
            padNum(date.getMonth() + 1),
            padNum(date.getDate() + 1),
        ].join('-') + 'T00:00';
    }

    const timeNow = (date = new Date()) => {
        const time = `${padNum(date.getHours())}:${padNum(date.getMinutes())}`;
        console.log(time);
        return time;
    }

    const dateTmrw = (date = new Date()) => {
        return [
            date.getFullYear(),
            padNum(date.getMonth() + 1),
            padNum(date.getDate()),
        ].join('-');
    }

    const dateTimePlusMin = (dateTime, mins) => {
        return new Date(dateTime.getTime() + mins * 60000);
    }

    const minEndDate = (date, time) => {
        console.log('inputs:', date, time)
        const dateObj = new Date(date + 'T' + time);

        console.log('dateTmrw', dateTmrw());

        const minEnd = dateTimePlusMin(dateObj, 30);
        console.log('minEnd: ', minEnd.toLocaleString())
    }

    const parseDateObj = (dateInput, timeInput) => {
        return new Date(dateInput + 'T' + timeInput);
    }


    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { groupId } = params;

    const user = useSelector(state => state.session.user);

    const [eventName, setEventName] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventCap, setEventCap] = useState('');
    const [eventPrice, setEventPrice] = useState('0.01');
    const [eventStartDate, setEventStartDate] = useState(dateTmrw());
    const [eventStartTime, setEventStartTime] = useState(timeNow());
    const [eventDuration, setEventDuration] = useState('');
    const [eventDurationHours, setEventDurationHours] = useState('');
    const [eventDurationMinutes, setEventDurationMinutes] = useState('');
    const [eventFree, setEventFree] = useState();
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventType, setEventType] = useState('free');
    const [prevImgUrl, setPrevImgUrl] = useState('');
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    //individual field error states
    const [eventNameErr, setEventNameErr] = useState('');
    const [eventDescErr, setEventDescErr] = useState('');
    const [eventCapErr, setEventCapErr] = useState('');
    const [eventPriceErr, setEventPriceErr] = useState('');
    const [eventDurationErr, setEventDurationErr] = useState('');
    const [urlErr, setUrlErr] = useState('');

    const formatBackendErrors = (errorObj) => {
        const errs = [];
        for (let key in errorObj) {
            errs.push(errorObj[key]);
        }
        return errs;
    }

    const checkUrl = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    const startDateChng = (e) => {
        setEventStartDate(e.target.value)
        console.log(eventPrice)

        //(e) => setEventEnd(e.target)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        let price;

        if (!eventPrice || eventType === 'free') price = 0;
        else price = parseFloat(eventPrice);

        setRenderErrors(true);

        if (
            !eventNameErr &&
            !eventDescErr &&
            !eventDurationErr &&
            !eventCapErr &&
            !eventPriceErr &&
            !urlErr
        ) {
            const vals = {
                venueId: 1,
                name: eventName,
                //type: eventType,
                capacity: Number(eventCap),
                price: price,
                description: eventDesc,
                startDate: eventStartDate,
                endDate: eventEndDate
            }

            console.log('handlesubmit vals:', vals);

            const newEvent = await dispatch(createEvent(groupId, vals))

            console.log(newEvent);

            history.push(`/events/${newEvent.id}`);
        }
    }
    useEffect(() => {

        const errs = [];

        if (!eventType || eventType === 'free') {
            setEventFree(true);
            // setEventType('free');
        } else if (!eventType.length) {
            setEventFree(true);
        } else if (eventType === 'paid') {
            setEventFree(false);
        }

        if (!eventName.length) {
            setEventNameErr('*event name is required');
        } else if (eventName.length && eventName.length < 5) {
            setEventNameErr('*event name must be at least 5 characters');
        } else {
            setEventNameErr('');
        }
        if (!eventDesc.length) {
            setEventDescErr('*event description is required');
        } else if (eventDesc.length && eventDesc < 50) {
            setEventDescErr('*must be at least 50 characters');
        } else {
            setEventDescErr('');
        }
        if (eventCap.includes(".") || !Number(eventCap)) {
            setEventCapErr('*event capacity must be an integer');
        } else if (eventType === 'paid' && (!eventPrice || !parseFloat(eventPrice))) {
            setEventCapErr('Price is invalid');
        } else {
            setEventCapErr('');
        }
        if (!eventStartTime || !eventEndTime) {
            setEventDurationErr('*all date/time fields required')
        } else if (parseDateObj(eventStartDate, eventStartTime).getTime() >
            parseDateObj(eventEndDate, eventEndTime).getTime()) {
            setEventDurationErr('*end date cannot be in the past')
        } else {
            setEventDurationErr('');
        }
        if (!prevImgUrl.length){
            setUrlErr('*image URL is required');
        } else if (prevImgUrl.length && !checkUrl(prevImgUrl)){
            setUrlErr('*invalid image URL');
        } else {
            setUrlErr('');
        }

        console.log('eventSTartTime:', eventStartTime)


        setErrors(errs);
    }, [
        eventName,
        eventCap,
        eventPrice,
        eventDesc,
        eventStartDate,
        eventStartTime,
        eventEndDate,
        eventEndTime,
        eventType,
        prevImgUrl
    ]);

    return (

        <div className="ce-main-page-div">
            <div className="ce-title-div">
                Create An Event
            </div>
            <div className="ce-login-err-div">
                {formatBackendErrors(backendErrors).map((error, idx) => (
                    <div className="ce-err-msg" key={idx}>{error}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="ce-form-main-div">
                    <div className="ce-input-div">
                        <div className="ce-input-inner-div">
                            <div className="ce-input-label-div">
                                <div className="ce-input-label">
                                    Event Name
                                </div>
                                <div className="ce-field-error">
                                    {renderErrors && eventNameErr.length > 0 && eventNameErr}
                                </div>
                            </div>
                            <div className="ce-pseudo-input">
                                <input
                                    className="ce-input-field"
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ce-input-div">
                        <div className="ce-input-inner-div">
                            <div className="ce-input-label-div">
                                <div className="ce-input-label">
                                    Event Description
                                </div>
                                <div className="ce-field-error">
                                    {renderErrors && eventDescErr.length > 0 && eventDescErr}
                                </div>
                            </div>
                            <div className="ce-pseudo-input-textarea">
                                <textarea
                                    className="ce-input-field-textarea"
                                    type='text'
                                    value={eventDesc}
                                    onChange={(e) => setEventDesc(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cg-input-div">
                        <div className="cg-input-inner-div">
                            <div className="cg-input-label-div">
                                <div className='cg-input-label'>
                                    Group Image Url
                                </div>
                                <div className="cg-field-error">
                                    {renderErrors && urlErr.length > 0 && urlErr}
                                </div>
                            </div>
                            <div className="cg-pseudo-input">
                                <input
                                    className="cg-input-field"
                                    type='text'
                                    value={prevImgUrl}
                                    onChange={(e) => setPrevImgUrl(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ce-input-div">
                        <div className="ce-input-inner-div">
                            <div className="ce-input-label-div">
                                <div className="ce-input-label">
                                    Event Capacity
                                </div>
                                <div className="ce-field-error">
                                    {renderErrors && eventCapErr.length > 0 && eventCapErr}
                                </div>
                            </div>
                            <div className="ce-pseudo-input">
                                <input
                                    className="ce-input-field"
                                    type="text"
                                    value={eventCap}
                                    onChange={(e) => setEventCap(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='ce-datetime-field-grp'>
                    <div className="ce-field-error-datetime">
                                            {renderErrors && eventDurationErr.length > 0 && eventDurationErr}
                                        </div>
                        <div className='ce-datetime-cluster-div'>
                            <div className="ce-input-div-datetime">
                                <div className="ce-input-inner-div-datetime">
                                    <div className="ce-input-label-div">
                                        <div className="ce-input-label">
                                            Start Date
                                        </div>
                                    </div>
                                    <div className="ce-pseudo-input-date">
                                        <input
                                            className="ce-input-field-date"
                                            type="date"
                                            value={eventStartDate}
                                            min={dateTmrw()}
                                            onChange={(e) => setEventStartDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ce-input-div-datetime">
                                <div className="ce-input-inner-div-datetime">
                                    <div className="ce-input-label-div">
                                        <div className="ce-input-label">
                                            Start Time
                                        </div>
                                    </div>
                                    <div className="ce-pseudo-input-time">
                                        <input
                                            className="ce-input-field-time"
                                            type="time"
                                            step='60'
                                            value={eventStartTime}
                                            onChange={(e) => setEventStartTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='ce-datetime-cluster-div'>
                            <div className="ce-input-div-datetime">
                                <div className="ce-input-inner-div-datetime">
                                    <div className="ce-input-label-div">
                                        <div className="ce-input-label">
                                            End Date
                                        </div>
                                    </div>
                                    <div className="ce-pseudo-input-date">
                                        <input
                                            className="ce-input-field-date"
                                            type="date"
                                            min={eventStartDate}
                                            value={eventEndDate}
                                            onChange={(e) => setEventEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ce-input-div-datetime">
                                <div className="ce-input-inner-div-datetime">
                                    <div className="ce-input-label-div">
                                        <div className="ce-input-label">
                                            End Time
                                        </div>
                                    </div>
                                    <div className="ce-pseudo-input-time">
                                        <input
                                            className="ce-input-field-time"
                                            type="time"
                                            step={60}
                                            value={eventEndTime}
                                            onChange={(e) => setEventEndTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ce-price-cluster-div'>
                        <div className="ce-input-div-price">
                            <div className="ce-input-inner-div-datetime">
                                <div className="ce-input-label-div">
                                    <div className={`ce-input-label`} id={eventType}>
                                        Event Price
                                    </div>
                                    <div className="ce-field-error">
                                        {renderErrors && eventPriceErr.length > 0 && eventPriceErr}
                                    </div>
                                </div>
                                <div className={`ce-pseudo-input-price`} id={`${eventType}p`}>
                                    <input
                                        className={`ce-input-field-price`} id={eventType}
                                        type="number"
                                        min='0.01'
                                        step='0.01'
                                        value={eventPrice}
                                        onChange={(e) => setEventPrice(e.target.value)}
                                        disabled={eventFree}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ce-input-div-price">
                            <div className="ce-input-inner-div-datetime">
                                <div className="ce-input-label-div">
                                    <div className="ce-input-label">
                                        Event Type
                                    </div>
                                </div>
                                <div className="ce-pseudo-input-free">
                                    <select
                                        className='ce-select-input'
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <option value={'free'}>Select Fee Type</option>
                                        <option value={'free'}>Free</option>
                                        <option value={'paid'}>Paid</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ce-login-btn-div">
                        <button
                            className="ce-submit-btn"
                            type="submit"
                        >
                            Sign Up
                        </button>

                        {/* <button    //TODO: ADD RANDOMIZED DEMO USER SIGNUP
                        className="ce-login-btn"
                        type="submit"
                        onClick={demoUserBtnClick}
                    >
                        Demo User Sign Up
                    </button> */}
                    </div>
                </div>
            </form>
        </div>
        // <form onSubmit={handleSubmit}>
        //     <ul className='create-event-err-ul'>
        //         {errors.map((err, i) => (
        //             <li key={i} className='cg-err-li'>
        //                 {err}
        //             </li>
        //         ))}
        //     </ul>
        //     <label className='cg-label'>
        //         Event Name
        //         <input
        //             type='text'
        //             value={eventName}
        //             onChange={(e) => setEventName(e.target.value)}
        //         />
        //     </label>
        //     <label className='cg-label'>
        //         Event Description
        //         <textarea
        //             type='text'
        //             value={eventDesc}
        //             onChange={(e) => setEventDesc(e.target.value)}
        //         />
        //     </label>
        //     <label className='cg-label'>
        //         Event Capacity
        //         <input
        //             type='text'
        //             value={eventCap}
        //             onChange={(e) => setEventCap(e.target.value)}
        //         />
        //     </label>
        //     <label className='cg-label'>
        //         Start Date
        //         <input
        //             type='datetime-local'
        //             min={dateTimeTmrw()}
        //             value={eventStartDate}
        //             onChange={startDateChng}
        //         />
        //     </label>
        //     {/* <label className='cg-label'>
        //         Start Time
        //         <input
        //             type='time'
        //             min={dateTimeTmrw()}
        //             value={eventStartTime}
        //             onChange={startDateChng}
        //         />
        //     </label> */}
        //     <label className='cg-label'>
        //         End Date
        //         <input
        //             type='datetime-local'
        //             min={dateTimeTmrw()}
        //             value={eventEndDate}
        //             onChange={(e) => setEventEndDate(e.target.value)}
        //         />
        //     </label>
        //     {/* <label className='cg-label'>
        //         End Time
        //         <input
        //             type='time'
        //             min={dateTimeTmrw()}
        //             value={eventStartTime}
        //             onChange={startDateChng}
        //         />
        //     </label> */}
        //     <div className='cg-radio-btn-div'>
        //         <label className='cg-label'>
        //             In person
        //             <input
        //                 type='radio'
        //                 value='In person'
        //                 checked={eventType === 'In person'}
        //                 onChange={(e) => setEventType(e.target.value)}
        //             />
        //         </label>
        //         <label className='cg-label'>
        //             Online
        //             <input
        //                 type='radio'
        //                 value='Online'
        //                 checked={eventType === 'Online'}
        //                 onChange={(e) => setEventType(e.target.value)}
        //             />
        //         </label>
        //     </div>
        //     <label className='cg-label'>
        //         Free Event?
        //         <input
        //             type='checkbox'
        //             checked={eventFree === true}
        //             value={true}
        //             onChange={(e) => setEventFree(!eventFree)}
        //         />
        //     </label>
        //     { !eventFree &&
        //     <label className='cg-label'>
        //         Price
        //         <input
        //             type='number'
        //             min='0.01'
        //             step='0.01'
        //             value={eventPrice}
        //             onChange={(e) => setEventPrice(e.target.value)}
        //         />
        //     </label>
        //     }
        //     <button
        //         className='cg-submit-btn'
        //         type='submit'
        //         disabled={errors.length}
        //     >
        //         Create Event
        //     </button>
        // </form>
    )
}
