import React from "react";
import "../App.css";
import { Dialog, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { addUserDetails } from "../services/callAPI";

const AddMenu = ({ activeMenu, onCancel }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  useEffect(() => {
    setName("");
    setEmail("");
  }, [activeMenu]);
  const inputEmail = (event) => {
    setEmail(event.target.value);
  };
  const inputName = (event) => {
    setName(event.target.value);
  };

  const handleAdd = () => {
    addUserDetails(email, name);
    onCancel();
  };

  return (
    <Dialog open={activeMenu} keepMounted>
      <h3 style={{ margin: "20px" }}>User Details</h3>
      <TextField
        style={{ margin: "20px", marginBottom: "10px", width: "20em" }}
        label="Email"
        variant="outlined"
        onChange={(event) => inputEmail(event)}
        value={email}
      />
      <TextField
        style={{ margin: "20px", marginTop: "10px", width: "20em" }}
        label="Name"
        variant="outlined"
        onChange={(event) => inputName(event)}
        value={name}
      />
      <span style={{ margin: "auto", marginBottom: "15px" }}>
        <button
          className="button"
          style={{ margin: "auto", marginRight: "20px" }}
          onClick={handleAdd}
        >
          Add
        </button>
        <button
          className="button"
          style={{ margin: "auto", marginRight: "20px" }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </span>
    </Dialog>
  );
};

export default AddMenu;
