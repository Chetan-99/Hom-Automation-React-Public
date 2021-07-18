import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    color: "white",
    opacity: 0.75,
  },
}));

export default function TimePickers({ defaultValue, onTimerChange, label }) {
  const classes = useStyles();

  return (
    <Grid item>
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label={label}
          type="time"
          defaultValue={defaultValue}
          className={classes.textField}
          onChange={onTimerChange}
          InputLabelProps={{
            shrink: true,
            className: classes.input,
          }}
          inputProps={{
            className: classes.input,
            step: 300, // 5 min
          }}
        />
      </form>
    </Grid>
  );
}
