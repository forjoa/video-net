import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// components
import Header from "../Header.jsx";

const EditProfile = () => {
    const [allInfo, setAllInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        document.title = "Video Net | Edit my profile";

        const fetchUserInfo = async () => {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:3000/api/user/my-info", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: userId }),
                });

                if (response.ok) {
                    setAllInfo(await response.json());
                } else {
                    throw new Error("Error while fetching your info");
                }
            } catch (err) {
                console.error(err);
                alert(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
        console.log(allInfo[0])
    }, [token]);

    return (
        <>
            <Header />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {}
                </div>
            )}
        </>
    );
};

export default EditProfile;
