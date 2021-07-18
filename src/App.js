import React, { Component } from "react";
import { googleProvider } from "./config/authMethods";
import socialMediaAuth from "./services/auth";
import { setToken, getToken, verifyLogin } from "./services/callAPI";
import Login from "./components/Login";
import Main from "./components/main";
import "./App.css";
import { darkMode } from "./components/css";
import CallAlert from "./components/CallAlert";

darkMode();

class App extends Component {
  state = {
    loginVerified: 1,
    errorActive: false,
  };

  constructor() {
    super();
    const token = localStorage.getItem("loginToken");
    if (token) {
      this.loginCheck(token);
    } else {
      localStorage.clear();
    }
  }

  loginCheck = async (token) => {
    const result = await verifyLogin(token);
    if (result) {
      setToken(token);
      const loginVerified = 2;
      this.setState({ loginVerified });
    } else {
      this.setState({ errorActive: true, loginVerified: 1 });
      localStorage.clear();
    }
  };

  handleOnClick = async (provider) => {
    const { email } = await socialMediaAuth(provider);
    const loginToken = await getToken(email);
    if (!loginToken) return this.setState({ errorActive: true });
    const token = loginToken["loginToken"];
    localStorage.setItem("loginToken", token);
    setToken(token);
    this.loginCheck(token);
  };

  handleLogOut = () => {
    localStorage.clear();
    this.setState({ loginVerified: 1 });
  };

  handleClose = () => {
    this.setState({ errorActive: false });
  };

  render() {
    return (
      <React.Fragment>
        <CallAlert
          label="Not Authorized"
          severity="error"
          onClose={this.handleClose}
          activate={this.state.errorActive}
        />
        {this.state.loginVerified === 2 && (
          <Main onLogOut={() => this.handleLogOut()} />
        )}
        {this.state.loginVerified === 1 && (
          <Login handleLogin={() => this.handleOnClick(googleProvider)} />
        )}
      </React.Fragment>
    );
  }
}

export { App };
