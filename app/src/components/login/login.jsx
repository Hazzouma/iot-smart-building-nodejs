import React, { useState, useEffect } from "react";
import smart from "./smart.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLogin } from "../../redux/login/action";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  TabContent,
  TabPane,
} from "reactstrap";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [togglePassword, setTogglePassword] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };
  const errors = useSelector((state) => state.userReducer.errors);

  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((err) => {
        toast.error(err.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      });
      dispatch(resetLogin());
    }
    // eslint-disable-next-line
  }, [errors]);
  return (
    <>
      <Container fluid={true} className="p-0">
        <Row className="m-0">
          <Col xs="12" className="p-0">
            <div className="login-card">
              <div>
                <div>
                  <a className="logo" href="#javascript">
                    <img
                      className="img-fluid for-light"
                      src={smart}
                      alt="login smart municipality"
                      style={{ width: "210px", height: "110px" }}
                    />
                  </a>
                </div>
                <div className="login-main login-tab">
                  <TabContent className="content-login">
                    <TabPane className="fade show">
                      <Form className="theme-form">
                        <h3>Sign In</h3>
                        <p>{"Enter your email & password to login"}</p>
                        <FormGroup>
                          <Label className="col-form-label">Email Address</Label>
                          <Input
                            className="form-control"
                            type="email"
                            name="email"
                            required=""
                            placeholder="Test@gmail.com"
                            onChange={(e) => handleChange(e)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label">Password</Label>
                          <Input
                            className="form-control"
                            type={togglePassword ? "text" : "password"}
                            name="password"
                            onChange={(e) => handleChange(e)}
                            required=""
                            placeholder="*********"
                          />
                          <div
                            className="show-hide"
                            onClick={() => HideShowPassword(togglePassword)}
                          >
                            <span className={togglePassword ? "" : "show"}></span>
                          </div>
                        </FormGroup>
                        <div className="form-group mb-1">
                          <div className="checkbox">
                            <Input
                              id="checkbox1"
                              className="btn-group btn-group-sm mb-2"
                              type="checkbox"
                            />
                            <Label className="text-muted mt-2" for="checkbox1">
                              Remember Password
                            </Label>
                          </div>
                          <a className="link mt-0" href="#javascript">
                            Forgot Password?
                          </a>
                          <Button
                            color="primary"
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(login(user));
                            }}
                          >
                            Login
                          </Button>
                        </div>
                        <hr />
                        <h5 className="text-muted mt-4">You don't have account?</h5>
                        {/* <div className='social mt-4'>
                          <div className='btn-showcase'>
                            <Button color='light'>
                              <Facebook className='txt-fb' />
                            </Button>
                            <Button color='light'>
                              <i className='icon-social-google txt-googleplus'></i>
                            </Button>
                            <Button color='light'>
                              <Twitter className='txt-twitter' />
                            </Button>
                            <Button color='light'>
                              <GitHub />
                            </Button>
                          </div>
                        </div> */}
                        <p className="text-md-start">
                          <a className="" href="#javascript">
                            Create Account
                          </a>
                        </p>
                      </Form>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
