// import React,{useEffect} from 'react';
// import { View,Text,StyleSheet } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Exist=()=>{
//     useEffect(async()=>{
//         const params=new URLSearchParams()
//         const token=await AsyncStorage.getItem('user_token')
//         params.append('fields[bp_CheckIn]','assigned_user_id,assigned_user_name,fp_event_locations_id,location,checkin_date_time,status')
//         params.append('filter[operator]','and')
//         params.append('filter[assigned_user_id][eq]','1')
//         axios({
//             url: 'https://demo.bpbytes.com.au/Api/V8/module/bp_CheckIn?',
//             method: 'GET',
//             data: params,
//             headers: {
//                Accept: 'application/json',
//               'Content-Type': 'application/vnd.api+json',
//               Authorization: `Bearer ${token}`
//             }
//           })
//         .then(function (response) {
//          console.log('success data',response);
//         })
//         .catch(function (error) {
//          console.log('error data',error);
//         });
//     },[])
//     return(
//         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//             <Text>
//                 working
//             </Text>
//         </View>
//     )
// }
// export default Exist