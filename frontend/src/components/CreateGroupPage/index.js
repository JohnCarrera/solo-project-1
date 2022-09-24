import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGroup, addGroupImage } from '../../store/groups';
import { useHistory } from 'react-router-dom';
import './createGroupPage.css';



export default function CreateGroupPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [groupName, setGroupName] = useState('');
    const [groupAbout, setGroupAbout] = useState('');
    const [groupType, setGroupType] = useState('');
    const [groupPrivate, setGroupPrivate] = useState('');
    const [groupCity, setGroupCity] = useState('');
    const [groupState, setGroupState] = useState('');
    const [prevImgUrl, setPrevImgUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);

    //individual field error states
    const [nameErr, setNameErr] = useState('');
    const [descErr, setDescErr] = useState('');
    const [cityErr, setCityErr] = useState('');
    const [stateErr, setStateErr] = useState('');
    const [urlErr, setUrlErr] = useState('');
    const [groupTypeErr, setGroupTypeErr] = useState('');
    const [accessErr, setAccessErr] = useState('');

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

    const handleSubmit = async (e) => {

        e.preventDefault();
        setBackendErrors([]);
        setRenderErrors(true);

        if (
            !nameErr &&
            !descErr &&
            !cityErr &&
            !stateErr &&
            !urlErr &&
            !groupTypeErr &&
            !accessErr
        ) {

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

            if (prevImgUrl.length > 0) {
                const groupImgRes = dispatch(addGroupImage(newGroup.id, imgBody))
            }
            // console.log('newgroup:', newGroup);
            // console.log('groupImgRes', groupImgRes)

            history.push(`/groups/${newGroup.id}/about`);
        }
    }

    useEffect(() => {

        const errs = [];

        if (!groupName.length) {
            setNameErr('*name is required');
        } else if (groupName.length && groupName.length > 60) {
            setNameErr('*must be less than 60 characters');
        } else {
            setNameErr('');
        }
        if (!groupAbout.length) {
            setDescErr('*description is required')
        } else if (groupAbout.length && groupAbout.length < 50) {
            setDescErr('*must be at least 50 characters');
        } else {
            setDescErr('')
        }
        if (!groupCity.length) {
            setCityErr('*city is required');
        } else {
            setCityErr('');
        }
        if (!groupState.length) {
            setStateErr('*state is required');
        } else if (groupState.length > 0 && groupState.length !== 2) {
            setStateErr('*must be a 2-letter abbreviation');
        } else {
            setStateErr('');
        }
        if (!prevImgUrl.length){
            setUrlErr('*image URL is required');
        } else if (prevImgUrl.length && !checkUrl(prevImgUrl)){
            setUrlErr('*invalid image URL');
        } else {
            setUrlErr('');
        }
        if (!groupType.length) {
            setGroupTypeErr('*group type is required');
        } else {
            setGroupTypeErr('');
        }
        if (!groupPrivate.length) {
            setAccessErr('*group access type is required');
        } else {
            setAccessErr('');
        }

        setErrors(errs);

    }, [groupName, groupAbout, groupCity, groupState, prevImgUrl, groupPrivate, groupType]);

    return (
        <div className='cg-main-page-div'>
            <div className='cg-title-div'>
                Create A Group
            </div>
            <div className="cg-login-err-div">
                {formatBackendErrors(backendErrors).map((error, idx) => (
                    <div className="sm-err-msg" key={idx}>{error}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="cg-input-div">
                    <div className="cg-input-inner-div">
                        <div className="cg-input-label-div">
                            <div className='cg-input-label'>
                                Group Name
                            </div>
                            <div className="cg-field-error">
                                {renderErrors && nameErr.length > 0 && nameErr}
                            </div>
                        </div>
                        <div className="cg-pseudo-input">
                            <input
                                className="cg-input-field"
                                type='text'
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="cg-input-div">
                        <div className="cg-input-inner-div">
                            <div className="cg-input-label-div">
                                <div className='cg-input-label'>
                                    Group Description
                                </div>
                                <div className="cg-field-error">
                                    {renderErrors && descErr.length > 0 && descErr}
                                </div>
                            </div>
                            <div className="cg-pseudo-input-textarea">
                                <textarea
                                    className="cg-input-field-textarea"
                                    type='text'
                                    value={groupAbout}
                                    onChange={(e) => setGroupAbout(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cg-input-div">
                        <div className="cg-input-inner-div">
                            <div className="cg-input-label-div">
                                <div className='cg-input-label'>
                                    City
                                </div>
                                <div className="cg-field-error">
                                    {renderErrors && cityErr.length > 0 && cityErr}
                                </div>
                            </div>
                            <div className="cg-pseudo-input">
                                <input
                                    className="cg-input-field"
                                    type='text'
                                    value={groupCity}
                                    onChange={(e) => setGroupCity(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cg-input-div">
                        <div className="cg-input-inner-div">
                            <div className="cg-input-label-div">
                                <div className='cg-input-label'>
                                    State
                                </div>
                                <div className="cg-field-error">
                                    {renderErrors && stateErr.length > 0 && stateErr}
                                </div>
                            </div>
                            <div className="cg-pseudo-input">
                                <input
                                    className="cg-input-field"
                                    type='text'
                                    value={groupState}
                                    onChange={(e) => setGroupState(e.target.value)}
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
                    <div className="cg-input-div">
                        <div className="cg-input-inner-div">
                            <div className="cg-input-label-div">
                                <div className='cg-input-label'>
                                    Group Type
                                </div>
                                <div className="cg-field-error">
                                    {renderErrors && groupTypeErr.length > 0 && groupTypeErr}
                                </div>
                            </div>
                            <div className="cg-pseudo-input">
                                <select
                                    className='cg-select-input'
                                    value={groupType}
                                    onChange={(e) => setGroupType(e.target.value)}
                                >
                                    <option value={''}>Select Group Type</option>
                                    <option value={'In person'}>In person</option>
                                    <option value={'Online'}>Online</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="cg-input-div">
                        <div className="cg-input-inner-div">
                            <div className="cg-input-label-div">
                                <div className='cg-input-label'>
                                    Group Access
                                </div>
                                <div className="cg-field-error">
                                    {renderErrors && accessErr.length > 0 && accessErr}
                                </div>
                            </div>
                            <div className="cg-pseudo-input">
                                <select
                                    className='cg-select-input'
                                    value={groupPrivate}
                                    onChange={(e) => setGroupPrivate(e.target.value)}
                                >
                                    <option value={''}>Select Group Access</option>
                                    <option value={false}>Public</option>
                                    <option value={true}>Private</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='cg-submit-btn-div'>
                    <button
                        className='cg-submit-btn'
                        type='submit'
                        disabled={errors.length}
                    >
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    )
}
