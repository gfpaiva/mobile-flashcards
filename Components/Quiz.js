import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors, { StyledViewContainer, getColorCateogry, ButtonContainer, StyledPageTitle, SpaceBetweenRow, StyledSecText, CenterView, StyledRow } from './Styled';
import { getPercentage, pluralize } from '../Utils/Helpers';
import TouchButton from './TouchButton';
import { saveCompletedDeck } from '../Actions';

class Quiz extends Component {
	state = {
		questionIdx: 0,
		correct: [],
		showAnswer: false,
		complete: false
	};

	handleAnswer = pontuation => {
		this.setState(prevState => {
			const { card } = this.props;
			const questionIdx = prevState.questionIdx + 1;
			let correct = prevState.correct;
			if(pontuation) correct = prevState.correct.concat(questionIdx);

			let newState = {
				correct,
				showAnswer: false
			};

			if( questionIdx === card.questions.length ) {
				newState = {
					...newState,
					complete: true
				}

			this.props.dispatch(saveCompletedDeck(card));
			} else {
				newState= {
					...newState,
					questionIdx
				}
			}

			return newState;
		});
	};

	render() {
		const { card, navigation } = this.props;
		const { questionIdx, correct, showAnswer, complete } = this.state
		const currentCard = card.questions[questionIdx];

		if(complete) {
			return (
				<CenterView>
					<StyledPageTitle style={{textAlign: 'center'}}> 🎉 🎉 🎉 </StyledPageTitle>
					<StyledPageTitle style={{textAlign: 'center'}}>Congratulations!!! You got {correct.length} out of {card.questions.length} {pluralize(card.questions.length, 'question')}</StyledPageTitle>
					<StyledPageTitle style={{textAlign: 'center'}}>Average score: {getPercentage(correct.length, card.questions.length)}</StyledPageTitle>

					<ButtonContainer>
						<TouchButton category={card.category} onPress={() => navigation.navigate('Home')}>Back to home</TouchButton>
					</ButtonContainer>
				</CenterView>
			);
		}

		return (
			<View style={{flex: 1}}>
				<View>
					<SpaceBetweenRow>
						<StyledPageTitle>{questionIdx + 1}/{card.questions.length}</StyledPageTitle>
					</SpaceBetweenRow>
					<StyledSecText style={{fontSize: 28}}>{currentCard.question}</StyledSecText>
				</View>

				{!showAnswer && (
					<CenterView>
						<Text style={{fontSize: 70}}>🤔</Text>

						<ButtonContainer>
							<TouchButton category={card.category} onPress={() => this.setState({ showAnswer: true })}>Check Answer</TouchButton>
						</ButtonContainer>
					</CenterView>
				)}

				{showAnswer && (
					<CenterView>
						<View style={{padding: 20, backgroundColor: '#fff'}}>
							<Text style={{fontSize: 22, textAlign: 'center'}}>{currentCard.answer}</Text>
							<View style={{flexDirection: 'row'}}>
								<StyledThumbs onPress={() => this.handleAnswer(true)} type="success">
									<MaterialCommunityIcons name="thumb-up" color="#fff" size={50}/>
								</StyledThumbs>
								<StyledThumbs onPress={() => this.handleAnswer(false)} type="fail">
									<MaterialCommunityIcons name="thumb-down" color="#fff" size={50}/>
								</StyledThumbs>
							</View>
						</View>
					</CenterView>
				)}
			</View>
		);
	};
};

const StyledThumbs = styled.TouchableOpacity`
	background-color: ${props => colors[props.type]}
	padding: 20px;
	border-radius: 70px
	margin: 20px;
`;

const mapStateToProps = (cards, currProps) => {
	const { title } = currProps.navigation.state.params;
	const card = cards[title];

	return {
		card
	}
};

export default connect(mapStateToProps)(Quiz);
