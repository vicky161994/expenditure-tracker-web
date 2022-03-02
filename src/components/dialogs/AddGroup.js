import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../actions/productActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function AddGroup(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const handleFullNameChange = (e) => {
    if (e.target.value === "") {
      setNameError(true);
    } else {
      setNameError(false);
      setName(e.target.value);
    }
  };

  const closeDialog = () => {
    props.dialogClose(false);
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (name === "") {
      setNameError(true);
      return false;
    } else {
      setNameError(false);
      dispatch(createGroup(name));
      closeDialog();
    }
  };

  return (
    <Dialog
      fullWidth={true}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" style={{ width: "100%" }}>
        {"Add new group"}
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            error={nameError}
            style={{ width: "100%" }}
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Group Name"
            onChange={handleFullNameChange}
            autoComplete="off"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          style={{ float: "right" }}
          onClick={closeDialog}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{ float: "right" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddGroup;
