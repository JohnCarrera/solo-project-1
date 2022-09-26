import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../../store/events';
import { useHistory, useParams } from 'react-router-dom';
import { addEventImage } from '../../store/events';
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

        console.log('pdo-dateinput:', dateInput);
        console.log('pdo-timeInput:', timeInput);
        console.log('combined:', dateInput + 'T' + timeInput + ':00');

        return new Date(dateInput + 'T' + timeInput + ':00');
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
    const [eventFeeType, setEventFeeType] = useState('none');
    const [eventType, setEventType] = useState('');
    const [prevImgUrl, setPrevImgUrl] = useState('');
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    //individual field error states
    const [eventNameErr, setEventNameErr] = useState('');
    const [eventDescErr, setEventDescErr] = useState('');
    const [eventCapErr, setEventCapErr] = useState('');
    const [eventTypeErr, setEventTypeErr] = useState('');
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
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        let price;

        if (!eventPrice || eventFeeType === 'free') price = 0;
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
                type: eventType,
                capacity: Number(eventCap),
                price: price,
                description: eventDesc,
                startDate: parseDateObj(eventStartDate, eventStartTime).toISOString(),
                endDate: parseDateObj(eventEndDate, eventEndTime).toISOString(),
            }

            console.log('handlesubmit vals:', vals);

            const newEvent = await dispatch(createEvent(groupId, vals))

            const imgBody = {
                url: prevImgUrl,
                preview: true
            }

            console.log(newEvent);

            await dispatch(addEventImage(newEvent.id, imgBody));

            history.push(`/events/${newEvent.id}`);
        }
    }

    useEffect(() => {

        const errs = [];

        if (eventFeeType  === 'none' || eventFeeType === 'free' ) {
            setEventFree(true);
            // setEventType('free');
        } else if (!eventFeeType.length) {
            setEventFree(true);
        } else if (eventFeeType === 'paid') {
            setEventFree(false);
        }

        if (!eventName.length) {
            setEventNameErr('*event name is required');
        } else if (eventName.length && eventName.length < 5) {
            setEventNameErr('*must be at least 5 characters');
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
         } else {
            setEventCapErr('');
         }

        if (eventFeeType === 'paid' && (!eventPrice || !parseFloat(eventPrice))) {
            setEventPriceErr('*price is invalid');
        } else {
            setEventPriceErr('');
        }
        if (!eventStartTime || !eventEndTime) {
            setEventDurationErr('*all date/time fields required')
        } else if (parseDateObj(eventStartDate, eventStartTime).getTime() >
            parseDateObj(eventEndDate, eventEndTime).getTime()) {
            setEventDurationErr('*end date must be after start date')
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
        if (!eventType.length) {
            setEventTypeErr('*event type is required');
        } else {
            setEventTypeErr('');
        }

        console.log(new Date().toISOString());



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
        eventFeeType,
        prevImgUrl,
        eventType
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
                                <div className='ce-input-label'>
                                    Event Type
                                </div>
                                <div className="ce-field-error">
                                    {renderErrors && eventTypeErr.length > 0 && eventTypeErr}
                                </div>
                            </div>
                            <div className="ce-pseudo-input">
                                <select
                                    className='ce-select-input'
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                >
                                    <option value={''}>Select Event Type</option>
                                    <option value={'In person'}>In person</option>
                                    <option value={'Online'}>Online</option>
                                </select>
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
                    <div className='ce-price-err-div'>
                    <div className="ce-field-error-price">
                                        {renderErrors && eventPriceErr.length > 0 && eventPriceErr}
                                    </div>
                    <div className='ce-price-cluster-div'>
                        <div className="ce-input-div-price">
                            <div className="ce-input-inner-div-price">
                                <div className="ce-input-label-div">
                                    <div className={`ce-input-label`} id={`${eventFeeType !== 'paid' ? 'free' : 'paid'}p`}>
                                        Event Price
                                    </div>

                                </div>
                                <div className={`ce-pseudo-input-price`} id={`${eventFeeType !== 'paid' ? 'free' : 'paid'}p`}>
                                    <input
                                        className={`ce-input-field-price`} id={eventFeeType}
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
                            <div className="ce-input-inner-div-price">
                                <div className="ce-input-label-div">
                                    <div className="ce-input-label">
                                        Event Type
                                    </div>
                                </div>
                                <div className="ce-pseudo-input-free">
                                    <select
                                        className='ce-select-input'
                                        value={eventFeeType}
                                        onChange={(e) => setEventFeeType(e.target.value)}
                                    >
                                        <option value={'none'}>Select Fee Type</option>
                                        <option value={'free'}>Free</option>
                                        <option value={'paid'}>Paid</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="ce-login-btn-div">
                        <button
                            className="ce-submit-btn"
                            type="submit"
                        >
                            Create Event
                        </button>
                    </div>
                </div>
            </form>
            <div className='bottom-padding-div'></div>
        </div>
    )
}
