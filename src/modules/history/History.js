import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native'
// import Navigations from './src/component/navigation/index'
// import Header from '../header/Header'


const checkIn = () => {
  alert('Check in')
}

const checkOut = () => {
  alert('Check Out')
}


const arr = [
  { name: 'Check in', date: '18-9-2021', age: 13 },
  { name: 'Check out', date: '08-9-2021', age: 98 },
  { name: 'Date', date: '28-9-2021', age: 45 },
  { name: 'Check out Date', date: '28-9-2021', age: 45 },
]


class History extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {


    return (
      <View style={{ flex: 1 }}>
        {/* <Header name="LeaderBoard" /> */}
        <FlatList
          data={arr}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={style.flatlistMainView}>

              <View style={style.flatlistChildView}>
                <View style={{height:25,width:75,}}>
                <Text style={style.text}>{item.name} </Text>
                </View>
                <Text>:</Text>
                <View>
                <Text style={{marginLeft:10}}>{item.date}</Text>
              </View>
              </View>




            </View>
           
          }>
        </FlatList>
      </View>
    )
  }
}

export default History;
const style = StyleSheet.create({
  flatlistMainView: {
    marginTop: 10,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35, width: '45%',
    flexDirection:'row',
    marginLeft:10
  },
  flatlistChildView: {
    width: 155,
    flexDirection:'row', 
    // backgroundColor:'white',
    // justifyContent:'space-between', 
    height: 35  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#61cbc0',
    height:35,
    marginLeft: 15
  }
})
