import React, { useRef, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// atom
import { useRecoilState } from "recoil";
import { showModalState } from "../atoms/modalAtom";
import { selectedCommentState } from "../atoms/selectedAtom";
import { dataState } from "../atoms/dataAtom";
import { useLayoutEffect } from "react/cjs/react.development";

function Modal() {
	// state
	const [isOpen, setIsOpen] = useRecoilState(showModalState);
	const [data, setData] = useRecoilState(dataState);
	const [selectedComment, setSelectedComment] =
		useRecoilState(selectedCommentState);

	// ref
	const cancelButtonRef = useRef(null);

	const handleDelete = () => {
		if (selectedComment) {
			if (selectedComment.isComment) {
				const temp = { ...data };
				const filteredComments = temp.comments.filter(
					(comment) => comment.id !== selectedComment.commentId
				);
				temp.comments = [...filteredComments];

				setData(temp);
				setIsOpen(false);
				setSelectedComment(null);
			} else {
				let index = 0;
				const replies = data.comments
					.filter((comment, i) => {
						if (comment.id === selectedComment.commentId) {
							index = i;
							return comment.id === selectedComment.commentId;
						}
					})[0]
					.replies.filter((reply) => reply.id !== selectedComment.replyId);

				const temp = {
					...data,
					comments: [],
				};
				temp.comments = data.comments.map((comment, i) => {
					if (index === i) {
						const tempComment = {
							...comment,
							replies: replies,
						};
						return tempComment;
					}

					return comment;
				});

				setData(temp);
				setIsOpen(false);
				setSelectedComment(null);
			}
		}
	};

	return (
		<Transition
			show={isOpen}
			as={Fragment}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				initialFocus={cancelButtonRef}
				className="fixed z-10 inset-0 overflow-y-auto"
			>
				<div className="flex flex-col items-center justify-center min-h-screen">
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
					<div className="bg-white z-50 w-[90vw] sm:w-96 p-6 rounded-lg">
						<Dialog.Title className="font-medium text-[#324152] text-lg">
							Delete Comment
						</Dialog.Title>

						<Dialog.Description className="my-4 sm:my-8 text-[#67727e]">
							Are you sure you want to delete this comment? This will remove the
							comment and can't be undone
						</Dialog.Description>

						<div className="w-full flex items-center space-x-4">
							<button
								onClick={() => {
									setIsOpen(false);
									setSelectedComment(null);
								}}
								ref={cancelButtonRef}
								className="w-full bg-[#67727e] text-white py-[10px] rounded-lg uppercase font-medium hover:opacity-60 transition-opacity duration-200 ease-in-out"
							>
								No, Cancel
							</button>
							<button
								onClick={handleDelete}
								className="w-full bg-[#ed6468] text-white py-[10px] rounded-lg uppercase font-medium hover:opacity-60 transition-opacity duration-200 ease-in-out"
							>
								Yes, Delete
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export default Modal;
