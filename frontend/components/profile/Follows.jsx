// imports
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// icons
import { IconArrowNarrowLeft } from "@tabler/icons-react"

// styles
import '../../styles/Follows.css'

const Follows = () => {
    const userId = localStorage.getItem('id')
    const [followers, setFollowers] = useState(true)
    const [followersList, setFollowersList] = useState([])
    const [followingList, setFollowingList] = useState([])

    useEffect(() => {
        document.title = 'Video Net | Follows'
    })

    // set my followers
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}user/my-followers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId
            })
        })
            .then(response => response.json())
            .then(data => setFollowersList(data))
    }, [userId])

    // set who i'm following
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}user/following`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId
            })
        })
            .then(response => response.json())
            .then(data => setFollowingList(data))
    }, [userId])

    return (
        <>
            <div className="edit-profile-container">
                <a href="/"><IconArrowNarrowLeft />Go Home</a>

                <div className="follows-container">
                    <div className="follows-btn">
                        <div className="followers-btn">
                            <button className={followers ? 'selected' : 'not-selected'} onClick={() => { setFollowers(true) }}>Followers</button>
                        </div>
                        <div className="following-btn">
                            <button className={!followers ? 'selected' : 'not-selected'} onClick={() => { setFollowers(false) }}>Following</button>
                        </div>
                    </div>


                    {followers ?
                        (<div className="followers"> {
                            followersList.map((follower) => {
                                return (
                                    <div className="follower" key={follower.id}>
                                        <Link to={`/user/${follower.id}`} className="follower-profile">
                                            <img src={`/users/${follower.username}/profile.webp`} alt="Profile picture" />
                                            <p>{follower.username}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>)
                        : (<div className="followings"> {
                            followingList.map((following) => {
                                return (
                                    <div className="following" key={following.id}>
                                        <Link to={`/user/${following.id}`} className="following-profile">
                                            <img src={`/users/${following.username}/profile.webp`} alt="Profile Picture" />
                                            <p>{following.username}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default Follows 