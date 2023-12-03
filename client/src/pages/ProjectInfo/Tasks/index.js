import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { DeleteTask, GetAllTasks, UpdateTask } from "../../../apicalls/tasks";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../utils/helpers";
import Divider from "../../../components/Divider";
import TaskForm from "./TaskForm";

function Tasks({project}) {
  const [showViewTask, setShowViewTask] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={() => setShowTaskForm(true)}>
          Add Task
        </Button>
      </div>
      {showTaskForm && (
        <TaskForm
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          project={project}
          // reloadData={getTasks}
          // task={task}
        />
      )}

      </div>
  )
}

export default Tasks