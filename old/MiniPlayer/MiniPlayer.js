// // import React, { Component } from 'react'
// // import PropTypes from 'prop-types'

// // import {
// //     View,
// //     StatusBar,

// //     Platform,
// //     StyleSheet,
// //     Text,
// //     TouchableHighlight
// //   } from 'react-native';

// // import {
// //     GCanvasView,
// //   } from 'react-native-gcanvas';

// //   import {
// //     requireNativeComponent,
// //     findNodeHandle,
// //     NativeModules
// //   } from 'react-native';

// //   import { enable, ReactNativeBridge, Image as GImage } from "gcanvas.js/src/index.js";

// //   // Must set up GCanvas Module before using, or a exception will thorw
// //   ReactNativeBridge.GCanvasModule = NativeModules.GCanvasModule;
// //   ReactNativeBridge.Platform = Platform;

// // class AudioSpectrum extends Component {
// //     constructor(props) {
// //         super(props)

// //         this.animationId = null
// //         this.audioContext = null
// //         this.audioEle = null
// //         this.audioCanvas = null
// //         this.playStatus = null
// //         this.canvasId = this.props.id || this.getRandomId(50)
// //         this.mediaEleSource = null
// //         this.analyser = null
// //     }
// //     getRandomId(len) {
// //         let str = '1234567890-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
// //         let strLen = str.length
// //         let res = ''
// //         for (let i = 0; i < len; i++) {
// //             let randomIndex = Math.floor((Math.random() * strLen))
// //             res += str[randomIndex]
// //         }
// //         return res
// //     }
// //     componentDidMount() {
// //         this.prepareElements()
// //         this.initAudioEvents()
// //     }
// //     initAudioEvents = () => {
// //         let audioEle = this.audioEle
// //         if (audioEle) {
// //             audioEle.onpause = (e) => {
// //                 this.playStatus = 'PAUSED'
// //             }
// //             audioEle.onplay = (e) => {
// //                 this.playStatus = 'PLAYING'
// //                 this.prepareAPIs()
// //                 let analyser = this.setupAudioNode(this.audioEle)
// //                 this.drawSpectrum(analyser)
// //             }
// //         }
// //     }
// //     drawSpectrum = (analyser) => {
// //         var ref = this.audioCanvas;
// //         var canvas_tag = findNodeHandle(ref);
// //         var el = { ref: ""+canvas_tag, style:{width:414, height:376}};

// //         ref = enable(el, {bridge: ReactNativeBridge});

// //         // let cwidth = this.audioCanvas.width
// //         // let cheight = this.audioCanvas.height - this.props.capHeight
// //         let capYPositionArray = [] // store the vertical position of hte caps for the preivous frame
// //         let ctx = ref.getContext('2d')
// //         let gradient = ctx.createLinearGradient(0, 0, 0, 300)

// //         if (this.props.meterColor.constructor === Array) {
// //             let stops = this.props.meterColor
// //             let len = stops.length
// //             for (let i = 0; i < len; i++) {
// //                 gradient.addColorStop(stops[i]['stop'], stops[i]['color'])
// //             }
// //         } else if (typeof this.props.meterColor === 'string') {
// //             gradient = this.props.meterColor
// //         }

// //         let drawMeter = () => {
// //             let array = new Uint8Array(analyser.frequencyBinCount); // item value of array: 0 - 255
// //             analyser.getByteFrequencyData(array);
// //             if (this.playStatus === 'PAUSED') {
// //                 for (let i = array.length - 1; i >= 0; i--) {
// //                     array[i] = 0
// //                 }
// //                 let allCapsReachBottom = !capYPositionArray.some(cap => cap > 0)
// //                 if (allCapsReachBottom) {
// //                     ctx.clearRect(0, 0, cwidth, cheight + this.props.capHeight)
// //                     cancelAnimationFrame(this.animationId) // since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
// //                     return
// //                 }
// //             }
// //             let step = Math.round(array.length / this.props.meterCount) // sample limited data from the total array
// //             ctx.clearRect(0, 0, cwidth, cheight + this.props.capHeight)
// //             for (let i = 0; i < this.props.meterCount; i++) {
// //                 let value = array[i * step]
// //                 if (capYPositionArray.length < Math.round(this.props.meterCount)) {
// //                     capYPositionArray.push(value)
// //                 };
// //                 ctx.fillStyle = this.props.capColor
// //                 // draw the cap, with transition effect
// //                 if (value < capYPositionArray[i]) {
// //                     // let y = cheight - (--capYPositionArray[i])
// //                     let preValue = --capYPositionArray[i]
// //                     let y = (270 - preValue) * cheight / 270
// //                     ctx.fillRect(i * (this.props.meterWidth + this.props.gap), y, this.props.meterWidth, this.props.capHeight)
// //                 } else {
// //                     // let y = cheight - value
// //                     let y = (270 - value) * cheight / 270
// //                     ctx.fillRect(i * (this.props.meterWidth + this.props.gap), y, this.props.meterWidth, this.props.capHeight)
// //                     capYPositionArray[i] = value
// //                 };
// //                 ctx.fillStyle = gradient; // set the filllStyle to gradient for a better look

// //                 // let y = cheight - value + this.props.capHeight
// //                 let y = (270 - value) * (cheight) / 270 + this.props.capHeight
// //                 ctx.fillRect(i * (this.props.meterWidth + this.props.gap), y, this.props.meterWidth, cheight) // the meter
// //             }
// //             this.animationId = requestAnimationFrame(drawMeter)
// //         }
// //         this.animationId = requestAnimationFrame(drawMeter)
// //     }
// //     setupAudioNode = (audioEle) => {
// //         if (!this.analyser) {
// //             this.analyser = this.audioContext.createAnalyser()
// //             this.analyser.smoothingTimeConstant = 0.8
// //             this.analyser.fftSize = 2048
// //         }

// //         if (!this.mediaEleSource) {
// //             this.mediaEleSource = this.audioContext.createMediaElementSource(audioEle)
// //             this.mediaEleSource.connect(this.analyser)
// //             this.mediaEleSource.connect(this.audioContext.destination);
// //         }

// //         return this.analyser
// //     }
// //     prepareElements = () => {
// //         let { audioId, audioEle } = this.props
// //         if (!audioId && !audioEle) {
// //             console.log('target audio not found!');
// //             return
// //         } else if (audioId) {
// //             this.audioEle = document.getElementById(audioId);
// //         } else {
// //             this.audioEle = audioEle
// //         }

// //         this.audioCanvas = document.getElementById(this.canvasId)
// //     }
// //     prepareAPIs = () => {
// //         // fix browser vender for AudioContext and requestAnimationFrame
// //         window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
// //         window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
// //         window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
// //         try {
// //             this.audioContext = new window.AudioContext(); // 1.set audioContext
// //         } catch (e) {
// //             // console.error('!Your browser does not support AudioContext')
// //             console.log(e);
// //         }
// //     }
// //     render() {
// //         return (
// //             <GCanvasView id={this.canvasId} width={this.props.width} height={this.props.height}></GCanvasView>
// //         )
// //     }
// // }

// // AudioSpectrum.propTypes = {
// //     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// //     width: PropTypes.number,
// //     height: PropTypes.number,
// //     audioId: PropTypes.string,
// //     audioEle: PropTypes.object,
// //     capColor: PropTypes.string,
// //     capHeight: PropTypes.number,
// //     meterWidth: PropTypes.number,
// //     meterCount: PropTypes.number,
// //     meterColor: PropTypes.oneOfType([
// //         PropTypes.string,
// //         PropTypes.arrayOf(PropTypes.shape({
// //             stop: PropTypes.number,
// //             color: PropTypes.string,
// //         })),
// //     ]),
// //     gap: PropTypes.number,
// // }
// // AudioSpectrum.defaultProps = {
// //     width: 300,
// //     height: 200,
// //     capColor: '#FFF',
// //     capHeight: 2,
// //     meterWidth: 2,
// //     meterCount: 40 * (2 + 2),
// //     meterColor: [
// //         { stop: 0, color: '#f00' },
// //         { stop: 0.5, color: '#0CD7FD' },
// //         { stop: 1, color: 'red' }
// //     ],
// //     gap: 10, // gap between meters
// // }
// // export default AudioSpectrum

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight
// } from 'react-native';

// import {
// //   requireNativeComponent,
//   findNodeHandle,
//   NativeModules
// } from 'react-native';


// import {
//   GCanvasView,
// } from 'react-native-gcanvas';

// import { enable, ReactNativeBridge, Image as GImage } from "gcanvas.js/src/index.js";

// ReactNativeBridge.GCanvasModule = NativeModules.GCanvasModule;
// ReactNativeBridge.Platform = Platform;

// export default class App extends Component {

//   onPressHandle = () => {
//     console.log(">>>>>>>>onPressHandle...start")

//     var ref = this.refs.canvas_holder;

//     var canvas_tag = findNodeHandle(ref);
//     // var canvas_tag = "2";
//     var el = { ref:""+canvas_tag, style:{width:414, height:376}};

//     ref = enable(el, {bridge: ReactNativeBridge});

//     var ctx = ref.getContext('2d');
//     //rect
//     ctx.fillStyle = 'green';
//     ctx.fillRect(0, 0, 100, 100);

//     //rect
//     ctx.fillStyle = 'black';
//     ctx.fillRect(100, 100, 100, 100);
//     ctx.fillRect(25, 205, 414-50, 5);

//     //circle
//     ctx.arc(200, 315, 100, 0, Math.PI * 2, true);
//     ctx.fill();

//     var image = new GImage();
//     image.onload = function(){
//       ctx.drawImage(image, 150, 0);
//       ctx.drawImage(image, 150, 450);

//     }
//     image.src = '//gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';

//     console.log(">>>>>>>>onPressHandle...end")
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Click to draw gcanvas
//         </Text>
//         <TouchableHighlight onPress={this.onPressHandle}>
//           <GCanvasView ref='canvas_holder' style={styles.gcanvas}>
//           </GCanvasView>   
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   gcanvas: {
//     top: 20,
//     width: 414,
//     height :700,
//     backgroundColor: '#FF000030'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     top:20,
//     height :40

//   }
// });