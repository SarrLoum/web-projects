import { useEffect, useState } from "react";
import { repostPost, quotePost } from "../apiServices";
import { Avatar, UserName2 } from "../mainComponents/user";
import { MediaButtons } from "../widgets/myButtons";
import { TextInput } from "../widgets/modalsWidget";
import { Repost, QuoteIcon, Close, Earth } from "../widgets/myIcons";

import "./modalPopUps.css";

export const RepostModal = ({
	currentUser,
	post,
	isOpen,
	closeRepostModal,
}) => {
	const pk = post.id;
	const [openQuote, setOpenQuote] = useState(false);

	const openQuoteModal = () => {
		setOpenQuote(true);
	};
	const closeQuoteModal = () => {
		setOpenQuote(false);
	};

	const handleRepost = () => {
		repostPost(pk);
	};

	return (
		<>
			<div
				id="repost-popup"
				className={`repost-popup ${isOpen ? "open" : ""}`}
			>
				<div className="repost-modal-container">
					<div onClick={handleRepost} className="repost-btn">
						<Repost />
						<span>Repost</span>
					</div>
					<div onClick={openQuoteModal} className="quote-btn">
						<QuoteIcon />
						<span>Quote Post</span>
					</div>
				</div>
			</div>
			<QuoteModal
				post={post}
				isOpen={openQuote}
				currentUser={currentUser}
				onClose={closeQuoteModal}
			/>
		</>
	);
};

export const QuoteModal = ({ post, isOpen, currentUser, onClose }) => {
	return (
		<div className={`quote-modal ${isOpen ? "open" : ""}`}>
			<Quoting post={post} currentUser={currentUser} onClose={onClose} />
		</div>
	);
};

export const Quoting = ({ post, currentUser, onClose }) => {
	const [quoteData, setQuoteData] = useState({
		text: "",
		media: null,
		post: null,
		repy: null,
		parent_quote: null,
	});

	function handleQuoteData(e) {
		const { name, value } = e.target;

		setQuoteData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}
	function handleQuotePost() {
		quotePost(post.id, quoteData);
	}

	return (
		<div className="quoting-container">
			<div className="quoting-header">
				<Close closeModal={onClose} />
				<div>
					<a className="draft-btn" href="#">
						<span>Drafts</span>
					</a>
				</div>
			</div>
			<form method="POST" onSubmit={handleQuotePost} action="">
				<div className="quoting-wrapper">
					<div className="user-quoting">
						<Avatar user={currentUser} />
					</div>
					<div className="quoting-form-container">
						<div className="tweet-target">
							<select name="target">
								<option>Everyone</option>
								<option>Followers</option>
								<option>Circle only</option>
							</select>
						</div>
						<TextInput handleData={handleQuoteData} />
						<div className="selected-files"></div>
						<QuotedPost post={post} />
					</div>
				</div>
				<div className="quoting-replies-audiences">
					<Earth />
					<span>Everyone can reply</span>
				</div>
				<hr></hr>
				<div className="quoting-btn">
					<MediaButtons handleData={handleQuoteData} />
					<input type="submit" value="Tweet" />
				</div>
			</form>
		</div>
	);
};

export const QuotedPost = ({ post }) => {
	return (
		<div className="quoted-post">
			<div className="quoted-post-wrapper">
				<div className="quoted-post-user">
					<Avatar user={post.user} />
					<UserName2 user={post.user} />
				</div>
				<div className="quoted-content">
					<p>{post.text}</p>
				</div>
			</div>
			{post.media != null && (
				<div className="media-area">{post.media}</div>
			)}
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
