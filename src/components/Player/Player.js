import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Easing,
  Dimensions,
  findNodeHandle,
  TouchableOpacity
} from 'react-native';
import TextTicker from 'react-native-text-ticker'
import { BlurView } from "@react-native-community/blur";
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helpers/screenNormalizer';
import CircleSlider from '../Slider/Slider';
import { togglePlayPause, getSongTimeProperties, selectSong } from '../../redux/actions/index';
import Video from 'react-native-video';
import display from '../../helpers/timeFormatter';
import currentTimeConverter from '../../helpers/currentTimeConverter';
import Slider from 'react-native-slider';
// import Slider from '@react-native-community/slider'; // re-involve this when creating the volume functionality

export class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      slider1: 270,
      slider2: 180,
      progress: 0,
      paused: true,                 // TODO: this will be dispatch from store based on last song played or user preference
      tracks: [],
      volume: 0.5,
      totalLength: 1,
      currentPosition: 0,
      repeatOn: false,
      shuffleOn: false,
      selectedTrackIndex: 0,
      isChanging: false,
      showVolumeControl: false
    }
  }

  componentDidMount() {
    // this.props.getTracks().then(tracks => console.log(tracks, '>>>>>'))
    const { tracks } = this.props;
    this.setState(prevState => ({
      ...prevState,
      tracks
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedTrack !== this.props.selectedTrack) {
      this.setState({
        selectedTrack: this.props.selectedTrack.track,
        selectedTrackIndex: this.props.selectedTrack.selectedTrackIndex
      });
    }

    if (prevProps.toggledControl !== this.props.toggledControl) {
      this.setState({
        paused: this.props.toggledControl
      });
    }
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }


  getCurrentTime = () => {
    return currentTimeConverter(this.state.currentPosition, this.state.totalLength);
  }

  toggleVolumeControl = () => {
    this.setState({
      showVolumeControl: true
    });

    setTimeout((function () {
      this.setState({
        showVolumeControl: false
      });
    }).bind(this), 5000);
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        {this.state.showVolumeControl ? (
          <View style={{
            display: 'flex',
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Image
                source={require('../../assets/VolumeDown.png')}
              />
            </View>
            <Slider
              value={this.state.volume}
              thumbTintColor='#fff'
              onSlidingStart={() => this._touchStart()}
              onSlidingComplete={() => this._touchEnd()}
              minimumTrackTintColor="#ccc"
              maximumTrackTintColor="#777"
              trackStyle={{
                width: wp('75%'),
                height: hp('0.18%')
              }}
              style={{ width: wp('75%') }}
              onValueChange={(volume) => this.setState({ volume })}
            />
            <View>
              <Image
                source={require('../../assets/VolumeUp.png')}
              />
            </View>
          </View>
        ) : (
            <>
              <View>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Store.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.toggleVolumeControl()}>
                  <Image
                    source={require('../../assets/volumeButton.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/sleep_timer_normal.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                {/* <TouchableOpacity>
            <Image
              source={require('../assets/airplay.png')}
            />
          </TouchableOpacity> */}
              </View>
              <View style={styles.rightIcons}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Settings.png')}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
      </View>
    )
  }

  renderTrackName = (track) => {
    // const track = this.state.tracks[this.state.selectedTrack];
    return (
      <View style={styles.track}>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/ShuffleOff.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.trackName}>
          <TextTicker
            style={{ fontSize: hp('2.8%'), color: '#ccc', fontFamily: 'TitilliumWeb-Regular' }}
            duration={20000}
            loop
            bounce
            repeatSpacer={30}
            marqueeDelay={3000}
            easing={Easing.out(Easing.quad)}
          >
            {track.title}
          </TextTicker>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/RepeatOff.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderTrackArtiste = (track) => {
    return (
      <View style={styles.artisteWrapper}>
        <View>
          <Text style={{ fontSize: hp('2.1%'), color: '#ccc', fontFamily: 'TitilliumWeb-Regular' }}>
            {display(this.state.currentPosition)}
          </Text>
        </View>
        <View style={styles.artiste}>
          <TextTicker
            style={{ fontSize: hp('2.6%'), color: '#6e6e6e', fontFamily: 'TitilliumWeb-Regular' }}
            duration={30000}
            loop
            bounce
            repeatSpacer={20}
            marqueeDelay={1500}
          // easing={Easing.out(Easing.quad)}
          >
            {track.artist}
          </TextTicker>
        </View>
        <View>
          <Text style={{ fontSize: hp('2.1%'), color: '#ccc', fontFamily: 'TitilliumWeb-Regular' }}>
            -{display(this.state.totalLength)}
          </Text>
        </View>
      </View>
    )
  }

  renderAlbumArt = (art) => {
    return (
      <View style={styles.slider}>
        <CircleSlider
          value={this.getCurrentTime()}
          strokeColor="#6e6e6e"
          max={360}
          min={1}
          dialWidth={wp('0.5%')}
          width={wp('2%')}
          height={wp('2%')}
          btnRadius={wp('1.0%')}
          dialRadius={wp('30%')}
          strokeWidth={wp('0.5%')}
          xCenter={Dimensions.get('window').width / 2}
          yCenter={Dimensions.get('window').height / 2}
          onMoveStart={this._touchStart}
          onMoveEnd={this._touchEnd}
          onValueChange={x => x}
        />
        <View style={styles.albumArtWrapper}>
          <Image
            resizeMode='contain'
            style={{ height: '100%', width: '100%' }}
            source={art}
          />
        </View>
        <View style={{ position: 'absolute' }}>
          <TouchableOpacity onPress={() => this._togglePlayPause(this.state.paused)}>
            <Image
              resizeMode='contain'
              source={this.state.paused ? require('../../assets/Play.png') : require('../../assets/Pause.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSeekButtons = () => {
    return (
      <View style={styles.seekWapper}>
        <View>
          <TouchableOpacity onPress={this.onBack.bind(this)}>
            <Image
              style={{ width: wp('12%'), height: hp('4%') }}
              source={require('../../assets/Previous.png')}
              resizeMode='stretch'
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.onForward.bind(this)}>
            <Image
              style={{ width: wp('12%'), height: hp('4%') }}
              source={require('../../assets/Next.png')}
              resizeMode='stretch'
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderAudioEffect = () => {
    return (
      <View style={styles.effect}>
        <View>
          <TouchableOpacity onPress={this.goToLibrary}>
            <Image
              style={{ width: wp('20%'), marginBottom: hp('1%') }}
              source={require('../../assets/Library.png')}
              resizeMode='contain'
            />
            <View style={{ ...styles.library }} >
              <Text style={{ color: '#ccc', fontFamily: 'TitilliumWeb-Regular' }}>
                LIBRARY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              style={{ width: wp('23%'), marginBottom: hp('1%') }}
              source={require('../../assets/EffectsOn.png')}
              resizeMode='contain'
            />
            <View style={{ ...styles.effects }}>
              <Text style={{ color: 'yellow', fontFamily: 'TitilliumWeb-Regular' }}>
                EFFECTS
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.goToUpNext}>
            <Image
              style={{ width: wp('20%'), marginBottom: hp('1%') }}
              source={require('../../assets/Queue.png')}
              resizeMode='contain'
            />
            <View style={{ ...styles.effects }}>
              <Text style={{ color: '#ccc', fontFamily: 'TitilliumWeb-Regular' }}>
                UP NEXT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image
            style={{ width: wp('7%'), height: hp('2%') }}
            source={require('../../assets/More.png')}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    )
  }

  _touchStart = () => {
    this.props.toggleScroll(false)
  }

  _touchEnd = () => {
    this.props.toggleScroll(true)
  }

  _togglePlayPause = async (booleanData) => {
    const { data } = await this.props.toggledPlayPause(booleanData);
    this.setState({
      paused: data
    });
  }

  goToLibrary = () => {
    this.props.swipe.current._onPressBackBtn();
  }

  goToUpNext = () => {
    // await this.props.selectTrack(this.state.);
    this.props.swipe.current._onPressNextBtn();
  }

  selectTrack = async (state) => {
    const { tracks, selectedTrackIndex } = state;
    const track = tracks[selectedTrackIndex];
    await this.props.selectTrack({ track, selectedTrackIndex });
  }

  /**
   * 
   * Below functions are the react-native video handlers 
   * 
   */

  setDuration(data) {
    // console.log(data);
    this.setState({ totalLength: Math.floor(data.duration) });
  }

  setTime(data) {
    this.props.getSongTimeProperties(data);
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,      // specify seek playback behaviour when seeking
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrackIndex > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(async () => {
        this.setState({
          currentPosition: 0,
          paused: false,
          totalLength: 1,
          isChanging: false,
          selectedTrackIndex: this.state.selectedTrackIndex - 1,
        });
        await this.selectTrack(this.state);
      }, 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrackIndex < this.state.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(async () => {
        this.setState({
          currentPosition: 0,
          totalLength: 1,
          paused: false,
          isChanging: false,
          selectedTrackIndex: this.state.selectedTrackIndex + 1,
        });
        await this.selectTrack(this.state);
      }, 0);
    }
  }

  onEnd = () => {
    this.onForward();
  }

  video = (track) => {
    return (
      <Video
        // source={{ uri: track && track.assetUrl }}                // Can be a URL or a local file.
        source={track && track.assetUrl}                            // Can be a URL or a local file.
        ref="audioElement"
        key={track && track.persistentId}
        paused={this.state.paused}                                  // Pauses playback entirely.
        resizeMode="cover"                                          // Fill the whole screen at aspect ratio.
        repeat={true}                                               // Repeat forever.
        onLoadStart={this.loadStart}                                // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}                        // Callback when video loads
        onProgress={this.setTime.bind(this)}                        // Callback every ~250ms with currentTime
        onEnd={this.onEnd}                                          // Callback when playback finishes
        onError={this.videoError}                                   // Callback when video cannot be loaded
        style={styles.audioElement}
        playWhenInactive={true}
        playInBackground={true}
      />
    );
  }

  render() {
    const { tracks, selectedTrackIndex } = this.state;
    if (!tracks.length) return null;
    const track = tracks[selectedTrackIndex];
    const url = track.albumArtUrl ? { uri: track.albumArtUrl } : require('../../assets/DefaultAlbumArtImage.png');
    return (
      <View
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
        />
        <ImageBackground
          ref={img => {
            this.backgroundImage = img;
          }}
          // source={require('../../assets/f180b23e.jpg')}
          source={url}
          style={{ ...styles.absolute }}
          resizeMode="stretch"
          blurRadius={50}
          blurAmount={100}
          blurType='xlight'
          onLoadEnd={this.imageLoaded.bind(this)}
        >
          <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="extraDark"
            blurAmount={50}
          />
          <View style={styles.text}>
            {this.renderHeader()}
            {this.renderTrackName(track)}
            {this.renderTrackArtiste(track)}
            {this.renderAlbumArt(url)}
            {this.renderSeekButtons()}
            {this.renderAudioEffect()}
            {this.renderFooter()}
          </View>
          {/* {!!tracks && !!tracks.length && this.video(track)} */}
          {this.video(track)}
        </ImageBackground>
      </View>
    );
  }
}

export const mapStateToProps = state => ({
  selectedTrack: state.selectedSongReducer.track,
  toggledControl: state.togglePlayPauseReducer.paused
});

export const mapDispatchToProps = dispatch => ({
  selectTrack: data => dispatch(selectSong(data)),
  toggledPlayPause: data => dispatch(togglePlayPause(data)),
  getSongTimeProperties: data => dispatch(getSongTimeProperties(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);


// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('100%'),
    alignItems: 'center'
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('5%'),
    width: wp('90%'),
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  leftIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('50%')
  },
  rightIcons: {
    // flex: 1,
    // alignItems: 'center'
  },
  track: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginTop: hp('4%')
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  trackName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('70%'),
    height: hp('5%'),
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  artisteWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    alignItems: 'center',
  },
  artiste: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%'),
    height: hp('4.5%'),
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  slider: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('60%'),
    height: wp('60%'),
    // borderColor: '#ccc',
    // borderWidth: 1,
    marginTop: hp('3%'),
  },
  albumArtWrapper: {
    position: 'absolute',
    width: wp('57.5%'),
    height: wp('57.5%'),
    overflow: 'hidden',
    borderRadius: wp('28.25%'),
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  seekWapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('80%'),
    marginTop: hp('2%')
  },
  effect: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('75%'),
    marginTop: hp('4%'),
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  library: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  upNext: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  effects: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('90%'),
    marginTop: hp('3%'),
    // borderWidth: 1,
    // borderColor: '#ccc'
  }
});
