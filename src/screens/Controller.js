import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../screens/home/Home';
import Details from "./details/Details";

class Controller extends Component {
    constructor() {
        super();

        this.state = {
            baseUrl : "http://localhost:8080/api",
            restaurants: [],
            filteredRestaurants: [],
            displayFilteredRestaurants: false
        }
    }

    componentDidMount() {
        let restaurantsData = null;
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ restaurants: JSON.parse(this.responseText).restaurants});
            }
        });

        xhr.open("GET", this.state.baseUrl + "/restaurant");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(restaurantsData);
    }

    render() {
        let showRestaurants = this.restaurantsToShow();
        return(
            <div>
                <Router>
                        <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.state.baseUrl} showRestaurants = {showRestaurants} filterRestaurants = {this.filterRestaurants}/>} />
                        <Route path='/restaurant/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
                </Router>
            </div>
        );
    }

    restaurantsToShow = () => {
        if(this.state.displayFilteredRestaurants)
            return this.state.filteredRestaurants;
        else
            return this.state.restaurants;
    }

    filterRestaurants = (searchText) => {
        this.setState({filteredRestaurants: this.state.restaurants});
        searchText.trim().length > 0 ? this.setState({displayFilteredRestaurants: true}) : this.setState({displayFilteredRestaurants: false})
        let data = this.state.restaurants;
        let searchOutput = data.filter(restaurant => 
            restaurant.restaurant_name.toLowerCase().includes(searchText.trim().toLowerCase()))
        this.setState({filteredRestaurants: searchOutput})
    }
}
export default Controller;