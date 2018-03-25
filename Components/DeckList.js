import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from "styled-components";
import { withNavigation } from 'react-navigation';
import { values as _values } from 'lodash';
import { pluralize } from '../Utils/Helpers';
import colors, {
	ColorText,
	ColorTextSec,
	StyledRow,
	StyledViewContainer,
	getColorCateogry
} from './Styled';

const SlingeList = ( { decks, title, navigation } ) => (
	<View>
		{decks && decks.length > 0 && (
			<StyledViewContainer style={{marginTop: 20}}>
				<ColorTextSec>{title}</ColorTextSec>
			</StyledViewContainer>
		)}

		{decks && decks.length > 0 && decks.map((deck, index) => (
			<StyledTouch key={index} onPress={() => navigation.navigate('Single', { title: deck.title })}>
				<StyledIcon name="cards-outline" size={32} color="#fff" bgColor={getColorCateogry(deck.category)} />

				<StyledDeckRow>
					<CardTitle>{deck.title}</CardTitle>
					<ColorTextSec> {(deck.questions && deck.questions.length > 0) ? `${deck.questions.length} ${pluralize(deck.questions, 'card')}` : '0 cards 😐' } </ColorTextSec>
				</StyledDeckRow>
			</StyledTouch>
		))}
	</View>
);

const DeckList = ( { decks, navigation, currentDecks, archivedDecks } ) => {

	if(!decks || decks.length <= 0) {
		return (
			<View>
				<NotFoundText>You don't have any deck yet 😐.</NotFoundText>
				<NotFoundText style={{marginTop: 0}}>Tap the button to start.</NotFoundText>
			</View>
		);
	}

	return (
		<View>
			<SlingeList decks={currentDecks} title="CURRENT" navigation={navigation}/>
			<SlingeList decks={archivedDecks} title="COMPLETED DECKS" navigation={navigation}/>
		</View>
	);
};

const StyledTouch = styled.TouchableOpacity`
	background-color: #ffffff;
	border-bottom-color: #dadada;
	border-bottom-width: 1px;
	flex-direction: row;
	flex: 1;
	padding: 20px;
`;

// View
const StyledDeckRow = StyledRow.extend`
	justify-content: space-between;
`;

const StyledIcon = styled(MaterialCommunityIcons)`
	background-color: ${props => props.bgColor ? props.bgColor : colors.primary};
	border-radius: 64;
	height: 64;
	padding: 15px;
	width: 64;
`;

const CardTitle = ColorText.extend`
	font-size: 20
`

const NotFoundText = ColorTextSec.extend`
	font-size: 22;
	margin-top: 100;
	text-align: center;
`

const mapStateToProps = decks => {
	const decksInArray = _values(decks);
	const currentDecks = decksInArray.filter(deck => !deck.complete);
	const archivedDecks = decksInArray.filter(deck => deck.complete);

	return {
		decks: decksInArray,
		currentDecks,
		archivedDecks
	}
};

export default withNavigation(connect(mapStateToProps)(DeckList));
