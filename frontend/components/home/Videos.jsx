// imports
import { useState, useEffect } from "react";

// styles
import '../../styles/Videos.css'

const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/video/home', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: localStorage.getItem('id') })
                });

                if (response.ok) {
                    const responseL = await response.json();
                    const videosWithId = responseL.map((video) => {
                        const parts = video.url.split('v=');
                        const videoId = parts[1];
                        return { ...video, youtubeVideoId: videoId };
                    });
                    setVideos(videosWithId);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchVideos();
    }, []);

    return (
        <section className="all-videos">
            {videos.map((video) => (
                <div key={video.id} className="video">
                    <h3>{video.uploader_name}</h3>
                    <p>{video.concept}</p>
                    <iframe
                        title={video.concept}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </section>
    );
};

export default Videos;
