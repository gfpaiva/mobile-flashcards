import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Picker, View, Keyboard, Alert } from 'react-native';
import styled from 'styled-components';
import { saveDeck } from '../Actions';
import colors, { StyledInput, StyledPicker, ErrorLabel, StyledTextLabel } from './Styled';
import TouchButton from './TouchButton';

class AddDeck extends Component {
	state = {
		input: '',
		category: 'software',
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
			category,
			questions: [],
			complete: false
		};

		this.props.dispatch(saveDeck(deck));

		this.setState({
			input: '',
			category: ''
		});

		Keyboard.dismiss();

		Alert.alert(
			'Add Cards?',
			'Do you want to add cards in your deck now?',
			[{
				text: 'No',
				onPress: () => this.props.navigation.navigate('Home')
			}, {
				text: 'Yes',
				onPress: () => this.props.navigation.navigate('Single', { title: deck.title, modal: true })
			}]
		)
	};

	render() {
		const { input, inputError, category } = this.state;

		return (
			<KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100} style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
				<View style={{flex: 1}}>
					<StyledTextLabel>Title</StyledTextLabel>
					<StyledInput value={input} onChangeText={this._handleInputChange} placeholder="Type here..." underlineColorAndroid={inputError ? colors.fail : '#dadada'} />
					{inputError && <ErrorLabel>Deck title is required</ErrorLabel>}

					<StyledTextLabel>Category</StyledTextLabel>
					<StyledPicker>
						<Picker selectedValue={category} onValueChange={this._handleSelectChange} mode='dropdown'>
							<Picker.Item label="Software Development" value="software" />
							<Picker.Item label="Mathematics" value="math" />
							<Picker.Item label="Literature" value="literature" />
							<Picker.Item label="General Knowledge" value="general" />
						</Picker>
					</StyledPicker>

					<ButtonContainer>
						<TouchButton onPress={this._handleSave}>Save</TouchButton>
					</ButtonContainer>
				</View>
			</KeyboardAvoidingView>
		);
	}
};

const ButtonContainer = styled.View`
	position: absolute;
	left: -20;
	right: -20;
	bottom: 0;
`;

const mapStateToProps = (cards) => ({ cards });

export default connect(mapStateToProps)(AddDeck);
