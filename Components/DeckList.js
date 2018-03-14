import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from "styled-components";
import { values as _values } from 'lodash';
import { pluralize } from '../Utils/Helpers';
import colors, { ColorText, StyledRow } from './Styled';
import ViewTitle from './ViewTitle';

const DeckList = ( { cards } ) => (
	<View>
		<ViewTitle>Current {pluralize(cards, 'Deck')}</ViewTitle>

		{(!cards || cards.length <= 0) && <Text>You don´t have any deck😐</Text>}

		{cards && cards.length > 0 && cards.map((card, index) => (
			<StyledTouch key={index} onPress={() => alert(0)}>
				<StyledIcon name="cards-outline" size={32} color="#fff" />

				<StyledDeckRow>
					<CardTitle>{card.title}</CardTitle>
					{
						(card.questions && card.questions.length > 0) ? (
							<Text>{card.questions.length} {pluralize(card.questions, 'card')}</Text>
						) : <Text>0 cards 😐</Text>
					}
				</StyledDeckRow>
			</StyledTouch>
		))}
	</View>
);

const StyledTouch = styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${colors.secondary}
	padding: 20px;
`;

// View
const StyledDeckRow = StyledRow.extend`
	justify-content: space-between;
`;

const StyledIcon = styled(MaterialCommunityIcons)`
	background-color: ${props => props.bgColor ? props.bgColor : colors.primary};
	border-radius: 64;
	padding: 15px;
	width: 64;
	height: 64;
`;

// Text
const CardTitle = ColorText.extend`
	font-size: 20
`

const mapStateToProps = cards => {
	const cardsInArray = _values(cards);

	return {
		cards: cardsInArray
	}
};

export default connect(mapStateToProps)(DeckList);
