// https://github.com/logisticinfotech/react-native-custom-swiper

import React from 'react';
import { View, TouchableWithoutFeedback, FlatList, Dimensions, StyleSheet, Image, Text } from 'react-native';

import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

// const leftArrow = require('../../assets/ic_more_horiz_white.png');
// const rightArrow = require('../../assets/ic_more_horiz_white.png');

autoplayTimer = null;

class Swiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSwipeBtn: this.props.showSwipeBtn,
      autoplay: this.props.autoplay,
      autoplayTimeout: this.props.autoplayTimeout,
      arrSwipeData: this.props.swipeData,
      currentSelectIndex:
        this.props.currentSelectIndex < this.props.swipeData.length
          ? this.props.currentSelectIndex
          : this.props.swipeData.length - 1,
      childViewHeight: height,
      isScrollEnable: this.props.isScrollEnable
    };

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  }

  componentWillReceiveProps(nextProps) {
    if (autoplayTimer) clearTimeout(autoplayTimer);
  }

  componentDidMount = () => {
    if (this.swiper) {
      this.autoplay();
    }
  };

  // OnPress Methods

  _onPressNextBtn = () => {
    if (this.state.currentSelectIndex < this.state.arrSwipeData.length - 1) {
      this.swiper.scrollToIndex({
        index: this.state.currentSelectIndex + 1,
        animated: true,
      });
      this.autoplay();
    }
  };

  _onPressBackBtn = () => {
    if (this.state.currentSelectIndex != 0) {
      this.swiper.scrollToIndex({
        index: this.state.currentSelectIndex - 1,
        animated: true,
      });
      this.autoplay();
    }
  };

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      this.props.onScreenChange(viewableItems[0].index);
      this.setState({
        currentSelectIndex: viewableItems[0].index,
      });
      
      // AutoPlay
      // let that = this;
      // setTimeout(function(){
      //     if (that.state.currentSelectIndex < that.state.arrSwipeData.length - 1) {
      //         that.swiper.scrollToIndex({
      //             index: that.state.currentSelectIndex + 1,
      //             animated: true,
      //         });
      //     }
      // }, 5000);
    }
  };

  autoplay = () => {
    if (this.state.autoplay) {
      clearInterval(this._interval);
      this._interval = setInterval(() => {
        this._onPressNextBtn();
      }, this.props.autoplayTimeout * 1000);
    }
  };

  getItemLayout = (data, index) => ({
    length: this.props.containerWidth,
    offset: this.props.containerWidth * index,
    index,
  });

  onViewLayout = event => {
    let contentHeight = event.nativeEvent.layout.height;
    this.setState({ childViewHeight: contentHeight });
  };

  // Render Methods.

  renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          {
            width: this.props.containerWidth,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.state.arrSwipeData[index],
          },
        ]}
        onLayout={this.onViewLayout}>
        {this.props.renderSwipeItem ? this.props.renderSwipeItem(item, index) : <Text>{index}</Text>}
      </View>
    );
  };

  render() {
    return (
      <View style={[this.props.style, { width: this.props.containerWidth }]}>
        <FlatList
          ref={flatList => {
            this.swiper = flatList;
          }}
          bounces={false}
          keyboardShouldPersistTaps="always"
          scrollEnabled={this.props.isScrollEnable}
          // backgroundColor={this.props.backgroundColor}
          data={this.state.arrSwipeData}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          getItemLayout={this.getItemLayout}
          horizontal
          directionalLockEnabled
          pagingEnabled
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={this.state.currentSelectIndex}
        />

        {/* {this.state.currentSelectIndex > 0 && this.state.showSwipeBtn ? (
          <View style={[styles.IconStyle, { left: 15, height: this.state.childViewHeight }]}>
            <View style={styles.viewBtn}>
              <TouchableWithoutFeedback onPress={this._onPressBackBtn}>
                <Image style={styles.IconImageView} source={this.props.leftButtonImage} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : null}

        {this.state.currentSelectIndex < this.state.arrSwipeData.length - 1 && this.state.showSwipeBtn ? (
          <View style={[styles.IconStyle, { right: 15, height: this.state.childViewHeight }]}>
            <View style={styles.viewBtn}>
              <TouchableWithoutFeedback onPress={this._onPressNextBtn}>
                <Image style={styles.IconImageView} source={this.props.rightButtonImage} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    // shadow: '0 14px 26px -12px rgba(120,142,236,0.42), 0 4px 23px 0 rgba(0,0,0,0.12), 0 8px 10px -5px rgba(120,142,236,0.2)'
  },
  swiper: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
    backgroundColor: 'white',
  },
  IconStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    top: -8,
  },
  IconImageView: {
    width: 40,
    height: 40,
  },
  viewBtn: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'white',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeBtnStyle: { fontSize: 50, color: 'white', justifyContent: 'center' },
});

Swiper.propTypes = {
  swipeData: PropTypes.array.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
  backgroundColor: PropTypes.string,
  containerWidth: PropTypes.number,
  currentSelectIndex: PropTypes.number,
  leftButtonImage: Image.propTypes.source,
  rightButtonImage: Image.propTypes.source,
  showSwipeBtn: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplayTimeout: PropTypes.number,
  renderSwipeItem: PropTypes.func.isRequired,
  onScreenChange: PropTypes.func,
};

Swiper.defaultProps = {
  style: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundColor: 'white',
  containerWidth: width,
  currentSelectIndex: 0,
  isScrollEnable: true,
  // leftButtonImage: leftArrow,
  // rightButtonImage: rightArrow,
  showSwipeBtn: true,
  autoplayTimeout: 2500,
  autoplay: false,
  onScreenChange: () => {},
};

export default Swiper;
