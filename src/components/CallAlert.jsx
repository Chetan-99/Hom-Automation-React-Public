import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

class CallAlert extends Component {
  render() {
    return (
      <Snackbar
        open={this.props.activate}
        autoHideDuration={3000}
        onClose={this.props.onClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          onClose={this.props.onClose}
          style={{
            width: window.innerWidth - 35,
            justifyContent: "center",
            borderRadius: 15,
          }}
          severity={this.props.severity}
        >
          {this.props.label}
        </Alert>
      </Snackbar>
    );
  }
}

export default CallAlert;
