import styled from "styled-components";

const colors = {
	primary: '#7db6ff',
	secondary: '#555555',
	success: '#a9e16f',
	warning: '#ffe834',
	fail: '#ff7777'
};

export const StyledScrollContainer = styled.ScrollView`
	padding: 20px
`;

export const StyledViewContainer = styled.View`
	padding: 20px
`;

export const StyledRow = StyledViewContainer.extend`
	flex: 1;
	flex-direction: row;
	align-items: center;
`;

export const ColorText = styled.Text`
	color: ${colors.secondary}
`;

export const StyledInput = styled.TextInput`
	color: ${colors.secondary}
	font-size: 18;
	padding: 18px 0;
	width: 100%
`;

export const StyledPicker = styled.Picker`
	background-color: #ededed;
	color: ${colors.secondary}
	padding: 18px 0;
	width: 100%
`;

// https://coolors.co/272932-4d7ea8-d87f7f-fffd98-bde4a7
export default colors;
