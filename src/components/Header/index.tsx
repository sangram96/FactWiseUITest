import style from '../Users/user.module.css';
import UserInput from '../UserInput';
import { valuesType } from '../../Util/TypeHelper';
import { HeaderType } from '../../Util/TypeHelper';

const Header = ({ id, ItemId, imageUrl, userNameRef, setValues, enableEditing, validation, expandHandler, showExpand, expandLess, expandMore, values }: HeaderType) => {
    return (
        <div className={style.UserDetails}>
            <img alt={"Image"} src={imageUrl} className={style.profileImage} />
            <p className={`${style.userName} ${style.userDetailP}`}>
                <UserInput inputRef={userNameRef} type="text" className={!enableEditing ? style.inputBorderHide : `${style.inputBorderShow}`} style={{ fontSize: "20px" }} value={values.first} changeHandler={(e: any) => {
                    validation(e.target.value);
                    setValues((v: valuesType) => {
                        return {
                            ...v,
                            first: userNameRef.current!.value,
                        }
                    })
                }} />
            </p>
            {<img alt={"Image"} className={style.expandIcon} src={showExpand ? expandLess : expandMore } onClick={(ItemId.editingItem === null || +ItemId.editingItem === id) ? expandHandler : () => {}} />}
        </div>
    )
}
export default Header;