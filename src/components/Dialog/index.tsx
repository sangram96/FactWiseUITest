import ReactDOM from 'react-dom'
import style from './dialog.module.css';
import close from '../../images/close.svg';
type DialogBoxType = {
    show: Boolean;
    setShow: (data: boolean) => void;
    deleteHandler: ()=>void;
}
const DialogBox = (props: DialogBoxType) => {
    return (
        <div className={style.container} style={props.show ? {display: "block"} : {display: "none"}}>
            <img src={close} className={style.closeIcon} onClick={() => props.setShow(false)}/>
            <p className={style.message}>Are you sure you want to delete</p>
            <div className={style.btnContainer}>
                <button className={`${style.btn} ${style.cancelBtn}`} onClick={() => props.setShow(false)}>Cancel</button>
                <button className={`${style.btn} ${style.DeleteBtn}`} onClick={props.deleteHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DialogBox;