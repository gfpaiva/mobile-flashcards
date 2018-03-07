export function pluralize(array, word) {
	return array.length > 1 ? `${word}s` : word;
};
