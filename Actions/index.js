import * as API from '../Utils/API';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const SAVE_DECK = 'SAVE_DECK';
export const SAVE_CARD = 'SAVE_CARD';
export const COMPLETED_DECK = 'COMPLETED_DECK';

export const receiveDecks = decks => ({
	type: RECEIVE_DECKS,
	decks
});

export const getStorageDecks = () => dispatch => (
	API.getDecks()
		.then(decks => {
			console.log(decks);
			return dispatch(receiveDecks(decks));
		})
);

export const saveDeck = deck => {
	API.saveDeckTitle(deck);

	return {
		type: SAVE_DECK,
		deck
	};
};

export const saveCard = (card, deck) => {
	API.addCardToDeck(card, deck);

	return {
		type: SAVE_CARD,
		deck,
		card,
	};
};

export const saveCompletedDeck = deck => {
	API.setCompletedDeck(deck);

	return {
		type: COMPLETED_DECK,
		deck
	}
}

