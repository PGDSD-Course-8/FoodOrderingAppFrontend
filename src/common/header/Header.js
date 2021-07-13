import React, { Component } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import validator from "validator";

const searchTextStyle = {
  color: "white",
  height: 40
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
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
      userLoggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      anchorEl: null,
      firstName: "",
      firstNameRequired: "dispNone",
      lastName: "",
      value: 0,
      email: "",
      emailRequired: "dispNone",
      inValidEmail: "dispNone",
      signupPassword: "",
      signupPasswordRequired: "dispNone",
      weakPassword: "dispNone",
      modalIsOpen: false,
      signupSnackbarIsOpen: false,
      loginSnackbarIsOpen: false,
      contactNumber: "",
      contactNoRequired: "dispNone",
      invalidContactNo: "dispNone",
      password: "",
      passwordRequired: "dispNone",
      invalidCredentials: "dispNone",
      signupcontactNo: "",
      signupcontactNoRequired: "dispNone",
      inValidsignupcontactNo: "dispNone",
      registeredContactNo: "dispNone",
      unregisteredContactNo: "dispNone"
    };
  }

  onSearchBarTextChange = (e) => {
    this.props.filterRestaurants(e.target.value)
  }

  openModalHandler = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ firstName: "" });
    this.setState({ firstNameRequired: "dispNone" });
    this.setState({ lastName: "" });
    this.setState({ contactNumber: "" });
    this.setState({ signupcontactNo: "" });
    this.setState({ signupcontactNoRequired: "dispNone" });
    this.setState({ contactNoRequired: "dispNone" });
    this.setState({ invalidContactNo: "dispNone" });
    this.setState({ inValidsignupcontactNo: "dispNone" });
    this.setState({ registeredContactNo: "dispNone" });
    this.setState({ unregisteredContactNo: "dispNone" });
    this.setState({ email: "" });
    this.setState({ emailRequired: "dispNone" });
    this.setState({ inValidEmail: "dispNone" });
    this.setState({ password: "" });
    this.setState({ invalidCredentials: "dispNone" });
    this.setState({ signupPassword: "" });
    this.setState({ signupPasswordRequired: "dispNone" });
    this.setState({ weakPassword: "dispNone" });
    this.setState({ passwordRequired: "dispNone" });
    this.setState({ modalIsOpen: false });
  };

  openMenuHandler = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenuHandler = () => {
    this.setState({ anchorEl: null });
  };

  signupClickHandler = (e) => {
    this.setState({ registeredContactNo: "dispNone" });
    this.state.firstName.trim() === "" ? this.setState({ firstNameRequired: "dispBlock" })
      : this.setState({ firstNameRequired: "dispNone" });
    this.state.email === "" ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });
    this.state.signupPassword === "" ? this.setState({ signupPasswordRequired: "dispBlock" })
      : this.setState({ signupPasswordRequired: "dispNone" });
    this.state.signupcontactNo === "" ? this.setState({ signupcontactNoRequired: "dispBlock" })
      : this.setState({ signupcontactNoRequired: "dispNone" });
    
    if (this.state.email.length > 0) {
      validator.isEmail(this.state.email)
        ? this.setState({ inValidEmail: "dispNone" })
        : this.setState({ inValidEmail: "dispBlock" });
    }
    
    //Checking for password validity
    if (this.state.signupPassword.length > 0) {
      let weakPassword = false;
      if (this.state.signupPassword.length < 8) weakPassword = true;
      else if (!/[a-z]/.test(this.state.signupPassword)) weakPassword = true;
      else if (!/[A-Z]/.test(this.state.signupPassword)) weakPassword = true;
      else if (!/[#@$%&*!^]/.test(this.state.signupPassword))
        weakPassword = true;
      else if (!/\d/.test(this.state.signupPassword)) weakPassword = true;
      weakPassword ? this.setState({ weakPassword: "dispBlock" }) : this.setState({ weakPassword: "dispNone" });
    }

   //Checking for sign up contact no. validity
    if (this.state.signupcontactNo.length > 0) {
      validator.isNumeric(this.state.signupcontactNo) &&
      this.state.signupcontactNo.length === 10
        ? this.setState({ inValidsignupcontactNo: "dispNone" })
        : this.setState({ inValidsignupcontactNo: "dispBlock" });
    }

    try {
      if (
        this.state.firstName &&
        this.state.email &&
        this.state.signupPassword &&
        this.state.signupcontactNo
      ) {
        let data = JSON.stringify({
          contact_number: this.state.signupcontactNo,
          email_address: this.state.email,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          password: this.state.signupPassword,
        });
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function() {
          if (this.readyState === 4 && this.status === 201) {
            that.setState({ value: 0 });
            that.setState({ signupSnackbarIsOpen: true });
          } else if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);
            if (response.code === "SGR-001") {
              console.log(JSON.parse(this.responseText));
              that.setState({ registeredContactNo: "dispBlock" });
            } else {
              console.log(JSON.parse(this.responseText));
            }
          }
        });
        xhr.open("POST", this.props.baseUrl + "/customer/signup");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  loginClickHandler = (e) => {
    this.setState({ unregisteredContactNo: "dispNone" });
    this.setState({ invalidCredentials: "dispNone" });
    this.state.contactNumber === "" ? this.setState({ contactNoRequired: "dispBlock" })
      : this.setState({ contactNoRequired: "dispNone" });
    this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" })
      : this.setState({ passwordRequired: "dispNone" });
    if (this.state.contactNumber.length > 0) {
      validator.isNumeric(this.state.contactNumber) &&
      this.state.contactNumber.length === 10 ? this.setState({ invalidContactNo: "dispNone" })
        : this.setState({ invalidContactNo: "dispBlock" });
    }
    try {
      if (this.state.contactNumber && this.state.password) {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function() {
          if (this.readyState === 4 && this.status === 200) {
            sessionStorage.setItem( "access-token", xhr.getResponseHeader("access-token"));
            let response = JSON.parse(this.responseText);
            that.setState({ user: response });
            that.setState({ loginSnackbarIsOpen: true });
            that.closeModalHandler();
            that.setState({ userLoggedIn: true });
          } else if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);
            if (that.state.invalidContactNo === "dispNone") {
              if (response.code === "ATH-001") {
                console.log(JSON.parse(this.responseText));
                that.setState({ unregisteredContactNo: "dispBlock" });
              } else {
                console.log(JSON.parse(this.responseText));
                that.setState({ invalidCredentials: "dispBlock" });
              }
            }
          }
        });
        xhr.open("POST", this.props.baseUrl + "/customer/login");
        xhr.setRequestHeader( "authorization",
          "Basic " + btoa(this.state.contactNumber + ":" + this.state.password)
        );
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  logoutClickHandler = () => {
    this.closeMenuHandler();
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    let accessToken = sessionStorage.getItem("access-token");
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        that.setState({ userLoggedIn: false });
        sessionStorage.removeItem("access-token"); //removes access-token from session storage
      }
    });
    xhr.open("POST", this.props.baseUrl + "/customer/logout");
    xhr.setRequestHeader("authorization", "Bearer " + accessToken);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
  };

  closeSnackbarHandler = (e) => {
    this.setState({ loginSnackbarIsOpen: false });
  };

  closeSignupSnackbarHandler = (e) => {
    this.setState({ signupSnackbarIsOpen: false });
  };

  tabChangeHandler = (e, value) => {
    this.setState({ value });
  };

  firstNameChangeHandler = (e) => {
    this.setState({ firstName: e.target.value });
  };

  lastNameChangeHandler = (e) => {
    this.setState({ lastName: e.target.value });
  };

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  contactNumberChangeHandler = (e) => {
    this.setState({ contactNumber: e.target.value });
  };

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  signupPasswordChangeHandler = (e) => {
    this.setState({ signupPassword: e.target.value });
  };

  signupcontactNoChangeHandler = (e) => {
    this.setState({ signupcontactNo: e.target.value });
  };


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
            <div className="userButton">
              {this.state.userLoggedIn ? (
                <div>
                  {/* If user is logged in then their name will appear in the header */}
                  <Button onClick = {this.openMenuHandler} variant="contained" color="default" startIcon={<AccountCircle />}>
                    {this.state.user.first_name}
                  </Button>
                </div> 
                ) : (
                // If user is logged out the header will have the login button
                <Button variant="contained" onClick={this.openModalHandler} color="default" startIcon={<AccountCircle />}>
                  LOGIN
                </Button>
              )}
              <Menu
                id="profileMenu"
                anchorEl={this.state.anchorEl}
                getContentAnchorEl={null}
                anchorOrigin = {{ vertical: "bottom", horizontal: "center" }}
                transformOrigin = {{ vertical: "top", horizontal: "center" }}
                keepMounted
                open = {Boolean(this.state.anchorEl)}
                onClose = {this.closeMenuHandler} >
                <MenuItem component = {Link} to = {"/profile"} onClick = {this.closeMenuHandler}>
                  My Profile
                </MenuItem>
                <MenuItem onClick = {this.logoutClickHandler}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </header>
        <Modal
          ariaHideApp = {false}
          isOpen = {this.state.modalIsOpen}
          contentLabel = "Login"
          onRequestClose = {this.closeModalHandler}
          style = {modalStyle}>
          <Tabs
            className = "tabs"
            value = {this.state.value}
            onChange = {this.tabChangeHandler}>
            <Tab label = "LOGIN" />
            <Tab label = "SIGNUP" />
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel>Contact No.</InputLabel>
                <Input id="contactNo" onChange={this.contactNumberChangeHandler}
                  type="text"
                  value={this.state.contactNumber} />
                <FormHelperText className={this.state.contactNoRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidContactNo}>
                  <span className="red">Invalid Contact</span>
                </FormHelperText>
              </FormControl>
              <br /> <br />
              <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id = "password" type="password" value = {this.state.password} onChange = {this.passwordChangeHandler} />
                <FormHelperText className = {this.state.passwordRequired}>
                  <span className = "red">required</span>
                </FormHelperText>
                <br />
                <FormHelperText className={this.state.unregisteredContactNo}>
                  <span className="red">
                    This contact number has not been registered!
                  </span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidCredentials}>
                  <span className="red">Invalid Credentials</span>
                </FormHelperText>
              </FormControl>
              <br /> <br />
              <Button onClick = {this.loginClickHandler} variant="contained" color="primary">
                LOGIN
              </Button>
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel>First Name</InputLabel>
                <Input
                  id = "contactNo"
                  onChange = {this.firstNameChangeHandler}
                  type = "text"
                  value = {this.state.firstName} />
                <FormHelperText className={this.state.firstNameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /> <br />
              <FormControl>
                <InputLabel>Last Name</InputLabel>
                <Input id = "lastName" type = "text" value = {this.state.lastName} onChange = {this.lastNameChangeHandler} />
              </FormControl>
              <br /> <br />
              <FormControl required>
                <InputLabel>Email</InputLabel>
                <Input
                  id = "Email"
                  onChange = {this.emailChangeHandler}
                  type = "email"
                  value = {this.state.email} />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.inValidEmail}>
                  <span className="red">Invalid Email</span>
                </FormHelperText>
              </FormControl>
              <br /><br />
              <FormControl required>
                <InputLabel htmlFor="signupPassword">Password</InputLabel>
                <Input
                  id="signupPassword"
                  onChange={this.signupPasswordChangeHandler}
                  type="password"
                  value={this.state.signupPassword} />
                <FormHelperText className={this.state.signupPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.weakPassword}>
                  <span className="red">
                    Password must contain at least one capital letter, one small
                    letter, one number, and one special character
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel>Contact No.</InputLabel>
                <Input
                  id = "signupcontact"
                  onChange = {this.signupcontactNoChangeHandler}
                  type = "text"
                  value = {this.state.signupcontactNo} />
                <FormHelperText className = {this.state.signupcontactNoRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.inValidsignupcontactNo}>
                  <span className="red">
                    Contact No. must contain only numbers and must be 10 digits long
                  </span>
                </FormHelperText>
                <br />
                <FormHelperText className={this.state.registeredContactNo}>
                  <span className="red">
                    This contact number is already registered! Try other contact number.
                  </span>
                </FormHelperText>
              </FormControl>
              <br /><br />
              <Button variant = "contained" color = "primary" onClick = {this.signupClickHandler}>
                SIGNUP
              </Button>
            </TabContainer>
          )}
        </Modal>

        <Snackbar anchorOrigin = {{vertical: "bottom", horizontal: "left"}}
          open = {this.state.signupSnackbarIsOpen}
          autoHideDuration = {2000}
          onClose = {this.closeSignupSnackbarHandler}
          message = "Registered successfully! Please login now!"/>

        <Snackbar anchorOrigin = {{vertical: "bottom", horizontal: "left"}}
          open = {this.state.loginSnackbarIsOpen}
          autoHideDuration = {2000}
          onClose = {this.closeSnackbarHandler}
          message = "Logged in successfully!"/>

      </div>  
    );
  }
}
export default Header;