// imports 
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

// components 
import Header from "./Header.jsx"

// styles
import '../styles/User.css'

const User = () => {
    const { userId } = useParams()
    const [user, setUser] = useState()
    const [videos, setVideos] = useState()
    const [follow, setFollow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}user/know-follow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userFollowed: userId,
                userFollowing: localStorage.getItem('id')
            })
        })
            .then(response => response.json())
            .then(data => { if (data.length === 1) setFollow(true) })
    })

    useEffect(() => {
        if (userId == localStorage.getItem('id')) {
            navigate('/my-videos')
        }
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data[0]))
            .catch(error => console.error('Error: ', error))
    }, [userId])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}video/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                const videosWithId = data.map((video) => {
                    let videoId = ''
                    if (video.url.includes('watch')) {
                        videoId = video.url.split('v=')[1]
                    } else {
                        videoId = video.url.split('/')[3].split('?si')[0]
                    }
                    return { ...video, youtubeVideoId: (videoId + '').split('&')[0] };
                });
                setVideos(videosWithId);
            })
            .catch(error => console.error('Error: ' + error))
    }, [userId])

    useEffect(() => {
        document.title = `Video Net | User`
    })

    const following = async () => {
        if (follow === false) {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}user/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userFollowed: userId,
                    userFollowing: localStorage.getItem('id')
                })
            })

            if (response.ok) {
                setFollow(!follow)
                console.log('ok')
            }
        } else {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}user/unfollow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userFollowed: userId,
                    userFollowing: localStorage.getItem('id')
                })
            })

            if (response.ok) {
                setFollow(!follow)
                console.log('ok unfollowed')
            }
        }
    }

    return (
        <>
            <Header />
            {user ? (
                <div className="profile-container">
                    <div className="presentation">
                        <img src={user.photo == '' ? '/profile.webp' : `/uploads/${user.photo}`} alt={user.username} />
                        <h2>{user.username}</h2>
                        <p>{user.description}</p>
                        <button
                            onClick={() => following()}
                            className={follow ? 'btn-unfollow' : 'btn-follow'}
                        >
                            {follow ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                    <div className="user-videos-container">
                        {videos ? videos.map(video => {
                            return (
                                <div key={video.id} className="video-user">
                                    <p>{video.concept}</p>
                                    <iframe
                                        title={video.concept}
                                        src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )
                        }) : (<p>Loading...</p>)}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default User