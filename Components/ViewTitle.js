import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import colors, { ColorText, StyledRow } from './Styled';

const TouchButton = ({ children, ...props }) => (
	<TitleContainer>
		<Line></Line>
		<ViewTitle {...props}>{children}</ViewTitle>
		<Line></Line>
	</TitleContainer>
);

const TitleContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-bottom: 28
`;

const ViewTitle = ColorText.extend`
	font-weight: bold;
	font-size: 28;
	text-align: center;
`;

const Line = styled.View`
	height: 1px;
	flex: 1;
	alignSelf: center;
	margin: 0 15px;
	background-color: ${colors.secondary}
`;

export default TouchButton;
