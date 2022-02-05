import React from "react";

const ReplyButton = ({ handleReply }) => {
	return (
		<div
			className="flex items-center space-x-2 cursor-pointer hover:opacity-60 transition-all duration-200 ease-in-out"
			title="Reply"
			onClick={handleReply}
		>
			<img src="icon-reply.svg" alt="reply icon" className="w-4 h-4" />
			<span className="text-[#5457b6] font-medium">Reply</span>
		</div>
	);
};

export default ReplyButton;
