import React from 'react';

// components
import Reply from '../components/reply';

function Replies({ data }) {
	// console.log(data.replies)
  return (
		<div className="space-y-4 pl-4 sm:pl-8 md:pl-10 sm:ml-8 md:ml-10 border-l-2 rounded-sm border-[#c3c4ef]">
			{data.replies.map((reply) => (
				<Reply reply={reply} comment={data} key={reply.id} />
			))}
		</div>
	);
}

export default Replies;
