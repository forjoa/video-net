// imports 
import { useParams } from "react-router-dom"

// components 
import Header from "./Header.jsx"

const User = () => {
    const { userId } = useParams()

    console.log(userId)

    return (
        <>
        <Header />
        </>
    )
}

export default User