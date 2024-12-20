import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import UseclickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu/UserMenu";


export default function Header({page ,getAllData}) {
  const  user  = useSelector((state) =>state.user);
  const [showSearchMenu ,setshowSearchMenu] =useState(false)
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  


  const ref=useRef();
  const refUserMenu =useRef();
  UseclickOutside(ref,()=>{
    setShowAllMenu(false)
  });

  UseclickOutside(refUserMenu,()=>{
    setShowUserMenu(false)
  }); 

  const color = "#65676b";
  return (
    <header>
      <div className="header_left">
        
        <Link to="/" className="header_logo">
          <div className="circle">
             {/* <Logo />  */}
             <img src="../../icons/yourlogo.png" alt="" className='login_img' />   
          </div>
        </Link>
        <div className="search search1" onClick={() =>setshowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
        </div>
      
      {showSearchMenu && <SearchMenu color={color} setshowSearchMenu={setshowSearchMenu}/>}
      
      <div className="header_middle">

      <Link to="/" className={`middle_icon ${page === "home" ? "active" : "hover1"}`} onClick={() => getAllData && getAllData()}>
  {page === "home" ? <HomeActive /> : <Home color={color} />}
</Link>



        <Link to="/friends" className={`middle_icon ${page ==='friends' ? 'active' :'hover1'}`}>
          {page ==='friends' ? <FriendsActive/> :<Friends color={color} /> }
        </Link>

        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className={`profile_link hover1 ${page==="profile" ? "active_link" : ""} `}>
          <img src={user?.picture} alt="not available" />
          <span>{user?.first_name}</span>
        </Link>
        <div className={`circle_icon hover1 ${showAllMenu && "active_header"}`} ref={ref} >
          
        <div
          onClick={() => {
          setShowAllMenu((prev) => !prev);           
          }}>

          <Menu />
          </div>

         {showAllMenu && <AllMenu/>} 
        </div>

        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className={`circle_icon hover1 ${showUserMenu && "active_header"}`} ref={refUserMenu}>

          <div
          onClick={() => {
          setShowUserMenu((prev) => !prev);
          }}>
          <ArrowDown />
          </div>

          {showUserMenu && <UserMenu user={user} />}

        </div>
      </div>

    </header>
  );
}
