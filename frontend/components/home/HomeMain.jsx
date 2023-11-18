// styles
import '../../styles/HomeMain.css'

// components
import UploadVideo from './UploadVideo.jsx'
import Videos from './Videos.jsx'

const HomeMain = () => {

    return (
        <main className="home-main">
            <UploadVideo />
            <Videos />
        </main>
    )
}

export default HomeMain