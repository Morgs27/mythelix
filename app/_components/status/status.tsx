import './status.scss';
import React, {useEffect} from 'react';
import { IoWarningOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";


const Status = ({message, type, active, setState} : {message: string, type: string, setState: any,active:any}) => {
    
    useEffect(() => {
        setTimeout(() => {
            setState({message, type, active: false})
        }, 1800)
    }, [active])
    
    return (
        <div className = {`status-message ${active == '' ? 'hide' : ''} ${type == "error" ? 'error': type == "warning" ? 'warning': type == "sucess" ? 'sucess': ''}`} >

            {message}
            <div className = 'mark'>
                {
                    type == "error" ? 
                    '!'
                    : type == "warning" ? 
                    '!'
                    : type == "sucess" ? <FaCheck /> :
                    '!'

                }
            </div>
        </div>
    )
}

export default Status
