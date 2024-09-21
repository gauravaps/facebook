import {  useState } from "react";
import "./style.css";

import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePrev from "./ImagePrev";



export default function CreatePostPopup({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  
  const [images, setImages] = useState([]);

  console.log(images)
  

 

  return (
  

        <div className="blur">
          <div className="postBox">
            <div className="box_header">
              <div className="small_circle">
                <i className="exit_icon"></i>
              </div>
              <span>Create Post</span>
            </div>
            <div className="box_profile">
              <img src={user.picture} alt="" className="box_profile_img" />
              <div className="box_col">
                <div className="box_profile_name">
                  {user.first_name} {user.last_name}
                </div>
                <div className="box_privacy">
                  <img src="../../../icons/public.png" alt="" />
                  <span>Public</span>
                  <i className="arrowDown_icon"></i>
                </div>
              </div>
            </div>

            {!showPrev ? (
              <>  
              <EmojiPickerBackgrounds user={user} text={text}
              
              setText={setText} showPrev={showPrev}/>
              </> 

            ) :(<ImagePrev user={user} text={text}  setText={setText} showPrev={showPrev}
              images={images} setImages={setImages} setShowPrev={setShowPrev}
            
            />)}
            

            <AddToYourPost setShowPrev={setShowPrev}/>
            <button className="post_submit">Post</button>
            
          </div>
        </div>

    

  );
}