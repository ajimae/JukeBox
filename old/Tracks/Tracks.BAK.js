import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import iTunes from 'react-native-itunes';

import { normalize } from '../../../helpers/screenNormalizer';
import timeFormatter from '../../../helpers/timeFormatter';
const { width } = Dimensions.get('window');

export default class Tracks extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    paused: true,
    selectedTrack: 0,
    tracks: [
      {
        title: 'Promises',
        artist: 'Wiz Khalifa',
        artwork: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
        assetUrl: "http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3",
        persistentId: 1,
        duration: 200
      },
      {
        title: '...Ready For It?',
        artist: 'Taylor Swift',
        artwork: "https://target.scene7.com/is/image/Target/GUEST_608e5972-e6e0-4fef-b66d-4d83f3eb8f56?wid=488&hei=488&fmt=pjpeg",
        assetUrl: "http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3",
        persistentId: 2,
        duration: 200
      },
      {
        title: 'Hotline Bling',
        artist: 'Drake',
        artwork: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
        assetUrl: "http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3",
        persistentId: 3,
        duration: 200
      },
    ]
  }

  componentDidMount() {
    iTunes.getTracks({
      fields: ['persistentId', 'title', 'artist', 'albumTitle', 'genre', 'artwork', 'lyrics', 'duration', 'assetUrl']
    }).then((tracks) => {
      this.setState(prevState => ({
        ...prevState,
        tracks: [...prevState.tracks, ...tracks]
      }))
    }).catch(error => {
      alert(error)
    });
  }

  more = ({
    title,
    artist,
    duration
  }) => {
    alert(
      `Title: ${title}\n
      Artiste: ${artist}\n
      Duration: ${timeFormatter(duration)}`
    );
  }

  onSongSelect = ({ index }) => {
    this.setState(prevState => ({
      ...prevState,
      paused: false,
      selectedTrack: index
    }), () => this.props.navigation.navigate('Player', {
      state: this.state
    }))
  }

  renderTrackList = (track) => {
    const uri = track.artwork ? { uri: track.artwork } : require('../../assets/default_art.png');
    return (
      <View key={track.persistentId} style={styles.list}>
        <TouchableOpacity onPress={() => this.onSongSelect(track)}>
          <Image
            style={styles.image}
            source={uri}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onSongSelect(track)}>
          <View style={styles.trackMeta}>
            <Text style={styles.track} numberOfLines={1}>
              {track.title}
            </Text>
            <Text style={styles.artiste} numberOfLines={1}>
              {track.artist}
            </Text>
            <Text style={styles.duration}>
              {timeFormatter(track.duration)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.more(track)}>
          <View style={styles.moreButton}>
            <Image
              style={styles.moreButtonIcon}
              source={require('../../assets/ic_more_verti_white00r16.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  onEnd() {
    this.setState(prevState => ({
      ...prevState,
      selectedTrack: prevState.selectedTrack + 1
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.title}>
              Songs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons8-search-30.png')}
            />
          </TouchableOpacity>
        </View>
        {/** move out to a different functional component */}
        <ScrollView>
          {!!this.state.tracks.length && this.state.tracks.map((track, index) => this.renderTrackList({ index, ...track }))}
          <View style={styles.buttom}></View>
        </ScrollView>
      </View>
    )
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    width: (width - 30),
    marginLeft: normalize(15),
    marginTop: normalize(55),
    marginRight: normalize(15),
    marginBottom: normalize(20, 'height'),
    borderRadius: normalize(5),
    backgroundColor: '#fff'
  },
  title: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: '#555'
  },
  list: {
    marginTop: normalize(10),
    padding: normalize(5),
    borderColor: '#ccc',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: (75),
    width: (width - 20),
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.84,
    shadowRadius: 6.27,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
    borderRadius: normalize(10),
    backgroundColor: '#fff'
  },
  image: {
    width: (60),
    height: (60),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#f5f5f5'
  },
  trackMeta: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    borderColor: '#000',
    width: normalize(200),
    height: (60)
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  track: {
    fontSize: 12,
    fontWeight: '400',
    color: '#444',
    fontFamily: 'Montserrat-Bold'
  },
  artiste: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'montserrat-regular'
  },
  duration: {
    fontSize: 9,
    color: '#999'
  },
  buttom: {
    marginTop: 100
  },
  moreButton: {
    height: 60,
    width: 30,
    // borderWidth: 1,
    // borderColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 20,
    width: 2.5,
  },
});
