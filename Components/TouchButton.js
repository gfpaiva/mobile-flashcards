import React from 'react';
import styled from 'styled-components';
import colors from './Styled';

const TouchButton = ({ children, ...props }) => (
	<TouchableRow {...props}>
		<StyledButton>{children}</StyledButton>
	</TouchableRow>
);

const TouchableRow = styled.TouchableOpacity`
	background-color: ${props => props.success ? colors.success : (props.warning ? colors.warning : colors.primary ) };
	border-radius: 15px;
	flex-direction: row;
	padding: 18px 0;
	margin: 11px 0;
`;

const StyledButton = styled.Text`
	color: #fff;
	font-size: 22;
	flex: 1
	text-align: center
`;

export default TouchButton;
