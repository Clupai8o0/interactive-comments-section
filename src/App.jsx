import React, { useEffect } from "react";

// components
import Comment from "./components/comment.jsx";
import Input from "./components/input.jsx";
import Modal from "./components/modal.jsx";

// data
import json from "./data.json";

// state
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { dataState, userState } from "./atoms/dataAtom";
import { inputState } from "./atoms/inputAtom";

function App() {
	//* states
	const [data, setData] = useRecoilState(dataState); // global data
	const [input, setInput] = useRecoilState(inputState); // global input data state
	const setUser = useSetRecoilState(userState); // global user state

	//* setting the global data
	useEffect(() => {
		// getting data from localStorage
		const localData = JSON.parse(localStorage.getItem("data"));

		// if there is no data in localStorage use the json data
		setData(!localData ? { ...json } : { ...localData });
		setUser(!localData ? json.currentUser : localData.currentUser); // setting the current user

		// changing the input focus to main input
		setTimeout(() => {
			setInput((prev) => ({
				...prev,
				focusEl: document.getElementById("appInput-textarea"),
			}));
		}, 700);
	}, []);

	//* if there is change in global data
	//* update it as a localStorage data
	// NOTE: you can't use fs in react
	// so instead I'm saving it in localStorage
	useEffect(() => {
		localStorage.setItem("data", JSON.stringify(data));
	}, [data]);

	//* if there is change in inputState
	//* add an escape event listener
	useEffect(() => {
		//* if esc key is pressed then the focus will switch to main input
		if (!input.isAddComment && input.commentId && input.replyTo)
			document.addEventListener("keydown", handleEscape, false);
		else document.removeEventListener("keydown", handleEscape, false);

		//* focusing on the element
		if (input.focusEl) input.focusEl.focus();
	}, [input]);

	//* event handler for esc key
	const handleEscape = (e) => {
		if (e.key === "Escape") {
			const el = document.getElementById("appInput-textarea");
			setInput({
				isAddComment: true,
				commentId: null,
				replyTo: null,
				focusEl: el,
			});

			//* focusing if element is not null
			if (el) el.focus();
		}
	};

	return (
		<div className="w-full px-9h-screen overflow-y-auto bg-[#eaecf1] font-sans font-normal text-base px-4 py-8 flex flex-col relative">
			{/* Delete modal */}
			<Modal />

			{data && (
				<div className="mx-auto max-w-3xl space-y-6">
					{/* Comments */}
					{data?.comments.map((comment) => (
						<Comment data={comment} key={comment.id} />
					))}
					{/* Main Input element */}

					{input.isAddComment && (
						<Input
							placeholder="Add a comment..."
							btnText="Send"
							show={true}
							uniqueId="appInput"
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
