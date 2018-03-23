import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors, { StyledViewContainer, getColorCateogry, ButtonContainer, StyledPageTitle, SpaceBetweenRow, StyledSecText, CenterView, StyledRow } from './Styled';
import { getPercentage } from '../Utils/Helpers';
import TouchButton from './TouchButton';

class Quiz extends Component {
	state = {
		questionIdx: 0,
		correct: [],
		showAnswer: false,
		complete: false
	};

	handleAnswer = pontuation => {
		this.setState(prevState => {
			const questionIdx = prevState.questionIdx + 1;
			let correct = prevState.correct;
			if(pontuation) correct = prevState.correct.concat(questionIdx);

			let newState = {
				correct,
				showAnswer: false
			};

			if( questionIdx === this.props.card.questions.length ) {
				newState = {
					...newState,
					complete: true
				}
			} else {
				newState= {
					...newState,
					questionIdx
				}
			}

			return newState;
		});

		if(this.state.complete) {
			alert('COMPLETED');
		}
	};

	render() {
		const { card } = this.props;
		const { questionIdx, correct, showAnswer, complete } = this.state
		const currentCard = card.questions[questionIdx];

		if(complete) {
			return (
				<CenterView>
					<StyledPageTitle>🎉Completed {card.title}🎉</StyledPageTitle>
					<Text>You have been completed this quiz with {correct.length} corrected questions of {card.questions.length}</Text>
					<Text>Accuracy of {getPercentage(correct.length, card.questions.length)}</Text>
				</CenterView>
			);
		}

		return (
			<View style={{flex: 1}}>
				<View>
					<SpaceBetweenRow>
						<StyledPageTitle>{questionIdx + 1}/{card.questions.length}</StyledPageTitle>
					</SpaceBetweenRow>
					<StyledSecText>{currentCard.question}</StyledSecText>
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
						<View>
							<Text style={{fontSize: 70}}>{currentCard.answer}</Text>
						</View>
						<View>
							<StyledRow>
								<StyledThumbs onPress={() => this.handleAnswer(true)} type="success">
									<MaterialCommunityIcons name="thumb-up" color="#fff" size={50}/>
								</StyledThumbs>
								<StyledThumbs onPress={() => this.handleAnswer(false)} type="fail">
									<MaterialCommunityIcons name="thumb-down" color="#fff" size={50}/>
								</StyledThumbs>
							</StyledRow>
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
`;

const mapStateToProps = (cards, currProps) => {
	const { title } = currProps.navigation.state.params;
	const card = cards[title];

	return {
		card
	}
};

export default connect(mapStateToProps)(Quiz);
