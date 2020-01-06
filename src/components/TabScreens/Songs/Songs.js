import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { selectSong } from '../../../redux/actions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helpers/screenNormalizer';

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      selectedTrackIndex: 0
    }
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
  }


  getSelectedTrack = async (track) => {
    const { data } = await this.props.selectTrack(track);
    const { selectedTrackIndex } = data;
    this.setState(prevState => ({
      ...prevState,
      nowPlaying: data,
      selectedTrackIndex
    }), () => this.props.togglePlayPause(true));
  }

  /**
   * kindly note that selectedTrackIndex in this object is very different from this.state.selectedTrackIndex,
   * as the one in this object being passed as parameter is the stored index from the song during mapping
   */
  renderTrackList = ({ track, selectedTrackIndex }) => {
    // TODO: include index to the parameter and compare with [TRACKS.length - 1] - Done
    const borderBottomWidth = (this.state.tracks.length - 1) == selectedTrackIndex ? 0 : 1;
    const url = track.albumArtUrl ? { uri: track.albumArtUrl } : require('../../../assets/DefaultAlbumArtImage.png');
    return (
      <View key={selectedTrackIndex} style={styles.trackListContainer}>
        <TouchableOpacity onPress={() => this.getSelectedTrack({track, selectedTrackIndex})}>
          <View style={{ borderRadius: wp('1%'), overflow: 'hidden' }}>
            <Image
              style={{ width: wp('16%'), height: wp('16%') }}
              // source={require('../assets/DefaultAlbumArtImage.png')}
              // source={{ uri: track.albumArtUrl }}
              source={ url }
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.getSelectedTrack({track, selectedTrackIndex})}>
          <View style={{ ...styles.trackDetails, borderBottomWidth }}>
            {track.title ? (<View>
              <Text
                style={this.state.selectedTrackIndex == selectedTrackIndex ? styles.selectedTrackName : styles.trackName}
                numberOfLines={1}
              >
                {track.title}
              </Text>
            </View>) : null }
            {track.artist ? (<View>
              <Text
                style={styles.artistName}
                numberOfLines={1}
              >
                {track.artist}
              </Text>
            </View>) : null }
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.state.tracks.map((track, selectedTrackIndex) => this.renderTrackList({ track, selectedTrackIndex }))}
        </ScrollView>
      </View>
    );
  }
}

export const mapStateToProps = state => ({
  selectedTrack: state.selectedSongReducer.track
});

export const mapDispatchToProps = dispatch => ({
  selectTrack: data => dispatch(selectSong(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#111',
    width: wp('100%'),
    height: hp('100%'),
    // marginTop: hp('45%'),
    // paddingTop: wp('45%'),
    // paddingBottom: hp('20%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  trackListContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('10%'),
    paddingLeft: wp('5%'),
    // backgroundColor: '#000',
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  trackDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: wp('65%'),
    height: hp('10%'),
    marginLeft: wp('7.5%'),
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    borderBottomColor: '#444',
    // borderColor: '#444',
    // borderWidth: 1,
  },
  trackName: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: wp('5.2%'),
    color: '#fff',
    width: wp('55%'),
    // borderColor: '#ccc',
    // borderWidth: 1,
  },
  selectedTrackName: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: wp('5.2%'),
    color: 'yellow',
    width: wp('55%'),
    // borderColor: '#ccc',
    // borderWidth: 1,
  },
  artistName: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: wp('3.8%'),
    color: '#aaa',
    width: wp('55%'),
    // borderColor: '#ccc',
    // borderWidth: 1,
  }
});
