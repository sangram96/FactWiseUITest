import { useEffect, useState } from 'react';
import User from "../Users";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux/es/exports';
type ArrayType = {
    id: number,
    first: string,
    last: string,
    dob: string,
    gender: string,
    email: string,
    picture: string,
    country: string,
    description: string
    age?: number;
}
const UserList = () => {
    let userJsonData = useSelector((state: { userReducer: Array<ArrayType> }) => state.userReducer);
    const [data, setData] = useState<any>(userJsonData);
    const [userDetails, setUserDetails] = useState<Array<ArrayType>>(data);
    useEffect(() => {
        setData(userJsonData);
    }, [userJsonData]);
    useEffect(() => {
        setUserDetails(data);
    }, [data]);
    useEffect(() => {

    }, []);
    return (
        <>
            <h2>List Of Users</h2>
            {userDetails.map((val) => {
                const diff = moment(val.dob).diff(moment(), 'milliseconds');
                const duration = moment.duration(diff);
                return <User key={val.id} id={val.id} userName={val.first} imageUrl={val.picture} gender={val.gender} age={val.age ? val.age : Math.abs(Math.ceil(duration.asYears()))} description={val.description} country={val.country} dob={val.dob}
                />
            })}
        </>
    )
}

export default UserList;