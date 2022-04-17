import React, { useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { current } from "../redux/login/action";
import { Row } from "reactstrap";
import Rightbar from "./navbar";
import Footer from "./footer";
import Dashboard from "./dashboard";

//after logging, this is my global application
function Application() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(current());
  //   // eslint-disable-next-line
  // }, [token]);

  return (
    <Fragment>
      {/* HERE WILL BE MY COMPONENTS MAPPED FROM ROUTES IN FRONTEND */}
      {/* <Header /> */}
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <div className="page-header">
          <Row className="header-wrapper m-0" style={{ padding: "10px" }}>
            <Rightbar />
          </Row>
        </div>
        <div className="page-body-wrapper">
          <div className="page-body" style={{ marginTop: "60px" }}>
            {/* sight houni components yaani children */}
            <Dashboard />
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export default Application;
