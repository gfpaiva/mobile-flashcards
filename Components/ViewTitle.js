import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import colors, { ColorText, StyledRow } from './Styled';

const TouchButton = ({ children, ...props }) => (
	<StyledRow>
		<Line></Line>
		<ViewTitle {...props}>{children}</ViewTitle>
		<Line></Line>
	</StyledRow>
);

const ViewTitle = ColorText.extend`
	font-weight: bold;
	font-size: 32;
	margin-bottom: 32px;
	text-align: center;
`;

const Line = styled.View`
	height: 1px;
	width: 100px;
	background-color: ${colors.secondary}
`;

export default TouchButton;
