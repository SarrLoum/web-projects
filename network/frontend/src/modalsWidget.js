import { useEffect, useState } from "react";
import axios from "axios";
import { Repost } from "./myIcons";
import { Avatar } from ".user";
import { Quoting } from "TLelement";

import "./modalsWidget.css";

export const Year = ({ dateOnChange }) => {
	function yearOptions() {
		var startYear = 1945;
		var endYear = new Date().getFullYear();

		var options = [];
		for (let year = endYear; year >= startYear; year--) {
			options.push(<option value={year}>{year}</option>);
		}
		return options;
	}
	return (
		<div className="year-input">
			<label className="date-label" htmlFor="year">
				Year
			</label>
			<br />
			<select onChange={dateOnChange} name="year" id="year">
				<option value=""></option>
				{yearOptions()}
			</select>
		</div>
	);
};

export const Month = ({ dateOnChange }) => {
	function MonthOptions() {
		var months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const options = [];
		for (let i = 0; i <= months.length; i++) {
			options.push(<option value={months[i]}>{months[i]}</option>);
		}
		return options;
	}
	return (
		<div className="month-input">
			<label className="date-label" htmlFor="month">
				Month
			</label>
			<br />
			<select onChange={dateOnChange} name="month" id="month">
				<option value=""></option>
				{MonthOptions()}
			</select>
		</div>
	);
};
export const Day = ({ dateOnChange }) => {
	function yearOptions() {
		var options = [];
		for (let day = 1; day <= 31; day++) {
			options.push(<option value={day}>{day}</option>);
		}
		return options;
	}
	return (
		<div className="day-input">
			<label className="date-label" ss htmlFor="day">
				day
			</label>
			<br />
			<select onChange={dateOnChange} name="day" id="day">
				<option value=""></option>
				{yearOptions()}
			</select>
		</div>
	);
};

export const RepostModal = ({ userId, postId }) => {
	const [openQuote, setOpenQuote] = useState(false);

	const handleQuote = () => {
		setOpenQuote(true);
	};

	const handleRepost = () => {
		axios.post(`http://localhost:8000/api/posts/${postId}/repost`, {
			userId,
		});
	};

	return (
		<>
			<div className="repost-modal">
				<div className="repost-modal-container">
					<div onClick={handleRepost} className="repost">
						<Repost />
						<span>Repost</span>
					</div>
					<div onClick={handleQuote} className="Quotes">
						<Repost />
						<span>Quote Post</span>
					</div>
				</div>
			</div>
			<QuoteModal isOpen={openQuote} postId={postId} userId={userId} />
		</>
	);
};

export const QuoteModal = ({ isOpen, postId, userId }) => {
	return (
		<div className={`quote-modal ${isOpen ? "open-quote-modal" : ""}`}>
			<Quoting user={userId} post={postId} />
		</div>
	);
};
