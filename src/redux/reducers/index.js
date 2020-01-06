import { combineReducers } from 'redux';

// reducers
import {
  fetchSongsReducer,
  selectedSongReducer,
  togglePlayPauseReducer,
  getSongTimePropertiesReducer
} from './songsReducer';

const rootReducer = combineReducers({
  fetchSongsReducer,
  selectedSongReducer,
  togglePlayPauseReducer,
  getSongTimePropertiesReducer
});

export default rootReducer;
