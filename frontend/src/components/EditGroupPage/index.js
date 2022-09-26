import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editGroup, getSingleGroup, deleteGroup, createGroup, addGroupImage } from '../../store/groups';
import './editGroupPage.css';



export default function EditGroupPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const { groupId, path } = params;

    const group = useSelector(state => state.groups.singleGroup);

    useEffect(() => {
        dispatch(getSingleGroup(groupId));
    }, [dispatch]);


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

    useEffect(() => {

        if (group && group.GroupImages) {

            setGroupName(group.name);
            setGroupAbout(group.about);
            setGroupType(group.type);
            setGroupPrivate(group.private ? true : false);
            setGroupCity(group.city);
            setGroupState(group.state);

            if (group.GroupImages && group.GroupImages[0]) {
                setPrevImgUrl(group.GroupImages[0].url);
            }
        }
    }, [group, group.GroupImages]);

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

    const deleteGroupBtnClick = (e) => {
        e.preventDefault()

        dispatch(deleteGroup(groupId));

        history.push(`/browse/groups`)
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

            const newGroup = await dispatch(editGroup(groupId, vals))

            const imgBody = {
                id: newGroup.id,
                url: prevImgUrl,
                preview: true
            }


            if (prevImgUrl.length > 0) {
                const groupImgRes = dispatch(addGroupImage(groupId, imgBody))
            }

            history.push(`/groups/${newGroup.id}/about`);
        }
    }

    useEffect(() => {

        const errs = [];

        if (groupName && !groupName.length) {
            setNameErr('*name is required');
        } else if (groupName && groupName.length && groupName.length > 60) {
            setNameErr('*must be less than 60 characters');
        } else {
            setNameErr('');
        }
        if (groupAbout && !groupAbout.length) {
            setDescErr('*description is required')
        } else if (groupAbout && groupAbout.length && groupAbout.length < 50) {
            setDescErr('*must be at least 50 characters');
        } else {
            setDescErr('')
        }
        if (groupCity && !groupCity.length) {
            setCityErr('*city is required');
        } else {
            setCityErr('');
        }
        if (groupState && !groupState.length) {
            setStateErr('*state is required');
        } else if (groupState && groupState.length > 0 && groupState.length !== 2) {
            setStateErr('*must be a 2-letter abbreviation');
        } else {
            setStateErr('');
        }
        if (prevImgUrl && !prevImgUrl.length) {
            setUrlErr('*image URL is required');
        } else if (prevImgUrl && prevImgUrl.length && !checkUrl(prevImgUrl)) {
            setUrlErr('*invalid image URL');
        } else {
            setUrlErr('');
        }
        if (groupType && !groupType.length) {
            setGroupTypeErr('*group type is required');
        } else {
            setGroupTypeErr('');
        }
        if (typeof group.privage !== 'undefined') {
            setAccessErr('*group access type is required');
        } else {
            setAccessErr('');
        }

        setErrors(errs);

    }, [groupName, groupAbout, groupCity, groupState, prevImgUrl, groupPrivate, groupType]);

    return (
        <div className='cg-main-page-div'>
            <div className='eg-title-div'>
                Edit Group
            </div>
            <div className='eg-submit-btn-div'>
                    <button
                        className='eg-delete-btn'
                        type='submit'
                        onClick={deleteGroupBtnClick}
                    >
                        Delete Group
                    </button>
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
                                    maxLength={250}
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
                        Update Group
                    </button>
                </div>
            </form>
            <div className='edit-grp-padding-div'></div>
        </div>
    )
}
