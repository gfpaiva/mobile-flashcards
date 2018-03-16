import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from "styled-components";
import { withNavigation } from 'react-navigation';
import { values as _values } from 'lodash';
import { pluralize } from '../Utils/Helpers';
import colors, { ColorText, ColorTextSec, StyledRow, StyledViewContainer } from './Styled';

const DeckList = ( { cards, navigation } ) => {

	if(!cards || cards.length <= 0) {
		return (
			<View>
				<NotFoundText>You don't have any deck yet 😐.</NotFoundText>
				<NotFoundText style={{marginTop: 0}}>Tap the button to start.</NotFoundText>
			</View>
		);
	}

	return (
		<View>
			<StyledViewContainer style={{marginTop: 20}}>
				<ColorTextSec>CURRENT</ColorTextSec>
			</StyledViewContainer>

			{cards && cards.length > 0 && cards.map((card, index) => (
				<StyledTouch key={index} onPress={() => navigation.navigate('Single', { title: card.title })}>
					<StyledIcon name="cards-outline" size={32} color="#fff" />

					<StyledDeckRow>
						<CardTitle>{card.title}</CardTitle>
						<ColorTextSec> {(card.questions && card.questions.length > 0) ? `${card.questions.length} ${pluralize(card.questions, 'card')}` : '0 cards 😐' } </ColorTextSec>
					</StyledDeckRow>
				</StyledTouch>
			))}
		</View>
	);
};

const StyledTouch = styled.TouchableOpacity`
	background-color: #ffffff;
	flex: 1;
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: #dadada;
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

const CardTitle = ColorText.extend`
	font-size: 20
`

const NotFoundText = ColorTextSec.extend`
	font-size: 22;
	text-align: center;
	margin-top: 100;
`

const mapStateToProps = cards => {
	const cardsInArray = _values(cards);

	return {
		cards: cardsInArray
	}
};

export default withNavigation(connect(mapStateToProps)(DeckList));
