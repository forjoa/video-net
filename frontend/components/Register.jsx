// imports 
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

// styles
import '../styles/Register.css'

// icons
import lockedIcon from '../assets/icons/lock.svg'
import unlockedIcon from '../assets/icons/unlock.svg'
import { IconSquareRoundedPlus } from '@tabler/icons-react'

const Register = () => {
    const [locked, setLocked] = useState(true)
    const navigate = useNavigate()
    // form values
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => { document.title = 'Video Net | Register' }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('username', username)
        data.append('password', password)
        data.append('description', description)
        data.append('email', email)
        data.append('photo', photo)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}user/register`, {
                method: 'POST',
                body: data
            });

            const res = await response.json()
            if (response.ok) {
                navigate('/');
            } else {
                alert(res.error);
            }
        } catch (err) {
            console.error(`Error communication: ${err}`)
        }
    }

    const handlePhotoChange = (e) => {
        document.querySelector('#photo-name-file').style.display = 'block'
        document.querySelector('#photo-name-file').src = URL.createObjectURL(e.target.files[0])
        document.querySelector('#label-photo').style.display = 'none'

        setPhoto(e.target.files[0])
    }

    return (
        <>
            <div className="circle"></div>
            <div className="login-form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className='username-input'
                        autoComplete="off"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className="description-input"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />

                    <p className='choose-photo'>Profile photo</p>
                    <label htmlFor='photo' className='label-photo' id='label-photo'><IconSquareRoundedPlus size={30} stroke={1} color="#4f4f4f"/> </label>
                    <img id='photo-name-file' alt='Profile photo' style={{ display: 'none' }} />
                    <input
                        type='file'
                        className='photo'
                        name='photo'
                        id='photo'
                        onChange={(e) => handlePhotoChange(e)}
                    />

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

                    <input type="submit" value="Register" className='submit-login' />
                    <button className='link-to-register' onClick={() => window.open('/login', '_self')}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Register