import { CSSProperties } from "react";

type userInputType = {
    type: string;
    value: string | number;
    style: CSSProperties;
    className:string;
    changeHandler: (e: any) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}
const UserInput = (props: userInputType) => {
    return (
        <input type={props.type} className={props.className} style={props.style} value={props.value} onChange={props.changeHandler} ref={props.inputRef}/>
    )
}

export default UserInput;