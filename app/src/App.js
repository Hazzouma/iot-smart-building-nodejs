import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import "./assets/scss/index.scss";
import Login from "./components/login/login";
import Application from "./components";

function App() {
  toast.configure();
  let tokene = localStorage.getItem("token");

  useEffect(() => {}, [tokene]);
  return (
    <>
      <Switch>
        {!tokene && <Route exact path="/" component={Login} />}
        {tokene ? (
          <>
            <Switch>
              <Route path="/dashboard" component={Application} />
              <Route path="/*" component={Application} />
            </Switch>
            <Redirect to="/dashboard" />
          </>
        ) : (
          <>
            <Redirect to="/" />
          </>
        )}
      </Switch>
    </>
  );
}

export default App;
