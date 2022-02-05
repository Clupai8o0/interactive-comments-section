import React from "react";
import Moment from "react-moment";

const UserProfile = ({ data, isUser }) => {
	return (
		<div className="flex items-center space-x-3">
			<img src={data.user.image.png} alt="profile" className="w-8" />
			<p className="text-[#324152] font-medium">{data.user.username}</p>

			{/* You */}
			{isUser && (
				<div className="text-white bg-[#5457b6] text-sm px-2 py-[1px] rounded-[4px] grid place-items-center">
					<span>you</span>
				</div>
			)}

			{/* {typeof data.createdAt === "string" ? (
				<span className="text-[#67727e]">{data.createdAt}</span>
			) : ( */}
				<Moment fromNow className="text-[#67727e]">
					{data.createdAt}
				</Moment>
			{/* )} */}
		</div>
	);
};

export default UserProfile;
