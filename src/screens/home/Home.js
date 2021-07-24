import React, { Component } from "react";
import './Home.css';
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme => ({

  root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
  },

  grid: { 
      cursor: 'pointer',
      "margin-left": "0.5%",
      "margin-right": "0.5%",
      transform: 'translateZ(0)',
      "padding": "20px"
  },

  card: { 
    height: "500px",
    margin: "10px",
    '@media (min-width: 960px) and (max-width:1300px)': { 
      height: "375px",
    },
    '@media (max-width:960px)': { 
      height: "250px",
    },
    '@media (min-width: 1300px)': { 
        height: "500px",
    }
  },

  cardContent: { 
      "display": "flex",
      "align-items": "center",
      "padding": "10px",
      "margin-left": "20px",
      "margin-right": "20px",
      "height": "20%",  
  },

  title: { 
    '@media (min-width: 960px) and (max-width:1300px)': {
        "font-size": "30px",
    },
    '@media (max-width: 960px)': {
      "font-size": "20px",
    },
    '@media (min-width: 1300px)': {
        "font-size": "40px",
    },
    "font-size": "25px"
  },

  media: { 
    height: "40%",
    width: "100%",
  },

  cardActionArea: { 
      "display": "flex",
      "align-items": "normal",
      "justify-content": "space-between",
      "height": "100%",
      "flex-direction": "column"
  },

  gridCard: { 
      '@media (min-width: 1200px)': { 
          'max-width': '25%',
          'flex-grow': '0',
          'flex-basis': '25%',
      },

      '@media (min-width: 960px) and (max-width:1200px)': { 
          'max-width': '33%',
          'flex-grow': '0',
          'flex-basis': '33%',
      },
  },

  '@media (max-width:960px)': { 
    'max-width': '50%',
    'flex-grow': '0',   
    'flex-basis': '50%',
  },

  categories: { 
      '@media (min-width: 960px) and (max-width:1300px)': {
          "font-size": "20px",
      },
      '@media (max-width: 960px)': {
          "font-size": "18px",
      },
      "font-size": "16px",
      '@media (min-width: 1300px)': {
          "font-size": "22px",
      }
  }

}))


class Home extends Component {
  
  onRestaurantCardClick = (restId) => {
    this.props.history.push('/restaurant/' + restId);
  }

  render() {
      let showRestaurants = this.props.showRestaurants;
      const {classes} = this.props;
      return (
          <div>
              <Header baseUrl = {this.props.baseUrl} filterRestaurants = {this.props.filterRestaurants} />
              <div className="flex-container">
                    <Grid container spacing = {3}>
                        {showRestaurants.length > 0 ? (
                                showRestaurants.map(restaurant => (
                                    <Grid key = {restaurant.id} item xs = {3} className = {classes.gridCard}>
                                        <Card className = {classes.card}>
                                            <CardActionArea className = {classes.cardActionArea}>             
                                                <CardMedia
                                                    image = {restaurant.photo_URL}
                                                    className = {classes.media}                                                   
                                                    title = {restaurant.restaurant_name} />
                                                <CardContent className = {classes.cardContent}>
                                                    <Typography component = "h2" className = {classes.title} variant = "h5" >
                                                        {restaurant.restaurant_name}
                                                    </Typography>
                                                </CardContent>
                                                <CardContent className = {classes.cardContent}>
                                                    <Typography component = "p" className = {classes.categories} variant="subtitle1">                                                              
                                                        {restaurant.categories}
                                                    </Typography>
                                                </CardContent>
                                              <CardContent className={classes.cardContent}>
                                                <div className="restaurant-details">
                                                  <span className="restaurant-rating">
                                                    <span>
                                                        <FontAwesomeIcon icon="star" color="white" size="lg" />
                                                    </span>
                                                    <Typography variant="caption" component="p">
                                                      {restaurant.customer_rating}
                                                    </Typography>
                                                    <Typography variant="caption" component="p">
                                                      ({restaurant.number_customers_rated})
                                                    </Typography>
                                                  </span>

                                                  <span className = "price-for-two">
                                                      <Typography component = "p" variant = "caption" style = {{fontSize: '15px'}}>          
                                                        <i className="fa fa-inr" aria-hidden="true">
                                                        </i>
                                                        {restaurant.average_price}
                                                    </Typography>
                                                    <Typography component = "p" variant = "caption" style = {{fontSize: '16px'}}> 
                                                      for two
                                                    </Typography>
                                                  </span>
                                                </div>
                                            </CardContent>
                                          </CardActionArea>
                                        </Card>
                                    </Grid>
                                )) ) : (     
                              <div> No restaurant with the given name. </div>
                        )}
                    </Grid>
                </div>
          </div>
      );
  }
}
export default withStyles(styles)(Home);