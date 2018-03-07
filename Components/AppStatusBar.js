import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

const AppStatusBar = props => (
	<View style={{ backgroundColor: '#7992A8', height: Constants.statusBarHeight }}>
		<StatusBar translucent backgroundColor='#7992A8' {...props} />
	</View>
);

export default AppStatusBar;
