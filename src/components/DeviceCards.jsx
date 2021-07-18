import React, { useEffect, useState } from "react";
import { Container, Grid, Card } from "@material-ui/core";
import DeviceStats from "./DeviceStatus";
import { setStatus } from "../services/callAPI";
import { cardColor } from "./css";

function DeviceCards({ isOn, label, id }) {
  const [statusColor, setStatusColor] = useState("#e31c25");

  const handleOn = () => {
    const a = {
      device: {
        id: id,
        isOn: true,
      },
    };
    setStatus(a);
  };

  const handleOff = () => {
    const a = {
      device: {
        id: id,
        isOn: false,
      },
    };
    setStatus(a);
  };

  useEffect(() => {
    isOn ? setStatusColor("#66BB6A") : setStatusColor("#e31c25");
  }, [isOn]);

  return (
    <Card
      style={{
        margin: 15,
        backgroundColor: `${cardColor}`,
        borderRadius: 20,
        position: "relative",
      }}
    >
      <Container maxwidth="sm">
        <DeviceStats id={id} statusColor={statusColor} label={label} />
        <Grid container justify="space-evenly" style={{ marginBottom: 15 }}>
          <Grid item>
            <button
              className="buttonOnOFF"
              style={{ width: "150px", height: "50px" }}
              onClick={handleOn}
            >
              ON
            </button>
          </Grid>
          <Grid item>
            <button
              className="buttonOnOFF"
              style={{ width: "150px", height: "50px" }}
              onClick={handleOff}
            >
              OFF
            </button>
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
}

export default DeviceCards;
