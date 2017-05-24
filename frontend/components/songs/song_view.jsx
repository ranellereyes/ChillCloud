import React from 'react';
import SongItem from './song_item';
import UploadFormContainer from '../upload_forms/upload_form_container';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import AudioPlayerContainer from '../audio_player/audio_player_container';

const modalUploadStyle = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, 0.75)',
    zIndex          : 10
  },
  content : {
    position        : 'fixed',
    margin          : 'auto',
    width           : '70vh',
    height          : '65vh',
    border          : '1px solid #ccc',
    padding         : '20px',
    zIndex          : 11,
    backgroundColor : '#e2e2e2'
  }
};

class SongView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      rand: `https://s3-us-west-1.amazonaws.com/chillcloud-dev/stock/cover${Math.ceil(8 * Math.random())}.jpg`
    };

    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.delete = this.delete.bind(this);
    this.playSong = this.playSong.bind(this);
    this.queueSong = this.queueSong.bind(this);
    // this.props.getSong = this.props.getSong.bind(this);
  }

  openForm () {
    this.setState({isOpen: true});
  }

  closeForm () {
    this.setState({isOpen: false});
  }

  componentWillUnmount() {
    this.closeForm();
  }

  componentDidMount() {
    this.setState({rand: `https://s3-us-west-1.amazonaws.com/chillcloud-dev/stock/cover${Math.ceil(8 * Math.random())}.jpg`});
    this.props.getSong(this.props.match.params.song_id);
  }

  playSong () {
    this.props.play(this.props.songs);
  }

  queueSong () {
    this.props.queue(this.props.songs);
  }

  componentWillReceiveProps(nextProps) {
    // if (!nextProps.songs.redirect) {
    //   this.closeForm();
    // } else
    if (nextProps.songs.id !== parseInt(this.props.match.params.song_id) &&
      Boolean(nextProps.songs.id)) {
      this.props.getSong(this.props.match.params.song_id);
    }
  }

  componentDidUpdate() {
    if (this.props.songs.redirect === "stream") {
      this.props.history.push(`/stream`);
    } else if (this.props.songs.redirect === "success") {
      this.closeForm();
    }
  }

  delete() {
    this.props.deleteSong(this.props.match.params.song_id);
  }

  render () {
    const {songs, currentUser} = this.props;
    const buttons = (
      <div className="artist-buttons">
        <button onClick={this.openForm}>
          <span>
            Update!
          </span>
        </button>
        <button onClick={this.delete}>
          <span>
            Delete!
          </span>
        </button>
      </div>
    );

    let randStyle = {
      backgroundImage: `url(${this.state.rand})`
    };

    return Object.keys(songs).length !== 0 ? (
      <main className="song-view-main">
        <div
          className="song-view"
          style={randStyle}>
          <img src={songs.image_url} />
          <div className="second-col">
            <section>
              <div className="buttons">
                <button
                  className="play-button"
                  onClick={this.playSong}
                  />
                <button
                  className="queue-button"
                  onClick={this.queueSong}>+</button>
              </div>
              <ul className="details">
                <li key={`title-${songs.id}`}>{songs.title}</li>
                <li key={`artist-${songs.id}`}>{songs.artist}</li>
              </ul>
            </section>
            {currentUser.id === songs.user_id ? buttons : null}
          </div>
            <p className="genre">{songs.genre ? `#${songs.genre}` : null}</p>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="form"
          onRequestClose={this.closeForm}
          style={modalUploadStyle}
        >
          <UploadFormContainer
            closeModal={this.closeForm}
            type="update" />
        </Modal>
        <div className="bottom-view">
            <ul className="comments">
              <div className="comment-header">
              <img
                src={currentUser.image}
                className="avatar-round" />
              <input
                type="text">
              </input>
                Comments!
              </div>
            </ul>
          <ul
            className="artist-similar">
            Similar songs from {songs.artist}!
            <img
              src={songs.artistAvatar}
              className="avatar-round"/>
          </ul>
        </div>
      </main>
    ) : null;
  }
}

export default withRouter(SongView);
