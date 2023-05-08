import { useState } from "react";
import { Calendar, Comment, Gif, Image, Impressions, Like, MapIn, Polls, Repost, Share, Smiley } from "./myIcons";


import "./myButtons.css";

export const Metrics = ({ posType }) => {

	const [comments, setComments] = useState(0)

	const handleComment = () => {
        setComments(comments + 1)
    }
	const [reposts, setReposts] = useState(0)

	const handleRepost = () => {
        setReposts(reposts + 1)
    }
	const [likes, setLikes] = useState(0)

	const handleLike = () => {
        setLikes(likes + 1)
    }
	const [impressions, setImpressions] = useState(0)

	const handleImpressions = () => {
        setImpressions(impressions + 1)

    }
	const [shares, setShares] = useState(0)


	const handleShares = () => {
        setShares(shares + 1)
    }

	return <div className='metrics-container'>
		<MetricButtons count={comments} handleClick={handleComment} Icon={Comment} /> 
		<MetricButtons count={reposts} handleClick={handleRepost} Icon={Repost} /> 
		<MetricButtons count={likes} handleClick={handleLike} Icon={Like} /> 
		<MetricButtons count={impressions} handleClick={handleImpressions} Icon={Impressions} />
		<MetricButtons count={shares} handleClick={handleShares} Icon={Share} />
		</div>;
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

export const MetricButtons = ({count, handleClick, Icon}) => {
	return (
        <div className='metric-btn'>
            <Icon handleClick={handleClick} />
			{count !== 0 &&<span>{count}</span>}
        </div>)
}
