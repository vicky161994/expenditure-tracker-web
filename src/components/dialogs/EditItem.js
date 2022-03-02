import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getItemDetailsById,
  updateItemDetailsById,
} from "../../actions/itemListAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
function EditItem(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const [byPass, setByPass] = useState(false);
  const { itemDetail } = useSelector((state) => state.itemDetail);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  let [counter, setCounter] = useState(0);
  if (itemDetail) {
    if (counter === 0) {
      setName(itemDetail.data[0].name);
      setUnit(itemDetail.data[0].unit);
      setCounter(1);
    }
  }
  useEffect(() => {
    dispatch(getItemDetailsById(props.item._id));
  }, [dispatch, props.item._id]);

  const handleFullNameChange = (e) => {
    if (e.target.value === "") {
      setNameError(true);
      setName(e.target.value);
    } else {
      setNameError(false);
      setName(e.target.value);
    }
  };

  const handleUnitChange = (e) => {
    if (e.target.value === "") {
      setUnitError(true);
      setUnit(e.target.value);
    } else {
      setUnitError(false);
      setUnit(e.target.value);
    }
  };

  const closeDialog = () => {
    props.dialogClose(false);
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (name === "") {
      setNameError(true);
      setByPass(true);
    }
    if (unit === "") {
      setUnitError(true);
      setByPass(true);
    }
    if (byPass) {
      return false;
    }
    setNameError(false);
    setUnitError(false);
    dispatch(
      updateItemDetailsById(
        { name, unit },
        props.item._id,
        props.item.groupId._id
      )
    );
    closeDialog();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ width: "100%" }}>
          {"Update Item"}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              error={nameError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Item Name"
              onChange={handleFullNameChange}
              autoComplete="off"
              value={name}
            />
          </div>
          <div>
            <TextField
              error={unitError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Unit"
              onChange={handleUnitChange}
              autoComplete="off"
              value={unit}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditItem;
