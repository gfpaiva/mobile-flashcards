import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'MobileFlashcards:cards';

export const getDecks = () => {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then(res => {
			// If alredy has results return it all
			if(res) return res;

			// Or set a empty object and return it
			return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}))
				.then(() => (AsyncStorage.getItem(STORAGE_KEY)));
		})
		.then(res => JSON.parse(res));
};


export const getDeckById = ({ id }) => {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then(res => {
			results = JSON.parse(res);

			return results[id]
		});
};

export const saveDeckTitle = ({ id, title }) => {
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[id]: {
			title,
			questions: []
		}
	}));
};

export const addCardToDeck = ({ id, question }) => {
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[id]: {
			questions: [
				...[id].questions,
				question
			]
		}
	}));
};
