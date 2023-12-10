// styles
import '../styles/Presentation.css'

// components 
import PresentationHeader from './presentation/PresentationHeader.jsx'
import PresentationHome from './presentation/PresentationHome.jsx'

// imports 
import { useEffect } from 'react'

const Presentation = () => {
    useEffect(() => {
        document.title = 'Video Net | Presentation'
    })

    return (
        <>
            <PresentationHeader />
            <PresentationHome />
        </>
    )
}

export default Presentation