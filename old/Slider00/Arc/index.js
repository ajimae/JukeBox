// Arc/index.js
import React from 'react';
import { View } from 'react-native';
import {
  pipe,
  toRad,
  getRelativeAngle
 } from '../utils';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../helpers/screenNormalizer';

const getPointCoordString = (r, angle) => {
  const x = Math.cos(toRad(angle)) * r * 100;
  const y = - Math.sin(toRad(angle)) * r * 100;
  return `${x} ${y}`;
}

const Arc = ({r, angle, initialAngle, width, color}) => {
  const relativeAngle = getRelativeAngle(angle, initialAngle) 

  const center = `${r + width} ${r + width}`;
  const start = getPointCoordString(r, initialAngle);
  const end = getPointCoordString(r, angle);
  
  const extraPoint1 = pipe(
    getRelativeAngle(45, initialAngle), 
    a => getPointCoordString(r, a));
  const extraPoint2 = pipe(
    getRelativeAngle(135, initialAngle),
    a => getPointCoordString(r, a));
  const extraPoint3 = pipe(
    getRelativeAngle(225, initialAngle),
    a => getPointCoordString(r, a));
  
  const extra1 = (relativeAngle > 90) ? `, ${extraPoint1}` : '';
  const extra2 = (relativeAngle > 180) ? `, ${extraPoint2}` : '';
  const extra3 = (relativeAngle > 270) ? `, ${extraPoint3}` : '';

  const polygonString = `polygon(${center}, ${start}${extra1}${extra2}${extra3}, ${end})`;
  return (
    <View id="arc"
      style={{
        width: wp('50%'),
        height: wp('50%'),
        borderRadius: wp('50%'),
        borderWidth: width,
        borderColor:  color,
        position: 'absolute',
        clipPath: polygonString
      }}
    >
    </View>
)}

export default Arc;
