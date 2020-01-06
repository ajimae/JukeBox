import {
  FETCH_SONGS_START,
  FETCH_SONGS_ERROR,
  FETCH_SONGS_SUCCESS,

  SELECT_SONG_START,
  SELECT_SONG_ERROR,
  SELECT_SONG_SUCCESS,

  TOGGLE_PLAY_START,
  TOGGLE_PLAY_ERROR,
  TOGGLE_PLAY_SUCCESS,


  FETCH_TIME_PROPERTIES_START,
  FETCH_TIME_PROPERTIES_ERROR,
  FETCH_TIME_PROPERTIES_SUCCESS,
} from './types';
import songs from './fixtures';
// import iTunes from 'react-native-itunes';
/**
 * fetch song action creators
 */
export const fetchSongsStart = () => ({
  type: FETCH_SONGS_START
});

export const fetchSongsSuccess = (data) => ({
  type: FETCH_SONGS_SUCCESS,
  data
});

export const fetchSongsError = (error) => ({
  type: FETCH_SONGS_ERROR,
  error
});

export const getSongs = () => async (dispatch) => {
  dispatch(fetchSongsStart());
  try {
    // iTunes.getTracks({
    //   fields: ['persistentId', 'title', 'artist', 'albumTitle', 'genre', 'artwork', 'lyrics', 'duration', 'assetUrl']
    // }).then((tracks) => {

    // }).catch(error => {
    //   alert(error)
    // });

    // const songs = await iTunes.getTracks({
    //   fields: ['persistentId', 'title', 'artist', 'albumTitle', 'genre', 'artwork', 'lyrics', 'duration', 'assetUrl']
    // });
    // const songs = await Promise.resolve([
    //   {
    //     title: 'Promises',
    //     artist: 'Wiz Khalifa',
    //     albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 1
    //   },
    //   {
    //     title: '...Ready For It?',
    //     artist: 'Taylor Swift',
    //     albumArtUrl: "",
    //     // albumArtUrl: "https://target.scene7.com/is/image/Target/GUEST_608e5972-e6e0-4fef-b66d-4d83f3eb8f56?wid=488&hei=488&fmt=pjpeg",
    //     assetUrl: require("../../assets/freeStyle.mp3"),
    //     persistentId: 2,
    //   },
    //   {
    //     title: 'Hotline Bling',
    //     artist: 'Drake',
    //     albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 3
    //   },
    //   {
    //     title: 'Stressed Out',
    //     artist: 'Twenty One Pilots',
    //     albumArtUrl: "https://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    //     // audioUrl: "/Users/chukwuemekaajima/Music/iTunes/iTunes Media/Music/114_Toni Braxton With Trey Songz/Unknown Album/Yesterday.mp3",
    //     assetUrl: require("../../assets/freeStyle.mp3"),
    //     persistentId: 4
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //   },
    //   {
    //     title: 'Promises',
    //     artist: 'Wiz Khalifa',
    //     albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 5
    //   },
    //   {
    //     title: '...Ready For It?',
    //     artist: 'Taylor Swift',
    //     albumArtUrl: "https://target.scene7.com/is/image/Target/GUEST_608e5972-e6e0-4fef-b66d-4d83f3eb8f56?wid=488&hei=488&fmt=pjpeg",
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //     assetUrl: require("../../assets/freeStyle.mp3"),
    //     persistentId: 6
    //   },
    //   {
    //     title: 'Hotline Bling',
    //     artist: 'Drake',
    //     albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    //     // audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 7
    //   },
    //   {
    //     title: 'PromisesPromisesPromisesPromisesPromisesPromisesPromises',
    //     artist: 'Wiz Khalifa',
    //     albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //     assetUrl: require("../../assets/freeStyle.mp3"),
    //     persistentId: 8
    //   },
    //   {
    //     title: 'Hotline Bling',
    //     artist: 'Drake',
    //     albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    //     // audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 9
    //   },
    //   {
    //     title: 'Promises',
    //     artist: 'Wiz Khalifa',
    //     albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //     assetUrl: require("../../assets/freeStyle.mp3"),
    //     persistentId: 10
    //   },
    //   {
    //     title: 'Stressed Out',
    //     artist: 'Twenty One Pilots',
    //     albumArtUrl: "https://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    //     // audioUrl: "/Users/chukwuemekaajima/Music/iTunes/iTunes Media/Music/114_Toni Braxton With Trey Songz/Unknown Album/Yesterday.mp3",
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 11
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //   },
    //   {
    //     title: 'Hotline Bling',
    //     artist: 'Drake',
    //     albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    //     // audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
    //     assetUrl: require("../../assets/freeStyle.mp3"),
    //     persistentId: 12
    //   },
    //   {
    //     title: 'Promises',
    //     // artist: 'Wiz Khalifa',
    //     albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
    //     // audioUrl: "../../assets/flora_secret.mp3",
    //     assetUrl: require("../../assets/flora_secret.mp3"),
    //     persistentId: 13
    //   }
    // ]);
    const allSongs = await songs();
    return dispatch(fetchSongsSuccess(allSongs));
  } catch (error) {
    return dispatch(fetchSongsError(error));
  }
}


/**
 * select songs action creators
 */
export const selectSongStart = () => ({
  type: SELECT_SONG_START
});

export const selectSongSuccess = (data) => ({
  type: SELECT_SONG_SUCCESS,
  data
});

export const selectSongError = (error) => ({
  type: SELECT_SONG_ERROR,
  error
});

export const selectSong = data => async (dispatch) => {
  dispatch(selectSongStart());
  try {
    return dispatch(selectSongSuccess(data));
  } catch (error) {
    return dispatch(selectSongError(error));
  }
}


/**
 * toggle play/pause control action creators
 */
export const togglePlayPauseStart = () => ({
  type: TOGGLE_PLAY_START
});

export const togglePlayPauseSuccess = (data) => ({
  type: TOGGLE_PLAY_SUCCESS,
  data: !data
});

export const togglePlayPauseError = (error) => ({
  type: TOGGLE_PLAY_ERROR,
  error
});

export const togglePlayPause = (data) => async (dispatch) => {
  dispatch(togglePlayPauseStart());
  try {
    return dispatch(togglePlayPauseSuccess(data));
  } catch (error) {
    return dispatch(togglePlayPauseError(error));
  }
}


/**
 * dispatch song time properties action creators
 */
export const getSongTimePropertiesStart = () => ({
  type: FETCH_TIME_PROPERTIES_START
});

export const getSongTimePropertiesSuccess = (timeProperties) => ({
  type: FETCH_TIME_PROPERTIES_SUCCESS,
  timeProperties
});

export const getSongTimePropertiesError = (error) => ({
  type: FETCH_TIME_PROPERTIES_ERROR,
  error
});

export const getSongTimeProperties = (data) => async (dispatch) => {
  dispatch(getSongTimePropertiesStart());
  try {
    return dispatch(getSongTimePropertiesSuccess(data));
  } catch (error) {
    return dispatch(getSongTimePropertiesError(error));
  }
}
