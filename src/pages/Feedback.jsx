import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const TRES = 3;

class Feedback extends Component {
  jogarNovamente = () => {
    const { history } = this.props;
    history.push('/screen');
  }

  mostrarRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { player } = this.props;
    console.log(player);
    return (
      <>
        <div
          data-testid="feedback-text"
        >
          Feedback
        </div>
        <img
          data-testid="header-profile-picture"
          src={ player.gravatarEmail }
          alt="profile"
        />
        <p data-testid="header-player-name">{ player.name }</p>
        <p data-testid="header-score">{ player.score }</p>
        {
          player.assertions < TRES
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <p data-testid="feedback-total-score">{ player.score }</p>
        <p data-testid="feedback-total-question">{ player.assertions }</p>
        <button
          type="button"
          onClick={ () => this.jogarNovamente() }
          data-testid="btn-play-again"
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          onClick={ () => this.mostrarRanking() }
          data-testid="btn-ranking"
        >
          Mostrar Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, null)(Feedback);
