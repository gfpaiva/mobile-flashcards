import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import colors from './Styled';

const buttonSize = 60;

const AddButton = ( { ...props } ) => (
	<ButtonContainer>
		<Circle {...props}>
			<MaterialCommunityIcons name="plus" size={buttonSize} color='#fff' />
		</Circle>
	</ButtonContainer>
);

const Circle = styled.TouchableOpacity`
	background-color: ${colors.success};
	width: ${buttonSize};
	height: ${buttonSize};
	border-radius: ${buttonSize};
`;

const ButtonContainer = styled.View`
	position: absolute;
	right: 30;
	bottom: 30;
`;

export default AddButton;
