import { Avatar, UserName2 } from "./user";
import { Reply, Repost, Quote, Post } from "./posType";
import { MediaButtons } from "./myButtons"

import "./TLElements.css";

export const Status = ({ userProfile }) => {
	return (
		<div className='status-container'>
			<div className='user-status'>
				<Avatar avatar={userProfile.avatar} />
			</div>
			<div className='form-container'>
				<form action=''>
					<input
						type='textarea'
						name='text'
						id='text-input'
						placeholder="What's hapenning?"
					/>
					<div className='selected-files'></div>
					<div className='status-btn'>
						<MediaButtons />
						<input type='submit' value='Tweet' />
					</div>
					...
				</form>
			</div>
		</div>
	);
};

export const Fleet = ({ userProfile }) => {
	return (
		<div className='fleet'>
			<Avatar avatar={userProfile.avatar} />
		</div>
	);
};

export const Feed = () => {
	return <div></div>;
};
