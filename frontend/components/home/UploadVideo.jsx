// imports
import { useState } from 'react'

// icons
import { IconSend } from '@tabler/icons-react'

const UploadVideo = () => {
    const [concept, setConcept] = useState('')
    const [videoURL, setVideoURL] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            concept: concept,
            url: videoURL,
            userId: localStorage.getItem('id')
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}video/upload-video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
                setConcept('')
                setVideoURL('')
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form className="upload-videos" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="concept"
                    id="concept"
                    spellCheck="false"
                    className='description-upload'
                    placeholder='Got a new video?!'
                    autoComplete='off'
                    onChange={(e) => setConcept(e.target.value)}
                    value={concept}
                />
                <input
                    type="text"
                    name="videoURL"
                    id="videoURL"
                    spellCheck="false"
                    className='videoURL-upload'
                    placeholder='Your video URL'
                    autoComplete='off'
                    onChange={(e) => setVideoURL(e.target.value)}
                    value={videoURL}
                />
                <button
                    type="submit"

                >
                    Upload post
                    <IconSend />
                </button>

            </form>
        </>
    )
}

export default UploadVideo

