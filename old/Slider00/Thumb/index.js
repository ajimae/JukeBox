// Thumb/index.js
import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helpers/screenNormalizer';

const ThumbImage = ({ diameter, color, borderWidth, borderColor }) => (
  <View id="thumb-image"
    style={{
      width: diameter,
      height: diameter,
      backgroundColor: color,
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderRadius: wp('50%'),
      left: wp('25%'),
      top: wp('25%'),
      transform: [
        { translateX: - wp('25%') },
        { translateY: - wp('25%') },
      ],
      position: 'absolute'
    }}
  >
  </View>
)

const Thumb = ({ diameter, color, borderWidth, borderColor, position, handleSelect }) => (
  <View id="thumb"
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y
    }}
    draggable={false}
    onTouchStart={() => handleSelect()}
    onMouseDown={() => handleSelect()}
  >
    <ThumbImage
      diameter={diameter}
      color={color}
      borderWidth={borderWidth}
      borderColor={borderColor}
    />
  </View>
);

export default Thumb;
