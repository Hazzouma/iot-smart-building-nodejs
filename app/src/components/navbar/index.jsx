import React, { Fragment } from "react";
import { LogIn, Minimize } from "react-feather";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/login/action";

const Rightbar = (props) => {
  const dispatch = useDispatch();

  const logoutFromJWT = () => {
    dispatch(logout());
  };
  // const UserMenuRedirect = (redirect) => {
  //   history.push(redirect);
  // };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  return (
    <Fragment>
      <div className="nav-right col-12 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="onhover-dropdown">
            {/* <div className="notification-box">
              <Bell />
              <span className="badge badge-pill badge-secondary" style={{ backgroundColor: "red" }}>
                5
              </span>
            </div> */}
            {/* <ul className={`notification-dropdown onhover-show-div`}>
              <li>
                <Bell />
                <h6 className='f-18 mb-0'>Notifications</h6> */}
            {/* {notifications.map((n, i) => (
                <li key={i}>
                  <p style={{ fontWeight: !n.isRead ? "bold" : "normal" }}>
                    <i className='fa fa-circle-o mr-3 font-primary'> </i>
                    {n.msg}
                    <span className='pull-right'>
                      {moment(parseInt(n.creationDate, 10)).fromNow()}
                    </span>
                  </p>
                </li>
              ))} */}
            {/* </li>
              <li>Heloooooo</li>
              <li>Heloooooo</li>
              <li>Heloooooo</li>
              <li>Heloooooo</li>
              <li>Heloooooo</li>
              <li>
                <button onClick={() => {}} className='btn btn-primary'>
                  Check all notifications
                </button>
              </li>
            </ul> */}
          </li>
          <li className="maximize">
            <a className="text-dark" href="#javascript" onClick={goFull}>
              <Minimize />
            </a>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={""} alt="" />
            </div>

            <ul className="profile-dropdown onhover-show-div">
              {/* <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/dashboard`)}>
                <User />
                <span>My Pofile </span>
              </li>

              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/dashboard`)}>
                <FileText />
                <span>Edit Profile</span>
              </li> */}
              <li
                onClick={() =>
                  // Logout_From_JWT();
                  logoutFromJWT()
                }
              >
                <LogIn />
                <span>Log Out</span>
              </li>
            </ul>
          </li>
          <li>
            <div className="media-body">
              <span>Hazem Housseini</span>
              <p className="mb-0 font-roboto">
                Adminstrator <i className="middle fa fa-angle-down"></i>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Rightbar;
