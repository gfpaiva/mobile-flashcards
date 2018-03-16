import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { saveDeck } from '../../Actions';
import NotFound from './NotFound';
import AddCard from '../AddCard';
import TouchButton from '../TouchButton';

class Single extends Component {
	state = {
		addCardModal: this.props.navigation.state.params.modal || false
	};

	static navigationOptions = ( { navigation } ) => {
		const { title } = navigation.state.params;

		return {
			title
		}
	};

	toggleModal = () => {
		this.setState({
			addCardModal: !this.state.addCardModal
		});
	}

	render() {
		const { card } = this.props;
		const { addCardModal } = this.state;

		return (
			<View style={{flex: 1}}>
				{(!card.questions || card.questions.length <= 0) && <NotFound openInsertModal={this.toggleModal} />}

				<Modal
					isVisible={addCardModal}
					onBackButtonPress={this.toggleModal}
					onBackdropPress={this.toggleModal}
					onSwipe={this.toggleModal}
					swipeDirection='down'
					style={{justifyContent: 'center'}}
				>
					<AddCard card={card} toggleModal={this.toggleModal} />
				</Modal>

				<Text>ESTOU NA SINGLE :D</Text>
				<Text>{JSON.stringify(card)}</Text>

				{(card.questions && card.questions.length > 0) && (
					<ButtonContainer>
						<TouchButton onPress={this.toggleModal}>Start Quiz</TouchButton>
						<TouchButton type="secondaryL" onPress={this.toggleModal}>Add Card</TouchButton>
					</ButtonContainer>
				)}

			</View>
		);
	};
};

const ButtonContainer = styled.View`
	position: absolute;
	left: -20;
	right: -20;
	bottom: 0;
`;

const mapStateToProps = (cards, currProps) => {
	const { title } = currProps.navigation.state.params;
	const card = cards[title]

	return {
		card
	}
};

export default connect(mapStateToProps)(Single);
