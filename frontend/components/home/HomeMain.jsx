// styles
import '../../styles/HomeMain.css'

// icons
import { IconSend } from '@tabler/icons-react'

// imports
import { useState } from 'react'

const HomeMain = () => {
    const [description, setDescription] = useState('')
    const [videoURL, setVideoURL] = useState('')

    return (
        <main className="home-main">
            <form className="upload-videos">
                <input
                    type="text"
                    name="description"
                    id="description"
                    spellCheck="false"
                    className='description-upload'
                    placeholder='Got a new video?!'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <input
                    type="text"
                    name="videoURL"
                    id="videoURL"
                    spellCheck="false"
                    className='videoURL-upload'
                    placeholder='Your video URL'
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
        </main>
    )
}

export default HomeMain