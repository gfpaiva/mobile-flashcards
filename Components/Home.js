import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { AppLoading } from 'expo';
import { getStorageCards } from '../Actions';
import { StyledScroll } from './Styled';
import DeckList from './DeckList';
import AddButton from './AddButton';

class Home extends Component {
	state = {
		isReady: false
	};

	_fetchCards = () => this.props.dispatch(getStorageCards());

	render() {
		const { isReady } = this.state;

		if (!isReady) {
			return (
				<AppLoading
					startAsync={this._fetchCards}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}

		return (
			<View style={{flex: 1}}>
				<ScrollView>
					<DeckList />
				</ScrollView>
				<AddButton onPress={() => this.props.navigation.navigate('AddDeck')} />
			</View>
		)
	}
};

const mapStateToProps = (cards) => ({ cards });

export default connect(mapStateToProps)(Home);
