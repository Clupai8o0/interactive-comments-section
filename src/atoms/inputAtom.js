import { atom } from "recoil";

export const inputState = atom({
	key: "inputState",
	default: {
		isAddComment: true,
		commentId: null,
		replyTo: null,
		focusEl: null
	},
});
