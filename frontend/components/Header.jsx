// styles
import '../styles/Header.css'

// images
import videoLogo from '../assets/icons/videoLogo.png'
import { IconUserFilled } from '@tabler/icons-react'

// imports

const Header = () => {
    const username = localStorage.getItem('username')

    return (
        <header className="general-header">
            <div className="general-header-container">
                <a href='/' className="logo">
                    <img src={videoLogo} alt="Video Net Logo" />
                </a>
                <div className="username">
                    <a href='/'>
                        {`@${username}`}
                        <IconUserFilled size={20}/>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header