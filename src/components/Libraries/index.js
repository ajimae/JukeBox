
import React, { Component } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, Text, View, StyleSheet, Dimensions } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)

    
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
  
});
