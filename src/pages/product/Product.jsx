import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { useEffect } from "react";
import { getCasts } from "../../context/castContext/apiCalls";
import { CastContext } from "../../context/castContext/CastContext";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;
  const [newMovie, setNewMovie] = useState(movie);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const { dispatch } = useContext(MovieContext);
  const history = useHistory();
  const { casts, dispatch: castDispatch } = useContext(CastContext);

  useEffect(() => {
    getCasts(castDispatch);
  }, [castDispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewMovie({ ...newMovie, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewMovie({ ...newMovie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      if (item.file) {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/items/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, item.file);
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
              setNewMovie((prev) => {
                return { ...prev, [item.label]: url };
              });
            });
          }
        );
      }
    });
  };
  console.log(newMovie);

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    updateMovie(id, newMovie, dispatch);
    history.push("/movies");
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={handleChange}
            />
            <label>Movie Title</label>
            <input
              type="text"
              placeholder="write description"
              name="desc"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name="limit"
              onChange={handleChange}
            />
            <label>Duration</label>
            <input
              type="text"
              placeholder={movie.duration}
              name="duration"
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <label>Casts</label>
            <select
              multiple
              name="casts"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {casts.map((cast) => (
                <option key={cast._id} value={cast._id}>
                  {cast.fullname}
                </option>
              ))}
            </select>
          </div>
          <div className="productFormRight">
            <p>image</p>
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="img">
                <Publish />
              </label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <p>small image</p>
            <div className="productUpload">
              <img src={movie.imgSm} alt="" className="productUploadImg" />
              <label for="imgSm">
                <Publish />
              </label>
              <input
                type="file"
                id="imgSm"
                name="imgSm"
                onChange={(e) => setImgSm(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <p>thumbnail image</p>
            <div className="productUpload">
              <img src={movie.imgTitle} alt="" className="productUploadImg" />
              <label for="imgTitle">
                <Publish />
              </label>
              <input
                type="file"
                id="imgTitle"
                name="imgTitle"
                onChange={(e) => setImgTitle(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button
              className="addProductButton"
              onClick={(e) => handleSubmit(e, movie._id)}
            >
              Update
            </button>
            <button
              className="addProductButton"
              onClick={(e) => handleUpload(e)}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
