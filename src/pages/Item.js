import {
  Button,
  FormControl,
  Grid,
  Typography,
  makeStyles,
  InputLabel,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PurchaseItems from "../components/PurchaseItems";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AddPurchaseItem from "../components/dialogs/AddPurchaseItem";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../actions/itemListAction";
import { getPurchaseItemList } from "../actions/purchaseItemAction";
import { Col, Row } from "react-bootstrap";
import Pagination from "react-responsive-pagination";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getUserList } from "../actions/userActions";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
function Item(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [billAvailable, setbillAvailable] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      getPurchaseItemList(props.match.params.groupId, page, {
        purchaseStartDate: startDate,
        purhcaseEndDate: endDate,
        item: name,
        createdBy: createdBy,
        billAvailable: billAvailable,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.match.params.groupId]);

  useEffect(() => {
    dispatch(getUserList(props.match.params.groupId));
  }, [dispatch, props.match.params.groupId]);

  useEffect(() => {
    dispatch(getItemList(props.match.params.groupId));
  }, [dispatch, props.match.params.groupId]);

  const { itemList } = useSelector((state) => state.itemList);
  const { purchaseItemList, loading, error } = useSelector(
    (state) => state.purchaseItemList
  );
  const { userList } = useSelector((state) => state.userList);
  const openModalforNewAddress = async (e) => {
    setOpenDialog(true);
  };
  const CloseModalforNewAddress = async (e) => {
    setOpenDialog(false);
  };

  const paginateData = (pageno) => {
    setPage(pageno);
    dispatch(
      getPurchaseItemList(props.match.params.groupId, pageno, {
        purchaseStartDate: startDate,
        purhcaseEndDate: endDate,
        item: name,
        createdBy: createdBy,
        billAvailable: billAvailable,
      })
    );
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    setSelectedDate(date);
    const temp = `${year}-${month}-${day}`;
    setStartDate(temp);
  };

  const handleEndDateChange = (date) => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    setSelectedEndDate(date);
    const temp = `${year}-${month}-${day}`;
    setEndDate(temp);
  };

  const handleFullNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCreatedby = (e) => {
    setCreatedBy(e.target.value);
  };

  const handleBillChange = (e) => {
    setbillAvailable(e.target.value);
  };

  const filterData = () => {
    dispatch(
      getPurchaseItemList(props.match.params.groupId, {
        purchaseStartDate: startDate,
        purhcaseEndDate: endDate,
        item: name,
        createdBy: createdBy,
        billAvailable: billAvailable,
      })
    );
  };
  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setName("");
    setCreatedBy("");
    setbillAvailable("");
    setPage(1);
    dispatch(
      getPurchaseItemList(props.match.params.groupId, 1, {
        purchaseStartDate: "",
        purhcaseEndDate: "",
        item: "",
        createdBy: "",
        billAvailable: "",
      })
    );
  };

  return (
    <div>
      {openDialog && (
        <AddPurchaseItem
          dialogClose={CloseModalforNewAddress}
          groupId={props.match.params.groupId}
          itemList={itemList.data}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ position: "fixed", bottom: 120, right: 10 }}
        onClick={openModalforNewAddress}
      >
        <AddIcon />
      </Button>
      <Row>
        <Col lg={3} md={6} sm={12} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                style={{ width: "100%" }}
                margin="normal"
                id="date-picker-dialog"
                label="Purchase Start Date"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                style={{ width: "100%" }}
                margin="normal"
                id="date-picker-dialog"
                label="Purchase End Date"
                format="dd/MM/yyyy"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12}>
          <FormControl
            variant="outlined"
            className={(classes.formControl, "mt-3")}
            style={{ width: "100%" }}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Purchase Item Name
            </InputLabel>
            <Select
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
              {itemList &&
                itemList.data.map((item, index) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12}>
          <FormControl
            variant="outlined"
            className={(classes.formControl, "mt-3")}
            style={{ width: "100%" }}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Created By
            </InputLabel>
            <Select
              autoComplete="off"
              native
              value={createdBy}
              onChange={handleCreatedby}
              label="Created By"
              inputProps={{
                name: "",
                id: "outlined-age-native-simple",
              }}
            >
              <option value=""></option>
              {itemList &&
                userList.data.map((item, index) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.fullName}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12}>
          <FormControl
            variant="outlined"
            className={(classes.formControl, "mt-3")}
            style={{ width: "100%" }}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Bill Available
            </InputLabel>
            <Select
              autoComplete="off"
              native
              value={billAvailable}
              onChange={handleBillChange}
              label="Bill Available"
              inputProps={{
                name: "",
                id: "outlined-age-native-simple",
              }}
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </FormControl>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px", marginLeft: "10px", height: "45px" }}
            onClick={filterData}
          >
            <SearchIcon />
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px", marginLeft: "10px", height: "45px" }}
            onClick={resetFilter}
          >
            <RotateLeftIcon />
            Reset
          </Button>
        </Col>
      </Row>
      {loading ? (
        <div>
          <i className="fa fa-spinner fa-spin"></i>
          Loading ...
        </div>
      ) : error ? (
        <div>Some error occured, Please try again!</div>
      ) : (
        <Row>
          <div className="mt-4">
            {purchaseItemList && (
              <PurchaseItems items={purchaseItemList} page={page} />
            )}
          </div>
          {purchaseItemList && purchaseItemList.data.length === 0 && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ textAlign: "center" }}
              className="mt-2"
            >
              Purchase items not uploaded yet!
            </Typography>
          )}
        </Row>
      )}
      <Row>
        {purchaseItemList && (
          <Col lg={12} md={12} sm={12} xs={12}>
            <Pagination
              current={page}
              total={
                purchaseItemList && purchaseItemList.totalPurchaseItem
                  ? Math.ceil(purchaseItemList.totalPurchaseItem / 10)
                  : 0
              }
              onPageChange={paginateData}
            />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Item;
