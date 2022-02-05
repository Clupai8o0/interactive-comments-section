import React from 'react';

const Edit = ({ value, setValue }) => {
  return (
		<div className="bg-white w-full rounded-md p-4 shadow-md">
			<form>
				<textarea
					value={value}
					onChange={(e) => setValue(e.target.valuew)}
					className="w-full h-20 border border-[#f5f6fa] rounded-md py-[10px] px-5"
				/>

				<div className="flex justify-between mt-4 items-center">
					<img src={user.image.png} alt="profile" className="w-8 h-8" />
					<button
						type="submit"
						className="bg-[#5457b6] px-6 py-2 text-white rounded-lg uppercase hover:opacity-60 transition-opacity duration-200 ease-in-out"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default Edit;
