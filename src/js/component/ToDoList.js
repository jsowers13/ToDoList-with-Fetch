import React from "react";
import { useState, useEffect } from "react";

const ToDoList = () => {
	const [data, setdata] = useState([
		{ label: "Make the bed", done: false },
		{ label: "Walk the dog", done: false },
		{ label: "Do the replits", done: false },
	]);

	const [newTask, setNewTask] = useState([
		{ label: "Make the bed", done: false },
		{ label: "Walk the dog", done: false },
		{ label: "Do the replits", done: false },
	]);
	const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/jonsowers";

	const [isShown, setIsShown] = useState({
		state: false,
		index: 0,
	});

	useEffect(() => {
		getInfo();
		// newEntry();
	}, []);

	const getInfo = () => {
		fetch(apiURL)
			.then((response) => response.json())
			.then((json) => {
				setdata(json);
				console.log(json);
			});
	};

	const add = () => {
		console.log("clicked");
		let newArray = [...data, { label: newTask, done: false }];

		console.log(newArray);
		setdata(newArray);

		fetch(apiURL, {
			method: "PUT",
			body: JSON.stringify(newArray),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const newToDo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jonsowers", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => JSON.stringify(response));
		// .then((newTask) => setNewTask(newTask));
	};

	const deleteItem = (index) => {
		console.log(index);
		let newArr = [...data];
		newArr.splice(index, 1);

		setdata(newArr);
		fetch(apiURL, {
			method: "PUT",
			body: JSON.stringify(newArr),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			//.then((data) => {
			//here is were your code should start after the fetch finishes
			//console.log(data); //this will print on the console the exact object received from the server
			//})
			.catch((error) => {
				//error handling
				console.log(error);
			});
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
								{todo.label}{" "}
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
