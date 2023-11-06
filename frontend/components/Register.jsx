// imports 
import { useEffect, useState } from "react"

// styles
import '../styles/Register.css'

// icons
import lockedIcon from '../assets/icons/lock.svg'
import unlockedIcon from '../assets/icons/unlock.svg'

const Register = () => {
    const [locked, setLocked] = useState(true)

    useEffect(() => { document.title = 'Video Net | Register' }, [])

    return (
        <>
            <div className="circle"></div>
            <div className="login-form-container">
                <h1>Register</h1>
                <form>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className='username-input'
                        autoComplete="off"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className="description-input"
                    />

                    <label htmlFor="photo">Photo</label>
                    <input 
                        type="file" 
                        name="photo"
                        id="photo"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='email-input'
                        autoComplete="email"
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                        <input
                            type={locked ? 'password' : 'text'}
                            name="password"
                            id="password"
                            className='password-input'
                        />
                        <img
                            src={locked ? lockedIcon : unlockedIcon}
                            alt="Icon to unlock password"
                            onClick={() => setLocked(!locked)}
                        />
                    </div>

                    <input type="submit" value="Register" className='submit-login' />
                    <button className='link-to-register' onClick={() => window.open('/login', '_self')}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Register