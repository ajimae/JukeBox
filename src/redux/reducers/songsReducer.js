const initialState = {
  isLoading: false,
  track: [],
  tracks: [],
  paused: true,
  error: null,
  timeProperties: {}
};

// reducer - modifies the state and returns a new state
export const fetchSongsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_START': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'FETCH_SONGS_SUCCESS': {
      return {
        ...state,
        tracks: [...action.data],
        isLoading: false
      }
    }
    case 'FETCH_SONGS_ERROR': {
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    }
    // default
    default: {
      return state;
    }
  }
}

// reducer - modifies the state and returns a new state
export const selectedSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_SONG_START': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'SELECT_SONG_SUCCESS': {
      return {
        ...state,
        track: action.data,
        isLoading: false
      }
    }
    case 'SELECT_SONG_ERROR': {
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    }
    // default
    default: {
      return state;
    }
  }
}

// reducer - modifies the state and returns a new state
export const togglePlayPauseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY_START': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'TOGGLE_PLAY_SUCCESS': {
      return {
        ...state,
        paused: action.data,
        isLoading: false
      }
    }
    case 'TOGGLE_PLAY_ERROR': {
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    }
    // default
    default: {
      return state;
    }
  }
}

// reducer - modifies the state and returns a new state
export const getSongTimePropertiesReducer = (state = initialState, { type, timeProperties }) => {
  switch (type) {
    case 'FETCH_TIME_PROPERTIES_START': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'FETCH_TIME_PROPERTIES_SUCCESS': {
      return {
        ...state,
        timeProperties,
        isLoading: false
      }
    }
    case 'FETCH_TIME_PROPERTIES_ERROR': {
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    }
    // default
    default: {
      return state;
    }
  }
}
