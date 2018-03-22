import { StackNavigator } from 'react-navigation';
import Home from './Home';
import AddDeck from './AddDeck';
import Single from './Single';
import Quiz from './Quiz';
import colors from './Styled';

const MainNav = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			header: null
		}
	},
	AddDeck: {
		screen: AddDeck
	},
	Single: {
		screen: Single
	},
	Quiz: {
		screen: Quiz,
	}
}, {
	navigationOptions: {
		headerTintColor: '#000',
		headerStyle: {
			backgroundColor: 'transparent'
		}
	}
});

export default MainNav;
