import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

	let tranformedIngredients = Object.keys(props.ingredients)
	    .map((igKey) =>{
	    	return [...Array(props.ingredients[igKey])].map((_ , index) => {

	    		return <BurgerIngredients key ={igKey + index} type={igKey} />;
	    	});
	    })
	    .reduce((prevvalue , currvalue) =>{
	    	return prevvalue.concat(currvalue) ;
	    },[] );
	    
	   if (tranformedIngredients.length===0) {
	   	tranformedIngredients = <p>Add Ingredients please!</p>
	   }
	return(
		<div className={classes.Burger}>
			<BurgerIngredients type="bread-top" />
			{tranformedIngredients}
			<BurgerIngredients type="bread-bottom" />
		</div>

	);
};

export default burger;