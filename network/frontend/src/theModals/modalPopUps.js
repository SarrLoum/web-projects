import { useEffect, useState } from "react";
import { Avatar, UserName2 } from "../mainComponents/user";
import { MediaButtons } from "../widgets/myButtons";
import { TextInput } from "../widgets/modalsWidget";
import { Repost2, QuoteIcon } from "../widgets/myIcons";
import axios from "axios";

import "./modalPopUps.css";

export const RepostModal = ({ user, post, isOpen, closeRepostModal }) => {
	const postId = post.id;
	const userId = user.id;
	const [openQuote, setOpenQuote] = useState(false);

	const openQuoteModal = () => {
		setOpenQuote(true);
	};
	const closeQuoteModal = () => {
		setOpenQuote(false);
	};

	const handleRepost = () => {
		axios.post(`http://localhost:8000/api/posts/${postId}/repost`, {
			userId,
		});
		console.log('repost button is clicked');
	};

	

	return (
		<>
			<div id="repost-popup" className={`repost-popup ${isOpen ? "open" : ""}`}>
				<div className="repost-modal-container">
					<div onClick={handleRepost} className="repost-btn">
						<Repost2 />
						<span>Repost</span>
					</div>
					<div onClick={openQuoteModal} className="quote-btn">
						<QuoteIcon />
						<span>Quote Post</span>
					</div>
				</div>
			</div>
			<QuoteModal
				onClose={closeQuoteModal}
				isOpen={openQuote}
				post={post}
				user={user}
			/>
		</>
	);
};

export const QuoteModal = ({ isOpen, post, user }) => {
	return (
		<div className={`quote-modal ${isOpen ? "open" : ""}`}>
			<Quoting user={user} post={post} />
		</div>
	);
};

export const Quoting = ({ user, post }) => {
	return (
		<div className="quoting-container">
			<div className="user-quoting">
				<Avatar user={user} />
			</div>
			<div className="form-container">
				<form action="">
					<TextInput />
					<div className="selected-files"></div>
					<QuotedPost user={user} post={post} />
					<div className="quoting-btn">
						<MediaButtons />
						<input type="submit" value="Tweet" />
					</div>
				</form>
			</div>
		</div>
	);
};

export const QuotedPost = ({ user, post }) => {
	return (
		<div className="quoted-post">
			<Avatar user={user} />
			<div className="container">
				<div className="post-content">
					<UserName2 user={user} />
					<p>{post.text}</p>
					{post.media != null && (
						<div className="media-area">{post.media}</div>
					)}
				</div>
			</div>
		</div>
	);
};

/* set the openQuote variable to true --Line (13) 
    and pass it as a props to the quoteModal --Line (37))
        to conditionally open the quoteModal --Line(44) */

/* Create a new repost modal --Line 17)
    when user click on repost button by cllaing the handleRepost Function --Line (27)*/

// pass teh props of the quoteModal to the quoting component --Line (45)

/* DESCRIPTION OF THE QUOTING COMPONENT

the quotting component is used to create a quote or to quote a post
its main container enwrap 2 divs:
    one for the user's avatar and one for quoting the post
    the second div display the quoted post with the <QuotedPost /> component 
    and also a form to quote the post with the <TextInput> and the <MediaButton> components to enable adding text or images to the quote

    the <QuotedPost /> component is just a <BasePost /> componnents without the its metrics (...on postTYpe.js)*/
