/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { player } from 'reducers';
import Spinner from '../Spinner';
import Error from '../Error';
import styles from './AccountWidget.css';

const LoggedIn = ({ loading, error, playerId, playerName }) => {
  const getPlayerWidget = () => {
    if (error) return <Error />;
    if (loading) return <Spinner color="#fff" size={0.5} />;
    return (
      <div className={styles.group}>
        <Link to={`/players/${playerId}`}>
          <FlatButton
            label={playerName}
            // labelPosition="before"
            className={styles.account}
            hoverColor="transparent"
            // icon={<Avatar src={playerPicture} size={30} />}
          />
        </Link>
      </div>
    );
  };

  return getPlayerWidget();
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  playerPicture: player.getPicture(state, ownProps.playerId),
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(LoggedIn);
