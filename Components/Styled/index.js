import styled from "styled-components";

const colors = {
	primary: '#4D7EA8',
	secondary: '#272932',
	success: '#BDE4A7',
	warning: '#FFFD98',
	fail: '#D87F7F'
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

// https://coolors.co/272932-4d7ea8-d87f7f-fffd98-bde4a7
export default colors;
