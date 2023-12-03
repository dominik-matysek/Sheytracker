import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../utils/helpers";
import Divider from "../../../components/Divider";
import TaskForm from "./TaskForm";
import { GetAllTasks } from "../../../apicalls/tasks";

function Tasks({ project }) {
	const [tasks, setTasks] = useState([]);
	const { user } = useSelector((state) => state.users);
	const [showViewTask, setShowViewTask] = useState(false);
	const [showTaskForm, setShowTaskForm] = useState(false);
	const dispatch = useDispatch();

	const getTasks = async () => {
		try {
			dispatch(SetLoading(true));
			const response = await GetAllTasks({ project: project._id });
			dispatch(SetLoading(false));
			if (response.success) {
				setTasks(response.data);
			} else {
				throw new Error(response.message);
			}
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Assigned To",
			dataIndex: "assignedTo",
			render: (text, record) =>
				record.assignedTo.firstName + " " + record.assignedTo.lastName,
		},
		{
			title: "Assigned By",
			dataIndex: "assignedBy",
			render: (text, record) =>
				record.assignedBy.firstName + " " + record.assignedBy.lastName,
		},
		{
			title: "Assigned On",
			dataIndex: "createdAt",
			render: (text, record) => getDateFormat(text),
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (text, record) => text.toUpperCase(),
		},
		{
			title: "Action",
			dataIndex: "action",
		},
	];
	const isEmployee = project.members.find(
		(member) => member.role === "employee" && member.user._id === user._id
	);
	return (
		<div>
			{!isEmployee && (
				<div className="flex justify-end">
					<Button type="default" onClick={() => setShowTaskForm(true)}>
						Add Task
					</Button>
				</div>
			)}
			<Table columns={columns} dataSource={tasks} className="mt-5" />
			{showTaskForm && (
				<TaskForm
					showTaskForm={showTaskForm}
					setShowTaskForm={setShowTaskForm}
					project={project}
					reloadData={getTasks}
					// task={task}
				/>
			)}
		</div>
	);
}

export default Tasks;
