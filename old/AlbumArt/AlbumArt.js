import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  normalize
} from '../../../helpers/screenNormalizer';

const AlbumArt = ({
  url,
  onPress
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.roundedBorder}>
        <Image
          style={styles.image}
          source={ url }
        />
      </View>
    </TouchableOpacity>
  </View>
);

export default AlbumArt;

const { width } = Dimensions.get('window');
const imageSize = width - normalize(30);

const styles = StyleSheet.create({
  container: {
    paddingLeft: normalize(15),
    paddingRight: normalize(15)
  },
  image: {
    width: imageSize,
    height: imageSize + normalize(30)
  },
  roundedBorder: {
    borderColor: '#333',
    overflow: 'hidden',
    borderRadius: 10,
    width: imageSize,
    height: imageSize + normalize(30)
  }
});
