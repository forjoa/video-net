// styles
import '../styles/Header.css'

// images
import videoLogo from '../assets/icons/videoLogo.png'
import { IconUserCircle, IconPencil, IconVideo, IconUsers } from '@tabler/icons-react'

// imports
import { useState } from 'react'

const Header = () => {
    const [optionsDisplay, setOptionsDisplay] = useState(false)

    const username = localStorage.getItem('username')

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
                        <span></span>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header