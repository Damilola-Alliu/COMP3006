import React, { Component } from 'react';
import './Register.css'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: '',
      Username: '',
      Password: '',
      Email: '',
      Name: '',
      PhoneNumber: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { Password, Email, Name, PhoneNumber } = this.state;
    console.log(Password, Email, Name, PhoneNumber);
    fetch("http://localhost:3000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
      Password,
      Email,
      Name,
      PhoneNumber,
      }),
    })
    .then((res) => res.json)
    .then((data) => {
      console.log(data, "userRegistered");
    });
  };

  render() {
    return (
      <div className="register-container">
        <div className="form-box">
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                onChange={(e) => this.setState({ Email: e.target.value })}
                required
              />
            </div>
            <div>
        <label>Password:</label>
        <input type="password" name="password" 
        onChange={e=>this.setState({Password:e.target.value})}
        required />
      </div>
      
      <div>
        <label>Name:</label>
        <input type="text" name="name"
        onChange={e=>this.setState({Name:e.target.value})}
        required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" 
        onChange={e=>this.setState({PhoneNumber:e.target.value})}
        required />
      </div>
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
