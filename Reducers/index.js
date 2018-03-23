import {
	RECEIVE_CARDS,
	SAVE_DECK,
	SAVE_CARD,
	COMPLETED_DECK,
} from '../Actions';

const initialState = {};


export default function cards(state = initialState, action) {
	const { deck, card } = action;
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
					...deck
				}
			}
		case SAVE_CARD:
			const newQuestions = state[deck.title].questions.concat(card);

			return {
				...state,
				[deck.title]: {
					...state[deck.title],
					questions : newQuestions
				}
			}
		case COMPLETED_DECK:
			return {
				...state,
				[deck.title]: {
					...state[deck.title],
					complete: true
				}
			}
		default:
			return state
	};
};
