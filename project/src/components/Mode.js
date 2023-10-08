import { React, useEffect, useState } from "react"
import { CgDarkMode } from 'react-icons/cg';

const initial = () => {
    if (localStorage.getItem("theme")) {
        return localStorage.getItem("theme")
    }
    return "dark-mode"
}

const Mode = () => {

    const [theme, setTheme] = useState(initial())

    const changeModal = () => {
        if (theme === "light-mode") {
            setTheme("dark-mode");
        } else {
            setTheme("light-mode");
        }
    }

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme)
    }, [theme])



    return (
        <button disabled className='btn btn-lg' onClick={changeModal} >
            <CgDarkMode className='nav-icon' />
        </button >
    )
}

export default Mode;
