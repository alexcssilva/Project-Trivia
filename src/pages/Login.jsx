import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setName, setToken } from '../redux/action/index';

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
    const { nome, token } = this.state;
    const { handleName, handleToken } = this.props;

    const request = await fetch(URL_API);
    const requestJSON = await request.json();

    localStorage.setItem('token', requestJSON.token);

    this.setState({
      token: requestJSON.token,
    });

    handleName(nome);
    handleToken(requestJSON.token);

    const { history } = this.props;
    history.push('/screen');
  }

  render() {
    const {
      nome,
      email,
      isDisabled,
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
      </>
    );
  }
}

Login.propTypes = {
  handleName: PropTypes.func.isRequired,
  handleToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleName(ev) {
    dispatch(setName(ev));
  },
  handleToken(ev) {
    dispatch(setToken(ev));
  },
});

export default connect(null, mapDispatchToProps)(Login);
