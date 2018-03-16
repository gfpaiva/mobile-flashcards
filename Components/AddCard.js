import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components';
import { saveCard } from '../Actions'
import colors, { StyledInput, ErrorLabel, StyledTextLabel } from './Styled';
import TouchButton from './TouchButton';


class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		questionError: false,
		answerError: false,
	};

	_handleQuestionChange = question => {
		let newState = {
			question
		};

		if(this.state.questionError && question.length > 0) {
			newState = {
				question,
				questionError: false
			};
		}

		this.setState(newState);
	};

	_handleAnswerChange = answer => {
		let newState = {
			answer
		};

		if(this.state.answerError && answer.length > 0) {
			newState = {
				answer,
				answerError: false
			};
		}

		this.setState(newState);
	};

	_handleSave = () => {
		const { card, dispatch, toggleModal } = this.props;
		const { question, answer } = this.state;

		if(!question) {
			this.setState({
				questionError: true
			});

			return;
		}

		if(!answer) {
			this.setState({
				answerError: true
			});

			return;
	}

		const newQuestion = {
			question,
			answer
		};

		dispatch(saveCard(newQuestion, card));

		this.setState({
			question: '',
			answer: '',
			questionError: false,
			answerError: false,
		});

		Keyboard.dismiss();

		toggleModal();
	}

	render() {
		const { question, answer, questionError, answerError } = this.state;

		return (
			<KeyboardAvoidingView behavior={'padding'} style={{paddingRight: 20, paddingLeft: 20, backgroundColor: '#fff'}}>
				<StyledTextLabel>Question</StyledTextLabel>
				<StyledInput value={question} onChangeText={this._handleQuestionChange} placeholder="Type here..." underlineColorAndroid={questionError ? colors.fail : '#dadada'} />
				{questionError && <ErrorLabel>Question is required</ErrorLabel>}

				<StyledTextLabel>Answer</StyledTextLabel>
				<StyledInput value={answer} onChangeText={this._handleAnswerChange} placeholder="Type here..." underlineColorAndroid={answerError ? colors.fail : '#dadada'} />
				{answerError && <ErrorLabel>Answer is required</ErrorLabel>}

				<ButtonContainer>
					<TouchButton onPress={this._handleSave}>Save</TouchButton>
				</ButtonContainer>
			</KeyboardAvoidingView>
		);
	}
};

const ButtonContainer = styled.View`
	margin: 20px -20px 0 -20px;
`;

export default connect(null)(AddCard);
