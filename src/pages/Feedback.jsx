import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const TRES = 3;

class Feedback extends Component {
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
