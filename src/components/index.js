import React, { Component } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import Swiper from './Swiper/Swiper';
import Player from './Player/Player';
import TrackList from './TabScreens/index';
import NowPlaying from './NowPlaying/NowPlaying';
// import BottomSheet from './../components/BottomSheet';
import { getSongs } from '../redux/actions/index';
import { connect } from 'react-redux';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      currentSelectIndex: 0,
      screens: [TrackList, Player, NowPlaying],
      isScrollEnable: true
    };
    this.swipe = React.createRef();
  }

  componentDidMount() {
    this.props.getTracks()
      .then(tracks => {
        const { data } = tracks;
        this.setState(prevState => ({
          ...prevState,
          tracks: data
        }));
      });
  }

  toggleScroll = isScrollEnable => {
    this.setState({
      isScrollEnable
    });
  }

  renderImageSwipeItem = item => {
    const { tracks } = this.state;
    if (!tracks.length) return;
    return (
      React.createElement(item, {
        tracks,
        toggleScroll: this.toggleScroll,
        swipe: this.swipe
      })
    );
  };

  render() {
    return (
      <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
        />
        <Swiper
          ref={this.swipe}
          currentSelectIndex={this.state.currentSelectIndex}
          backgroundColor="#000"
          isScrollEnable={this.state.isScrollEnable}
          swipeData={this.state.screens}
          renderSwipeItem={this.renderImageSwipeItem}
          // onScreenChange={this.screenChange}
          showSwipeBtn={false}
        />
      </View>
    );
  }
}

export const mapStateToProps = state => ({
  tracks: state.fetchSongsReducer
});

export const mapDispatchToProps = dispatch => ({
  getTracks: () => dispatch(getSongs())
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
