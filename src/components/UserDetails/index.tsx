import style from '../Users/user.module.css';
import UserInput from '../UserInput';
import { valuesType } from '../../Util/TypeHelper';
type UserDetailsType = {
    enableEditing: Boolean;
    values: {
        first: string;
        age: number;
        gender: string;
        country: string;
        description: string;
    };
    ageRef: React.RefObject<HTMLInputElement>;
    validation: (e: any) => void;
    setValues: (e: any) => void;
    genderRef: React.RefObject<HTMLSelectElement>;
    countryRef: React.RefObject<HTMLInputElement>;
    descriptionRef: React.RefObject<HTMLTextAreaElement>;
}
const UserDetails = ({enableEditing, values, validation, setValues, genderRef, countryRef, ageRef, descriptionRef} : UserDetailsType) => {
    const optionArr = ["Male", "Female", "Transgender", "Rather not say", "Other"];
    const columnArr = ['Age', 'Gender', 'Country'];
    return (
        <>
            <div className={style.usersData}>
                {columnArr.map((val) => {
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
                    {optionArr.map((val) => {
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
        </>
    )
}

export default UserDetails;