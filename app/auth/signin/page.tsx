'use client' 

import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useObserver from "@/app/_hooks/useObserver";

const page = () => {

    const callBackUrl = 'http://localhost:3000/';

    const [visible, setVisible] = useState(false);

    const [username, setUsername] = useState('');   
    const [password, setPassword] = useState('');

    const [active, setActive] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState({error: '', fine: false});
    const [passwordError, setPasswordError] = useState({error: '', fine: false});

    useEffect(() => {
        
      if (username.length > 0 && password.length > 0){
        setActive(true);
      }

      if (password.length > 0){
        setPasswordError({error: '', fine: true})
      }
    
    }, [username, password])

    
    useEffect(() => {

        useObserver();
        
        const url = window.location.href;
        const params = new URL(url).searchParams;
        const error = params.get('error')
        const username = params.get('username')

        if (username){
            setUsername(username)
        }

        if (error){
            if (error == 'password'){
                setPasswordError({error: 'Incorrect password', fine: false})
            }
            else if (error == 'username'){
                setUsernameError({ error: 'Incorrect username', fine: false})
            }
            else {
                setErrorMessage('Server error')
            }
        }

    }, [])

    const handleLogin = async (e: any) => {
        e.preventDefault()

        // Have some checks here first
        if (username.length == 0){
            setUsernameError({error: 'Please enter a username', fine: false})
        }
        else {
            setUsernameError({error: '', fine: true})
        }

        if (password.length == 0){
            setPasswordError({error: 'Please enter a password', fine: false})
        }
        else {
            setPasswordError({error: '', fine: true})
        }

        const res = await signIn('credentials', { 
          username: username, 
          password: password,
          callbackUrl: callBackUrl,
        })

    }

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleUsername = (e: any) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }


    return (
        <>
        <form onSubmit={handleLogin} method="post" className='form'>
            <div className="form__title fade-in fade-time-10 fade-left fade-delay-0">Sign In</div>
            <div className="form__description fade-in fade-time-10 fade-left fade-delay-15">Don't have an account? <Link href='./signup'>Sign Up</Link></div>

            <div className={`form__input__container fade-in fade-time-10 fade-left fade-delay-6  ${usernameError.error.length > 0 ? 'red' : ''}`}>
                <input onChange={handleUsername} placeholder="Username" id = "name" name = "name" type = "text" value={username}/>
                <div className='form__error '>{usernameError.error}</div>

            </div>

            <div className={`form__input__container fade-in fade-time-10 fade-left fade-delay-9 ${passwordError.error.length > 0 ? 'red' : ''}`}>
                <input onChange={handlePassword} placeholder = 'Password' id = "password" name = "password" type = {visible ? 'text' : 'password'} value={password}/>
                
                <div onClick={handleVisible} className={`eye ${password.length > 0 ? 'active' : ''}`}><FaEye></FaEye></div>
                <div className='form__error'>{passwordError.error}</div>
            </div>
            
            <input className={`form__button fade-in fade-time-10 fade-left fade-delay-12 ${active ? 'active' : ''}`} type = "submit" value = "Log In"/>
            
            <div className = {`form__main__error ${errorMessage.length > 0 ? 'active' : ''}`}  >{errorMessage}</div>
        </form>
        </>
    )
}

export default page