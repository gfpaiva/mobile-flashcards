import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'MobileFlashcards:decks';

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

export const saveDeckTitle = ({ title, category }) => {
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			category,
			questions: [],
			complete: false
		}
	}));
};

export const addCardToDeck = (question, deck) => {
	const newQuestions = deck.questions.concat(question);

	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[deck.title]: {
			...deck[deck.title],
			questions: newQuestions
		}
	}));
};

export const setCompletedDeck = (deck) => {

	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[deck.title]: {
			...deck[deck.title],
			complete: true
		}
	}));
};
