import "./castlist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { deleteCast, getCasts } from "../../context/castContext/apiCalls";
import { CastContext } from "../../context/castContext/CastContext";

export default function CastList() {
  const { casts, dispatch } = useContext(CastContext);

  const handleDelete = (id) => {
    deleteCast(id, dispatch);
  };

  useEffect(() => {
    getCasts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "casts",
      headerName: "Casts",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.picture} alt="" />
            {params.row.fullname}
          </div>
        );
      },
    },
    { field: "about", headerName: "About", width: 720 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/cast/" + params.row._id, cast: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Casts</h1>
        <Link to="/newcast">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={casts}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
