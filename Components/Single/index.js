import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal } from 'react-native';
import { saveDeck } from '../../Actions';
import NotFound from './NotFound';

class Single extends Component {
	state = {
		addCardModal: false
	};

	static navigationOptions = ( { navigation } ) => {
		const { title } = navigation.state.params;

		return {
			title
		}
	};

	openInsertModal = () => {
		this.setState({
			addCardModal: true
		});
	}

	render() {
		const { card } = this.props;
		const { addCardModal } = this.state;

		return (
			<View style={{flex: 1}}>
				{(!card.questions || card.questions.length <= 0) && <NotFound openInsertModal={this.openInsertModal} />}

				<Text>ESTOU NA SINGLE :D</Text>
				<Text>{JSON.stringify(card)}</Text>
			</View>
		);
	};
};

const mapStateToProps = (cards, currProps) => {
	const { title } = currProps.navigation.state.params;
	const card = cards[title]

	return {
		card
	}
};

export default connect(mapStateToProps)(Single);
