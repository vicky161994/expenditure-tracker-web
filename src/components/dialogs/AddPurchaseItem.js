import "date-fns";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { createItem } from "../../actions/purchaseItemAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
function AddPurchaseItem(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [open, setOpen] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const [totalCostError, setTotalCostError] = useState(false);
  const [byPass, setByPass] = useState(true);
  const [billAvailable, setBillAvailable] = useState(false);
  const [dateSet, setDateSet] = useState("");

  const handleFullNameChange = (e) => {
    if (e.target.value === "") {
      setNameError(true);
    } else {
      setNameError(false);
      setName(e.target.value);
      setByPass(false);
    }
  };

  const handleUnitChange = (e) => {
    if (e.target.value === "") {
      setUnitError(true);
    } else {
      setUnitError(false);
      setUnit(e.target.value);
      setByPass(false);
    }
  };

  const handleTotalCostChange = (e) => {
    if (e.target.value === "") {
      setTotalCostError(true);
    } else {
      setTotalCostError(false);
      setTotalCost(e.target.value);
      setByPass(false);
    }
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    setByPass(false);
    setSelectedDate(date);
    const temp = `${year}-${month}-${day}`;
    setDateSet(temp);
  };

  const handleBillChange = (event) => {
    setBillAvailable(event.target.value);
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
    if (dateSet === "") {
      setByPass(true);
    }
    if (totalCost === "") {
      setTotalCostError(true);
      setByPass(true);
    }
    console.log(byPass);
    if (byPass) {
      return false;
    }
    dispatch(
      createItem(
        {
          date: dateSet,
          name,
          unit,
          totalCost,
          billAvailbale: billAvailable === "yes" ? true : false,
        },
        props.groupId
      )
    );
    closeDialog();
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
        {"Add new purchase item"}
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <KeyboardDatePicker
              style={{ width: "100%" }}
              margin="normal"
              id="date-picker-dialog"
              label="Purchase Date"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <FormControl
          variant="outlined"
          className={(classes.formControl, "mt-5")}
          style={{ width: "100%" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Purchase Item Name
          </InputLabel>
          <Select
            error={nameError}
            autoComplete="off"
            native
            value={name}
            onChange={handleFullNameChange}
            label="Purchase Item Name"
            inputProps={{
              name: "",
              id: "outlined-age-native-simple",
            }}
          >
            <option value=""></option>
            {props.itemList.map((item, index) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <div>
          <TextField
            error={unitError}
            style={{ width: "100%" }}
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Unit"
            onChange={handleUnitChange}
            autoComplete="off"
          />
        </div>
        <div>
          <TextField
            error={totalCostError}
            style={{ width: "100%" }}
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Total Cost"
            onChange={handleTotalCostChange}
            autoComplete="off"
          />
        </div>
        <div className="mt-2">
          <FormControl component="fieldset">
            <FormLabel component="legend">Bill Available?</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={billAvailable}
              onChange={handleBillChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
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

export default AddPurchaseItem;
