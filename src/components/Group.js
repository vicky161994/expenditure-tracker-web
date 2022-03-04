import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
// import GroupRemoveIcon from "@material-ui/icons/GroupRemove";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { deleteGroup, joinGroup, removeGroup } from "../actions/productActions";
import { Button } from "react-bootstrap";

function Group(props) {
  const dispatch = useDispatch();
  const { products, page } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  console.log(user);

  const joinGroupById = (product) => {
    dispatch(joinGroup(product._id, page));
  };

  const deleteGroupById = (product) => {
    dispatch(deleteGroup(product._id, page));
  };

  const removeGroupById = (product) => {
    dispatch(removeGroup(product._id, page));
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover responsive table-bordered text-center">
        <thead>
          <tr>
            <th scope="col">S. No.</th>
            <th scope="col">Name</th>
            <th scope="col">Created By</th>
            <th scope="col">Created On</th>
            <th scope="col">Pages</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.data.map((product, index) => {
            const date = new Date(product.created_on);
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="cursor-pointer">{product.name}</td>
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
                  <Link to={`item-list/${product._id}`} className="color-black">
                    Click here for item list
                  </Link>
                  <br />
                  <Link
                    to={`purchase-item/${product._id}/true`}
                    className="color-black"
                  >
                    Click here for purchase Item{" "}
                  </Link>
                </td>
                <td className="cursor-pointer">
                  {product.createdBy._id === user._id && (
                    <IconButton
                      aria-label="Delete group"
                      onClick={() => deleteGroupById(product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {!product.users.includes(user._id) && (
                    <IconButton
                      aria-label="Join group"
                      onClick={() => joinGroupById(product)}
                    >
                      <GroupAddIcon />
                    </IconButton>
                  )}
                  {product.users.includes(user._id) &&
                    product.createdBy._id !== user._id && (
                      <Button onClick={() => removeGroupById(product)}>
                        Remove
                      </Button>
                      // <IconButton
                      //   aria-label="Delete group"
                      //   onClick={(product) => deleteGroupById(product)}
                      // >
                      //   <GroupRemoveIcon />
                      // </IconButton>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Group;
