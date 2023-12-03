import { Button, Form, Input, message, Modal, Tabs, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";

function TaskForm({showTaskForm, setShowTaskForm}) {
  return (
    <Modal
    title="ADD TASKS"
    open={showTaskForm}
    onCancel={() => setShowTaskForm(false)}
    centered
  >
    </Modal>
  )
}

export default TaskForm