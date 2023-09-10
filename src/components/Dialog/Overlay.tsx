import style from './overlay.module.css';
const OverLay = (props: any) => {
    return <div className={style.overlayContainer}>
        {props.children}
    </div>
}

export default OverLay;