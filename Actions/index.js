import * as API from '../Utils/API';

export const RECEIVE_CARDS = 'RECEIVE_CARDS';

export const receiveCards = cards => ({
	type: RECEIVE_CARDS,
	cards
});

export const getStorageCards = () => dispatch => (
	API.getDecks()
		.then(cards => dispatch(receiveCards(cards)))
);

