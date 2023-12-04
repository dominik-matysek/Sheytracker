import { Button, Form, Input, message, Modal, Tabs, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { CreateTask, UpdateTask } from "../../../apicalls/tasks";

function TaskForm({
	showTaskForm,
	setShowTaskForm,
	project,
	task,
	reloadData,
}) {
	const [email, setEmail] = useState("");
	const { user } = useSelector((state) => state.users);
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const onFinish = async (values) => {
		try {
			let response = null;
			dispatch(SetLoading(true));
			if (task) {
				//update task
				response = await UpdateTask({
					...values,
					project: project._id,
					assignedTo: task.assignedTo._id,
					_id: task._id,
				});
			} else {
				const assignedToMember = project.members.find(
					(member) => member.user.email === email
				);
				const assignedToUserId = assignedToMember.user._id;

				const assignedBy = user._id;
				response = await CreateTask({
					...values,
					project: project._id,
					assignedTo: assignedToUserId,
					assignedBy,
				});
			}
			if (response.success) {
				reloadData();
				message.success(response.message);
				setShowTaskForm(false);
			}
			dispatch(SetLoading(false));
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
		}
	};

	const validateEmail = () => {
		const employeesInProject = project.members.filter(
			(member) => member.role === "employee"
		);
		const isEmailValid = employeesInProject.find(
			(employee) => employee.user.email === email
		);
		return isEmailValid;
	};

	return (
		<Modal
			title={task ? "UPDATE TASK" : "CREATE TASK"}
			open={showTaskForm}
			onCancel={() => setShowTaskForm(false)}
			centered
			onOk={() => {
				formRef.current.submit();
			}}
			okText={task ? "UPDATE" : "CREATE"}
		>
			<Form
				layout="vertical"
				onFinish={onFinish}
				ref={formRef}
				initialValues={{
					...task,
					assignedTo: task ? task.assignedTo.email : "",
				}}
			>
				<Form.Item label="Task Name" name="name">
					<Input />
				</Form.Item>
				<Form.Item label="Task Description" name="description">
					<TextArea />
				</Form.Item>

				<Form.Item label="Assign To" name="assignedTo">
					<Input
						placeholder="Enter the employee's email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						disabled={task ? true : false}
					/>
				</Form.Item>

				{email && !validateEmail() && (
					<div className="bg-red-700 text-sm p-2 rounded">
						<span className="text-white">
							Email is not valid or employee is not in the project
						</span>
					</div>
				)}
			</Form>
		</Modal>
	);
}

export default TaskForm;
