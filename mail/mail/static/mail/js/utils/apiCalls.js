export const fetchCurrentUser = async () => {
	try {
		const response = await fetch("/user");
		const user = await response.json();
		return user;
	} catch (error) {
		console.error("Error fetching current user:", error);
		throw error;
	}
};

export const asRead = (email_id) => {
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			read: true,
		}),
	});
};

export const asArchived = (email) => {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			archived: !email.archived,
		}),
	});
};

export const asStarred = (email) => {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			starred: !email.starred,
		}),
	});
};

export const asSpam = (email) => {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			spam: !email.spam,
		}),
	});
};

export const asTrash = (email) => {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			trash: !email.trash,
		}),
	});
};
