import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { updatePurchaseItemDetailsById } from "../../actions/purchaseItemAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
function EditPurchaseItem(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const [totalCostError, setTotalCostError] = useState(false);
  const [byPass, setByPass] = useState(false);
  const { itemList } = useSelector((state) => state.itemList);
  const [name, setName] = useState(props.item.name._id);
  const [unit, setUnit] = useState(props.item.units);
  const [selectedDate, setSelectedDate] = useState(props.item.purchased_on);
  const [totalCost, setTotalCost] = useState(props.item.totalCost);
  const [dateSet, setDateSet] = useState("");
  const [billAvailable, setBillAvailable] = useState(
    props.item.bill_available ? "yes" : "no"
  );

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
      setUnit(e.target.value);
    } else {
      setUnitError(false);
      setUnit(e.target.value);
      setByPass(false);
    }
  };

  const handleTotalCostChange = (e) => {
    if (e.target.value === "") {
      setTotalCostError(true);
      setTotalCost(e.target.value);
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
    if (byPass) {
      return false;
    }
    dispatch(
      updatePurchaseItemDetailsById(
        {
          date: dateSet,
          name,
          unit,
          totalCost,
          billAvailbale: billAvailable === "yes" ? true : false,
        },
        props.item._id,
        props.item.groupId._id
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
        {"Update Purchase Item"}
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
            {itemList.data.map((item, index) => {
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
            value={unit}
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
            value={totalCost}
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPurchaseItem;
