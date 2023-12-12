// imports
import { useEffect, useState } from "react"

const MyVideos = () => {
    const userId = localStorage.getItem('id')
    const [myVideos, setMyVideos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/api/video/home', {
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

    console.log(myVideos)

    return (
        <>
        </>
    )
}

export default MyVideos