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

const URLGeraImagem = 'https://www.gravatar.com/avatar/';

const MIL = 1000;

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
      marked: false,
      ask: [],
      time: 30,
      points: [],
      emailIMG: '',
    };
  }

  componentDidMount() {
    this.generateAsk();
    this.teste();
    this.geraImagem();
  }

  geraImagem = () => {
    const { email } = this.props;
    const rached = md5(email).toString();
    console.log(rached);
    this.setState({
      emailIMG: `${URLGeraImagem}${rached}`,
    });
  }

  generateAsk = async () => {
    const token = localStorage.getItem('token');
    const URLGeraPergunta = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const askRequest = await fetch(URLGeraPergunta);
    const askJSON = await askRequest.json();
    this.setState({
      ask: askJSON.results,
    });
  };

  teste = () => {
    this.contador = setInterval(() => {
      const { time } = this.state;

      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));

      if (time === 0) {
        clearInterval(this.contador);
        this.setState(() => ({
          marked: true,
          time: 30,
        }));
      }
    }, MIL);
  };

  pontuation = () => {
    const { time, ask, index, points } = this.state;
    // console.log(time);
    // console.log(ask[index]);
    const atual = DEZ + time * score[ask[index].difficulty];
    this.setState({
      points: [...points, atual],
    });
    localStorage.setItem('atual', atual.toString());
  };

  render() {
    const { index, marked, ask, time, points, emailIMG } = this.state;
    const { nome } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">{ nome }</h1>
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
        <p
          data-testid="header-score"
        >
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
            <button
              id="quest"
              data-testid="correct-answer"
              style={ redStyles }
              disabled={ marked }
              type="button"
              onClick={ () => this.pontuation() }
            >
              {ask[index].correct_answer}
            </button>
            {ask[index].incorrect_answers.map((val, ind) => (
              <button
                disabled={ marked }
                type="button"
                data-testid={ `wrong-answer-${ind}` }
                style={ greenStyles }
                id="quest"
                // onClick={ () => this.setState({ marked: true }) }
                key={ ind }
              >
                {val}
              </button>
            ))}
          </div>
        )}
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
