import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors, { StyledViewContainer, getColorCateogry, ButtonContainer, StyledPageTitle, SpaceBetweenRow, StyledSecText, CenterView, StyledRow } from './Styled';
import TouchButton from './TouchButton';

class Quiz extends Component {
	state = {
		questionIdx: 0,
		correct: 0,
		showAnswer: false,
		complete: false
	};

	handleAnswer = pontuation => {
		this.setState(prevState => {
			const questionIdx = prevState.questionIdx + 1;
			const correct = prevState.correct + pontuation;

			if( questionIdx === this.props.card.questions.length )

			return {
				questionIdx,
				correct,
				showAnswer: false
			}
		});
	}

	render() {
		const { card } = this.props;
		const { questionIdx, correct, showAnswer } = this.state
		const currentCard = card.questions[questionIdx];

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
								<StyledThumbs onPress={} type="success">
									<MaterialCommunityIcons name="thumb-up" color="#fff" size={50}/>
								</StyledThumbs>
								<StyledThumbs type="fail">
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
