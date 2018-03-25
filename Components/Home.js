import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { AppLoading } from 'expo';
import { getStorageDecks } from '../Actions';
import { StyledScroll } from './Styled';
import DeckList from './DeckList';
import AddButton from './AddButton';

class Home extends Component {
	state = {
		isReady: false
	};

	fetchDecks = () => this.props.dispatch(getStorageDecks());

	render() {
		const { isReady } = this.state;

		if (!isReady) {
			return (
				<AppLoading
					startAsync={this.fetchDecks}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}

		return (
			<View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
				<ScrollView>
					<DeckList />
				</ScrollView>
				<AddButton onPress={() => this.props.navigation.navigate('AddDeck')} />
			</View>
		)
	}
};

export default connect(null)(Home);
