import { useRef, useState } from "react";
import ProfilePicture from "../../components/profielPicture/ProfilePicture";
import { useSelector } from "react-redux";
import Friendship from "./Friendship";
import { Link } from "react-router-dom";

export default function ProfielPictureInfos({ profile,visitor ,othername }) {
  const pRef=useRef(null)
  const [show ,setshow] =useState(false)
  const { loading, photos  } = useSelector((state) => state.photos);


    return (
      <div className="profile_img_wrap">
        {show && <ProfilePicture setshow={setshow} pRef={pRef} photos={photos.resources} othername={othername}/>}
        <div className="profile_w_left">
          <div className="profile_w_img">
            <div
              className="profile_w_bg"
              ref={pRef}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${profile.picture})`,
              }}
            ></div>
               {!visitor && (
            <div className="profile_circle hover1" onClick={() =>setshow(true)}>
              <i className="camera_filled_icon"></i>
            </div>
               )}

          </div>
          <div className="profile_w_col">
            <div className="profile_name">
              {profile.first_name} {profile.last_name}
              <div className="othername">{othername ? `(${othername})`:""}</div>
            </div>
            <div className="profile_friend_count"> 
            {profile?.friends && (
              <div className="profile_card_count">
                {profile?.friends.length === 0
                  ? ""
                  : profile?.friends.length === 1
                  ? "1 Friend"
                  : `${profile?.friends.length} Friends`}
              </div>
            )}
           </div>
            <div className="profile_friend_imgs">
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=""
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}

            </div>
          </div>
        </div>
        {visitor ? (<Friendship friendshipp={profile?.friendship} profileid={profile._id}/>) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
        )}
      </div>
    );
  }
  