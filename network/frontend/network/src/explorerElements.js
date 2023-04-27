import { Avatar, User } from "./user";
import { More2 } from "./myIcons";
import "./explorer.css";

export const Tendance = ({ post }) => {
	return (
		<div className='tendance'>
			<Avatar />
			<div className='tendance-text'>
				<p>{post.text}</p>
			</div>
			<More2 />
		</div>
	);
};
