import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import Songs from './Songs/Songs';
import Albums from './Albums/Albums';
import Artists from './Artists/Artists';
import Playlists from './Playlists/Playlists';
import Genres from './Genres/Genres';
import { activeAssets, inactiveAssets } from './Songs/fixtures';
import { connect } from 'react-redux';
import { togglePlayPause } from '../../redux/actions/index';
import ProgressBar from '../ProgressBar/ProgressBar';
import currentTimeConverter from '../../helpers/currentTimeConverter';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helpers/screenNormalizer';
import BottomPanel from './BottomPanel/BottomPanel';

export class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      tracks: [],
      progress: 0,
      paused: true,                  // TODO: this will be dispatch from store based on user preference
      selectedTrackIndex: 0,         // TODO: this will be dispatch from store based on last song played or user preference
      selectedTrack: {               // TODO: this will be dispatch from store based on last song played or user preference
        title: 'Promises',
        artist: 'Wiz Khalifa',
        albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
        audioUrl: '../../assets/flora_secret.mp3',
      },
      showPanel: false,
      showBottomSheet: false,
      screens: [Songs, Albums, Artists, Playlists, Genres],
    };
    this.moveAnimation = new Animated.ValueXY({ x: 0, y: -hp('100%') });
    this.moveAlbumAnimation = new Animated.ValueXY({ x: 0, y: hp('120%') });
  }

  componentDidMount() {
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

    if (prevProps.timeProperties.currentTime !== this.props.timeProperties.currentTime) {
      const { currentTime, playableDuration } = this.props.timeProperties;
      const progress = currentTimeConverter(Math.floor(currentTime), Math.floor(playableDuration), 1)
      this.setState({
        progress
      });
    }
  }

  setTabIndex = index => {
    this.setState(prevState => ({
      ...prevState,
      index,
    }));
  }

  _toPlayer = () => {
    if (this.state.showPanel) {
      this._movePanel();
    }
    this.props.swipe.current._onPressNextBtn();
  }

  _togglePlayPause = async (booleanData) => {
    const { data } = await this.props.toggledPlayPause(booleanData);
    this.setState({
      paused: data
    });
  }


  _movePanel = () => {
    Animated.timing(this.moveAnimation, {
      toValue: { x: 0, y: this.state.showPanel ? -hp('100%') : 5 },
      duration: 250,
      easing: Easing.out(Easing.linear)
    }).start();
    this.setState(prevState => ({
      showPanel: !prevState.showPanel
    }));
  }

  _moveBottomPanel = () => {
    Animated.timing(this.moveAlbumAnimation, {
      toValue: { x: 0, y: this.state.showBottomSheet ? hp('105%') : 0 },
      duration: 200,
      easing: Easing.out(Easing.linear)
    }).start();
    this.setState(prevState => ({
      showBottomSheet: !prevState.showBottomSheet
    }));
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableWithoutFeedback onPress={this._movePanel}>
            <View style={styles.headerDetails}>
              <View>
                <Image
                  source={require('../../assets/iTunesSearchSelected.png')}
                  style={{ width: wp('10%'), height: wp('10%') }}
                />
              </View>
              <View>
                <Text style={styles.library}>Library</Text>
              </View>
              <View style={{ marginTop: wp('2%') }}>
                <Image
                  source={require('../../assets/DropDown.png')}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <View style={styles.headerControls}>
              <TouchableOpacity>
                <View>
                  <Image
                    source={require('../../assets/topBarSearch.png')}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._toPlayer}>
                <View>
                  <Image
                    source={require('../../assets/Close.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderLibraryPanel = () => {
    return (
      <Animated.View style={[styles.libraryPanel, this.moveAnimation.getLayout()]}>
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={50}
        />
        <TouchableWithoutFeedback style={styles.button} onPress={this._movePanel}>
          <Text style={styles.buttonText}>Library lists...</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
  
  renderAlbumPanel = () => {
    return (
      <Animated.View style={[styles.albumPanel, this.moveAlbumAnimation.getLayout()]}>
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={50}
        />
        <TouchableWithoutFeedback style={styles.button} onPress={this._moveBottomPanel}>
          <Text style={[styles.buttonText,  { marginTop: 80 }]}>Library lists...</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }

  renderScreen = () => {
    const { tracks, index } = this.state;
    if (!tracks.length) return;
    const Screen = this.state.screens[index];
    return (
      <View style={styles.content}>
        <Screen
          tracks={tracks}
          paused={this.state.paused}
          togglePlayPause={this._togglePlayPause}
          toggleBottomPanel={this._moveBottomPanel}
        />
      </View>
    );
  }

  renderProgressIndicator = () => {
    return (
      <View style={styles.progressIndicator}>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{}}
          style={{ width: wp('100%') }}
          progress={this.state.progress}
        />
      </View>
    )
  }

  /**
   * 
   * TODO: Provide empty views at the header and bottom of song container 
   * with considerable heights to provide padding for song list
   */
  renderMiniPlayer = () => {
    const { title, artist, albumArtUrl } = this.state.selectedTrack;
    return (
      <View style={styles.miniPlayer}>
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={0}
        />
        <View style={styles.miniContents}>
          <TouchableOpacity onPress={() => this._toPlayer()}>
            <View style={{ borderRadius: wp('1%'), overflow: 'hidden' }}>
              <Image
                style={{ width: wp('16%'), height: wp('16%') }}
                source={albumArtUrl ? { uri: albumArtUrl } : require('../../assets/DefaultAlbumArtImage.png')}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._toPlayer()}>
            <View style={styles.trackDetails}>
              {title ? (<View>
                <Text
                  style={styles.trackName}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              </View>) : null}
              {artist ? (<View>
                <Text
                  style={styles.artistName}
                  numberOfLines={1}
                >
                  {artist}
                </Text>
              </View>) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._togglePlayPause(this.state.paused)}>
            <View>
              <Image
                style={{ width: wp('5%'), height: hp('5%') }}
                source={this.state.paused ? require('../../assets/play_pressed.png') : require('../../assets/pause_pressed.png')}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderMiniPlayerProgressBar = () => {
    return (
      <View style={styles.miniWrapper}>
        {this.renderProgressIndicator()}
        {this.renderMiniPlayer()}
      </View>
    )
  }

  renderInactiveAssets = ({ asset, index }) => {
    return (
      <TouchableOpacity key={`inactive-${index}`} onPress={() => this.setTabIndex(index)}>
        <View style={styles.iconWrapper}>
          <Image
            style={{ width: wp('11%'), height: wp('10%') }}
            source={asset.icon}
            resizeMode="contain"
          />
          <Text style={{ ...styles.tabText, color: asset.color }}>{asset.label}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderActiveAsset = ({ asset, index }) => {
    return (
      <TouchableOpacity key={`active-${index}`} onPress={() => this.setTabIndex(index)}>
        <View style={styles.iconWrapper}>
          <Image
            style={{ width: wp('11%'), height: wp('10%') }}
            source={asset.icon}
            resizeMode="contain"
          />
          <Text style={{ ...styles.tabText, color: asset.color }}>{asset.label}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderTabBars = () => {
    return (
      <View style={styles.tabWrapper}>
        <View style={styles.tabView}>
          {inactiveAssets.map((asset, index) => {
            if (this.state.index === index) {
              return this.renderActiveAsset({ asset: activeAssets[index], index });
            }
            return this.renderInactiveAssets({ asset, index });
          })}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderLibraryPanel()}
        {this.renderScreen()}
        {this.renderMiniPlayerProgressBar()}
        {/* {this.renderProgressIndicator()}
        {this.renderMiniPlayer()} */}
        {this.renderTabBars()}
        <BottomPanel
          closeBottomPanel={this._moveBottomPanel}
          initialPosition={this.moveAlbumAnimation}
        />
      </View>
    );
  }
}


export const mapStateToProps = state => ({
  selectedTrack: state.selectedSongReducer.track,
  toggledControl: state.togglePlayPauseReducer.paused,
  timeProperties: state.getSongTimePropertiesReducer.timeProperties
});

export const mapDispatchToProps = dispatch => ({
  toggledPlayPause: data => dispatch(togglePlayPause(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  libraryPanel: {
    position: "absolute",
    // backgroundColor: 'greenyellow',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 998
  },
  albumPanel: {
    position: "absolute",
    // backgroundColor: 'greenyellow',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 5, // To cover the given height sufficiently - add 5 
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    top: 0,
    backgroundColor: '#660d2a',
    color: '#fff',
    height: hp('14%'),
    width: wp('100%'),
    // borderColor: '#ccc',
    // borderWidth: 1,
    zIndex: 999
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%'),
    marginTop: hp('4%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('43%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  library: {
    fontSize: hp('3.5%'),
    color: '#e1cfd5',
    fontFamily: 'TitilliumWeb-Bold',
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  headerControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('20%'),
    height: hp('5%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomColor: '#111',
    // borderBottomWidth: 1,
    height: hp('91%'),
    width: wp('100%')
  },
  progressIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: hp('21.58%'),
    width: wp('100%'),
    // height: hp('1%'),
    // borderTopColor: '#ccc',
    // borderTopWidth: 1.5,
    backgroundColor: '#fff',
    // zIndex: 997
  },
  miniWrapper: {
    position: 'absolute',
    bottom: hp('11.6%'), // this number is calculator so be careful while changing it
    // backgroundColor: '#660d2a',
    color: '#ccc',
    zIndex: 996
  },
  miniPlayer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: hp('11.58%'),
    // // backgroundColor: '#660d2a',
    // color: '#ccc',
    height: hp('9%'), // 12% initially
    width: wp('100%'),
    // borderTopColor: '#ccc',
    // borderTopWidth: wp('0.05%'),
    backgroundColor: '#555',
  },
  miniContents: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('100%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  tabWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('10.5%'),
    marginBottom: hp('2%'),
    backgroundColor: '#111',
    borderTopColor: '#aaa',
    borderTopWidth: 0.5
  },
  tabView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%')
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabText: {
    fontSize: hp('2.0%'),
    color: '#fff',
    fontFamily: 'TitilliumWeb-Regular'
  },
  trackDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('60%'),
    height: hp('7.5%'),
    marginRight: wp("4.5%"),
    marginLeft: wp("4.5%"),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  trackName: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: wp('4.5%'),
    color: 'yellow'
  },
  artistName: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: wp('3.8%'),
    color: '#aaa'
  }
});
