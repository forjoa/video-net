// imports
import { useState, useEffect } from "react";

// styles
import '../../styles/Videos.css'
import { Link } from "react-router-dom";

const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_ROUTE}video/home`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: localStorage.getItem('id') })
                });

                if (response.ok) {
                    const responseL = await response.json();
                    const videosWithId = responseL.map((video) => {
                        let videoId = ''
                        if (video.url.includes('watch')) {
                            videoId = video.url.split('v=')[1]
                        } else {
                            videoId = video.url.split('/')[3].split('?si')[0]
                        }
                        return { ...video, youtubeVideoId: (videoId + '').split('&')[0] };
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
            {videos.length > 0 ?
                videos.map((video) => {
                    const date = new Date(video.created_at)
                    const options = {
                        month: 'long',
                        year: 'numeric',
                        day: 'numeric'
                    }

                    console.log(video)

                    return (
                        <div key={video.id} className="video">
                            <h3>
                                <Link to={`/user/${video.uploader_id}`}>
                                    <img src={video.uploader_photo == '' ? '/profile.webp' : `/uploads/${video.uploader_photo}`} alt="User profile photo" />
                                    @{video.uploader_name}
                                </Link>
                                <p>{date.toLocaleDateString('en-US', options)}</p>
                            </h3>
                            <p>{video.concept}</p>
                            <iframe
                                title={video.concept}
                                width="650"
                                height="315"
                                src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )
                })
                : (<p>No videos yet</p>)}
        </section>
    );
};

export default Videos;
