import { Avatar, UserName2 } from "./user";
import { Reply, Repost, Quote, Post } from "./posType";
import { MediaButtons } from "./myButtons";

import "./TLElements.css";

export const Status = ({ userProfile }) => {
	return (
		<div className='status-container'>
			<div className='user-status'>
				<Avatar userProfile={userProfile} />
			</div>
			<div className='form-container'>
				<form action=''>
					<TextInput />
					<div className='selected-files'></div>
					<div className='status-btn'>
						<MediaButtons />
						<input type='submit' value='Tweet' />
					</div>
				</form>
			</div>
		</div>
	);
};

export const Fleet = ({ userProfile }) => {
	return (
		<div className='fleet'>
			<Avatar userProfile={userProfile} />
		</div>
	);
};

export const Feed = () => {
	return <div></div>;
};

export const TextInput = () => {
	const [value, setValue] = useState("");
	const [height, setHeight] = useState("auto");

	function handleInputChange(event) {
		setValue(event.target.value);
		setHeight(event.target.scrollHeight + "px");
	}
	return (
		<>
			<textarea
				type='textarea'
				name='text'
				id='text-input'
				placeholder="What's hapenning?"
				maxLength='300'
				value={value}
				onChange={handleInputChange}
				style={{ height }}
			></textarea>
		</>
	);
};
