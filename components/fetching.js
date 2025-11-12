import { API_ENDPOINT } from "@env";

const fetchPost = async ({ query, token = null }) => {
	// console.log("Query is: ", JSON.stringify(query, null, 1));
	console.log("API endpoint is: ", `${API_ENDPOINT}`);
	console.log("Token is: ", `${token}`);
	try {
		// console.log("Fetching...")
		const response = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
			body: JSON.stringify(query),
		});
		// console.log("Response data after fetch: ", JSON.stringify(response, null, 1));
		return await response.json();
	} catch (err) {
		console.warn("Error at fetch: ", err);
		throw err; // Re-throw the error to handle it in the calling code
	}
};

export default fetchPost;
