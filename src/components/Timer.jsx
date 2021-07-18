import React, { Component } from "react";
import { Grid, Checkbox } from "@material-ui/core";
import "../App.css";
import Buttons from "./Buttons";
import CallAlert from "./CallAlert";
import { getStatus, setStatus } from "../services/callAPI";
import TimePickers from "./TimerSelect";

class Timer extends Component {
  state = {
    id: this.props.id,
    startTime: "07:30",
    stopTime: "07:31",
    errorType: "",
    errorActive: false,
    isTimerOn: false,
    isTimerDaily: false,
  };

  async componentDidMount() {
    const a = await getStatus();
    const device = a["id_" + this.state.id];
    if (device.isTimerOn) {
      this.setState({
        isTimerOn: true,
        startTime: device.startTime,
        stopTime: device.stopTime,
        isTimerDaily: device.isTimerDaily,
      });
    }
  }

  isValid = () => {
    let startTime = this.state.startTime;
    startTime = parseInt(`${startTime}`.replace(":", ""));
    let stopTime = this.state.stopTime;
    stopTime = parseInt(`${stopTime}`.replace(":", ""));
    if (stopTime > startTime) return true;
    return false;
  };

  handleSet = () => {
    if (!this.isValid()) {
      this.setState({
        errorType: "error",
        errorActive: true,
      });
    } else {
      this.setState({
        errorType: "success",
        errorActive: true,
        isTimerOn: true,
      });
      let a = {
        device: {
          id: this.state.id,
          isTimerOn: true,
          isTimerDaily: this.state.isTimerDaily,
          startTime: this.state.startTime,
          stopTime: this.state.stopTime,
        },
      };
      setStatus(a, true);
    }
  };

  handleStartChange = (event) => {
    this.setState({ startTime: event.target.value, errorActive: false });
  };

  handleStopChange = (event) => {
    this.setState({ stopTime: event.target.value, errorActive: false });
  };

  handleCheckChange = (event) => {
    this.setState({ isTimerDaily: event.target.checked });
  };

  handleRemoveTimerSet = () => {
    let a = {
      device: {
        id: this.state.id,
        isTimerOn: false,
        isTimerDaily: false,
        startTime: "",
        stopTime: "",
      },
    };
    setStatus(a, true);
    this.setState({ isTimerOn: false });
  };

  handleClose = () => {
    this.setState({ errorActive: false });
  };

  render() {
    let lable1 = "";
    if (this.state.errorType === "success") lable1 = "Timer Set";
    if (this.state.errorType === "error") lable1 = "Error";

    if (this.state.isTimerOn) {
      return (
        <div>
          <Grid container>
            <Grid item xs={4}>
              <div className="timer-on-text">Start: {this.state.startTime}</div>
            </Grid>
            <Grid item xs={4}>
              <div className="timer-on-text">Stop: {this.state.stopTime}</div>
            </Grid>
            <Grid item xs={4}>
              <Buttons
                label="Remove"
                handle={this.handleRemoveTimerSet}
              ></Buttons>
            </Grid>
          </Grid>
          <CallAlert
            severity={this.state.errorType}
            label={lable1}
            onClose={this.handleClose}
            activate={this.state.errorActive}
          />
          <Grid container justify="flex-start" style={{ marginBottom: 10 }}>
            <Grid item>
              <div
                style={{
                  fontSize: 15,
                  marginTop: 10,
                  userSelect: "none",
                  color: "#FFFFFF",
                  opacity: 0.75,
                }}
              >
                Repeat Daily
              </div>
            </Grid>
            <Grid item>
              <Checkbox
                checked={this.state.isTimerDaily}
                disabled
                style={{ color: "#FFFFFF", opacity: 0.75 }}
              />
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <Grid container justify="space-between">
          <TimePickers
            defaultValue={this.state.startTime}
            onTimerChange={this.handleStartChange}
            label="Start"
          />
          <TimePickers
            defaultValue={this.state.stopTime}
            onTimerChange={this.handleStopChange}
            label="Stop"
          />
          <Grid item>
            <Buttons label="Set" handle={this.handleSet}></Buttons>
          </Grid>
          <CallAlert
            severity={this.state.errorType}
            label={lable1}
            onClose={this.handleClose}
            activate={this.state.errorActive}
          />
        </Grid>
        <Grid container justify="flex-start" style={{ marginBottom: 10 }}>
          <Grid item>
            <div
              style={{
                fontSize: 15,
                marginTop: 10,
                userSelect: "none",
                color: "#FFFFFF",
                opacity: 0.75,
              }}
            >
              Repeat Daily
            </div>
          </Grid>
          <Grid item>
            <Checkbox
              checked={this.state.isTimerDaily}
              onChange={this.handleCheckChange}
              style={{ color: "#FFFFFF", opacity: 0.75 }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Timer;
