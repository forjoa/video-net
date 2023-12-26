// imports
import { useEffect, useState } from "react"

// icons
import { IconArrowNarrowLeft, IconTrash } from "@tabler/icons-react"

// styles
import '../../styles/MyVideos.css'

const MyVideos = () => {
    const userId = localStorage.getItem('id')
    const [myVideos, setMyVideos] = useState([])

    useEffect(() => {
        document.title = 'Video Net | My videos'
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}video/my-videos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        })
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
                setMyVideos(videosWithId);
            })
            .catch(error => console.error('Error: ' + error))
    }, [userId])

    const deleteVideo = async (e) => {
        const videoId = e.target.getAttribute('data-id')
        const response = await fetch(`${import.meta.env.VITE_API_ROUTE}video/delete-video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                videoId: videoId,
                ownerId: localStorage.getItem('id')
            })
        })

        if (response.ok) {
            window.location.reload()
        }
    }

    return (
        <>
            <div className="edit-profile-container">
                <a href="/"><IconArrowNarrowLeft />Go Home</a>

                {myVideos.length > 0 ? (
                    <div className="all-my-videos">
                        {myVideos.map((video) => {
                            const date = new Date(video.created_at)
                            const options = {
                                month: 'long',
                                year: 'numeric',
                                day: 'numeric'
                            }
                            return (
                                <div key={video.id} className="my-video">
                                    <div className="my-video-content">
                                        <div className="my-video-content-text">
                                            <p>{video.concept}</p>
                                            <p>{date.toLocaleDateString('en-US', options)}</p>
                                        </div>
                                        <iframe
                                            title={video.concept}
                                            width="650"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="my-video-delete">
                                        <button onClick={deleteVideo} data-id={video.id}><IconTrash color="white" /></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (<p>No videos yet ...</p>)}
            </div>
        </>
    )
}

export default MyVideos