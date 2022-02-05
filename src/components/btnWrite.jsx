import React from "react";

// atom
import { useSetRecoilState } from "recoil";
import { selectedCommentState } from "../atoms/selectedAtom";

const EditDeleteButtons = ({ setShowModal, commentId, replyId, isComment, setShowEdit }) => {
	// state
	const setSelectedComment = useSetRecoilState(selectedCommentState);

	// handling delete
	const handleDelete = () => {
		setShowModal(true);
		setSelectedComment({
			isComment,
			commentId,
			replyId,
		});
	};

	return (
		<div className="flex items-center space-x-6">
			<div
				className="flex items-center space-x-2 cursor-pointer hover:opacity-60 transition-all duration-200 ease-in-out"
				title="delete"
				onClick={handleDelete}
			>
				<img src="icon-delete.svg" alt="delete icon" className="w-4 h-4" />
				<span className="text-[#ed6468] font-medium capitalize">delete</span>
			</div>
			<div
				className="flex items-center space-x-2 cursor-pointer hover:opacity-60 transition-all duration-200 ease-in-out"
				title="edit"
				onClick={() => setShowEdit(prev => !prev)}
			>
				<img src="icon-edit.svg" alt="edit icon" className="w-4 h-4" />
				<span className="text-[#5457b6] font-medium capitalize">edit</span>
			</div>
		</div>
	);
};

export default EditDeleteButtons;
