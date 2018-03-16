import * as API from '../Utils/API';

export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const SAVE_DECK = 'SAVE_DECK';
export const SAVE_CARD = 'SAVE_CARD';

export const receiveCards = cards => ({
	type: RECEIVE_CARDS,
	cards
});

export const getStorageCards = () => dispatch => (
	API.getDecks()
		.then(cards => dispatch(receiveCards(cards)))
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
		card,
		deck
	};
};

