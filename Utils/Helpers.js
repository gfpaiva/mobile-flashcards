import { Dimensions } from 'react-native';

export function pluralize(array, word) {
	return array.length > 1 ? `${word}s` : word;
};

const categories = {
	software: 'Software Development',
	math: 'Mathematics',
	literature: 'Literature',
	general: 'General Knowledge',
};

export const getCategoryName = category => categories[category];


// *SLIDER OPTS*
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const slideHeight = viewportHeight * 0.50;
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
// */SLIDER OPTS*