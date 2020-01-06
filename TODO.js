
import React, { Component } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, Text, View, StyleSheet, Dimensions } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.moveAnimation = new Animated.ValueXY({ x: 0, y: -Dimensions.get('window').height + 25 });
  }

  _moveBall = () => {
    Animated.timing(this.moveAnimation, {
      toValue: { x: 0, y: 0 },
      // velocity: 10,
      // tension: 1,
      // friction: 8.5,
      // overshootClamping: true,
      duration: 230,
      easing: Easing.out(Easing.linear)
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
          <TouchableWithoutFeedback style={styles.button} onPress={this._moveBall}>
            <Text style={styles.buttonText}>Press</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    overflow: 'hidden'
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'greenyellow',
    // borderRadius: 100,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  }
});
