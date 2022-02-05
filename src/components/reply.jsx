import React, { useEffect, useState } from "react";

// state
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { showModalState } from "../atoms/modalAtom";
import { dataState as dataStateAtom, userState } from "../atoms/dataAtom";
import { inputState } from "../atoms/inputAtom";

// components
import Score from "./score.jsx";
import UserProfile from "./userProfile.jsx";
import ReplyButton from "./btnReply.jsx";
import EditDeleteButtons from "./btnWrite.jsx";
import Input from "./input";

const Reply = ({ reply, comment }) => {
	//? states
	//* global states
	const [dataState, setDataState] = useRecoilState(dataStateAtom);
	const setShowModal = useSetRecoilState(showModalState);
	const user = useRecoilValue(userState);
	const [input, setInput] = useRecoilState(inputState);
	//* local States
	const [isUser, setIsUser] = useState(false);
	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);
	const [updatedReply, setUpdatedReply] = useState(reply.content || "");

	//* checking if the comment user
	//* is the current user
	useEffect(() => {
		reply.user.username === user.username && setIsUser(true);
	}, []);

	//* if there is change in inputState
	//* get rid of the reply input
	useEffect(() => {
		if (show)
			if (input.isAddComment && (!input.commentId || !input.replyTo))
				setShow(false);
	}, [input]);

	//* handling reply onClick
	const handleReply = () => {
		setInput({
			isAddComment: false,
			commentId: comment.id,
			replyTo: reply.user.username,
			focusEl: document.getElementById(`${reply.id}-input-textarea`),
		});
		setShow(true);
	};

	//* handling reply edit update
	const handleUpdateComment = (e) => {
		e.preventDefault();

		const temp = {
			...dataState,
			comments: [],
		};
		dataState.comments.forEach((tempComment, i) => {
			if (tempComment.id === comment.id) {
				const newComment = {
					...comment,
					replies: dataState.comments[i].replies.map((tempReply) => {
						if (tempReply.id === reply.id) {
							return {
								...tempReply,
								content: updatedReply,
							};
						}

						return tempReply;
					}),
				};

				temp.comments.push(newComment);
				return;
			}

			temp.comments.push(tempComment);
		});

		setUpdatedReply("");
		setEdit(false);
		setDataState(temp);
	};

	return (
		<div className="space-y-4">
			<div className="bg-white w-full rounded-md p-4 shadow-md sm:flex sm:p-6">
				{/* Desktop: Score */}
				<div className="sm:mr-6">
					{/* Bigger: score */}
					<Score
						isComment={false}
						commentId={comment.id}
						replyId={reply.id}
						isMobile={false}
					/>
				</div>

				{/* Comment header */}
				<div className="w-full">
					<div className="flex justify-between ">
						{/* Author */}
						<UserProfile data={reply} isUser={isUser} />

						{/* Bigger: Actions */}
						<div className="hidden sm:flex items-center space-x-4">
							{!isUser ? (
								<ReplyButton handleReply={handleReply} />
							) : (
								<EditDeleteButtons
									setShowModal={setShowModal}
									isComment={false}
									commentId={comment.id}
									replyId={reply.id}
									setShowEdit={setEdit}
								/>
							)}
						</div>
					</div>

					{/* Content */}
					<div className="my-3">
						{!edit ? (
							<p className="text-[#67727e] font-base">
								<span className="font-medium text-[#5457b6]">
									@{reply.replyingTo}{" "}
								</span>
								{reply.content}
							</p>
						) : (
							<form className="mt-4" onSubmit={handleUpdateComment}>
								<textarea
									className="w-full h-20 sm:h-28 border border-[#eaecf1] rounded-md py-[10px] px-5 outline-none focus:outline-[#5457b6]"
									value={updatedReply}
									onChange={(e) => setUpdatedReply(e.target.value)}
									id={reply.id + "-editInput"}
								/>
								<div className="mt-4 w-full flex justify-end">
									<button
										type="submit"
										className="bg-[#5457b6] px-8 py-2 sm:h-12 text-white rounded-lg uppercase hover:opacity-60 transition-opacity duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
									>
										Update
									</button>
								</div>
							</form>
						)}
					</div>

					{/* Mobile: Actions */}
					<div className="flex justify-between">
						{/* score */}
						<Score
							isComment={false}
							commentId={comment.id}
							replyId={reply.id}
							isMobile={true}
						/>

						{/* Mobile: Actions */}
						<div className="flex sm:hidden items-center space-x-4">
							{!isUser ? (
								<ReplyButton handleReply={handleReply} />
							) : (
								<EditDeleteButtons
									setShowModal={setShowModal}
									isComment={false}
									commentId={comment.id}
									replyId={reply.id}
									setShowEdit={setEdit}
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Reply input */}
			<Input
				placeholder="Add a reply..."
				show={show}
				btnText="Reply"
				uniqueId={`${reply.id}-input`}
			/>
		</div>
	);
};

export default Reply;
