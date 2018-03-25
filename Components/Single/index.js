import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components';
import colors, {
	getColorCateogry,
	ButtonContainer,
	StyledPageTitle,
	SpaceBetweenRow,
	StyledSecText
} from '../Styled';
import NotFound from './NotFound';
import AddCard from '../AddCard';
import TouchButton from '../TouchButton';
import LinkText from '../LinkText';
import {
	pluralize,
	getCategoryName,
	sliderWidth,
	itemWidth,
	slideHeight
} from '../../Utils/Helpers';

class Single extends Component {
	state = {
		addCardModal: this.props.navigation.state.params.modal || false
	};

	toggleModal = () => {
		this.setState({
			addCardModal: !this.state.addCardModal
		});
	};

	_renderItem = ( {item, index} ) => {
		const { category, questions, complete } = this.props.deck;

		return (
			<View>
				{!item.isAdd && (
					<SlideCard width={itemWidth} height={slideHeight}>
						{!complete && <SecretIcon color={getColorCateogry(category)}>{index + 1}</SecretIcon>}
						<SecretQuestion complete={complete}>{item.question}</SecretQuestion>
					</SlideCard>
				)}

				{item.isAdd && (
					<SlideCard width={itemWidth} height={slideHeight}>
						<TouchableOpacity onPress={this.toggleModal}>
							<MaterialCommunityIcons name="plus-circle" size={76} color={getColorCateogry(category)} style={{textAlign: 'center'}}/>
							<CarouselAddCard color={getColorCateogry(category)}>Add Card</CarouselAddCard>
						</TouchableOpacity>
					</SlideCard>
				)}
			</View>
		);
	};

	render() {
		const { deck, navigation } = this.props;
		const { addCardModal } = this.state;
		const carouselCards = deck.questions.concat({isAdd: true});

		return (
			<View style={{flex: 1}}>
				{(!deck.questions || deck.questions.length <= 0) && <NotFound openInsertModal={this.toggleModal} />}

				<Modal
					isVisible={addCardModal}
					onBackButtonPress={this.toggleModal}
					onBackdropPress={this.toggleModal}
					onSwipe={this.toggleModal}
					swipeDirection='down'
					style={{justifyContent: 'center'}}
				>
					<AddCard deck={deck} toggleModal={this.toggleModal} />
				</Modal>

				{(deck.questions && deck.questions.length > 0) && (
					<View style={{flex: 1}}>
						<View style={{marginBottom: 50}}>
							<SpaceBetweenRow>
								<StyledPageTitle>{deck.title}</StyledPageTitle>
								<StyledSecText>{deck.questions.length} {pluralize(deck.questions, 'card')}</StyledSecText>
							</SpaceBetweenRow>
							<StyledSecText>{getCategoryName(deck.category)}</StyledSecText>
						</View>

						<Carousel
							ref={(c) => { this._carousel = c; }}
							data={carouselCards}
							layout={'default'}
							renderItem={this._renderItem}
							sliderWidth={sliderWidth}
							itemWidth={itemWidth}
							inactiveSlideScale={0.94}
							inactiveSlideOpacity={0.7}
						/>

						<ButtonContainer>
							<TouchButton category={deck.category} onPress={() => navigation.navigate('Quiz', { title: deck.title })}>Start Quiz</TouchButton>
						</ButtonContainer>
					</View>
				)}

			</View>
		);
	};
};

const SlideCard = styled.View`
	alignItems: center;
	background-color: #fff;
	borderRadius: 10;
	elevation: 2;
	height: ${props => props.height};
	justifyContent: center;
	padding: 20px;
	position: relative;
	shadow-color: #000;
	shadow-offset: 0 0;
	shadow-opacity: 0.5;
	shadowRadius: 10;
	width: ${props => props.width};
`;

const SecretQuestion = styled.Text`
	color: rgba(0, 0, 0, ${props => props.complete ? '1' : '0.055'});
	fontSize: 22;
	text-align: center;
`;

const CarouselAddCard = styled.Text`
	color: ${props => props.color ? props.color : colors.primary};
	fontSize: 22;
`;

const SecretIcon = styled.Text`
	align-items: center
	border-color: ${props => props.color ? props.color : colors.primary};
	border-radius: 50;
	border-width: 1;
	color: ${props => props.color ? props.color : colors.primary};
	font-size: 50px;
	height: 68px;
	justify-content: center;
	left: 50%;
	margin: -18px 0 0 -18px;
	opacity: 1;
	position: absolute;
	text-align: center;
	top: 50%;
	width: 68px;
`;

const mapStateToProps = (decks, currProps) => {
	const { title } = currProps.navigation.state.params;
	const deck = decks[title];

	return {
		deck
	}
};

export default connect(mapStateToProps)(Single);
