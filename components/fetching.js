import { API_ENDPOINT } from "@env";

const fetchPost = async ({ query }) => {
	// console.log("Query is: ", JSON.stringify(query, null, 1));
	try {
		const response = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(query),
		});
		// console.log("Response data: ", response);
		return await response.json();
	} catch (err) {
		console.warn("Error at fetch: ", err);
		throw err; // Re-throw the error to handle it in the calling code
	}
};

export default fetchPost;
