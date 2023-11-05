// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from './Header.jsx'

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        document.title = 'Video Net | Home'
    })  

    return (
        <>
            <Header />
        </>
    )
}

export default Home