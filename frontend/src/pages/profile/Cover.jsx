import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Cropper from "react-easy-crop";
import PulseLoader from "react-spinners/PulseLoader";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uplaodImages } from "../../functions/uplaodImages";
import { createPost } from "../../functions/Post";
import { useSelector } from "react-redux";
import UpdateCoverPicture from "../../functions/UpdateCoverPicture";
import OldCovers from "./OldCovers";




export default function Cover({ cover ,visitor }) {

  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const menuRef = useRef(null);
  const refInput = useRef(null);
  const cRef = useRef(null);
  const {  photos  } = useSelector((state) => state.photos);
  const [show, setShow] = useState(false);



  useClickOutside(menuRef, () => setShowCoverMenu(false));

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      setShowCoverMenu(false);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      setShowCoverMenu(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };




 
  const coverRef = useRef(null);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);


  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );



  const updateCoverPicture = async()=>{

    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uplaodImages(formData, path, user.token);
      const updated_picture = await UpdateCoverPicture(res[0].url, user.token);
      if (updated_picture === "ok") {
        const new_post = await createPost(
          "cover",
          null,
          null,
          res,
          user.id,
          user.token
        );
        console.log(new_post);
        if (new_post.status  === "ok") {
          setLoading(false);
          setCoverPicture("");
          cRef.current.src = res[0].url;
        } else {
          setLoading(false);

          setError(new_post);
        }
      } else {
        setLoading(false);

        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.updated_picture?.message);
    }

    
  }

  




  return (
    <div className="profile_cover" ref={coverRef}>
    {coverPicture && (
      <div className="save_changes_cover">
        <div className="save_changes_left">
          <i className="public_icon"></i>
          Your cover photo is public
        </div>
        <div className="save_changes_right">
          <button
            className="blue_btn opacity_btn"
            onClick={() => setCoverPicture("")}
          >
            Cancel
          </button>
          <button className="blue_btn " onClick={() => updateCoverPicture()}>
            {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
          </button>
        </div>
      </div>
    )}
    <input
      type="file"
      ref={refInput}
      hidden
      accept="image/jpeg,image/png,image/webp,image/gif"
      onChange={handleImage}
    />
    {error && (
      <div className="postError comment_error cover_error">
        <div className="postError_error">{error}</div>
        <button className="blue_btn" onClick={() => setError("")}>
          Try again
        </button>
      </div>
    )}
    {coverPicture && (
      <div className="cover_crooper">
        <Cropper
          image={coverPicture}
          crop={crop}
          zoom={zoom}
          aspect={width / 350}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={true}
          objectFit="horizontal-cover"
        />
      </div>
    )}
    {cover && !coverPicture && (
      <img src={cover} className="cover" alt="" ref={cRef} />
    )}
    {!visitor && (
      <div className="udpate_cover_wrapper">
        <div
          className="open_cover_update"
          onClick={() => setShowCoverMenu((prev) => !prev)}
        >
          <i className="camera_filled_icon"></i>
          Add Cover Photo
        </div>
        {showCoverMneu && (
          <div className="open_cover_menu" ref={menuRef}>
            <div className="open_cover_menu_item hover1"
             onClick={() => setShow(true)}
            >
              <i className="photo_icon"></i>
              Select Photo
            </div>
            <div
              className="open_cover_menu_item hover1"
              onClick={() => refInput.current.click()}
            >
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
    )}
    {show && (
        <OldCovers
        photos={photos.resources}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}

  </div>

  );
}
