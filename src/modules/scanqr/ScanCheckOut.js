'use strict';

import React, { Component , useEffect} from 'react';
import Exist from './index'
// import {} from 'react';


import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getToken } from '../../utils/TokenUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {getToken} from "../utils/TokenUtils";
// import 

 const url = "https://demo.bpbytes.com.au/Api/V8/module/bp_CheckIn?fields[bp_CheckIn]=assigned_user_id,assigned_user_name,fp_event_locations_id,location,checkin_date_time,status&filter[operator]=and&filter[assigned_user_id][eq]=1&filter[fp_event_locations_id][eq]=6f05011f-9e97-7334-36da-5f352aa11468&filter[status][eq]=On-Site";
 console.log('-------------------------------------')
class ScanQR extends Component {
  



   onSuccess = async ()=>{
   try{
        const  dataa='{"data":{"type":"bp_CheckIn","attributes":{"assigned_user_name":"admin@bpbytes.com.au","fp_event_locations_id":"c3342d09-d657-a4d3-ffed-5dd10911a4e9","checkin_date_time":"2021-05-17 14:00:00"}}}'
        this.jsonData=JSON.parse(dataa)
        // console.log( this.jsonData)
        // console.log('data converted')
       }
       catch(ex)
       {console.log('string conversion error',ex)}
       const params = new URLSearchParams()
       params.append('fields[bp_CheckIn]', 'assigned_user_id,assigned_user_name,fp_event_locations_id,location,checkin_date_time,status')
       params.append('filter[operator]', 'and')
       params.append('filter[assigned_user_id][eq]', '1')
   
   

  await axios({
        url: 'https://demo.bpbytes.com.au/Api/V8/module/bp_CheckIn?',
        method: 'GET',
        data: params,
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/vnd.api+json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRmMTBmNjJkOWVmN2RiMzViZDM5Njk1NGQ5Mzk1ZjUzY2VhZWFlZWY3OTc4ZDk5NGVhN2NkMjU1MzkxYjBjNmVjMjY4YTA0YzhlZjQwMzYxIn0.eyJhdWQiOiI3YmNkYzRiNi0xMTAwLTFiYTUtYzQzOS01ZTJiMDFjYWExNDIiLCJqdGkiOiJkZjEwZjYyZDllZjdkYjM1YmQzOTY5NTRkOTM5NWY1M2NlYWVhZWVmNzk3OGQ5OTRlYTdjZDI1NTM5MWIwYzZlYzI2OGEwNGM4ZWY0MDM2MSIsImlhdCI6MTYyMjIxMzgzOSwibmJmIjoxNjIyMjEzODM5LCJleHAiOjE2MjIyMTc0MzksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.cbfnnb-AWBjmhI5rEDuGbvA74AU7_AGFlISViQFH8tG-i1NHnxitxQ6eet78lJPzS77qibqAG2m2kBHJozuiaeWKphkOBgebSCGd2nj5Pl5xzas-gliytvAQxA8Y0KOcFwukwf0IT8cg7mf6OQom-Oj5OeLGDnK3YG9EXpVy7R2RDN61X3TxEPKqNVny7-76MpLQjUcfWhkjp2ckhRahgX9S6_pH9G-0-hsqiWmM_RuCxVDnfWFRdC2WT5kkRQWmqKVKtkIUzV-ONorQkFmzjjP41AyM3LMi8pUgX5Ym-yXbadL7fQwshGXMz1KZyt1EZwWed0X8RxnhqXJ6OaewhA'
          // Authorization: token
  
        }
      }).then((response)=>{alert('CheckOut Successfully')}).catch((error)=>{
        console.log(error)
      })
  
  
  
     }
  navigateTo = (item)=>  {
    console.log(`+++++++++++++++++++++++++++++++++${item}`)
    //alert(`navigte to ${item}`)
        this.props.navigation.navigate(item)
    }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
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
