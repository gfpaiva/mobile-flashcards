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
		screen: AddDeck,
		navigationOptions: {
			title: 'Add a new deck'
		}
	},
	Single: {
		screen: Single,
	}
}, {
	navigationOptions: {
		headerTintColor: '#fff',
		headerStyle: {
			backgroundColor: colors.primary
		}
	}
});

export default MainNav;
