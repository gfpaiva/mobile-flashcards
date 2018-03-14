import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './Store';
import AppStatusBar from './Components/AppStatusBar';
import Home from './Components/Home';
import AddDeck from './Components/AddDeck';
import { StackNavigator } from 'react-navigation';

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
			title: ''
		}
	}
});

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}}>
					<AppStatusBar />
					<MainNav />
					{/* <Home /> */}
					{/* <AddDeck /> */}
				</View>
			</Provider>
		);
	};
};
