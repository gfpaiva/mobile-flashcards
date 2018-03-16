import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import colors from './Styled';

const LinkText = ({ children, ...props }) => (
	<TouchableOpacity {...props}>
		<StyledLink>{children}</StyledLink>
	</TouchableOpacity>
);

const StyledLink = styled.Text`
	color: ${colors.primary};
	text-decoration: underline;
`;

export default LinkText;
