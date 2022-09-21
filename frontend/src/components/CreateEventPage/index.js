import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../../store/events';
import { useHistory, useParams } from 'react-router-dom';



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

    const dateTimePlusMin = (dateTime, mins) => {
        return new Date(dateTime.getTime() + mins*60000);
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { groupId } = params;

    const user = useSelector(state => state.session.user);

    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('In person');
    const [eventCap, setEventCap] = useState('');
    const [eventPrice, setEventPrice] = useState('0.01');
    const [eventDesc, setEventDesc] = useState('');
    const [eventStartDate, setEventStartDate] = useState(dateTimeTmrw());
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventFree, setEventFree] = useState(false);
    // const [prevImgUrl, setPrevImgUrl] = useState('');
    const [errors, setErrors] = useState([]);


    const startDateChng = (e) => {
        setEventStartDate(e.target.value)
        console.log(eventPrice)

        //(e) => setEventEnd(e.target)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        let price;

        if(!eventPrice || eventFree) price = 0;
        else price = parseFloat(eventPrice);

        const vals = {
            venueId: 1,
            name: eventName,
            type: eventType,
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

    useEffect(() => {

        const errs = [];

        if (!eventName.length) {
            errs.push('Event name is required');
        }
        if (eventName.length < 5) {
            errs.push('Event name must be at least 5 Characters');
        }
        if (eventCap.includes(".") || !Number(eventCap)) {
            errs.push('Event capacity must be an integer');
        }
        if (!eventFree && (!eventPrice || !parseFloat(eventPrice))) {
            errs.push('Price is invalid');
        }
        if (!eventDesc.length) {
            errs.push('Event is required');
        }
        if (!eventEndDate){
            errs.push('End date/time is required' );
        }

        //TODO: DATE ENTRY AND VALIDATION


        // if (!eventStart) {
        //     errs.push('State is required');
        // }
        // if (eventState.length > 2) {
        //     errs.push('State must be 2 letter abbreviation');
        // }

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
        eventFree

    ]);

    return (
        <form onSubmit={handleSubmit}>
            <ul className='create-event-err-ul'>
                {errors.map((err, i) => (
                    <li key={i} className='cg-err-li'>
                        {err}
                    </li>
                ))}
            </ul>
            <label className='cg-label'>
                Event Name
                <input
                    type='text'
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                Event Description
                <textarea
                    type='text'
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                Event Capacity
                <input
                    type='text'
                    value={eventCap}
                    onChange={(e) => setEventCap(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                Start Date
                <input
                    type='datetime-local'
                    min={dateTimeTmrw()}
                    value={eventStartDate}
                    onChange={startDateChng}
                />
            </label>
            {/* <label className='cg-label'>
                Start Time
                <input
                    type='time'
                    min={dateTimeTmrw()}
                    value={eventStartTime}
                    onChange={startDateChng}
                />
            </label> */}
            <label className='cg-label'>
                End Date
                <input
                    type='datetime-local'
                    min={dateTimeTmrw()}
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                />
            </label>
            {/* <label className='cg-label'>
                End Time
                <input
                    type='time'
                    min={dateTimeTmrw()}
                    value={eventStartTime}
                    onChange={startDateChng}
                />
            </label> */}
            <div className='cg-radio-btn-div'>
                <label className='cg-label'>
                    In person
                    <input
                        type='radio'
                        value='In person'
                        checked={eventType === 'In person'}
                        onChange={(e) => setEventType(e.target.value)}
                    />
                </label>
                <label className='cg-label'>
                    Online
                    <input
                        type='radio'
                        value='Online'
                        checked={eventType === 'Online'}
                        onChange={(e) => setEventType(e.target.value)}
                    />
                </label>
            </div>
            <label className='cg-label'>
                Free Event?
                <input
                    type='checkbox'
                    checked={eventFree === true}
                    value={true}
                    onChange={(e) => setEventFree(!eventFree)}
                />
            </label>
            { !eventFree &&
            <label className='cg-label'>
                Price
                <input
                    type='number'
                    min='0.01'
                    step='0.01'
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                />
            </label>
            }
            <button
                className='cg-submit-btn'
                type='submit'
                disabled={errors.length}
            >
                Create Event
            </button>
        </form>
    )
}
