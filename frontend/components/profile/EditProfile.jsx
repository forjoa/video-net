// imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// components
// import Header from "../Header.jsx";

// styles
import '../../styles/EditProfile.css'

// icons 
import { IconPencil, IconSwitch2, IconTrash, IconUserCircle, IconArrowNarrowLeft } from '@tabler/icons-react'

const EditProfile = () => {
    const [allInfo, setAllInfo] = useState({});

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            document.title = "Video Net | Edit my profile";

            try {
                const response = await fetch(`${import.meta.env.VITE_API_ROUTE}user/my-info?id=${userId}`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAllInfo(data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserInfo();
    }, [navigate, token, userId]);

    // form variables 
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [description, setDescription] = useState('')

    return (
        <>
            <div className="edit-profile-container">
                <a href="/"><IconArrowNarrowLeft />Go Home</a>
                <h1>Edit profile <IconUserCircle size={30} /></h1>
                <form>
                    <label htmlFor="username"><h2>Username</h2> </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="off"
                        value={username ? username : allInfo.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="description"><h2>Description</h2></label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description ? description : allInfo.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label htmlFor="photo"><h2>Profile photo</h2></label>
                    <div className="photo-container">
                        <img
                            src={`../../../public/users/${username}/profile.webp`}
                            alt="Profile Photo"
                        />
                        <button className="edit-photo-button"><IconPencil />Edit</button>
                        <button className="change-photo-button"><IconSwitch2 />Change</button>
                        <button className="delete-photo-button"><IconTrash />Delete</button>
                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            className="photo"
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="SEND" 
                        className="submit"
                        id="submit"
                    />
                </form>
            </div>
        </>
    );
};

export default EditProfile;
