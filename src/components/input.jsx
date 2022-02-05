import React, { useState, useEffect, useRef } from "react";

// atoms
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, dataState } from "../atoms/dataAtom";
import { inputState } from "../atoms/inputAtom";

// helper
import { v4 as generateKey } from "uuid";

const Input = ({ placeholder, show, btnText, uniqueId }) => {
	//? state
	//* global state
	const user = useRecoilValue(userState);
	const [input, setInput] = useRecoilState(inputState);
	const [data, setData] = useRecoilState(dataState);
	//* local state
	const [comment, setComment] = useState("");
	const [limit, setLimit] = useState(0);

	//* upon show set the comment value to default as reply user tag
	useEffect(() => {
		if (!input.isAddComment) {
			if (input.replyTo) {
				const str = `@${input.replyTo} `;
				setComment(str);
				setLimit(str.length);
			}
		}
	}, [input]);

	//* when the comment is being changed
	//* preventing user from removing the @
	useEffect(() => {
		if (comment.length < limit) {
			setComment(`@${input.replyTo} `);
		}
	}, [comment]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const temp = { ...data };

		//* if the user is adding a comment
		if (input.isAddComment) {
			// setting the data in temp var
			temp.comments = [
				...temp.comments,
				{
					id: generateKey(),
					content: comment,
					createdAt: new Date(),
					replies: [],
					score: 0,
					user,
				},
			];

			// globally updating data
			setData(temp);
			// clearing text area
			setComment("");

			// so that only the comment is added not as a reply
			return;
		}

		//* if its a reply
		let index = 0;
		const commentObj = temp.comments.filter((comment, i) => {
			if (comment.id === input.commentId) {
				index = i;
				return comment.id === input.commentId;
			}
		})[0];
		const newReplies = [
			...commentObj.replies,
			{
				id: generateKey(),
				content: comment.slice(limit, comment.length),
				createdAt: new Date(),
				score: 0,
				replyingTo: input.replyTo,
				user,
			},
		];
		const newData = {
			...data,
			comments: [],
		};
		newData.comments = data.comments.map((comment, i) => {
			if (index === i) {
				const tempComment = {
					...comment,
					replies: newReplies,
				};
				return tempComment;
			}

			return comment;
		});

		setData(newData);
		setComment("");
		setInput({
			isAddComment: true,
			commentId: null,
			replyTo: null,
			focusEl: null,
		});
	};

	return (
		<div
			className={`${
				!show && "hidden"
			} bg-white w-full rounded-md p-4 shadow-md`}
			id={uniqueId}
		>
			<form onSubmit={handleSubmit} className="sm:flex sm:space-x-4">
				<img
					src={user.image.webp}
					alt="profile"
					className="hidden sm:block w-8 h-8 sm:w-12 sm:h-12"
				/>

				<textarea
					placeholder={placeholder}
					className="w-full h-20 sm:h-28 border border-[#eaecf1] rounded-md py-[10px] px-5 outline-none focus:outline-[#5457b6]"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					id={uniqueId + "-textarea"}
					required
				/>

				<button
					disabled={comment.length <= limit + 1}
					type="submit"
					className="hidden sm:block bg-[#5457b6] px-8 py-2 sm:h-12 text-white rounded-lg uppercase hover:opacity-60 transition-opacity duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{btnText}
				</button>

				<div className="flex sm:hidden justify-between mt-4 items-center">
					<img src={user.image.webp} alt="profile" className="w-8 h-8" />
					<button
						disabled={comment.length <= limit + 1}
						type="submit"
						className="bg-[#5457b6] px-8 py-2 text-white rounded-lg uppercase hover:opacity-60 transition-opacity duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{btnText}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Input;
