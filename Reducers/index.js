import {
	RECEIVE_CARDS,
	SAVE_DECK
} from '../Actions';

const initialState = {
	React: {
		title: 'React',
		questions: [{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [{
			question: 'What is a closure?',
			answer: 'The combination of a function and the lexical environment within which that function was declared.'
		}]
	}
}


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
