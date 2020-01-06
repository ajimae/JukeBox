import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helpers/screenNormalizer';

export default class Grids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: 2,
      data: {}
    }
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data
    });
  }

  showAlbumContent = (content) => {
    // console.log(content, '>>>->>');
    this.props.toggleAlbumPanel();
    // render a pane and pass contents to it
  }

  renderCard = (i) => {
    const item = {};
    const items = this.state.data[i];
    for (let i = 0; i < items.length; i++) {
      if (items[i].albumArtUrl && !item.albumArtUrl) {
        item.albumArtUrl = items[i].albumArtUrl;
      }
    }
    item.albumName = i;
    item.artist = items[0].artist;
    item.numberOfSongs = items.length;
    const url = item.albumArtUrl ? { uri: item.albumArtUrl } : require('../../../assets/DefaultAlbumArtImage.png');
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.showAlbumContent(items)}>
          <View style={styles.card}>
            <View style={styles.cardImage}>
              <Image
                style={{ width: wp("42%"), height: wp("42.5%") }}
                resizeMode="contain"
                source={url}
              />
            </View>
            <View style={styles.cardDetails}>
              <View style={styles.albumName}>
                <Text numberOfLines={1} style={{ fontFamily: 'TitilliumWeb-Light', fontSize: wp("3.5%"), color: '#fff' }}>{item.albumName}</Text>
              </View>
              <View style={styles.artistSongs}>
                <Text numberOfLines={1} style={{ fontFamily: 'TitilliumWeb-Light', fontSize: wp("3.5%"), color: '#6d6e70' }}>{item.artist} - {item.numberOfSongs} Song</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={Object.keys(this.state.data)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => this.renderCard(item)}
        keyExtractor={item => item}
        numColumns={this.state.columns}
      />
    );
  }
}

const size = Dimensions.get('window').width / 2
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: size - wp("2%"),
    marginTop: hp("3%")
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






























// const numColumns = 2;
// const size = Dimensions.get('window').width/numColumns;

// function Grid(props) {
//   return (
//     <FlatList
//       data={data}
//       renderItem={({item}) => (
//         <View style={styles.itemContainer}>
//           <Text style={styles.item}>{item.value}</Text>
//         </View>
//       )}
//       keyExtractor={item => item.id}
//       numColumns={numColumns} />
//   );
// }

// const styles = StyleSheet.create({
//   itemContainer: {
//     width: size,
//     height: size,
//   },
//   item: {
//     flex: 1,
//     margin: 3,
//     backgroundColor: 'lightblue',
//   }
// });