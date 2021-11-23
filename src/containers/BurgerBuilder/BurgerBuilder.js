import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {

	salad:0.5,
	cheese:0.4,
	meat:1.3,
	bacon:0.7
}

class BurgerBuilder extends Component {

	state ={
		ingredients:{
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},

		totalPrice: 4,
		purchasedIngredients: false,
		purchasing: false
	}

	updatePurchasedIngredients (ingredients){
		// const ingredients={
		// 	...this.state.ingredients
		// };

		const sum = Object.keys(ingredients)
			.map(igkey => {
				return ingredients[igkey];
			} )
			.reduce((newsum,indelement) => {

				return newsum + indelement;

			},0)
			this.setState({purchasedIngredients: sum>0});
	}


	addIngredientsHandler = (type) =>{
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
		this.updatePurchasedIngredients(updatedIngredients);
	}

	removeIngredientsHandler = (type) =>{
		const oldCount = this.state.ingredients[type];
		if (oldCount<=0) {
			return; 
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
		this.updatePurchasedIngredients(updatedIngredients);

	}

	purchaseHandler = () => {  //This handler will be triggered when ORDER button is clicked

		this.setState({purchasing:true});
}
	purchaseCancelHandler = () =>{

		this.setState({purchasing:false});
	}

	purchaseContinueHandler = () => {
		alert('Continue to Checkout');
	}


	render(){

		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){

			disabledInfo[key] = disabledInfo[key] <=0;
		}
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
					<OrderSummary 
					ingredients={this.state.ingredients}
					price={this .state.totalPrice}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler} />

				</Modal>
				<Burger ingredients={this.state.ingredients} />

				<BuildControls
				 ingredientAdded={this.addIngredientsHandler}
				 ingredientRemoved={this.removeIngredientsHandler}
				 disabled={disabledInfo}
				 price={this.state.totalPrice}
				 ordered={this.purchaseHandler}
				 purchasedIngredients={this.state.purchasedIngredients} />
			</Aux>
			);
	}
}

export default BurgerBuilder;