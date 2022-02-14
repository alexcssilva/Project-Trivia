import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setName, setToken, setEmail } from '../redux/action/index';

const URL_API = 'https://opentdb.com/api_token.php?command=request';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
      token: '',
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

  requestAPI = async () => {
    const { nome, email } = this.state;
    const { handleName, handleToken, handleEmail } = this.props;

    const request = await fetch(URL_API);
    const requestJSON = await request.json();

    localStorage.setItem('token', requestJSON.token);

    this.setState({
      token: requestJSON.token,
    });

    handleName(nome);
    handleToken(requestJSON.token);
    handleEmail(email);

    const { history } = this.props;
    history.push('/screen');
  }

  roteSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const {
      nome,
      email,
      isDisabled,
      token,
    } = this.state;
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
          onClick={ () => this.requestAPI() }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.roteSettings() }
        >
          Settings
        </button>
        <p>{ token }</p>
      </>
    );
  }
}

Login.propTypes = {
  handleName: PropTypes.func,
  handleToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  handleName(ev) {
    dispatch(setName(ev));
  },
  handleToken(ev) {
    dispatch(setToken(ev));
  },
  handleEmail(ev) {
    dispatch(setEmail(ev));
  },
});

export default connect(null, mapDispatchToProps)(Login);
