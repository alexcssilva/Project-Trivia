import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

const redStyles = {
  border: '3px solid rgb(6, 240, 15)',
};

const greenStyles = {
  border: '3px solid rgb(255, 0, 0)',
};

const MENOS_UM = -1;

const URLGeraImagem = 'https://www.gravatar.com/avatar/';

// const MIL = 1000;

const DEZ = 10;

const score = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class Screen extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      // marked: false,
      ask: [],
      time: 30,
      points: [],
      emailIMG: '',
      storeQuestions: [],
      storeAnswers: [],
      randomStore: [],
    };
  }

  componentDidMount() {
    this.generateAsk();
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
    // this.contaTempo();
    this.geraImagem();
    this.randomQuests();
  };

  // contaTempo = () => {
  //   this.contador = setInterval(() => {
  //     const { time } = this.state;

  //     this.setState((prevState) => ({
  //       time: prevState.time - 1,
  //     }));

  //     if (time === 0) {
  //       clearInterval(this.contador);
  //       this.setState(() => ({
  //         marked: true,
  //         time: 30,
  //       }));
  //     }
  //   }, MIL);
  // };

  pontuation = () => {
    const { time, ask, index, points } = this.state;
    const atual = DEZ + time * score[ask[index].difficulty];
    this.setState({
      points: [...points, atual],
    });
    localStorage.setItem('atual', atual.toString());
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

  render() {
    const {
      index,
      ask,
      time,
      points,
      emailIMG,
      randomStore,
      storeAnswers,
    } = this.state;
    const { nome } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">{nome}</h1>
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.setState({
            index: index + 1,
            // marked: false,
            time: 30,
          }) }
        >
          Next
        </button>
        <p data-testid="header-score">
          {points.length && points.reduce((acc, curr) => acc + curr)}
        </p>
        <img
          src={ emailIMG }
          data-testid="header-profile-picture"
          alt="profile"
        />
        <p>{time}</p>
        {ask.length > 0 && (
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
        )}

        <div
          data-testid="answer-options"
        >
          {
            randomStore.map((question, ind) => question.map((quest, i) => (
              storeAnswers[ind].indexOf(quest) > MENOS_UM ? (
                <p
                  data-testid="correct-answer"
                  key={ i }
                  style={ redStyles }
                >
                  {i + 1}
                  {' - '}
                  {quest}
                </p>
              ) : (
                <p
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
                  style={ greenStyles }
                >
                  {i + 1}
                  {' - '}
                  {quest}
                </p>
              ))))
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

const mapStateToProps = (state) => ({
  nome: state.name,
  email: state.email,
  // ask: state.question,
});

export default connect(mapStateToProps, null)(Screen);
