import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { getStorageCards } from '../Actions';
import { StyledInput } from './Styled';
import TouchButton from './TouchButton';
import ViewTitle from './ViewTitle';

class Home extends Component {
	state = {
		input: ''
	};

	_handleInputChange = input => {
		this.setState({
			input
		});
	};

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
				<ViewTitle>Add a new Deck</ViewTitle>
				<StyledInput value={this.state.input} onChangeText={this._handleInputChange} placeholder="Deck Title" />
				<TouchButton success onPress={() => alert(0)}>Teste</TouchButton>
			</KeyboardAvoidingView>
		);
	}
};

const mapStateToProps = (cards) => ({ cards });

export default connect(mapStateToProps)(Home);
