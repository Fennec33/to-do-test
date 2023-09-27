import { Component, createSignal } from "solid-js";

type TaskProps = {
	name: string;
	complete: boolean;
	timeCreated: string;
    id: string;
    functionCall: any;
};

const Task: Component<TaskProps> = (props) => {
	const [complete, setComplete] = createSignal(false);

	function toggleComplete() {
		setComplete(!complete());
	}

	return (
		<div 
            class="border border-blue-500 py-2 px-4 my-2 mx-32 flex justify-between"
            classList={{"bg-neutral-500": complete()}}
            >
			<span class="font-bold mx-2">{props.name}</span>
			<span class="mx-2">
				Task added: {props.timeCreated}
			</span>
			<span class="mx-2">
				<button 
                    class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                    onClick={() => props.functionCall(props.id)}>
					Complete
				</button>
			</span>
		</div>
	);
};

export default Task;
