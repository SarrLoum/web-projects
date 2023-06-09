import { useState, useEffect } from "react";
import {
	UserStats,
	Avatar,
	UserName1,
	ProfileCover,
	BiosInfo,
	FollowStats,
} from "./user";
import { Backword, Candle, Calendar, MapIn } from "../widgets/myIcons";

const Profile = ({ user2, follow }) => {
	return (
		<div className="profile-container">
			<div className="profile-header">
				<a className="icon-link" href="#">
					<Backword />
				</a>
				<UserStats user={user2} />
			</div>

			<div className="user-wall">
				<div className="profile-cover">
					<ProfileCover user={user2} />
					<div className="user-edit">
						<Avatar user={user2} />
						<a href="#" className="edit-btn">
							<span>Edit profile</span>
						</a>
					</div>
				</div>
				<UserName1 user={user2} />
				<div className="bio-container">
					<p>{user2.bio}</p>
					<div className="bio-info">
						<BiosInfo Icon={MapIn} info={user2.location} />
						<BiosInfo Icon={Candle} info={user2.birthdate} />
						<BiosInfo Icon={Calendar} info={user2.joined_on} />
					</div>
				</div>
				<div className="follow-stats-wrapper">
					<FollowStats stat={follow.followings} name={"Following"} />
					<FollowStats stat={follow.followers} name={"Follower"} />
				</div>
			</div>
			<div className="profile-tweets-container">
				<div className="toggles-btn-wrapper">
					<a href="#">
						<span>Tweets</span>
					</a>
					<a href="#">
						<span>Replies</span>
					</a>
					<a href="#">
						<span>Media</span>
					</a>
					<a href="#">
						<span>Likes</span>
					</a>
				</div>
				<div className="toggle-tweets-container"></div>
			</div>
		</div>
	);
};
