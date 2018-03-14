import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Picker } from 'react-native';
import styled from "styled-components";
import { saveDeck } from '../Actions';
import colors, { StyledInput, StyledPicker } from './Styled';
import TouchButton from './TouchButton';
import ViewTitle from './ViewTitle';

class Home extends Component {
	state = {
		input: '',
		category: '',
		inputError: false,
	};

	_handleInputChange = input => {
		let newState = {
			input
		};

		if(this.state.inputError && input.length > 0) {
			newState = {
				input,
				inputError: false
			};
		}

		this.setState(newState);
	};

	_handleSelectChange = category => {
		this.setState({
			category
		});
	};

	_handleSave = () => {
		const { input, category } = this.state;

		if(!input) {
			this.setState({
				inputError: true
			});

			return;
		}

		const deck = {
			title: input,
			category
		};

		this.props.dispatch(saveDeck(deck));

		this.setState({
			input: '',
			category: ''
		});

		this.props.navigation.navigate('Home');
	};

	render() {
		const { input, inputError, category } = this.state;

		return (
			<KeyboardAvoidingView behavior='padding' style={{flex: 1, padding: 20}}>
				<ViewTitle>Add a new Deck</ViewTitle>
				<TextLabel>Deck Title: </TextLabel>
				<StyledInput value={input} onChangeText={this._handleInputChange} placeholder="Type here..." underlineColorAndroid={inputError ? colors.fail : colors.secondary} />
				{inputError && <ErrorLabel>Deck title is required</ErrorLabel>}

				<TextLabel>Deck Category: </TextLabel>
				<StyledPicker selectedValue={category} onValueChange={this._handleSelectChange} mode='dropdown'>
					<Picker.Item label="Software Development" value="software" />
					<Picker.Item label="Mathematics" value="math" />
					<Picker.Item label="Literature" value="literature" />
					<Picker.Item label="General Knowledge" value="general" />
				</StyledPicker>

				<TouchButton onPress={this._handleSave}>Save Deck</TouchButton>
			</KeyboardAvoidingView>
		);
	}
};

const TextLabel = styled.Text`
	margin-top: 30px
`;

const ErrorLabel = styled.Text`
	color: ${colors.fail}
`;

const mapStateToProps = (cards) => ({ cards });

export default connect(mapStateToProps)(Home);
