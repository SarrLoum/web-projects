import { Calendar, Gif, Image, MapIn, Polls, Smiley } from "./myIcons";

import "./myButtons.css";

export const MediaButtons = ({ isReplyF, handleData }) => {
	return (
		<div className="media-inputs">
			{!isReplyF ? (
				<>
					<ImgInput handleData={handleData} Icon={Image} />
					<ImgInput handleData={handleData} Icon={Gif} />
					<InputBtn handleData={handleData} Icon={Polls} />
					<InputBtn handleData={handleData} Icon={Smiley} />
					<InputBtn handleData={handleData} Icon={Calendar} />
					<InputBtn handleData={handleData} Icon={MapIn} />
				</>
			) : (
				<>
					<ImgInput handleData={handleData} Icon={Image} />
					<ImgInput handleData={handleData} Icon={Gif} />
					<InputBtn handleData={handleData} Icon={Smiley} />
					<InputBtn handleData={handleData} Icon={MapIn} />
				</>
			)}
		</div>
	);
};

export const ImgInput = ({ handleData, Icon }) => {
	return (
		<>
			<label className="media-input" htmlFor="media-input">
				<Icon />
			</label>
			<input
				onChange={handleData}
				type="file"
				name="media"
				id="media-input"
				accept="image/*,video/*,image/gif"
				multiple
			/>
		</>
	);
};

export const InputBtn = ({ Icon }) => {
	return (
		<>
			<div className="icon-btn-input">
				<Icon />
			</div>
		</>
	);
};
