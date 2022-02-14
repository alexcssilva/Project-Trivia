import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => this.verify());
  }

  verify = () => {
    const { nome, email } = this.state;
    if (nome.length > 0 && email.length > 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <>
        <h1>Login</h1>
        <label
          htmlFor="nome"
        >
          Nome:
          <input
            type="text"
            id="nome"
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ ({ target }) => this.handleChange(target) }
          />
        </label>
        <label
          htmlFor="email"
        >
          Email:
          <input
            type="email"
            id="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ ({ target }) => this.handleChange(target) }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Play
        </button>
      </>
    );
  }
}
