import { More2, Image, Gif, Polls, Smiley, Calendar, MapIn } from "./myIcons";

import "./myButtons.css";

export const MetricButtons = ({ posType }) => {
	return <div className='metric-btn'>Comment Repost Like Stats Shares</div>;
};

export const MediaButtons = () => {
	return (
		<div className='media-inputs'>
			<ImgInput Icon={Image} />
			<ImgInput Icon={Gif} />
			<InputBtn Icon={Polls} />
			<InputBtn Icon={Smiley} />
			<InputBtn Icon={Calendar} />
			<InputBtn Icon={MapIn} />
		</div>
	);
};

export const ImgInput = ({ Icon }) => {
	return (
		<>
			<label for='media-input'>
				<Icon />
			</label>
			<input
				type='file'
				name='media'
				id='media-input'
				accept='image/*,video/*,image/gif'
				multiple
			/>
		</>
	);
};

export const InputBtn = ({ Icon }) => {
	return (
		<>
			<div className='icon-btn'>
				<Icon />
			</div>
		</>
	);
};
