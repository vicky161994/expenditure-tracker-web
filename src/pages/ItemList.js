import { IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getItemList } from "../actions/itemListAction";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import AddItems from "../components/dialogs/AddItems";
import { Button } from "@material-ui/core";
import EditItem from "../components/dialogs/EditItem";

function ItemList(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemForUpdate, setItemForUpdate] = useState({});
  const dispatch = useDispatch();
  const { itemList, loading, error } = useSelector((state) => state.itemList);
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const { groupId } = props.match.params;

  useEffect(() => {
    dispatch(getItemList(groupId));
  }, [dispatch, groupId]);

  const openDialogForEdit = (product) => {
    setOpenEditDialog(true);
    setItemForUpdate(product);
  };

  const deleteItemById = (product) => {
    dispatch(deleteItem(product._id, groupId));
  };

  const openModalforNewAddress = async (e) => {
    setOpenDialog(true);
  };

  const CloseModalforNewAddress = async (e) => {
    setOpenDialog(false);
  };

  const CloseModalforEditItem = async (e) => {
    setOpenEditDialog(false);
  };

  return (
    <div>
      {openDialog && (
        <AddItems dialogClose={CloseModalforNewAddress} groupId={groupId} />
      )}
      {openEditDialog && (
        <EditItem dialogClose={CloseModalforEditItem} item={itemForUpdate} />
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ position: "fixed", bottom: 120, right: 10 }}
        onClick={openModalforNewAddress}
      >
        <AddIcon />
      </Button>
      {loading ? (
        <div>
          <i className="fa fa-spinner fa-spin"></i>
          Loading ...
        </div>
      ) : error ? (
        <div>Some error occured, Please try again!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover responsive table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Units</th>
                <th scope="col">Created By</th>
                <th scope="col">Created On</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {itemList &&
                itemList.data.map((product, index) => {
                  const date = new Date(product.created_on);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.unit}</td>
                      <td>{product.createdBy.fullName}</td>
                      <td>{`${
                        date.getDate() <= 9
                          ? `0${date.getDate() + 1}`
                          : date.getDate()
                      } - ${
                        date.getMonth() + 1 <= 9
                          ? `0${date.getMonth() + 1}`
                          : date.getMonth() + 1
                      } - ${date.getFullYear()}`}</td>
                      <td className="cursor-pointer">
                        {product.createdBy._id === user._id && (
                          <IconButton
                            aria-label="Edit Item"
                            onClick={() => openDialogForEdit(product)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        {product.createdBy._id === user._id && (
                          <IconButton
                            aria-label="Delete item"
                            onClick={() => deleteItemById(product)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {itemList && itemList.data.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Record Not Available!
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ItemList;
