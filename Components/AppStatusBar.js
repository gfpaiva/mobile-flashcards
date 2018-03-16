import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import colors from './Styled';

const AppStatusBar = props => (
	<View style={{ backgroundColor: '#64a8ff', height: Constants.statusBarHeight }}>
		<StatusBar translucent backgroundColor='#64a8ff' {...props} />
	</View>
);

export default AppStatusBar;
