import * as APIUtil from '../util/song_util';

export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";

export const receiveSong = (song) => ({
  type: PLAY_SONG,
  song
});

export const actionPlaySong = (id) => dispatch => {
  return APIUtil.songRequest(id).then(
    resp => dispatch(receivePlaySong(resp)),
    e => errorHandle(e, dispatch)
  );
};

export const actionPauseSong = () => dispatch => {
  dispatch({ type: PAUSE_SONG });
};