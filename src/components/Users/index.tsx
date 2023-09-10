import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import expandMore from '../../images/expandmoreicon.svg';
import expandLess from '../../images/expandlessicon.svg';
import style from './user.module.css';
import deleteIcon from '../../images/delete.svg';
import editIcon from '../../images/editIcon.svg';
import cancelIcon from '../../images/cancel.svg';
import save from '../../images/save.svg';
import DialogBox from '../Dialog';
import UserInput from '../UserInput';
import { UserActions, SelectedItemAction } from '../../store/actions';
import ReactDOM from 'react-dom';
import OverLay from '../Dialog/Overlay';
import moment from 'moment';
import Header from '../Header';
import Footer from '../Footer';

type UserType = {
    id: number;
    userName: string;
    description: string;
    age: number;
    imageUrl: string;
    gender: string;
    country: string;
    dob: string;
}
type valuesType = {
    first: string;
    age: number;
    gender: string;
    country: string;
    description: string;
}
type ArrayType = {
    id: number,
    first: string,
    last: string,
    dob: string,
    gender: string,
    email: string,
    picture: string,
    country: string,
    description: string;
    age: number;
}
const User = ({ id, userName, description, age, imageUrl, gender, country, dob }: UserType) => {
    const dispatch = useDispatch();
    const editRef = useRef<HTMLImageElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [values, setValues] = useState<valuesType>({ first: userName, age, gender, country, description });
    const [showExpand, setShowExpand] = useState<Boolean>(false);
    const [enableEditing, setEnableEditing] = useState<Boolean>(false);
    const [showModel, setShowModel] = useState<Boolean>(false);
    const userJsonData = useSelector((state: { userReducer: Array<ArrayType> }) => state.userReducer);
    const ItemId = useSelector((state: { selectedItem: { id: string, editingItem: string } }) => state.selectedItem);
    const [enableSaving, setEnableSaving] = useState<Boolean>(false);
    const editClick = () => {
        setEnableEditing(true);
        dispatch(SelectedItemAction.editingItem({ id }));
    }
    const cancelHandler = () => {
        dispatch(SelectedItemAction.editingItem({ id: null }));
        setEnableEditing(false);
        const a = userJsonData.filter((val) => val.id === id);
        const diff = moment(dob).diff(moment(), 'milliseconds');
        const duration = moment.duration(diff);
        setValues((val) => {
            return {
                ...val,
                first: a[0].first,
                gender: a[0].gender,
                country: a[0].country,
                description: a[0].description,
                age: a[0].age ? a[0].age : Math.abs(Math.ceil(duration.asYears()))
            }
        })
        dispatch(UserActions.update({ data: userJsonData }))
    }
    const saveClick = () => {
        setEnableEditing(false);
        dispatch(SelectedItemAction.editingItem({ id: null }));
        const d = userJsonData.map((val) => {
            if (+id === +val.id) {
                return { ...val, ...values };
            }
            return val;
        });
        dispatch(UserActions.update({ data: d }))
    }
    const expandHandler = () => {
        setEnableEditing(false);
        setShowExpand(!showExpand);
        dispatch(SelectedItemAction.setSelectedItem({ id }));
    }
    const deleteHandler = (id: number) => {
        setShowModel(false);
        const filterData = userJsonData.filter((val) => val.id !== id);
        dispatch(UserActions.delete({ data: filterData }));
    }

    useEffect(() => {
        if (+ItemId.id === id) {
            setShowExpand(true);
        } else {
            setShowExpand(false);
        }
    }, [ItemId]);

    const validation = (value: string) => {
        if (value.length === 0) {
            setEnableSaving(false);
            return;
        }
        setEnableSaving(true);
        return;
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.UserDetailsContainer}>
                    {showModel && ReactDOM.createPortal(<OverLay><DialogBox deleteHandler={() => deleteHandler(id)} show={showModel} setShow={(data) => { setShowModel(data) }} /></OverLay>, document.getElementById("model") as HTMLElement)}
                    <Header 
                        id={id}
                        ItemId={ItemId}
                        imageUrl={imageUrl}
                        userNameRef={userNameRef}
                        setValues={setValues}
                        enableEditing={enableEditing}
                        validation={validation}
                        expandHandler={expandHandler}
                        showExpand={showExpand}
                        expandLess={expandLess}
                        expandMore={expandMore}
                        values={values}
                     />
                    <div style={showExpand ? { display: "block" } : { display: "none" }}>
                        <div className={style.usersData}>
                            {['Age', 'Gender', 'Country'].map((val) => {
                                return <p className={`${style.userDetailP} ${style.columnName}`}>{val}</p>
                            })}
                            <p className={`${style.userDetailP} ${style.data}`}>
                                <UserInput type="text"
                                    className={!enableEditing ? style.inputBorderHide : `${style.inputBorderShow}`}
                                    style={{
                                        display: "inline",
                                        width: "18px",
                                        padding: !enableEditing ? "0px" : "5px"
                                    }}
                                    value={values.age}
                                    inputRef={ageRef}
                                    changeHandler={(e: any) => {
                                        if (isNaN(e.target.value)) {
                                            return;
                                        }
                                        validation(e.target.value);
                                        setValues((v: valuesType) => {
                                            return {
                                                ...v,
                                                age: +ageRef.current!.value,
                                            }
                                        })
                                    }} /> years
                            </p>
                            <p className={`${style.userDetailP} ${style.data}`}>{!enableEditing ? values.gender : <select value={values.gender} className={!enableEditing ? style.inputBorderHide : style.inputBorderShow} ref={genderRef} onChange={(e: any) => {
                                validation(e.target.value);
                                setValues((v: valuesType) => {
                                    return {
                                        ...v,
                                        gender: genderRef.current!.value,
                                    }
                                })
                            }}>
                                {["Male", "Female", "Transgender", "Rather not say", "Other"].map((val) => {
                                    return <option value={val}>{val}</option>
                                })}
                            </select>}
                            </p>
                            <p className={`${style.userDetailP} ${style.data}`}>
                                <UserInput type="text"
                                    inputRef={countryRef}
                                    className={!enableEditing ? style.inputBorderHide : style.inputBorderShow}
                                    value={values.country}
                                    style={{}}
                                    changeHandler={(e: any) => {
                                        const str = e.target.value;
                                        if (str[str.length - 1] !== " " && Number.isInteger(+str[str.length - 1])) {
                                            return;
                                        }
                                        validation(e.target.value);
                                        setValues((v: valuesType) => {
                                            return {
                                                ...v,
                                                country: countryRef.current!.value,
                                            }
                                        })
                                    }} />
                            </p>
                        </div>
                        <div className={style.descriptionContainer}>
                            <p className={`${style.userDetailP} ${style.columnName}`}>Description</p>

                            <textarea ref={descriptionRef} className={!enableEditing ? style.inputBorderHide : style.inputBorderShow} style={{ resize: "none", width: "100%", padding: "0px", paddingTop: "5px" }} rows={5} cols={30} onChange={(e: any) => {
                                validation(e.target.value);
                                setValues((v: valuesType) => {
                                    return {
                                        ...v,
                                        description: descriptionRef.current!.value,
                                    }
                                })
                            }} value={values.description}>
                                {values.description}
                            </textarea>
                        </div>
                        <Footer 
                            enableEditing={enableEditing}
                            deleteIcon={deleteIcon}
                            editIcon={editIcon}
                            setShowModel={setShowModel}
                            cancelIcon={cancelIcon}
                            save={save}
                            cancelHandler={cancelHandler}
                            enableSaving={enableSaving}
                            editRef={editRef}
                            saveClick={saveClick}
                            editClick={editClick}
                            values={values}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default User;