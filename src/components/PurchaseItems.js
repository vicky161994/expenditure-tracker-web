import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deletePurchaseItem } from "../actions/purchaseItemAction";
import EditPurchaseItem from "./dialogs/EditPurchaseItem";

function PurchaseItems(props) {
  const dispatch = useDispatch();
  const { items, page } = props;
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemForUpdate, setItemForUpdate] = useState({});

  const deletePurchaseItemById = (product) => {
    dispatch(deletePurchaseItem(product._id, product.groupId._id));
  };
  const openDialogForEdit = (product) => {
    setOpenEditDialog(true);
    setItemForUpdate(product);
  };
  const CloseModalforEditItem = async (e) => {
    setOpenEditDialog(false);
  };

  console.log(page);

  return (
    <>
      {openEditDialog && (
        <EditPurchaseItem
          dialogClose={CloseModalforEditItem}
          item={itemForUpdate}
        />
      )}
      <div className="table-responsive">
        <table className="table table-striped table-hover responsive table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">Name</th>
              <th scope="col">Units</th>
              <th scope="col">Group Name</th>
              <th scope="col">Created By</th>
              <th scope="col">Total Price</th>
              <th scope="col">Purchased On</th>
              <th scope="col">Bill Available</th>
              <th scope="col">Created On</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.data.map((product, index) => {
              const date = new Date(product.created_on);
              const purchaseDate = new Date(product.purchased_on);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name.name}</td>
                  <td>{product.units}</td>
                  <td>{product.groupId.name}</td>
                  <td>{product.createdBy.fullName}</td>
                  <td>
                    <span>₹</span>
                    {product.totalCost}
                  </td>
                  <td>{`${
                    purchaseDate.getDate() <= 9
                      ? `0${purchaseDate.getDate() + 1}`
                      : purchaseDate.getDate()
                  } - ${
                    purchaseDate.getMonth() + 1 <= 9
                      ? `0${purchaseDate.getMonth() + 1}`
                      : purchaseDate.getMonth() + 1
                  } - ${purchaseDate.getFullYear()}`}</td>
                  <td>{product.bill_available ? "Yes" : "No"}</td>
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
                    <IconButton
                      aria-label="Edit Item"
                      onClick={() => openDialogForEdit(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete item"
                      onClick={() => deletePurchaseItemById(product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PurchaseItems;
