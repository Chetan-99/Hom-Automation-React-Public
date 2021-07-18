import React, { Component } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Timer from "./Timer";
import TimerTwoToneIcon from "@material-ui/icons/TimerTwoTone";
import { cardTextColor } from "./css";

class DeviceStats extends Component {
  state = { active: false, isSet: false, id: this.props.id };

  handleActive = () => {
    let active = false;
    if (!this.state.active) active = true;
    this.setState({ active });
  };

  render() {
    const { statusColor, label } = this.props;

    return (
      <div>
        <Grid container style={{ marginBottom: 5 }}>
          <Grid item xs={3} style={{ marginTop: 10 }}>
            <Typography
              variant="h6"
              style={{
                userSelect: "none",
                color: `${cardTextColor}`,
                opacity: 0.75,
                fontSize: "18px",
                fontFamily: "KoHo,sans-sarif",
                textAlign: "start",
              }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item xs={1} style={{ marginTop: 12 }}>
            <FiberManualRecordIcon style={{ color: statusColor }} />
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              textAlign: "right",
            }}
          >
            <IconButton
              color="secondary"
              aria-label="timer-components"
              onClick={this.handleActive}
            >
              <TimerTwoToneIcon style={{ color: "black" }} />
            </IconButton>
          </Grid>
        </Grid>
        {this.state.active ? (
          <Timer id={this.state.id} active={this.state.active} />
        ) : null}
      </div>
    );
  }
}

export default DeviceStats;
