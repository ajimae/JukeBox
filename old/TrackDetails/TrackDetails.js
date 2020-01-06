import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  normalize
} from '../../../helpers/screenNormalizer';

const TrackDetails = ({
  title,
  artist,
  onAddPress,
  onMorePress,
  onTitlePress,
  onArtistPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onAddPress}>
      <Image style={styles.button}
        source={require('../../assets/ic_add_circle_outline_white00r.png')} />
    </TouchableOpacity>
    <View style={styles.detailsWrapper}>
      <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
      <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={onMorePress}>
      <View style={styles.moreButton}>
        <Image style={styles.moreButtonIcon}
          source={require('../../assets/ic_more_horiz_white00r.png')} />
      </View>
    </TouchableOpacity>
  </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(24, 'height'),
    flexDirection: 'row',
    paddingLeft: normalize(20),
    paddingRight: normalize(20),
    alignItems: 'center'
  },
  detailsWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff0000',
    marginTop: normalize(4),
    textAlign: 'center'
  },
  artist: {
    // color: 'rgba(255, 255, 255, 0.72)',
    color: '#ff0000',
    fontSize: 12,
    marginTop: normalize(4, 'height')
  },
  button: {
    opacity: 0.72
  },
  moreButton: {
    borderColor: 'rgb(255, 0, 0)',
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10.5,
    width: normalize(21),
    height: normalize(21),
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreButtonIcon: {
    height: normalize(15, 'height'),
    width: normalize(15)
  }
});
