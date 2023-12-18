// styles
import '../styles/Login.css'

// imports 
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// icons
import lockedIcon from '../assets/icons/lock.svg'
import unlockedIcon from '../assets/icons/unlock.svg'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [locked, setLocked] = useState(true)
    const navigate = useNavigate()

    const token = localStorage.getItem("token");

    useEffect(() => { if (token) navigate("/") })

    useEffect(() => { document.title = 'Video Net | Login' }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { email, password }

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const res = await response.json()
            if (response.ok) {
                localStorage.setItem('token', true)
                localStorage.setItem('id', res.id)
                localStorage.setItem('username', res.username)
                navigate('/');
            } else {
                alert(res.error);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="circle"></div>
            <div className="login-form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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
                            autoComplete='current-password'
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
                    <button className='link-to-register' onClick={() => window.open('/register', '_self')}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Login