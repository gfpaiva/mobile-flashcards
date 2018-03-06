import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

const AppStatusBar = props => (
	<View style={{ backgroundColor: '#000', height: Constants.statusBarHeight }}>
		<StatusBar translucent backgroundColor='#000' {...props} />
	</View>
);

export default AppStatusBar;
