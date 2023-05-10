import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { RepostModal } from "modalsWidget";
import axios from "axios";
import {
	Calendar,
	Comment,
	Gif,
	Image,
	Impressions,
	Like,
	MapIn,
	Polls,
	Repost,
	Share,
	Smiley,
} from "./myIcons";

import "./myButtons.css";

export const Metrics = ({ postId, comments, impressions }) => {
	const queryClient = useQueryClient();

	const {
		data: postMetrics,
		isLoading,
		error,
	} = useQuery(
		["post", postId],
		async () => {
			const response = await axios.get(
				`http://localhost:8000/posts/${postId}/metrics`
			);
			return response.data;
		},
		{
			refetchOnMount: true,
			refetchOnWindowFocus: true,
		}
	);

	const updateLikesMutation = useMutation((userId) =>
		axios.post(`http://localhost:8000/posts/${postId}/like`, { userId })
	);

	const handleLike = () => {
		const userId = "userID"; // replace with actual user ID
		updateLikesMutation.mutate(userId);
	};

	const handleComment = () => {};
	const handleImpression = () => {};
	const handleShare = () => {};

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error loading metrics</p>;
	}

	const { likes, reposts } = postMetrics;

	return (
		<div className="metrics-container">
			<MetricButtons
				count={comments}
				handleClick={handleComment}
				Icon={Comment}
			/>
			<MetricButtons
				is_repost={true}
				count={reposts.length}
				Icon={Repost}
			/>
			<MetricButtons
				count={likes.length}
				handleClick={handleLike}
				Icon={Like}
			/>
			<MetricButtons
				count={impressions}
				handleClick={handleImpression}
				Icon={Impressions}
			/>
			<MetricButtons handleClick={handleShare} Icon={Share} />
		</div>
	);
};

export const MediaButtons = () => {
	return (
		<div className="media-inputs">
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
			<label for="media-input">
				<Icon />
			</label>
			<input
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
			<div className="icon-btn">
				<Icon />
			</div>
		</>
	);
};

export const MetricButtons = ({ count, handleClick, Icon, is_repost }) => {
	return (
		<>
			<div onClick={handleClick} className="metric-btn">
				<Icon />
				{count !== 0 && <span>{count}</span>}
			</div>

			{
				// if the metricbutton is a repost button render the repostModal pop up
				is_repost && (
					<>
						<RepostModal />
					</>
				)
			}
		</>
	);
};
