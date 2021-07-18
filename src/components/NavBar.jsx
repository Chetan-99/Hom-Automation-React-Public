import React from "react";
import { Typography, AppBar, Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { navBarBackgroundColor, navItemsColor } from "./css";
import Avatar from "@material-ui/core/Avatar";
import { getUserDetails } from "../services/callAPI";

function NavBar({ label, onLogOut, active, homeStatus }) {
  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: `${navBarBackgroundColor}`, zIndex: 1 }}
    >
      <div
        style={{ marginTop: "10px", marginLeft: "15px", marginRight: "15px" }}
      >
        <Grid container>
          <Grid item xs={2} style={{ textAlign: "start" }}>
            <HomeIcon
              fontSize="large"
              style={{
                color: homeStatus ? "#66BB6A" : "#e31c25",
                marginTop: 4,
              }}
            />
          </Grid>
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              style={{
                marginLeft: 8,
                userSelect: "none",
                color: `${navItemsColor}`,
                opacity: 0.75,
                fontFamily: "KoHo,sans-sarif",
              }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "end" }}>
            {active && (
              <div
                onClick={() => console.log("Clicked")}
                style={{ width: "8%", height: "8%" }}
              >
                <Avatar
                  style={{
                    marginTop: "5px",
                    marginLeft: "25px",
                    backgroundColor: "darkgray",
                    color: "black",
                  }}
                >
                  {getUserDetails()[1][0]}
                </Avatar>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </AppBar>
  );
}

export default NavBar;
