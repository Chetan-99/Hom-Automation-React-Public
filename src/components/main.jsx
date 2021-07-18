import React, { Component } from "react";
import DeviceCards from "./DeviceCards";
import NavBar from "./NavBar";
import HomeIcon from "@material-ui/icons/Home";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import {
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import "../App.css";
import { bottomNavigationIconColor, bottomNavigationColor } from "./css";
import History from "./History";
import { firebase } from "../config/firebase-config";
import Settings from "./Settings";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

class Main extends Component {
  state = {
    value: 0,
    homeStatus: true,
    id1Status: false,
    id2Status: false,
    id3Status: false,
    id4Status: false,
    menuActive: false,
  };

  componentDidMount() {
    var starCountRef = firebase.database().ref("Devices");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const id1Status = data.Status.id_1;
      const id2Status = data.Status.id_2;
      const id3Status = data.Status.id_3;
      const id4Status = data.Status.id_4;
      const homeStatus = data.online.isOnline;
      this.setState({ homeStatus, id1Status, id2Status, id3Status, id4Status });
    });
  }

  handlePages = (value) => {
    this.setState({ value });
  };

  render() {
    const { id1Status, id2Status, id3Status, id4Status } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar
          homeStatus={this.state.homeStatus}
          label="Automation"
          onLogOut={this.props.onLogOut}
          active={true}
        />
        {/* {this.state.menuActive && (
          <div
            style={{
              width: "70%",
              height: "50%",
              backgroundColor: "white",
              position: "absolute",
              zIndex: 2,
              margin:
            }}
          ></div>
        )} */}
        {this.state.value === 0 && (
          <div style={{ marginTop: 70, marginBottom: 70 }}>
            <DeviceCards id="1" label="Device-1" isOn={id1Status} />
            <DeviceCards id="2" label="Device-2" isOn={id2Status} />
            <DeviceCards id="3" label="Device-3" isOn={id3Status} />
            <DeviceCards id="4" label="Device-4" isOn={id4Status} />
          </div>
        )}

        {this.state.value === 2 && <Settings onLogOut={this.props.onLogOut} />}

        {this.state.value === 1 && <History />}
        <BottomNavigation
          value={this.state.value}
          onChange={(event, newValue) => {
            this.handlePages(newValue);
          }}
          style={{
            backgroundColor: `${bottomNavigationColor}`,
            width: "100%",
            position: "fixed",
            bottom: 0,
            borderTopColor: "#4d4d4d",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            style={{ color: `${bottomNavigationIconColor}` }}
            icon={
              this.state.value === 0 ? (
                <HomeIcon style={{ opacity: 0.75 }} />
              ) : (
                <HomeOutlinedIcon style={{ opacity: 0.75 }} />
              )
            }
          />
          <BottomNavigationAction
            label="History"
            style={{ color: `${bottomNavigationIconColor}` }}
            icon={
              this.state.value === 1 ? (
                <WatchLaterIcon style={{ opacity: 0.75 }} />
              ) : (
                <WatchLaterOutlinedIcon style={{ opacity: 0.75 }} />
              )
            }
          />
          <BottomNavigationAction
            label="Settings"
            style={{ color: `${bottomNavigationIconColor}` }}
            icon={
              this.state.value === 2 ? (
                <SettingsRoundedIcon style={{ opacity: 0.75 }} />
              ) : (
                <SettingsOutlinedIcon style={{ opacity: 0.75 }} />
              )
            }
          />
        </BottomNavigation>
      </React.Fragment>
    );
  }
}

export default Main;
