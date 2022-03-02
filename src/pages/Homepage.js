import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productlist } from "../actions/productActions";
import Pagination from "react-responsive-pagination";
import { Button, TextField, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Group from "../components/Group";
import AddGroup from "../components/dialogs/AddGroup";

function Homepage(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  console.log(user);
  useEffect(() => {
    dispatch(productlist(page, filterKeyword));
  }, [dispatch, filterKeyword, page]);

  const paginateData = (pageno) => {
    setPage(pageno);
  };

  const filterData = () => {
    setPage(1);
    dispatch(productlist(page, filterKeyword));
  };

  const resetFilter = () => {
    setPage(1);
    setFilterKeyword("");
    dispatch(productlist(page, ""));
  };

  const openModalforNewAddress = async (e) => {
    setOpenDialog(true);
  };
  const CloseModalforNewAddress = async (e) => {
    setOpenDialog(false);
  };

  return (
    <Container>
      {openDialog && <AddGroup dialogClose={CloseModalforNewAddress} />}
      <Button
        variant="contained"
        color="primary"
        style={{ position: "fixed", bottom: 120, right: 10 }}
        onClick={openModalforNewAddress}
      >
        <AddIcon />
      </Button>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <center>
            <TextField
              className="homepage-filter search-filter-box"
              id="outlined-required"
              label="Search Group..."
              variant="outlined"
              style={{ marginTop: "15px", width: "60%" }}
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              autoComplete="off"
            />
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
          </center>
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
          {products.data.length === 0 && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ textAlign: "center" }}
              className="mt-2"
            >
              Group not found!
            </Typography>
          )}
          <div className="mt-4">
            <Group products={products} page={page} />
          </div>
        </Row>
      )}
      <Row>
        {products && (
          <Col lg={12} md={12} sm={12} xs={12}>
            <Pagination
              current={page}
              total={
                products && products.totalGroups
                  ? Math.ceil(products.totalGroups / 10)
                  : 0
              }
              onPageChange={paginateData}
            />
          </Col>
        )}
      </Row>

      <style>
        {`
        .homepageh2 {
          line-height: 1.5;
          height: 2.9em;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: black !important;
        }
        .homepagep {
          line-height: 1.5;
          height: 4.3em;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: justify;
        }
        .homepageh3 {
          color: black;
        }
        `}
      </style>
    </Container>
  );
}

export default Homepage;
