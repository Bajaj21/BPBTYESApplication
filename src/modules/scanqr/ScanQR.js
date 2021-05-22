'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class ScanQR extends Component {
  onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
      console.log('An error occured', e.data)
    // );
  };
  navigateTo = (item)=>  {
    console.log(`+++++++++++++++++++++++++++++++++${item}`)
    //alert(`navigte to ${item}`)
        this.props.navigation.navigate(item)
    }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            {/* Go to{' '} */}
            {/* <Text style={styles.textBold}>QR_code</Text> */}
          </Text>
        }
        bottomContent={
<TouchableOpacity onPress={()=>{this.navigateTo('Home')}}>         
   {/* <Text style={styles.buttonText}>OK. Got it!</Text> */}
          </TouchableOpacity>
        }
      />
    );
  }
}
export default ScanQR;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
AppRegistry.registerComponent('default', () => ScanQR);