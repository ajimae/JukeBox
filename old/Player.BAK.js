import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import Header from '../Header/Header';
import AlbumArt from '../AlbumArt/AlbumArt';
import TrackDetails from '../TrackDetails/TrackDetails';
import SeekBar from '../Slider/Slider';
import Controls from '../Controls/Controls';
import Video from 'react-native-video';
export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      tracks: [],
      // isChanging: false
    };
    this.setSongsToState = this.setSongsToState.bind(this);
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const receivedState = this.props.navigation.getParam('state');
    const {
      paused,
      tracks,
      selectedTrack,
    } = receivedState;
    if (this.state.tracks.length == 0) {
      this.setState(prevState => ({
        ...prevState,
        paused,
        selectedTrack,
        tracks: [...tracks]
      }));
    } else {
      // TODO
      // do nothing for now
    }
  }

  setSongsToState() {
    iTunes.getTracks({
      fields: ['persistentId', 'title', 'artist', 'albumTitle', 'genre', 'artwork', 'lyrics', 'duration', 'assetUrl']
    }).then((tracks) => {
      this.setState(prevState => ({
        ...prevState,
        tracks
      }))
    }).catch(error => {
      alert(error);
    });
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({ totalLength: Math.floor(data.duration) });
  }

  setTime(data) {
    //console.log(data);
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.state.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }

  showTrackList() {
    this.props.navigation.navigate('Tracks');
  }

  video(track) {
    return (
      <Video
        source={{ uri: track && track.assetUrl }} // Can be a URL or a local file.
        ref="audioElement"
        key={track && track.persistentId}
        paused={this.state.paused}                // Pauses playback entirely.
        resizeMode="cover"                        // Fill the whole screen at aspect ratio.
        repeat={true}                             // Repeat forever.
        onLoadStart={this.loadStart}              // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}      // Callback when video loads
        onProgress={this.setTime.bind(this)}      // Callback every ~250ms with currentTime
        onEnd={this.onEnd}                        // Callback when playback finishes
        onError={this.videoError}                 // Callback when video cannot be loaded
        style={styles.audioElement}
        playWhenInactive={true}
        playInBackground={true}
      />
    );
  }

  render() {
    const { tracks } = this.state;
    const track = !!tracks && this.state.tracks[this.state.selectedTrack];
    const url = track && track.artwork ? { uri: track.artwork } : require('../../assets/default_art.png');
    // const video = this.state.isChanging ? null :  (
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header message="" onQueuePress={this.showTrackList.bind(this)} />
        <AlbumArt url={url} />
        <TrackDetails title={track && track.title} artist={track && track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({ paused: true })}
          currentPosition={this.state.currentPosition} />
        <Controls
          onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn })}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.state.tracks.length - 1} // TODO - add condition for shuffle
          onPressShuffle={() => this.setState({ shuffleOn: !this.state.shuffleOn })}
          onPressPlay={() => this.setState({ paused: false })}
          onPressPause={() => this.setState({ paused: true })}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}
        />
        {!!tracks && !!tracks.length && this.video(track)}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    // backgroundColor: '#fff',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
