import React, { Component } from 'react';

import {
  View,
  Text,
  Slider,
  StyleSheet,
} from 'react-native';
// import { heightPercentageToDP as rHeight } from '../screen/globalScaler';
import { normalize } from '../../../helpers/screenNormalizer';
// import Slider from '@react-native-community/slider';

// var Slider = require('@react-native-community/slider');
// var Slider = require('react-native-slider');

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

const SeekBar = ({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.container}>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        style={styles.slider}
        minimumTrackTintColor='#ff0000'
        // maximumTrackTintColor='rgba(0, 0, 0, 0.14)'
        maximumTrackTintColor='#ff0000'
        thumbTintColor='#ff0000'
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40 }]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    // marginTop: -12,
    // color: '#000'
  },
  container: {
    paddingLeft: normalize(16),
    paddingRight: normalize(16),
    paddingTop: normalize(16, 'height'),
  },
  track: {
    // height: 2,
    // color: '#000',
    // backgroundColor: 'black',
    // borderRadius: 1,
  },
  thumb: {
    // width: 5,
    // height: 5,
    // color: '#000',
    // borderRadius: 50,
    // backgroundColor: 'blue',
  },
  text: {
    // color: 'rgba(255, 255, 255, 0.72)',
    color: '#ff0000',
    fontSize: 12,
    textAlign: 'center',
  }
});
