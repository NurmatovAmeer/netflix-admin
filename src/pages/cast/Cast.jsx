import { Link, useHistory, useLocation } from "react-router-dom";
import "./cast.css";
import { Movie, Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { CastContext } from "../../context/castContext/CastContext";
import { updateCast } from "../../context/castContext/apiCalls";
import { useEffect } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Cast() {
  const location = useLocation();
  const cast = location.cast;
  const [newCast, setNewCast] = useState(cast);
  const [picture, setPicture] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(CastContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setNewCast({ ...newCast, [e.target.name]: value });
  };
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewCast({ ...newCast, [e.target.name]: value });
  };
  const upload = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + "img" + picture.name;
    const storageRef = ref(storage, `/items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, picture);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewCast((prev) => {
            return { ...prev, picture: url };
          });
        });
        setUploaded((prev) => prev + 1);
      }
    );
  };
  console.log(newCast);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    updateCast(id, newCast, dispatch);
    history.push("/casts");
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Cast</h1>
        <Link to="/newcast">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={cast.picture} alt="" className="productInfoImg" />
            <span className="productName">{cast.fullname}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{cast._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">about:</span>
              <span className="productInfoValue">{cast.about}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Cast Name</label>
            <input
              type="text"
              placeholder={cast.fullname}
              name="fullname"
              onChange={handleChange}
            />
            <label>Cast About</label>
            <input
              type="text"
              placeholder="write description"
              name="about"
              onChange={handleChange}
            />
            <label>Movies</label>
            <select
              multiple
              name="movies"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="productFormRight">
            <p>image</p>
            <div className="productUpload">
              <img src={cast.picture} alt="" className="productUploadImg" />
              <label for="img">
                <Publish />
              </label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setPicture(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            {uploaded === 1 || !picture ? (
              <button
                className="addProductButton"
                onClick={(e) => handleSubmit(e, cast._id)}
              >
                Update
              </button>
            ) : (
              <button className="addProductButton" onClick={(e) => upload(e)}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
