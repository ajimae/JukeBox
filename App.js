/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
// import Root from './src/navigation/navigation';
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import { connect } from 'react-redux';

// Imports: Redux Persist Persister
import { store, persistor } from './src/redux/store';

import Root from './src/components';
// import Root from './Slider/App';
// action
// import { getSongs } from './src/redux/actions';


// export const TRACKS = [
//   {
//     title: 'Stressed Out',
//     artist: 'Twenty One Pilots',
//     albumArtUrl: "https://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
//     audioUrl: "/Users/chukwuemekaajima/Music/iTunes/iTunes Media/Music/114_Toni Braxton With Trey Songz/Unknown Album/Yesterday.mp3",
//     // audioUrl: "../../assets/flora_secret.mp3",
//   },
//   {
//     title: 'Promises',
//     artist: 'Wiz Khalifa',
//     albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
//     audioUrl: "../../assets/flora_secret.mp3",
//   },
//   {fff
//     title: '...Ready For It?',
//     artist: 'Taylor Swift',
//     albumArtUrl: "https://target.scene7.com/is/image/Target/GUEST_608e5972-e6e0-4fef-b66d-4d83f3eb8f56?wid=488&hei=488&fmt=pjpeg",
//     audioUrl: "../../assets/flora_secret.mp3",
//   },
//   {
//     title: 'Hotline Bling',
//     artist: 'Drake',
//     albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
//     audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
//   },
// ];

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     state
  //   }
  // }

  // async componentDidMount() {
  //   const state = await this.props.getTracks();
  //   this.setState(prevState => ({
  //     ...prevState,
  //     state
  //   }), this.props.navigation.navigate('Tracks'));
  // }

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
    // return (
    //   // <Provider store={store}>
    //   //   <PersistGate loading={null} persistor={persistor}>
    //       <Root />
    //   //   </PersistGate>
    //   // </Provider>
    // );
  }
}

// export const mapStateToProps = state => ({
//   tracks: state.songsReducer
// });

// export const mapDispatchToProps = dispatch => ({
//   getTracks: () => dispatch(getSongs()),
// });

// export default connect(
//   mapStateToProps, mapDispatchToProps
// )(App);
