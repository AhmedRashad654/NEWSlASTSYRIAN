import {React,useContext }from 'react';
import style from '../RegisterUser/RegisterUser.module.css';
import './FailedPin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { ContextUser } from '../../context/Context';
export default function FailedPin() {
    
    const { setOpenAuth}= useContext(ContextUser)

  return (
    <>
    
    <div className={style.RegisterUser}>
      <div className={`${style.formsSuccessRegister} w-50 text-center pt-3 position-relative`}>
      <FontAwesomeIcon
          icon={faCircleXmark}
          style={{
            color: "red",
            cursor: "pointer",
            marginRight:"auto",
            position:"absolute",
            right:"15px"
          }}
          onClick={()=>setOpenAuth('')}
        />
        <div className={style.informSuccess}>
        <FontAwesomeIcon icon={faExclamationCircle} style={{color:"red",fontSize:'40px',marginBottom:'20px'}}/>
          <p className='msg fw-bold mt-3 '>عفوا , يرجى التحقق من رمز الدخول و إعادة المحاولة مرة أخرى</p>
          <div className=' mt-4'>
            <button onClick={()=>setOpenAuth('forget')} className=' ms-3 btn blue'> حاول مرة أخرى</button>
            <button onClick={()=>setOpenAuth('')}  className='btn'> الرجوع للرئيسية</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}