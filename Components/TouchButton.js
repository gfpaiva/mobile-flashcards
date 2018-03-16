import React from 'react';
import styled from 'styled-components';
import colors from './Styled';

const TouchButton = ({ children, ...props }) => (
	<TouchableRow {...props}>
		<StyledButton>{children}</StyledButton>
	</TouchableRow>
);

const TouchableRow = styled.TouchableOpacity`
	background-color: ${props => props.success ? colors.success : (props.warning ? colors.warning : colors.primaryD ) };
	flex-direction: row;
	padding: 22px 0;
`;

const StyledButton = styled.Text`
	color: #fff;
	font-size: 18;
	flex: 1
	text-align: center
`;

export default TouchButton;
