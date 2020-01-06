import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../helpers/screenNormalizer';

class BottomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render() {
    return (
      <Animated.View style={[styles.albumPanel, this.props.initialPosition.getLayout()]}>
        <View style={styles.header}>
          <ImageBackground
            style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: wp('100%'), height: wp('100%') }}
            source={require('../../../assets/DefaultAlbumArtImage.png')}
            blurRadius={90}
            resizeMode="cover"
          >
            <View style={styles.headerContainer}>
              <View style={styles.leftPane}></View>
              <View style={styles.centerPane}>
                <Image
                  style={{ height: wp('45%'), width: wp('45%') }}
                  source={require('../../../assets/DefaultAlbumArtImage.png')}
                  resizeMode="cover"
                />
                {/* <View style={{ width: wp('22.5%') }}><Text>Center</Text></View> */}
              </View>
              <View style={styles.rightPane}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/ShuffleOff.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.headerFooter}>
              <View style={styles.blank}></View>
              <View style={styles.albumName}>
                <Text
                  style={{ fontFamily: 'TitilliumWeb-Light', fontSize: wp('4.5%'), color: '#fff' }}
                  numberOfLines={1}
                >
                  Album name goes here alright?
              </Text>
              </View>
              <View style={styles.moreButton}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/more_music_options.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <TouchableWithoutFeedback onPress={this.props.closeBottomPanel}>
          <View style={styles.back}>
            <Image
              source={require('../../../assets/back_button.png')}
            />
            <Text style={styles.backButton}>Albums</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.songlist}>
          {/* <ScrollView>

          </ScrollView> */}
        </View>
        <View style={styles.miniPlayer}></View>
      </Animated.View>
    )
  }
}

export default BottomPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
    borderColor: '#ccc',
    borderWidth: 1
  },
  albumPanel: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: "absolute",
    backgroundColor: '#111',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 5, // To cover the given height sufficiently - add 5 
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // borderColor: '#ccc',
    // borderWidth: 1,
    zIndex: 9999
  },
  back: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: hp('8%'),
    left: wp('5%')
  },
  backButton: {
    color: '#ccc',
    fontSize: wp('4.5%'),
    marginLeft: wp('2%')
  },
  header: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#555',
    borderBottomColor: '#ccc',
    borderBottomWidth: wp('0.1%'),
    height: hp('35%')
  },
  centerPane: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('45%'),
    height: wp('45%'),
    // position: "absolute",
    // top: hp('20%'),
    // left: (wp('100%') - wp('45%')) / 2,
    // right: (wp('100%') - wp('45%')) / 2,
    // borderRadius: wp('1.5%'),
    // overflow: 'hidden',
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%'),
    // height: wp('45%'),
    marginTop: hp('13%'),
    // borderBottomColor: '#ccc',
    // borderBottomWidth: wp('0.1%')
  },
  leftPane: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('20%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  rightPane: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: wp('20%'),
    height: wp('40%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  headerFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('80%'),
    // height: wp('4%'),
    marginTop: hp('1.0%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  albumName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('55%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  blank: {
    width: wp('9%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  moreButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('9%'),
    // borderColor: '#ccc',
    // borderWidth: 1
  },
  songlist: {
    width: wp('100%'),
    height: hp('58%'),
    marginTop: hp('5.5%'),
    borderColor: '#ccc',
    borderWidth: 1
  },
  miniPlayer: {
    width: wp('100%'),
    // height: hp('15%'),
    // marginTop: hp('5.5%'),
    borderColor: '#ccc',
    borderWidth: 1,
    zIndex: 9999
  }
});
