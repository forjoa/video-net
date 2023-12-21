// images
import presentationImage from '../../assets/images/presentation.png'

const PresentationHome = () => {
    return (
        <>
            <div className="presentation-home-container">
                <div className="presentation-home-content">
                    <div className="presentation-home-title">
                        <h1>
                            <span>Video Net</span> where you can share with everyone every video important for you
                        </h1>
                    </div>
                    <div className="presentation-home-image">
                        <img src={presentationImage} alt="Presentation Image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PresentationHome