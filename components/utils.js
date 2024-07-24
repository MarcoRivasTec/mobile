const getFirstName = ( name ) => {
	const nameParts = name.split(" ");
	const firstName = nameParts[0];
	return firstName;
};

export default getFirstName;
