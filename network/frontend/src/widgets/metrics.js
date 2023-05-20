import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { RepostModal } from "../theModals/modalPopUps";
import axios from "axios";
import { Comment, Impressions, Like, Repost, Share } from "./myIcons";

import "./metrics.css";

export const Metrics = ({ user, post }) => {
	const queryClient = useQueryClient();
	const paramsValue = postType(post);
	const pk = post.id;

	const {
		data: postMetrics,
		isLoading,
		error,
	} = useQuery(
		["post", post.id],
		async () => {
			const response = await axios.get(
				`http://localhost:8000/api/posts/${pk}/metrics?type=${paramsValue}`
			);
			return response.data;
		},
		{
			refetchOnMount: true,
			refetchOnWindowFocus: true,
		}
	);

	const [openRepost, setOpenRepost] = useState(false);

	function openRepostModal() {
		setOpenRepost(!openRepost);
	}
	function closeRepostModal() {
		setOpenRepost(false);
	}

	const updateLikesMutation = useMutation((userId) =>
		axios.post(`http://localhost:8000/posts/${post.id}/like`, { userId })
	);

	const handleLike = () => {
		updateLikesMutation.mutate(user.id);
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

	const { likes, replies, reposts, quotes, impressions } = postMetrics;
	const allReposts = reposts.length + quotes.length;

	return (
		<div className="metrics-container">
			<MetricButtons
				count={replies.length}
				handleClick={handleComment}
				Icon={Comment}
			/>
			<MetricButtons
				user={post}
				post={post}
				is_repost={true}
				openRepost={openRepost}
				count={allReposts}
				handleClick={openRepostModal}
				onClose={closeRepostModal}
				Icon={Repost}
			/>
			<MetricButtons
				count={likes.length}
				handleClick={handleLike}
				Icon={Like}
			/>
			<MetricButtons handleClick={handleImpression} Icon={Impressions} />
			<MetricButtons handleClick={handleShare} Icon={Share} />
		</div>
	);
};

export const MetricButtons = ({
	user,
	post,
	is_repost,
	openRepost,
	count,
	handleClick,
	onClose,
	Icon,
}) => {
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
						<RepostModal
							user={user}
							post={post}
							isOpen={openRepost}
							closeRepostModal={onClose}
						/>
					</>
				)
			}
		</>
	);
};

function postType(post) {
	if (post.is_post) {
		return "post";
	} else if (post.is_reply) {
		return "reply";
	} else if (post.is_repost) {
		return "quote";
	} else {
		return "repost";
	}
}
