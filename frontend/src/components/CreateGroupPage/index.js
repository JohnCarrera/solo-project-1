import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGroup, addGroupImage } from '../../store/groups';
import { useHistory } from 'react-router-dom';



export default function CreateGroupPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [groupName, setGroupName] = useState('');
    const [groupAbout, setGroupAbout] = useState('');
    const [groupType, setGroupType] = useState('In person');
    const [groupPrivate, setGroupPrivate] = useState(false);
    const [groupCity, setGroupCity] = useState('');
    const [groupState, setGroupState] = useState('');
    const [prevImgUrl, setPrevImgUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const vals = {
            name: groupName
            , about: groupAbout
            , city: groupCity
            , state: groupState
            , private: groupPrivate
            , type: groupType
        }


        console.log('handlesubmit vals:', vals);

        const newGroup = await dispatch(createGroup(vals))

        const imgBody = {
            id: newGroup.id,
            url: prevImgUrl,
            preview: true
        }

        if(prevImgUrl.length < 0) {
            const groupImgRes = dispatch(addGroupImage(newGroup.id, imgBody))
        }
        // console.log('newgroup:', newGroup);
        // console.log('groupImgRes', groupImgRes)

        history.push(`/groups/${newGroup.id}`);

    }

    useEffect(() => {

        const errs = [];

        if (!groupName.length) {
            errs.push('Group name is required');
        }
        if (groupName.length > 60) {
            errs.push('Group name must be less than 60 Characters');
        }
        if (!groupAbout.length) {
            errs.push('Group Description is required');
        }
        if (groupAbout.length < 50) {
            errs.push('Group description must be at least 50 characters');
        }
        if (!groupCity.length) {
            errs.push('City is required');
        }
        if (!groupState.length) {
            errs.push('State is required');
        }
        if (groupState.length > 2) {
            errs.push('State must be 2 letter abbreviation');
        }

        setErrors(errs);

    }, [groupName, groupAbout, groupCity, groupState]);

    return (
        <form onSubmit={handleSubmit}>
            <ul className='create-group-err-ul'>
                {errors.map((err, i) => (
                    <li key={i} className='cg-err-li'>
                        {err}
                    </li>
                ))}
            </ul>
            <label className='cg-label'>
                Group Name
                <input
                    type='text'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                Group Description
                <textarea
                    type='text'
                    value={groupAbout}
                    onChange={(e) => setGroupAbout(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                City
                <input
                    type='text'
                    value={groupCity}
                    onChange={(e) => setGroupCity(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                State
                <input
                    type='text'
                    value={groupState}
                    onChange={(e) => setGroupState(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                Group Image Url
                <input
                    type='text'
                    value={prevImgUrl}
                    onChange={(e) => setPrevImgUrl(e.target.value)}
                />
            </label>
            <label className='cg-label'>
                Private?
                <input
                    type='checkbox'
                    checked={groupPrivate === true}
                    value={true}
                    onChange={(e) => setGroupPrivate(!groupPrivate)}
                />
            </label>
            <div className='cg-radio-btn-div'>
                <label className='cg-label'>
                    In person
                    <input
                        type='radio'
                        value='In person'
                        checked={groupType === 'In person'}
                        onChange={(e) => setGroupType(e.target.value)}
                    />
                </label>
                <label className='cg-label'>
                    Online
                    <input
                        type='radio'
                        value='Online'
                        checked={groupType === 'Online'}
                        onChange={(e) => setGroupType(e.target.value)}
                    />
                </label>
            </div>
            <button
                className='cg-submit-btn'
                type='submit'
                disabled={errors.length}
            >
                Create Group
            </button>
        </form>
    )
}
