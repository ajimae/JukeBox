import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';
// import Svg, { Path, Circle, G } from 'react-native-svg'
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircleSlider from '../Slider/Slider';
// import CircleSlider from 'react-native-circle-slider';

class Player extends Component {
  constructor() {
    super();
  }

  thumbSelect = () => { }

  render() {
    return (
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={require('./../../assets/background_overlay_iPhone6.png')}
        resizeMode="stretch"
      >
        <View style={styles.container}>
          <Text style={{ color: '#fff' }}>
            NowPlaying...
          </Text>
        </View>
      </ImageBackground>
      // <CircleSlider
      //   arcDirection={'CW'}
      //   backgroundColor={"#ccc"}
      //   btnRadius={10}
      //   sliderRadius={100}
      //   sliderWidth={3}
      //   startDegree={0}
      //   maxValue={360}
      //   onPressInnerCircle={(value) => console.log(`Inner: ${value}`)}
      //   onPressOuterCircle={(value) => console.log(`Outer: ${value}`)}
      //   onValueChange={(value) => console.log(`Changed: ${value}`)}
      //   endGradient={"#A6FFCB"}
      //   startGradient={"#12D8FA"}
      // />
      // <AnimatedCircularProgress
      //   size={150}
      //   width={2.3}
      //   fill={10}
      //   rotation={0}
      //   tintColor="#00e0ff"
      //   onAnimationComplete={() => console.log('onAnimationComplete')}
      //   backgroundColor="#ccc"
      //   renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
      // />
    );
  }
}

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%'
  }
});