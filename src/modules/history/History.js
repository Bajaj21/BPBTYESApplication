// import React from 'react'
// import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native'
// // import Navigations from './src/component/navigation/index'
// // import Header from '../header/Header'


// const checkIn = () => {
//   alert('Check in')
// }

// const checkOut = () => {
//   alert('Check Out')
// }


// const arr = [
//   { name: 'Check in', date: '18-9-2021', age: 13 },
//   { name: 'Check out', date: '08-9-2021', age: 98 },
//   { name: 'Date', date: '28-9-2021', age: 45 },
//   { name: 'Check out Date', date: '28-9-2021', age: 45 },
// ]


// class History extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {


//     return (
//       <View style={{ flex: 1 }}>
//         {/* <Header name="LeaderBoard" /> */}
//         <FlatList
//           data={arr}
//           numColumns={2}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) =>
//             <View style={style.flatlistMainView}>

//               <View style={style.flatlistChildView}>
//                 <View style={{height:25,width:75,}}>
//                 <Text style={style.text}>{item.name} </Text>
//                 </View>
//                 <Text>:</Text>
//                 <View>
//                 <Text style={{marginLeft:10}}>{item.date}</Text>
//               </View>
//               </View>




//             </View>

//           }>
//         </FlatList>
//       </View>
//     )
//   }
// }

// export default History;
// const style = StyleSheet.create({
//   flatlistMainView: {
//     marginTop: 10,
//     // backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 35, width: '45%',
//     flexDirection:'row',
//     marginLeft:10
//   },
//   flatlistChildView: {
//     width: 155,
//     flexDirection:'row', 
//     // backgroundColor:'white',
//     // justifyContent:'space-between', 
//     height: 35  },
//   text: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#61cbc0',
//     height:35,
//     marginLeft: 15
//   }
// })


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getToken} from '../../utils/TokenUtils'


const Exist = () => {
  // const arr = [
  //   { name: 'cbaa28b3-2c7b-b7f9-ca8c-60aa12cb9bc9', date: '18-9-2021', age: 13 },
  //   { name: 'cbaa28b3-2c7b-b7f9-ca8c-60aa12cb9bc9', date: '08-9-2021', age: 98 },
  //   { name: 'cbaa28b3-2c7b-b7f9-ca8c-60aa12cb9bc9', date: '28-9-2021', age: 45 },
  //   { name: 'cbaa28b3-2c7b-b7f9-ca8c-60aa12cb9bc9', date: '28-9-2021', age: 45 },
  // ]

  var [list, setList] = useState([])
  useEffect( () => {
    const params = new URLSearchParams()
    params.append('fields[bp_CheckIn]', 'assigned_user_id,assigned_user_name,fp_event_locations_id,location,checkin_date_time,status')
    params.append('filter[operator]', 'and')
    params.append('filter[assigned_user_id][eq]', '1')

    async function fetchData(){
      // let isMounted = true; 
      const token = await AsyncStorage.getItem('token')

    const response = await axios({
      url: 'https://demo.bpbytes.com.au/Api/V8/module/bp_CheckIn?',
      method: 'GET',
      data: params,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/vnd.api+json',
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI2M2FlYjg0NzVlNTBkZjJjY2M2NTExNDg2ZjNmNjZiOTJhYTMwYjVhNTM2MDZlMTQ2ZjRmMTRhYzgwNDc2M2NiODFmNzIyNDJmYWIxODk2In0.eyJhdWQiOiI3YmNkYzRiNi0xMTAwLTFiYTUtYzQzOS01ZTJiMDFjYWExNDIiLCJqdGkiOiIyNjNhZWI4NDc1ZTUwZGYyY2NjNjUxMTQ4NmYzZjY2YjkyYWEzMGI1YTUzNjA2ZTE0NmY0ZjE0YWM4MDQ3NjNjYjgxZjcyMjQyZmFiMTg5NiIsImlhdCI6MTYyMTk1MjM2MCwibmJmIjoxNjIxOTUyMzYwLCJleHAiOjE2MjE5NTU5NjAsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.xo-E8puxMQJpS9ymWm-D_2bf5ZGP0pdIAxpeAL_zB27lRl3yQoLHyMUgDo5ZWqmm4m8e5E2Q6FoU8Z2J6WSQHJeNeSu-ut2Z006mjHIaBhjBf7TJYL4vMO3srs-2CcmBb174TMs2ql1v7rbOwVvnHWtFe01KU9ypA5Hh_gKOINVj8l5n0JERImQ3T9cXMNaVbW1dK2bC2664KxJcfk_iqaGqt_uGLeo55UH3-pIJV-q5wrlCJq_Z2qLm5bT7YDc2pfrkeedX47w0WL2-xO_Br6dGxevgXpgK8dGKLGnM_-BRtqp3EQHPEkTBSeT1dYG_SlBgjtg2dj-vHzoksJAvtg`
        // Authorization: token

      }
    })
    return response
  }
  const data =  fetchData()
  data.then((res)=>{setList(res.data.data)
  }).catch((error)=>{console.log(error)});

  })
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Header name="LeaderBoard" /> */}
      <FlatList
        data={list}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={style.flatlistMainView}>

            <View style={style.flatlistChildView}>

              <View style={style.commonView}>
                <Text style={style.text}>Id   </Text>
                <Text>{item.id}</Text>
              </View>

              <View style={style.commonView}>
                <Text style={style.text}>Checkin Date Time </Text>
                <Text>{item.attributes.checkin_date_time}</Text>
              </View>


              <View style={style.commonView}>
                <Text style={style.text}>Checkout Date Time </Text>
                <Text>{item.attributes.checkout_date_time}</Text>
              </View>


              <View style={style.commonView}>
                <Text style={style.text}>type </Text>
                <Text>{item.type}</Text>
              </View>

              <View style={style.commonView}>
                <Text style={style.text}>Assigned User Name </Text>
                <Text>{item.attributes.assigned_user_name}</Text>
              </View>

              <View style={style.commonView}>
                <Text style={style.text}>Location </Text>
                <Text>{item.attributes.location}</Text>
              </View>

              <View style={style.commonView}>
                <Text style={style.text}>Discription </Text>
                <Text>{item.attributes.discription}</Text>
              </View>


            </View>
          </View>

        }>
      </FlatList>
    
    </View>
  )
}
export default Exist

const style = StyleSheet.create({
  lable: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 1
  },
  flatlistMainView: {
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    // marginLeft:10
  },
  flatlistChildView: {
    // width: 155,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // height: '100%',
    // marginLeft:10,
    borderRadius: 8,
    paddingBottom:10
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#61cbc0',
    // height: 35,
    // marginTop: 5
  },
  commonView: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10
  }


})