const endpoint = "http://10.3.1.144:4000/graphql";

const fetchPost = async ({ query }) => {
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(query),
		});
		return await response.json();
	} catch (err) {
		console.warn("Error at fetch: ", err);
		throw err; // Re-throw the error to handle it in the calling code
	}
};

export default fetchPost;
