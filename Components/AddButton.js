import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import colors from './Styled';

const buttonSize = 72;

const AddButton = ( { ...props } ) => (
	<ButtonContainer>
		<Circle {...props}>
			<MaterialCommunityIcons name="plus" size={36} color='#fff' />
		</Circle>
	</ButtonContainer>
);

const Circle = styled.TouchableOpacity`
	align-items: center;
	background-color: ${colors.primaryD};
	border-radius: ${buttonSize};
	height: ${buttonSize};
	justify-content: center;
	width: ${buttonSize};
`;

const ButtonContainer = styled.View`
	bottom: 30;
	position: absolute;
	right: 30;
`;

export default AddButton;
