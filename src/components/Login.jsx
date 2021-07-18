import React from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import "../App.css";

const Login = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar label="Automation" active={false} />
      <Grid
        container
        justify="center"
        style={{ marginTop: window.innerHeight / 2 - 100 }}
      >
        <button
          type="button"
          className="login-with-google-btn"
          onClick={props.handleLogin}
        >
          Sign in with Google
        </button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
