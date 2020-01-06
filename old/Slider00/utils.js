// utils.js
export const pipe = (...args) => args.reduce((prev, curr) => curr(prev))

export const getRelativeAngle = (angle, initialAngle) => (360 - angle + initialAngle) % 360

export const toDeg = angle => angle * (180 / Math.PI)

export const toRad = angle => angle * (Math.PI / 180)


// Track/index.js
import React from 'react';
import { View } from 'react-native';

const Track = ({ width, color }) => (
  <View id="track"
    style={{
      width: 100,
      height: 100,
      borderWidth: width,
      borderColor: color,
      borderRadius: 100,
      position: 'absolute'
    }}
  >
  </View>
  );

export default Track;
