import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { setPlayer } from '../redux/action/index';

const redStyles = { border: '3px solid rgb(6, 240, 15)' };
const greenStyles = { border: '3px solid rgb(255, 0, 0)' };
const MENOS_UM = -1;
const URLGeraImagem = 'https://www.gravatar.com/avatar/';
const MIL = 1000;
const DEZ = 10;
const QUATRO = 4;
const CINCO = 5;
const scoreQuestion = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class Screen extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      ask: [],
      time: 30,
      emailIMG: '',
      storeQuestions: [],
      storeAnswers: [],
      randomStore: [],
      isDisabled: false,
      assertions: 0,
      score: 0,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
  }

  componentDidMount() {
    this.generateAsk();
    this.contaTempo();
  }

  geraImagem = () => {
    const { email } = this.props;
    const rached = md5(email).toString();
    this.setState({
      emailIMG: `${URLGeraImagem}${rached}`,
    });
  };

  generateAsk = async () => {
    const token = localStorage.getItem('token');
    const URLGeraPergunta = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const askRequest = await fetch(URLGeraPergunta);
    const askJSON = await askRequest.json();
    const questions = askJSON.results.map((value) => [
      value.correct_answer,
      ...value.incorrect_answers,
    ]);
    const answers = askJSON.results.map((value) => [value.correct_answer]);
    this.setState({
      ask: askJSON.results,
      storeQuestions: [...questions],
      storeAnswers: [...answers],
    });
    this.geraImagem();
    this.randomQuests();
  };

  contaTempo = () => {
    this.contador = setInterval(() => {
      const { time } = this.state;
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
      if (time === 0) {
        clearInterval(this.contador);
        this.setState(() => ({
          isDisabled: true,
          time: 30,
        }));
      }
    }, MIL);
  };

  pontuation = () => {
    const { time, ask, index, score, assertions } = this.state;
    const atual = DEZ + time * scoreQuestion[ask[index].difficulty];
    this.setState({
      score: score + atual,
      assertions: assertions + 1,
    });
  };

  randomQuests = () => {
    const { storeQuestions } = this.state;
    let t = [];
    const store = [];
    storeQuestions.map((val) => {
      while (val.length !== 0) {
        const b = Math.round(Math.random() * (val.length - 1));
        t.push(val[b]);
        val.splice(b, 1);
      }
      store.push(t);
      t = [];
      return store;
    });
    this.setState({
      randomStore: [...store],
    });
  };

  teste = () => {
    const { player, index } = this.state;
    const { handlePlayer } = this.props;
    localStorage.setItem('player', JSON.stringify(player));
    this.contaTempo();
    handlePlayer(player);
    if (index === QUATRO + 1) {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  render() {
    const {
      index, ask, time, emailIMG, randomStore,
      storeAnswers, isDisabled, assertions,
      score, player } = this.state;
    const { nome, handlePlayer } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">{nome}</h1>
        {
          isDisabled
          && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ () => {
                this.setState({
                  index: index + 1,
                  isDisabled: false,
                  time: 30,
                  player: {
                    name: nome,
                    assertions,
                    score,
                    gravatarEmail: emailIMG,
                  },
                }, () => this.teste());
              } }
            >
              Next
            </button>
          )
        }
        <p data-testid="header-score">
          { score }
        </p>
        <img
          src={ emailIMG }
          data-testid="header-profile-picture"
          alt="profile"
        />
        <p>{time}</p>
        {ask.length > 0 && index < CINCO && (
          <div>
            <h2 data-testid="question-category">{ask[index].category}</h2>
            <p data-testid="question-text">
              {index}
              {' '}
              question:
              {' '}
              {ask[index].question}
            </p>
          </div>
        ) }
        <div
          data-testid="answer-options"
        >
          {
            randomStore.length > 1
            && index < CINCO && randomStore[index].map((quest, i) => (
              storeAnswers[index].indexOf(quest) > MENOS_UM ? (
                <button
                  data-testid="correct-answer"
                  type="button"
                  key={ i }
                  style={ redStyles }
                  disabled={ isDisabled }
                  onClick={ () => {
                    this.setState({
                      isDisabled: !isDisabled,
                    }, () => this.teste());
                    this.pontuation();
                    handlePlayer(player);
                  } }
                >
                  {i + 1}
                  {' - '}
                  {quest}
                </button>
              ) : (
                <button
                  data-testid={ `wrong-answer-${i}` }
                  type="button"
                  key={ i }
                  style={ greenStyles }
                  disabled={ isDisabled }
                  onClick={ () => {
                    this.setState({
                      isDisabled: !isDisabled,
                    }, () => this.teste());
                    handlePlayer(player);
                  } }
                >
                  {i + 1}
                  {' - '}
                  {quest}
                </button>
              )))
          }
        </div>
      </div>
    );
  }
}
Screen.propTypes = {
  nome: PropTypes.string,
  email: PropTypes.string,
}.isRequired;
const mapDispatchToProps = (dispatch) => ({
  handlePlayer(ev) {
    dispatch(setPlayer(ev));
  },
});
const mapStateToProps = (state) => ({
  nome: state.name,
  email: state.email,
});
export default connect(mapStateToProps, mapDispatchToProps)(Screen);
