import { RECEIVE_CARDS } from '../Actions';

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
