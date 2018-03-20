import { StackNavigator } from 'react-navigation';
import Home from './Home';
import AddDeck from './AddDeck';
import Single from './Single';
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
		screen: Single,
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
