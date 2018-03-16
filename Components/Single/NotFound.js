import React from 'react';
import { Text } from 'react-native';
import { CenterView } from '../Styled';
import LinkText from '../LinkText';

const NotFound = ({ openInsertModal }) => (
	<CenterView>
		<Text>This deck don't have cards yet 😐.</Text>
		<LinkText onPress={openInsertModal}>Add a new one.</LinkText>
	</CenterView>
);

export default NotFound;
