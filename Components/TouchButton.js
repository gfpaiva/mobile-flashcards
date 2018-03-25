import React from 'react';
import styled from 'styled-components';
import colors, { getColorCateogry } from './Styled';

const TouchButton = ({ children, ...props }) => (
	<TouchableRow {...props}>
		<StyledButton>{children}</StyledButton>
	</TouchableRow>
);

const TouchableRow = styled.TouchableOpacity`
	background-color: ${props => props.type ? colors[props.type] : ( props.category ) ? getColorCateogry(props.category) : colors.primaryD };
	flex-direction: row;
	padding: 22px 0;
`;

const StyledButton = styled.Text`
	color: #fff;
	flex: 1;
	font-size: 18;
	text-align: center
`;

export default TouchButton;
