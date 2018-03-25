import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors, {
	ButtonContainer,
	StyledPageTitle,
	SpaceBetweenRow,
	StyledSecText,
	CenterView
} from './Styled';
import { getPercentage, pluralize } from '../Utils/Helpers';
import { setLocalNotification, clearLocalNotification } from '../Utils/Notification';
import TouchButton from './TouchButton';
import { saveCompletedDeck } from '../Actions';

class Quiz extends Component {
	state = {
		questionIdx: 0,
		correct: [],
		showAnswer: false,
		complete: false,
		animatedOpacityIn: new Animated.Value(0),
		animatedOpacityOut: new Animated.Value(1),
	};

	handleShowAnswer = () => {
		const { animatedOpacityOut, animatedOpacityIn } = this.state;

		Animated.timing(animatedOpacityOut, { toValue: 0, duration: 300 }).start(() => {
			this.setState({ showAnswer: true });

			Animated.timing(animatedOpacityIn, { toValue: 1, duration: 300 }).start();
		});
	};

	handleAnswer = pontuation => {
		this.setState(prevState => {
			const { deck } = this.props;
			const questionIdx = prevState.questionIdx + 1;
			let correct = prevState.correct;
			if(pontuation) correct = prevState.correct.concat(questionIdx);

			let newState = {
				correct,
				showAnswer: false,
				animatedOpacityOut: new Animated.Value(1),
				animatedOpacityIn: new Animated.Value(0)
			};

			if( questionIdx === deck.questions.length ) {
				newState = {
					...newState,
					complete: true
				}

				clearLocalNotification()
					.then(setLocalNotification);

				this.props.dispatch(saveCompletedDeck(deck));
			} else {
				newState= {
					...newState,
					questionIdx
				}
			}

			return newState;
		});
	};

	handleRestart = () => {
		this.setState({
			questionIdx: 0,
			correct: [],
			showAnswer: false,
			complete: false,
			animatedOpacityOut: new Animated.Value(1),
			animatedOpacityIn: new Animated.Value(0)
		});
	};

	render() {
		const { deck, navigation } = this.props;
		const { questionIdx,
				correct,
				showAnswer,
				complete,
				animatedOpacityOut,
				animatedOpacityIn
		} = this.state;
		const currentCard = deck.questions[questionIdx];
		const StyledAnimatedShowAnswer = Animated.createAnimatedComponent(CenterView);

		if(complete) {
			return (
				<CenterView>
					<StyledPageTitleCenter> 🎉 🎉 🎉 </StyledPageTitleCenter>
					<StyledPageTitleCenter>Congratulations!!! You got {correct.length} out of {deck.questions.length} {pluralize(deck.questions.length, 'question')}</StyledPageTitleCenter>
					<StyledPageTitleCenter>Average score: {getPercentage(correct.length, deck.questions.length)}</StyledPageTitleCenter>

					<ButtonContainer>
						<TouchButton category={deck.category} onPress={this.handleRestart}>Restart Quiz</TouchButton>
						<TouchButton onPress={() => navigation.navigate('Home')}>Back to Deck List</TouchButton>
					</ButtonContainer>
				</CenterView>
			);
		};

		return (
			<View style={{flex: 1}}>
				<View>
					<SpaceBetweenRow>
						<StyledPageTitle>{questionIdx + 1}/{deck.questions.length}</StyledPageTitle>
					</SpaceBetweenRow>
					<StyledSecText style={{fontSize: 28}}>{currentCard.question}</StyledSecText>
				</View>

				{!showAnswer && (
					<StyledAnimatedShowAnswer style={{opacity: animatedOpacityOut}}>
						<Text style={{fontSize: 70}}>🤔</Text>

						<ButtonContainer>
							<TouchButton category={deck.category} onPress={this.handleShowAnswer}>Check Answer</TouchButton>
						</ButtonContainer>
					</StyledAnimatedShowAnswer>
				)}

				{showAnswer && (
					<CenterView>
						<Animated.View style={{padding: 20, backgroundColor: '#fff', opacity: animatedOpacityIn}}>
							<Text style={{fontSize: 22, textAlign: 'center'}}>{currentCard.answer}</Text>
							<View style={{flexDirection: 'row'}}>
								<StyledThumbs onPress={() => this.handleAnswer(true)} type="success">
									<MaterialCommunityIcons name="thumb-up" color="#fff" size={50}/>
								</StyledThumbs>
								<StyledThumbs onPress={() => this.handleAnswer(false)} type="fail">
									<MaterialCommunityIcons name="thumb-down" color="#fff" size={50}/>
								</StyledThumbs>
							</View>
						</Animated.View>
					</CenterView>
				)}
			</View>
		);
	};
};

const StyledThumbs = styled.TouchableOpacity`
	background-color: ${props => colors[props.type]}
	border-radius: 70px
	margin: 20px;
	padding: 20px;
`;

const StyledPageTitleCenter = StyledPageTitle.extend`
	text-align: center;
`

const mapStateToProps = (decks, currProps) => {
	const { title } = currProps.navigation.state.params;
	const deck = decks[title];

	return {
		deck
	}
};

export default connect(mapStateToProps)(Quiz);
