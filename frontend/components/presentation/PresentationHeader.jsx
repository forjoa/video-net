// icons 
import videoLogo from '../../assets/icons/videoLogo.png'

// imports 
import { Link } from 'react-router-dom'

const PresentationHeader = () => {
    return (
        <header className='presentation-header'>
            <div className="presentation-header-content">
                <div className="logo-container">
                    <Link to='/presentation'>
                        <img src={videoLogo} alt="Video Logo" />
                        <p>Video Net</p>
                    </Link>
                </div>

                <div className="login-container">
                    <Link to='/login' className='login-button'>Login</Link>
                    <Link to='/register' className='register-button'>Register</Link>
                </div>
            </div>
        </header>
    )
}

export default PresentationHeader