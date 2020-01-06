import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helpers/screenNormalizer';
import Grids from '../GridView/Grids';
import { groupSongs } from '../../../helpers/groupSongsByKey';

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      albums: {},
    }
  }

  componentDidMount() {
    const { tracks } = this.props;
    const albums = groupSongs(tracks, 'album');
    this.setState({
      tracks,
      albums
    });
  }

  render() {
    const { tracks } = this.state;
    if (!tracks.length) return null;
    return (
      <View style={styles.container}>
        <Grids
          data={this.state.albums}
          toggleAlbumPanel={this.props.toggleBottomPanel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // justifyContent: "flex-start",
    // width: wp('100%'),
    // height: hp("100%"),
    // backgroundColor: "#121212",
    // borderColor: 'lime',
    // borderWidth: 1,
    // paddingTop: hp("26%")
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: wp("100%"),
  },
  card: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: wp("42%"),
    height: wp("57.5%"),
    borderRadius: wp("2%"),
    borderColor: '#121212',
    borderWidth: wp(".2%"),
    overflow: "hidden",
  },
  cardImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    width: wp("42%"),
  },
  cardDetails: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: wp("42%"),
    height: wp("15%"),
    paddingTop: wp("2%"),
    paddingBottom: wp("2%"),
    backgroundColor: "#222327"
  },
  albumName: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: wp("42%"),
    paddingLeft: wp("3%"),
    backgroundColor: "#222327",
    // borderColor: 'red',
    // borderWidth: 1
  },
  artistSongs: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: wp("42%"),
    paddingLeft: wp("3%"),
    backgroundColor: "#222327",
    // borderColor: 'red',
    // borderWidth: 1
  }
});
