import React from "react";
import { useState, useEffect } from "react";

const ToDoList = () => {
	const [data, setdata] = useState([
		{ text: "task 1", isEdit: false },
		{ text: "task 2", isEdit: false },
		{ text: "task 3", isEdit: false },
	]);

	// const inputRef = useRef(null);

	const [newTask, setNewTask] = useState("");

	const [isShown, setIsShown] = useState({
		state: false,
		index: 0,
	});

	const add = () => {
		console.log("clicked");
		let newArray = [...data];
		newArray.push({ text: newTask, isEdit: false });

		console.log(newArray);
		setdata(newArray);
	};

	const deleteItem = (index) => {
		console.log(index);
		let newArr = [...data];
		newArr.splice(index, 1);

		setdata(newArr);
	};

	const handleInput = (event) => {
		console.log(event.target.value);

		setNewTask(event.target.value);
	};

	return (
		<div className="d-flex flex-column align-items-center">
			<h1>To Do List</h1>
			<div className="list">
				<div className="input-group">
					<input
						className="form-control"
						type="text"
						onChange={handleInput}
						placeholder="Add Task Here"
					/>
					<button
						id="addbtn"
						type="submit"
						className="btn btn-success"
						onClick={add}>
						add
					</button>
				</div>
				<ul className="list-group-flush">
					{data.map((todo, index) => {
						return (
							// <div
							// 	className="w-100 border d-flex"
							// 	key={index}
							// 	>

							<li
								className="list-group-item"
								key={index}
								onMouseEnter={() =>
									setIsShown({ state: true, index: index })
								}
								onMouseLeave={() =>
									setIsShown({ state: false, index: 0 })
								}>
								{todo.text}{" "}
								{isShown.state === true &&
								isShown.index === index ? (
									<button
										type="button"
										className=" delete btn-close"
										aria-label="Close"
										onClick={() => {
											deleteItem(index);
										}}></button>
								) : (
									""
								)}
							</li>
							// </div>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ToDoList;
