'use client' 

import { useState } from "react";
import Loader from "./_components/loader/Loader";
import useObserver from "./_hooks/useObserver";

export default function  Loading() {

    const [displayLoader, setDisplayLoader] = useState(true)

    let interval = setInterval(() => {
        if (global.background_rendered){

            useObserver();

            setDisplayLoader(false)
            clearInterval(interval)
        }
    }, 100)

    return (
        <div className={`black-background full-screen top ${ displayLoader ? 'display': 'hide'}`}>
            <Loader/>
        </div>
    )
}