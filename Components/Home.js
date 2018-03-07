import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { AppLoading } from 'expo';
import { getStorageCards } from '../Actions';
import DeckList from './DeckList';
import { StyledScroll } from './Styled';

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
			<ScrollView>
				<Text>{JSON.stringify(this.props)}</Text>

				<DeckList />
			</ScrollView>
		)
	}
};

const mapStateToProps = (cards) => ({ cards });

export default connect(mapStateToProps)(Home);
