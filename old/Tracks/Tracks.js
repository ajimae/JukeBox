import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  findNodeHandle
} from 'react-native';
import { BlurView } from "@react-native-community/blur";

export default class Tracks extends Component {
  constructor() {
    super();
    this.state = {
      viewRef: null,
    }
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={img => {
            this.backgroundImage = img;
          }}
          source={{ uri: 'https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg' }}
          style={styles.absolute}
          resizeMode="cover"
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={50}
        />
        <View style={styles.text}>
          <Text style={{ color: '#fff'}}>
            Player...
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#ccc",
    // borderWidth: 2,
    width: 100,
    height: 100
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
