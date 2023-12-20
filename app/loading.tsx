'use client' 

import { useState } from "react";
import Loader from "./_components/loader/Loader";
import addObservers from "./_components/addObservers";

export default function  Loading() {

    const [displayLoader, setDisplayLoader] = useState(true)

    let interval = setInterval(() => {
        if ((global as any).background_rendered){

            addObservers();

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