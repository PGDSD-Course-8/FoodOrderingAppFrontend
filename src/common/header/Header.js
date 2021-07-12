import React, { Component } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const searchTextStyle = {
  color: "white",
  height: 40
};

const TabContainer = (props) => {
  return (
    <Typography component="div" className="tab-container">
      {props.children}
    </Typography>
  );
};

TabContainer.prototypes = {
  children: PropTypes.node.isRequired,
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  onSearchBarTextChange = (e) => {
    this.props.filterRestaurants(e.target.value)
  }

  render() {
    return (
      <div>
        <header>
          <div className="header">
            <div className="logo">
              <FastfoodIcon fontSize="large" />
            </div>
            <div className="search-bar">
              <Input fullWidth placeholder="Search by Restaurant Name" style = {searchTextStyle}
                onChange={this.onSearchBarTextChange}
                startAdornment={ <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>}/>
            </div>  
          </div>
        </header>
      </div>  
    );
  }
}
export default Header;