import React, { Component } from "react";
import {
  Grid,
  Card,
  Container,
  Typography,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import { firebase } from "../config/firebase-config";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {
  historyCardColor,
  historyEmptyTextColor,
  historyCardTextColor,
} from "./css";

class History extends Component {
  state = { dataList: "", open: false, openID: 0 };

  componentDidMount() {
    const db = firebase.database().ref("Activities");
    db.get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataList1 = snapshot.val();
          let keys = Object.keys(dataList1);
          keys = keys.reverse();
          let dataList = {};
          for (let i = 0; i < (keys.length > 200 ? 200 : keys.length); i++) {
            dataList[i] = dataList1[keys[i]];
          }
          this.setState({ dataList });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTooltipOpen = (id) => {
    console.log("Clicked");
    console.log(id);
    this.state.open
      ? this.setState({ open: false })
      : this.setState({ open: true, openID: id });
    setTimeout(this.closeToolTip, 3000);
  };

  closeToolTip = () => {
    console.log("Gone");
    if (this.state.open) this.setState({ open: false });
  };

  render() {
    const { dataList } = this.state;

    return (
      <React.Fragment>
        {!dataList && (
          <Grid
            container
            justify="center"
            style={{ marginTop: window.innerHeight / 2 - 100 }}
          >
            <Typography
              variant="h4"
              style={{ color: `${historyEmptyTextColor}` }}
            >
              No Activities
            </Typography>
          </Grid>
        )}
        {dataList && (
          <Card
            style={{
              margin: 15,
              backgroundColor: `${historyCardColor}`,
              borderRadius: 20,
              position: "relative",
              marginTop: 70,
              marginBottom: 70,
            }}
          >
            {Object.keys(dataList).map((id1) => (
              <Container
                maxwidth="sm"
                key={id1}
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                <Grid container>
                  <Grid item xs={2}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      open={this.state.openID === id1 ? this.state.open : false}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      arrow
                      placement="bottom-end"
                      title={dataList[id1].Name}
                    >
                      <div onClick={() => this.handleTooltipOpen(id1)}>
                        <Avatar alt="Remy Sharp" style={{ color: "black" }}>
                          {dataList[id1].Name[0]}
                        </Avatar>
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        color: `${historyCardTextColor}`,
                        userSelect: "none",
                        opacity: 0.75,
                        fontFamily: "KoHo,sans-sarif",
                      }}
                    >
                      Device: {dataList[id1].id}
                    </Typography>
                    <Typography
                      style={{
                        color: `${historyCardTextColor}`,
                        userSelect: "none",
                        opacity: 0.75,
                      }}
                    >
                      {dataList[id1].Time}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <FiberManualRecordIcon
                      style={{
                        color: dataList[id1].State ? "#66BB6A" : "#bb000e",
                        marginTop: 10,
                      }}
                    />
                  </Grid>
                </Grid>
              </Container>
            ))}
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default History;
