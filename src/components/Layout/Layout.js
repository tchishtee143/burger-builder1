import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

	state ={

		showSideDrawer : true
	};

	SideDrawerClosedHandler = () => {

		this.setState({showSideDrawer: false});

	};

	SideDrawerToogleHandler = () => {

		this.setState((prevState) => {

			return {showSideDrawer:!prevState.showSideDrawer};
		});
	}

	render(){
		return (
			<Aux>
				<Toolbar drawerToogleClicked={this.SideDrawerToogleHandler} />
				<SideDrawer open={this.state.showSideDrawer} 
				closed = {this.SideDrawerClosedHandler} />

				<main className={classes.Content}> 

				{this.props.children}

				</main>
			</Aux>
		);

	}
} 

export default Layout;