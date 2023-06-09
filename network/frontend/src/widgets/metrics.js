import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { getPostMetrics, likePost } from "../apiServices";
import { getPostType } from "../mainComponents/utils";
import { RepostModal } from "../theModals/modalPopUps";
import { Bookmark, Comment, Impressions, Like, Repost, Share } from "./myIcons";

import "./metrics.css";

export const Metrics = ({ currentUser, post, isThread }) => {
	const paramsValue = getPostType(post);
	const pk = post.id;

	const [postMetrics, setPostMetrics] = useState(null);
	const [openRepost, setOpenRepost] = useState(false);

	useEffect(() => {
		const fetchPostMetrics = async () => {
			try {
				const metrics = await getPostMetrics(pk, paramsValue);
				setPostMetrics(metrics);
			} catch (error) {
				console.error("Error fetching post metrics:", error);
			}
		};

		fetchPostMetrics();
	}, [pk, paramsValue]);

	function openRepostModal() {
		setOpenRepost(!openRepost);
	}
	function closeRepostModal() {
		setOpenRepost(false);
	}

	const handleLike = () => {
		likePost(pk);
	};

	const handleReply = () => {};
	const handleImpression = () => {};
	const handleShare = () => {};

	const {
		likes = [],
		replies = [],
		reposts = [],
		quotes = [],
		impressions = [],
	} = postMetrics;
	const allReposts = reposts.length + quotes.length;

	return (
		<div className="metrics-container">
			<MetricButtons
				count={replies.length}
				handleClick={handleReply}
				Icon={Comment}
			/>
			<MetricButtons
				currentUser={currentUser}
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
			{isThread ? (
				<MetricButtons handleClick={handleImpression} Icon={Bookmark} />
			) : (
				<MetricButtons
					handleClick={handleImpression}
					Icon={Impressions}
				/>
			)}
			<MetricButtons handleClick={handleShare} Icon={Share} />
		</div>
	);
};

export const StatLinks = ({ post }) => {
	const paramsValue = getPostType(post);
	const pk = post.id;
	const [postMetrics, setPostMetrics] = useState(null);

	useEffect(() => {
		const metrics = getPostMetrics(pk, paramsValue);
		setPostMetrics(metrics);
		console.log("post metrics:", postMetrics);
	}, [pk, paramsValue]);

	const { reposts, quotes, likes, ...otherMetrics } = postMetrics;

	return (
		<div className="stats-links">
			<Stats posts={reposts} value={reposts.length} name={"Retweet"} />
			<Stats posts={quotes} value={quotes.length} name={"Quote"} />
			<Stats posts={likes} value={likes.length} name={"Like"} />
		</div>
	);
};

export const Stats = ({ value, name, posts }) => {
	return (
		<div className="stats">
			<span className="value">{value}</span>
			<span className="name">{name}</span>
		</div>
	);
};

export const MetricButtons = ({
	currentUser,
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
							currentUser={currentUser}
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
