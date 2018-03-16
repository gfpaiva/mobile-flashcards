import {
	RECEIVE_CARDS,
	SAVE_DECK
} from '../Actions';

const initialState = {};


export default function cards(state = initialState, action) {
	const { deck } = action;
	switch(action.type) {
		case RECEIVE_CARDS:
			return {
				...state,
				...action.cards
			}
		case SAVE_DECK:
			return {
				...state,
				[deck.title]: {
					title: deck.title,
					category: deck.category
				}
			}
		default:
			return state
	};
};
