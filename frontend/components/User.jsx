// imports 
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

// components 
import Header from "./Header.jsx"

// styles
import '../styles/User.css'

const User = () => {
    const { userId } = useParams()
    const [user, setUser] = useState()

    console.log(userId)

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data[0]))
            .catch(error => console.error('Error: ', error))
    }, [userId])

    
    useEffect(() => {
        document.title = `Video Net | User`
    })

    console.log(user)

    return (
        <>
            <Header />
            {user ? (
                <div className="profile-container">
                    <div className="presentation">
                        <img src={`/public/users/${user.username}/profile.webp`} alt={user.username} />
                        <h2>{user.username}</h2>
                        <p>{user.description}</p>
                    </div>
                    <div className="user-videos-container">
                        
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default User