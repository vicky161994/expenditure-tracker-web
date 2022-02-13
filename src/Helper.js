import React from "react";
import { useDispatch } from "react-redux";
import { register } from "./actions/userActions";

function Helper() {
  const dispatch = useDispatch();
  let PendingTask = localStorage.getItem("pendingTask")
    ? JSON.parse(localStorage.getItem("pendingTask"))
    : [];
  for (let i = 0; i < PendingTask.length; i++) {
    let task = PendingTask[i];
    if (task.api === "userRegister") {
      dispatch(register(task.data.name, task.data.password, task.data.number));
    }
    PendingTask = PendingTask.filter((data) => {
      return data.api !== "userRegister";
    });
    localStorage.setItem("pendingTask", JSON.stringify(PendingTask));
  }
  return <div></div>;
}

export default Helper;
