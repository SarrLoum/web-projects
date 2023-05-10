import { useQuery, useMutation, useQueryClient } from "react-query";
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

export const Metrics = ({ postId, comments, reposts }) => {
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

	const updateImpressionsMutation = useMutation((userId) =>
		axios.post(`http://localhost:8000/posts/${postId}/impressions`, {
			userId,
		})
	);

	const updateSharesMutation = useMutation((userId) =>
		axios.post(`http://localhost:8000/posts/${postId}/share`, { userId })
	);

	const handleLike = () => {
		const userId = "user1"; // replace with actual user ID
		updateLikesMutation.mutate(userId);
	};
	const handleImpressions = () => {
		const userId = "user1"; // replace with actual user ID
		updateImpressionsMutation.mutate(userId);
	};
	const handleShares = () => {
		const userId = "user1"; // replace with actual user ID
		updateSharesMutation.mutate(userId);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error loading metrics</p>;
	}

	const { likes, impressions, shares } = postMetrics;

	return (
		<div className="metrics-container">
			<MetricButtons
				count={comments.length}
				handleClick={""}
				Icon={Comment}
			/>
			<MetricButtons
				count={reposts.length}
				handleClick={""}
				Icon={Repost}
			/>
			<MetricButtons
				count={likes.length}
				handleClick={handleLike}
				Icon={Like}
			/>
			<MetricButtons
				count={impressions.length}
				handleClick={handleImpressions}
				Icon={Impressions}
			/>
			<MetricButtons
				count={shares.length}
				handleClick={handleShares}
				Icon={Share}
			/>
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

export const MetricButtons = ({ count, handleClick, Icon }) => {
	return (
		<div className="metric-btn">
			<Icon handleClick={handleClick} />
			{count !== 0 && <span>{count}</span>}
		</div>
	);
};
