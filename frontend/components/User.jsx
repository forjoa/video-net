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
    const [videos, setVideos] = useState()
    const [follow, setFollow] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data[0]))
            .catch(error => console.error('Error: ', error))
    }, [userId])

    useEffect(() => {
        fetch(`http://localhost:3000/api/video/user/${userId}`)
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
        const response = await fetch('http://localhost:3000/api/user/follow', {
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
    }

    return (
        <>
            <Header />
            {user ? (
                <div className="profile-container">
                    <div className="presentation">
                        <img src={`/public/users/${user.username}/profile.webp`} alt={user.username} />
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