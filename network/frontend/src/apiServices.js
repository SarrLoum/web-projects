import axios from "axios";

// Define your base API URL
const baseURL = "http://localhost:8000/api/";

// Create an instance of axios with default configurations
const api = axios.create({ baseURL });

// Define your API service functions

export const getThread = async (pk, paramsValue) => {
	try {
		const response = await api.get(`thread/${pk}/post?type=${paramsValue}`);
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post metrics:", error);
		throw error;
	}
};

export const getPostMetrics = async (pk, paramsValue) => {
	try {
		const response = await api.get(
			`posts/${pk}/metrics?type=${paramsValue}`
		);
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post metrics:", error);
		throw error;
	}
};

export const likePost = async (pk) => {
	try {
		const response = await api.post(`posts/${pk}/like`);
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post likes:", error);
		throw error;
	}
};

export const composePost = async (data) => {
	try {
		const response = await api.post("compose/post", { data });
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post metrics:", error);
		throw error;
	}
};
export const repostPost = async (pk) => {
	try {
		const response = await api.post(`posts/${pk}/repost`);
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post metrics:", error);
		throw error;
	}
};

export const replyPost = async (pk, data) => {
	try {
		const response = await api.post(`posts/${pk}/reply`, { data });
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post metrics:", error);
		throw error;
	}
};

export const quotePost = async (pk, data) => {
	try {
		const response = await api.post(`posts/${pk}/quote`, { data });
		return response.data;
	} catch (error) {
		// Handle and log the error
		console.error("Error fetching post metrics:", error);
		throw error;
	}
};
