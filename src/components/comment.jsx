import React, { useEffect, useState } from "react";

// containers
import Replies from "../containers/Replies.jsx";

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
import Input from "./input.jsx";

const Comment = ({ data }) => {
	//? states
	//* global states
	const [dataState, setDataState] = useRecoilState(dataStateAtom);
	const [input, setInput] = useRecoilState(inputState);
	const setShowModal = useSetRecoilState(showModalState); // shows modal
	const user = useRecoilValue(userState); // gets the current user
	//* local states
	const [isUser, setIsUser] = useState(false);
	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);
	const [updatedComment, setUpdatedComment] = useState(data.content || "");

	//* checking if the comment user
	//* is the current user
	useEffect(() => {
		data.user.username === user.username && setIsUser(true);
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
			commentId: data.id,
			replyTo: data.user.username,
			focusEl: document.getElementById(`${data.id}-input-textarea`),
		});
		setShow(true);
	};

	//* handling comment edit update
	const handleUpdateComment = (e) => {
		e.preventDefault();

		const temp = {
			...dataState,
			comments: [],
		};
		dataState.comments.forEach((comment) => {
			if (comment.id === data.id) {
				const newComment = {
					...comment,
					content: updatedComment,
				};

				temp.comments.push(newComment);
				return;
			}

			temp.comments.push(comment);
		});

		setUpdatedComment("");
		setEdit(false);
		setDataState(temp);
	};

	return (
		<div className="space-y-4">
			<div className="bg-white w-full rounded-md p-4 shadow-md sm:flex sm:p-6">
				{/* Desktop: Score */}
				<div className="sm:mr-6">
					{/* Desktop: score */}
					<Score
						isComment={true}
						commentId={data.id}
						isMobile={false}
						isComment={true}
						commentId={data.id}
					/>
				</div>

				{/* Comment header */}
				<div className="w-full">
					<div className="w-full flex justify-between">
						{/* Author */}
						<UserProfile data={data} isUser={isUser} />

						{/* Bigger: Actions */}
						<div className="hidden sm:flex items-center">
							{!isUser ? (
								<ReplyButton handleReply={handleReply} />
							) : (
								<EditDeleteButtons
									setShowModal={setShowModal}
									isComment={true}
									commentId={data.id}
									setShowEdit={setEdit}
								/>
							)}
						</div>
					</div>

					{/* Content */}
					<div className="my-3">
						{!edit ? (
							<p className="text-[#67727e] font-base">{data.content}</p>
						) : (
							<form className="mt-4" onSubmit={handleUpdateComment}>
								<textarea
									className="w-full h-20 sm:h-28 border border-[#eaecf1] rounded-md py-[10px] px-5 outline-none focus:outline-[#5457b6]"
									value={updatedComment}
									onChange={(e) => setUpdatedComment(e.target.value)}
									id={data.id + "-editInput"}
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
						<Score isComment={true} commentId={data.id} isMobile={true} />

						{/* Mobile: Actions */}
						<div className="flex sm:hidden items-center space-x-4">
							{!isUser ? (
								<ReplyButton handleReply={handleReply} />
							) : (
								<EditDeleteButtons
									setShowModal={setShowModal}
									isComment={true}
									commentId={data.id}
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
				uniqueId={`${data.id}-input`}
			/>

			{/* Replies container */}
			{data.replies.length !== 0 && <Replies data={data} />}
		</div>
	);
};

export default Comment;
