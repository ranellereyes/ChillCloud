import React from 'react';
import SongItem from './song_item';
import {withRouter} from 'react-router-dom';

class SongDetailList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllSongs();
  }

  render () {
    const songs = this.props.songs;

    if (!Array.isArray(songs)) { return null; }

    return (
      <ul className="stream-list">
        <label>Stream!</label>
        {songs.map((song, i) => (
          <li key={`song-${i}`}>
            <SongItem
              song={song}
              currentUser={this.props.currentUser}
              play={this.props.play}
              queue={this.props.queue}
              history={this.props.history}
            />
          </li>
        ))}
      </ul>
    );

    // return (
    //   <ul className="stream-list">
    //     <label>Stream!</label>
    //     {Object.keys(songs).map((key) => (
    //       <li key={`song-${key}`}>
    //         <SongItem
    //           song={songs[key]}
    //           currentUser={this.props.currentUser}
    //           play={this.props.play}
    //           pause={this.props.pause}
    //         />
    //       </li>
    //     ))}
    //   </ul>
    // );
  }
}

export default withRouter(SongDetailList);
