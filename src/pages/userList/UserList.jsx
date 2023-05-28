import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import AvatarLogo from "../../assets/avatar.svg";

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}users`, {
          headers: {
            token: `Bearer ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  console.log(data);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "profilePic",
      headerName: "Picture",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <img
              className="userListImg"
              src={params.row.profilePic ? params.row?.profilePic : AvatarLogo}
              alt={params.row.username}
            />
          </>
        );
      },
    },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button type={params.row.isAdmin.toString()} />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
