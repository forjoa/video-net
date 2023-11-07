// styles
import '../styles/Header.css'

// images
import videoLogo from '../assets/icons/videoLogo.png'
import { IconUserFilled } from '@tabler/icons-react'

// imports

const Header = () => {
    const username = localStorage.getItem('username')

    return (
        <>
        <div className="circle" style={{ top: 0, left: 100}}></div>
        <div className="circle" style={{ top: 0, right: 100, background: 'red'}}></div>
        <header className="general-header">
            <div className="general-header-container">
                <a href='/' className="logo">
                    <img src={videoLogo} alt="Video Net Logo" />
                </a>
                <div className="username">
                    <a href='/edit-profile'>
                        {`${username}`}
                        <IconUserFilled size={20}/>
                    </a>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header