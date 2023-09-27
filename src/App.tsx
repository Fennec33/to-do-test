import { createSignal, type Component, For } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import Task from "./Task";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD0VUdnOfadjvueMlLFuS8PtCqJXizmQPo",
	authDomain: "to-do-test-22514.firebaseapp.com",
	projectId: "to-do-test-22514",
	storageBucket: "to-do-test-22514.appspot.com",
	messagingSenderId: "537943313789",
	appId: "1:537943313789:web:2cb78e3d6c45516533d014",
	measurementId: "G-P66SG2K7NQ",
};

const App: Component = () => {
	initializeApp(firebaseConfig);
	const db = getFirestore();
	const colRef = collection(db, "tasks");

	const [newTaskName, setNewTaskName] = createSignal("");
	const [tasks, setTasks] = createStore([]);

	onSnapshot(colRef, (snapshot) => {
		let loadedTasks = [];
		snapshot.docs.forEach((doc) => {
			loadedTasks.push({ ...doc.data(), id: doc.id });
		});
		setTasks(loadedTasks);
	});

	const createTask = (e) => {
		e.preventDefault();
		const newTask = {
			name: newTaskName(),
			timeCreated: new Date(Date.now()).toLocaleDateString(),
			complete: false,
		};
		addDoc(colRef, newTask);
		setTasks(reconcile([...tasks, newTask]));
		setNewTaskName("");
	};

  const deleteTask = (id) => {
    const docRef = doc(db, 'tasks', id)
    deleteDoc(docRef)
  }

	return (
		<div class="font-sans">
			<h1 class="text-center font-bold text-5xl my-3">TO DO</h1>

			<form
				class="w-full flex items-center justify-center"
				onSubmit={createTask}
			>
				<div class="flex items-center border-b border-blue-500 py-2">
					<input
						class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
						type="text"
						placeholder="New Task"
						onInput={(e) => setNewTaskName(e.target.value)}
						value={newTaskName()}
					/>
					<button
						class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
						type="button"
						onClick={createTask}
					>
						Create Task
					</button>
				</div>
			</form>

			<div id="taskList" class="p-5">
				<For each={tasks}>
					{(task) => (
						<Task
							name={task.name}
							timeCreated={task.timeCreated}
							complete={task.complete}
              id={task.id}
              functionCall={deleteTask}
						/>
					)}
				</For>
			</div>
		</div>
	);
};

export default App;
