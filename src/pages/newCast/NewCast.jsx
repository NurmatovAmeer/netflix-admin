import { useContext, useState } from "react";
import "./newCast.css";
import storage from "../../firebase";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createCast } from "../../context/castContext/apiCalls";
import { useEffect } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { CastContext } from "../../context/castContext/CastContext";

export default function NewCast() {
  const [cast, setCast] = useState(null);
  const [picture, setPicture] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(CastContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setCast({ ...cast, [e.target.name]: value });
  };
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCast({ ...cast, [e.target.name]: value });
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
          setCast((prev) => {
            return { ...prev, picture: url };
          });
        });
        setUploaded((prev) => prev + 1);
      }
    );
  };
  console.log(cast);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCast(cast, dispatch);
    history.push("/casts");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Cast</h1>
      <form className="addProductForm" noValidate>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Fullname</label>
          <input
            type="text"
            placeholder="write cast name..."
            name="fullname"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="about"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
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
        {uploaded === 1 ? (
          <button className="addProductButton" onClick={(e) => handleSubmit(e)}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={(e) => upload(e)}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
