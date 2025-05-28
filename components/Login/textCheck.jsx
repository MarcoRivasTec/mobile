export function handleTextChange(text, setInputValue) {
    // Validate input using regular expression
    const regex = /^[0-9]*$/; // Allow only numbers 0-9
    if (regex.test(text)) {
      setInputValue(text);
    }
};

export function createSetInputValue(setFields, fieldName) {
  return (value) => {
      setFields({ [fieldName]: value });
  };
}