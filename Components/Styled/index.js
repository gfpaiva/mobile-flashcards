import styled from "styled-components";

const colors = {
	primary: '#7db6ff',
	primaryD: '#177dff',
	secondary: '#666666',
	secondaryL: '#888888',
	success: '#a9e16f',
	warning: '#ffe834',
	fail: '#ff7777',
};

const colorsCategories = {
	software: '#051529',
	math: '#104484',
	literature: '#1b73df',
	general: '#72aaee',
};

export const getColorCateogry = category => colorsCategories[category];

export const StyledScrollContainer = styled.ScrollView`
	padding: 20px
`;

export const StyledViewContainer = styled.View`
	padding: 20px
`;

export const StyledRow = StyledViewContainer.extend`
	align-items: center;
	flex-direction: row;
	flex: 1;
`;

export const SpaceBetweenRow = StyledRow.extend`
	align-content: center;
	flex-direction: row;
	justify-content: space-between;
`;

export const CenterView = StyledViewContainer.extend`
	align-items: center;
	flex: 1;
	justify-content: center;
`;

export const ColorText = styled.Text`
	color: ${colors.secondary}
`;

export const ColorTextSec = styled.Text`
	color: ${colors.secondaryL}
`;

export const LinkText = styled.TouchableOpacity`
	color: ${colors.primary}
`;

export const StyledSecText = ColorTextSec.extend`
	font-size: 18;
	padding: 0 20px;
`;

export const StyledInput = styled.TextInput`
	color: ${colors.secondary};
	font-size: 18;
	padding: 0 0 10px;
	width: 100%
`;

export const ErrorLabel = styled.Text`
	color: ${colors.fail}
`;

export const StyledTextLabel = ColorText.extend`
	font-size: 18;
	margin-bottom: 15px;
	margin-top: 30px;
`;

export const StyledPicker = styled.View`
	background-color: transparent;
	border: 1px solid #dadada;
	padding: 10px 0;
	width: 100%;
`;

export const ButtonContainer = styled.View`
	bottom: 0;
	left: -20;
	position: absolute;
	right: -20;
`;

export const StyledPageTitle = styled.Text`
	color: #000;
	font-size: 26;
`;

// https://coolors.co/272932-4d7ea8-d87f7f-fffd98-bde4a7
export default colors;
