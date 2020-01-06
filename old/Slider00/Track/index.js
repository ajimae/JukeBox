import React from 'react';
import { View } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helpers/screenNormalizer';

const Track = ({ width, color }) => (
  <View id="track"
    style={{
      width: wp('50%'),
      height: wp('50%'),
      borderWidth: width,
      borderColor: color,
      borderRadius: wp('50%'),
      position: 'absolute'
    }}
  >
  </View>
  );

export default Track;