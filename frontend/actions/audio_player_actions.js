import * as APIUtil from '../util/song_util';
import { errorHandle } from './errors_actions';

export const QUEUE_SONG = "QUEUE_SONG";
export const PLAY_SONG = "PLAY_SONG";
export const NEXT_SONG = "NEXT_SONG";
export const CLEAR_PLAYLIST = "CLEAR_PLAYLIST";

export const actionQueueSong = (song) => ({
    type: QUEUE_SONG,
    song
});

export const actionPlaySong = (song) => ({
  type: PLAY_SONG,
  song
});

// export const actionNextSong = () => ({
//   type: NEXT_SONG
// });

// export const actionPlaySong = (id) => dispatch => {
//   return APIUtil.songRequest(id).then(
//     resp => dispatch(receivePlaySong(resp)),
//     e => errorHandle(e, dispatch)
//   );
// };
//
// export const actionPauseSong = () => dispatch => {
//   dispatch({ type: PAUSE_SONG });
// };
