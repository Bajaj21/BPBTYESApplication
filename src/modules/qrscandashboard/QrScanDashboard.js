import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Image } from 'react-native'
import { List } from 'react-native-paper'
// import Navigations from './src/component/navigation/index'
// import Header from './Header'
import LinearGradient from 'react-native-linear-gradient';


const checkIn = () => {
  alert('Check in')
}

const checkOut = () => {
  alert('Check Out')
}

const showData = (props) => {
  // this.props.navigation.navigate('LeaderBoard')
}
const arr = [
  { name: 'amir' },
  { name: 'salman' },
  { name: 'ajay' }
]

const path = '../../../assets/images/home/'
class QrScanDashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f2f' }}>
        {/* <View style={{height:60,width:'100%',backgroundColor:'red'}}></View> */}
        {/* <View style={style.main}> */}
        <StatusBar backgroundColor="#009688"></StatusBar>
        <View style={style.buttonMainView}>

          <TouchableOpacity onPress={() => { this.props.navigation.navigate('ScanQR') }}>
            <View style={[style.buttonView, { marginTop: 5, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }]}>
              <View>
                {/* <Image resizeMode="center"style={style.image}source={require(path+'clipboard.png')} /> */}
              </View>
              <View>
                <Text style={[style.buttonText, { fontSize: 20, color: 'white' }]}>Check-In</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.navigation.navigate('ScanQR') }}>
            <View style={[style.buttonView, { marginTop: 20, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }]}>
              <View>
                {/* <Image style={style.image}source={require(path+'audit.png')} /> */}
              </View>
              <View>
                <Text style={[style.buttonText, { fontSize: 20, color: 'white' }]}>Check-Out</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.navigation.navigate('History') }}>

            <View style={[style.buttonView, { backgroundColor:'#555CC4',marginTop: 20, justifyContent: 'center', alignItems: 'center' }]}>
              <View>
                {/* <Image style={style.image}source={require(path+'to-do-list.png')} /> */}
              </View>


                <View>
                  <Text style={style.buttonText}>Check-In-History</Text>
                </View>
              </View>

          </TouchableOpacity>

        </View>


        {/* </View> */}
      </View>
    )
  }
}
export default QrScanDashboard;


const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#00adb3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonMainView: {
    flexDirection: 'column',
    flex: 1,
    // marginTop:10,
    backgroundColor: '#f2f2f2',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'

  },
  buttonView: {
    elevation: 8,
    backgroundColor: "white",
    // borderRadius: 10,
    // marginTop:10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    // marginTop: 20,
    width: 300,
    height: 110,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    // marginLeft:20
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: 'bold',
    // marginLeft:30    // alignSelf: "center",
    // textTransform: "uppercase"
  }

})