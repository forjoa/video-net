// styles
import '../styles/Header.css'

// images
import videoLogo from '../assets/icons/videoLogo.png'
import { IconUserCircle, IconPencil, IconVideo, IconUsers, IconLogout } from '@tabler/icons-react'

// imports
import { useState } from 'react'

const Header = () => {
    const [optionsDisplay, setOptionsDisplay] = useState(false)

    const username = localStorage.getItem('username')

    const logout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        localStorage.removeItem('token')

        window.location.reload()
    }

    return (
        <>
            <div className="circle" style={{ top: 0, left: 100 }}></div>
            <div className="circle" style={{ top: 0, right: 100, background: 'red' }}></div>
            <header className="general-header">
                <div className="general-header-container">
                    <a href='/' className="logo">
                        <img src={videoLogo} alt="Video Net Logo" />
                    </a>
                    <div className="username">
                        <a href='#' onClick={() => setOptionsDisplay(!optionsDisplay)}>
                            {`${username}`}
                            <IconUserCircle size={23} />
                        </a>
                    </div>
                </div>

                <div className="header-options" style={{ display: optionsDisplay ? 'block' : 'none' }}>
                    <nav>
                        <a href="/edit-profile">Edit profile <IconPencil /></a>
                        <a href="/my-videos">My videos <IconVideo /></a>
                        <a href='/follows'>Followers / Following <IconUsers /></a>
                        <a href="/" style={{ color: 'red' }} onClick={logout}>Log out <IconLogout color='red' /></a>
                        <span></span>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header