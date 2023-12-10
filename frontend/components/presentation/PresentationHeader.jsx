// icons 
import videoLogo from '../../assets/icons/videoLogo.png'

const PresentationHeader = () => {
    return (
        <header className='presentation-header'>
            <div className="logo-container">
                <img src={videoLogo} alt="Video Logo" />
            </div>
        </header>
    )
}

export default PresentationHeader