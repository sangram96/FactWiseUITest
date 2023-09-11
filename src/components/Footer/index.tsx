import style from '../Users/user.module.css';
import { FooterType } from '../../Util/TypeHelper';

const Footer = ({enableEditing, deleteIcon, editIcon, setShowModel, cancelIcon, save, saveClick, cancelHandler, enableSaving, editRef, values, editClick} : FooterType) => {
    return (
        <div className={style.iconContainer}>
            <div style={!enableEditing ? { display: "block" } : { display: "none" }}>
                <img alt={"Image"} src={deleteIcon} className={style.deleteIcon} onClick={() => setShowModel(true)} />
                {values.age >= 18 && <img src={editIcon} className={style.editIcon} ref={editRef} onClick={editClick} />}
            </div>
            <div style={enableEditing ? { display: "flex" } : { display: "none" }} className={style.saveContainer}>
                <img alt={"Image"} src={cancelIcon} className={style.cancelIcon} onClick={cancelHandler} />
                {enableSaving && <img src={save} className={style.editIcon} ref={editRef} onClick={saveClick} />}
            </div>
        </div>
    )
}

export default Footer;