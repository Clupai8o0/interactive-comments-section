import React, { useEffect, useState } from "react";

// atom
import { useRecoilState } from "recoil";
import { dataState } from "../atoms/dataAtom";

// data
import json from "../data.json";

/**
 * @param {string} id
 * @returns a JSX score component
 */

const Score = ({ isComment, commentId, replyId, isMobile }) => {
	// global state
	const [data, setData] = useRecoilState(dataState);

	// local state
	const [comment, setComment] = useState(null);
	const [index, setIndex] = useState(0);
	const [innerIndex, setInnerIndex] = useState(0);

	// onLoad setting an instance for comment or reply data
	useEffect(() => {
		setComment(
			isComment
				? data.comments.filter((comment, i) => {
						if (comment.id === commentId) {
							setIndex(i);
							return comment.id === commentId;
						}
				  })[0]
				: data.comments
						.filter((comment, i) => {
							if (comment.id === commentId) {
								setIndex(i);
								return comment.id === commentId;
							}
						})[0]
						.replies.filter((reply, j) => {
							if (reply.id === replyId) {
								setInnerIndex(j);
								return reply.id === replyId;
							}
						})[0]
		);
	}, []);

	// saving in local data
	useEffect(() => {
		// if its a comment
		if (comment) {
			if (isComment) {
				const temp = JSON.parse(localStorage.getItem("data")) || { ...data };
				temp.comments[index].score = comment?.score;

				setData(temp);
				localStorage.setItem("data", JSON.stringify(temp));
			} else {
				const temp = JSON.parse(localStorage.getItem("data")) || { ...data };
				temp.comments[index].replies[innerIndex].score = comment?.score;

				setData(temp);
				localStorage.setItem("data", JSON.stringify(temp));
			}
		}
	}, [comment]);

	const addScore = () => setComment({ ...comment, score: comment.score + 1 });
	const reduceScore = () =>
		setComment({ ...comment, score: comment.score - 1 });

	return (
		<div
			className={`${
				isMobile ? "flex sm:hidden" : "hidden sm:flex sm:flex-col"
			} items-center bg-[#eaecf1] rounded-md space-x-1 z-0`}
		>
			<div
				title="Upvote"
				className="w-8 h-8 cursor-pointer grid place-items-center hover:fill-[#5457b6]  fill-[#C5C6EF] transition-all duration-200 ease-in-out"
				onClick={addScore}
			>
				<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
				</svg>
			</div>

			<span className="text-[#5457b6] font-base font-medium">
				{comment && comment?.score}
			</span>

			<div
				title="Downvote"
				className="w-8 h-8 cursor-pointer grid place-items-center hover:fill-[#5457b6]  fill-[#C5C6EF] transition-all duration-200 ease-in-out"
				onClick={reduceScore}
			>
				<svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
				</svg>
			</div>
		</div>
	);
};

export default Score;
