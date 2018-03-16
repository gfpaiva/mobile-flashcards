import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './Store';
import AppStatusBar from './Components/AppStatusBar';
import MainNav from './Components/MainNav';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}}>
					<AppStatusBar />
					<MainNav />
				</View>
			</Provider>
		);
	};
};
