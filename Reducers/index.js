import { RECEIVE_CARDS } from '../Actions';

export default function cards(state = {}, action) {
	switch(action.type) {
		case RECEIVE_CARDS:
			return {
				...state,
				...action.cards
			}
		default:
			return state
	}
};
