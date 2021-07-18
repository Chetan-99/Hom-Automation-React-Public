import { Grid, Card, Container } from "@material-ui/core";
import React from "react";
import "../App.css";
import { cardColor } from "./css";
import { delUser, getDetails, getUserDetails } from "../services/callAPI";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddMenu from "./AddMenu";

function Settings({ onLogOut }) {
  const [permissionTrigger, setPermissionTrigger] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [addMenu, setAddMenu] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const getData = async () => {
    const data = await getDetails();
    let length = [];
    let i = 0;
    while (data[i] !== undefined) {
      i++;
    }
    for (let j = 0; j < i; j++) {
      length.push(data[j]);
    }
    setDetails(length);
  };

  React.useEffect(() => {
    getData();
  }, [addMenu, refresh, permissionTrigger]);

  const handleDelete = (i) => {
    delUser(i);
    setRefresh(!refresh);
  };

  const handleAdd = () => {
    setAddMenu(true);
  };

  function handleCancel() {
    setAddMenu(false);
  }

  return (
    <div style={{ marginTop: "70px", marginBottom: "70px" }}>
      <Card
        style={{
          margin: 15,
          backgroundColor: `${cardColor}`,
          borderRadius: 20,
          position: "relative",
        }}
      >
        <Container maxwidth="sm">
          <Grid container justify="space-evenly">
            <Grid item>
              <button
                className="buttonOnOFF"
                style={{
                  width: window.innerWidth - 70,
                  marginTop: "15px",
                  marginBottom: "7.5px",
                }}
                onClick={() => setPermissionTrigger(!permissionTrigger)}
              >
                Permissions
              </button>
            </Grid>
          </Grid>
          {permissionTrigger && (
            <div>
              {details.map((i) => (
                <div key={i.email}>
                  <Grid container style={{ marginLeft: "15px" }}>
                    <Grid item>
                      {
                        <span className="text" style={{ fontSize: "18px" }}>
                          {i.Name}
                        </span>
                      }
                      {i.admin && (
                        <span
                          style={{
                            color: "#66BB6A",
                            userSelect: "none",
                            marginLeft: "10px",
                          }}
                        >
                          Admin
                        </span>
                      )}
                    </Grid>
                    {!i.admin && getUserDetails()[2] && (
                      <Grid
                        item
                        style={{ marginRight: "20px", marginLeft: "auto" }}
                      >
                        <button
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                          }}
                          onClick={() => handleDelete(i.email)}
                        >
                          <RemoveCircleIcon
                            style={{
                              marginTop: "5px",
                              fontSize: "30px",
                              color: "white",
                              opacity: "0.75",
                            }}
                          />
                        </button>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    style={{ marginBottom: "15px", marginLeft: "15px" }}
                  >
                    <Grid item>
                      <div
                        className="text"
                        style={{ fontSize: "14px", color: "darkgrey" }}
                      >
                        {i.email}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
              {getUserDetails()[2] && (
                <div>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      marginLeft: "45%",
                    }}
                    onClick={handleAdd}
                  >
                    <AddCircleIcon
                      style={{
                        marginTop: "5px",
                        fontSize: "30px",
                        color: "white",
                        opacity: "0.75",
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          )}
          <Grid container justify="space-evenly">
            <Grid item>
              <button
                className="buttonOnOFF"
                style={{
                  width: window.innerWidth - 70,
                  marginTop: "7.5px",
                  marginBottom: "15px",
                }}
                onClick={() => onLogOut()}
              >
                Logout
              </button>
            </Grid>
          </Grid>
        </Container>
      </Card>
      {<AddMenu activeMenu={addMenu} onCancel={handleCancel} />}
    </div>
  );
}

export default Settings;
