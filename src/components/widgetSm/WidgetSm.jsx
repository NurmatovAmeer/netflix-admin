import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

export default function WidgetSm() {
  const [newUsers,setNewUsers] = useState([])

  useEffect(() => {
    const getNewUsers = async () => {
      try{
        const res = await axios.get(`${API_URL}users?new=true`,{
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        })
        setNewUsers(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getNewUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.profilePic || 'https://img.myloview.com/murals/default-avatar-profile-icon-social-media-user-vector-image-400-242023490.jpg'}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
            ))}
      </ul>
    </div>
  );
}
