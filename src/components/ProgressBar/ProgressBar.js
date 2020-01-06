/**
 * based on project from https://www.npmjs.com/package/react-native-progress-bar
 */

import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helpers/screenNormalizer';


export class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress >= 0 && (this.props.progress != prevProps.progress)) {
      this.update();
    }
  }

  update() {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress
    }).start();
  }

  render() {
    const fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
    });

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#777',
    height: hp('0.18%'),
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#b31700',
    height: hp('0.18%')
  }
});

ProgressBar.defaultProps = {
  style: styles,
  easing: Easing.inOut(Easing.ease),
  // easingDuration: 500
}


export default ProgressBar;






































































// var React = require('react');
// // var React = require('react-native');

// var {
//   Animated,
//   Easing,
//   StyleSheet,
//   View
// } = require('react-native');

// var styles = StyleSheet.create({
//   background: {
//     backgroundColor: '#bbbbbb',
//     height: 5,
//     overflow: 'hidden'
//   },
//   fill: {
//     backgroundColor: '#3b5998',
//     height: 5
//   }
// });

// var ProgressBar = React.createClass({
//   getDefaultProps() {
//     return {
//       style: styles,
//       easing: Easing.inOut(Easing.ease),
//       easingDuration: 500
//     };
//   },

//   getInitialState() {
//     return {
//       progress: new Animated.Value(0)
//     };
//   },

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
//       this.update();
//     }
//   },

//   render() {

//     var fillWidth = this.state.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
//     });

//     return (
//       <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
//         <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
//       </View>
//     );
//   },

//   update() {
//     Animated.timing(this.state.progress, {
//       easing: this.props.easing,
//       duration: this.props.easingDuration,
//       toValue: this.props.progress
//     }).start();
//   }
// });

// module.exports = ProgressBar;