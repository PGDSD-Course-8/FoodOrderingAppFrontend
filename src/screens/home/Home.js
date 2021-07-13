import React, { Component } from "react";
import Header from "../../common/header/Header";

class Home extends Component {
  render() {
    let showRestaurants = this.props.showRestaurants;
    return (
      <div>
        <Header baseUrl = {this.props.baseUrl} filterRestaurants = {this.props.filterRestaurants} />
        {showRestaurants.length > 0 ? (
          <div>
            {showRestaurants.map((restaurant) => {
              return <div key={restaurant.id}>
                <img src = {restaurant.photo_URL} alt = "Restuarant's view" width = "100 px" height = "100px"/>
                <br/>
                <strong> {restaurant.restaurant_name} </strong>
                <br/>
                {restaurant.categories}
                <br/>
                {restaurant.customer_rating}
                <br/>
                {restaurant.average_price} for two
                <br/>
              </div>;
            })}
          </div> ) : (
          <div>
              No restaurant with the given name.
          </div>
        )}
      </div>
    );
  }
}
export default Home;