// styles
import '../styles/Login.css'

// imports 
import { useEffect, useState } from 'react'

// icons
import lockedIcon from '../assets/icons/lock.svg'
import unlockedIcon from '../assets/icons/unlock.svg'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [locked, setLocked] = useState(true)

    useEffect(() => {document.title = 'Video Net | Login'}, [])

    return (
        <>
            <div className="circle"></div>
            <div className="login-form-container">
                <h1>Login</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='email-input'
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                        <input
                            type={locked ? 'password' : 'text'}
                            name="password"
                            id="password"
                            className='password-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                            src={locked ? lockedIcon : unlockedIcon}
                            alt="Icon to unlock password"
                            onClick={() => setLocked(!locked)}
                        />
                    </div>

                    <input type="submit" value="Login" className='submit-login' />
                    <button className='link-to-register'>Register</button>
                </form>
            </div>
        </>
    )
}

export default Login