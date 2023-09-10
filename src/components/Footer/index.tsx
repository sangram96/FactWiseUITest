import style from '../Users/user.module.css';
type FooterType = {
    enableEditing: Boolean;
    deleteIcon: string;
    editIcon: string;
    setShowModel: (e: boolean) => void;
    cancelIcon: string;
    save: string;
    cancelHandler: () => void;
    enableSaving: Boolean;
    editRef: React.RefObject<HTMLImageElement>;
    saveClick: () => void;
    editClick: () => void;
    values: {
        first: string;
        age: number;
        gender: string;
        country: string;
        description: string;
    }
}
const Footer = ({enableEditing, deleteIcon, editIcon, setShowModel, cancelIcon, save, saveClick, cancelHandler, enableSaving, editRef, values, editClick} : FooterType) => {
    return (
        <div className={style.iconContainer}>
            <div style={!enableEditing ? { display: "block" } : { display: "none" }}>
                <img src={deleteIcon} className={style.deleteIcon} onClick={() => setShowModel(true)} />
                {values.age >= 18 && <img src={editIcon} className={style.editIcon} ref={editRef} onClick={editClick} />}
            </div>
            <div style={enableEditing ? { display: "flex" } : { display: "none" }} className={style.saveContainer}>
                <img src={cancelIcon} className={style.cancelIcon} onClick={cancelHandler} />
                {enableSaving && <img src={save} className={style.editIcon} ref={editRef} onClick={saveClick} />}
            </div>
        </div>
    )
}

export default Footer;