import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components';
import colors, { StyledViewContainer, getColorCateogry, ButtonContainer, StyledPageTitle } from '../Styled';
import NotFound from './NotFound';
import AddCard from '../AddCard';
import TouchButton from '../TouchButton';
import LinkText from '../LinkText';
import { pluralize, getCategoryName, sliderWidth, itemWidth, slideHeight } from '../../Utils/Helpers';

class Single extends Component {
	state = {
		addCardModal: this.props.navigation.state.params.modal || false,
		startedQuiz: false,
		viewAnswer: false
	};

	toggleModal = () => {
		this.setState({
			addCardModal: !this.state.addCardModal
		});
	};

	startQuiz = () => {
		this.setState({
			startedQuiz: true
		});

		this._carousel.snapToItem(0);
	};

	stopQuiz = () => {
		this.setState({
			startedQuiz: false,
			viewAnswer: false
		});

		this._carousel.snapToItem(0);
	};

	_renderItem = ( {item, index} ) => {
		const { category, questions } = this.props.card;
		const { startedQuiz, viewAnswer } = this.state;

		if(startedQuiz) {
			return (
				<SlideCard width={itemWidth} height={slideHeight}>
					<StyledQuizNum>{index +1}/{questions.length}</StyledQuizNum>
					<Text>{item.question}</Text>

					{viewAnswer !== index && <LinkText onPress={() => this.setState({ viewAnswer: index })}>View Answer</LinkText>}

					{viewAnswer === index && (
						<View style={{width: itemWidth, justifyContent: 'space-between', flex: 1}}>
							<Text>{item.answer}</Text>
							<View>
								<TouchButton type="success">Correct</TouchButton>
								<TouchButton type="fail">Incorrect</TouchButton>
							</View>
						</View>
					)}
				</SlideCard>
			)
		}

		return (
			<View>
				{!item.isAdd && (
					<SlideCard width={itemWidth} height={slideHeight}>
						<SecretIcon name="lock" size={50} color={getColorCateogry(category)}/>
						<SecretQuestion>{item.question}</SecretQuestion>
					</SlideCard>
				)}

				{item.isAdd && (
					<SlideCard width={itemWidth} height={slideHeight}>
						<TouchableOpacity onPress={this.toggleModal}>
							<MaterialCommunityIcons name="plus-circle" size={76} color={getColorCateogry(category)}/>
							<CarouselAddCard color={getColorCateogry(category)}>Add Card</CarouselAddCard>
						</TouchableOpacity>
					</SlideCard>
				)}
			</View>
		);
	};

	render() {
		const { card } = this.props;
		const { addCardModal, startedQuiz, viewAnswer } = this.state;
		const dataToCarousel = startedQuiz ? card.questions : card.questions.concat({isAdd: true});

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

				{(card.questions && card.questions.length > 0) && (
					<View style={{flex: 1}}>
						<StyledViewContainer>
							<StyledRow>
								<StyledPageTitle>{card.title}</StyledPageTitle>
								<StyledSecText>{card.questions.length} {pluralize(card.questions, 'card')}</StyledSecText>
							</StyledRow>
							<StyledSecText>{getCategoryName(card.category)}</StyledSecText>
						</StyledViewContainer>

						<Carousel
							ref={(c) => { this._carousel = c; }}
							data={dataToCarousel}
							layout={'default'}
							renderItem={this._renderItem}
							sliderWidth={sliderWidth}
							itemWidth={itemWidth}
							inactiveSlideScale={0.94}
							inactiveSlideOpacity={0.7}
							onSnapToItem={() => viewAnswer !== false && this.setState({ viewAnswer: false })}
						/>

						{!startedQuiz && (
							<ButtonContainer>
								<TouchButton category={card.category} onPress={this.startQuiz}>Start Quiz</TouchButton>
							</ButtonContainer>
						)}

						{startedQuiz && (
							<ButtonContainer>
								<TouchButton category={card.category} onPress={this.stopQuiz}>Stop Quiz</TouchButton>
							</ButtonContainer>
						)}
					</View>
				)}

			</View>
		);
	};
};

const StyledSecText = styled.Text`
	font-size: 18;
	color: ${colors.secondaryL}
`;

const StyledRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
`;

const SlideCard = styled.View`
	background-color: #fff;
	width: ${props => props.width};
	height: ${props => props.height};
	borderRadius: 10;
	alignItems: center;
	justifyContent: center;
	shadow-offset: 0 0;
	shadow-color: #000;
	shadow-opacity: 0.5;
	elevation: 2;
	shadowRadius: 10;
	position: relative;
	padding: 20px;
`;

const SecretQuestion = styled.Text`
	color: rgba(0, 0, 0, 0.055);
	fontSize: 22;
	text-align: center;
`;

const CarouselAddCard = styled.Text`
	color: ${props => props.color ? props.color : colors.primary};
	fontSize: 22;
`;

const SecretIcon = styled(MaterialCommunityIcons)`
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -18px 0 0 -18px;
	border-width: 1;
	border-radius: 50;
	border-color: ${props => props.color ? props.color : colors.primary};
	padding: 12px;
	opacity: 1;
`;

const StyledQuizNum = styled.Text`
	position: absolute;
	top: 20px;
	left: 20px;
	font-size: 18px;
`

const mapStateToProps = (cards, currProps) => {
	const { title } = currProps.navigation.state.params;
	const card = cards[title];

	return {
		card
	}
};

export default connect(mapStateToProps)(Single);
