import React from 'react';
//import {View, Text, TouchableHighlight, Image} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Screen1 from './src/containers/screen1'
import Screen2 from './src/containers/screen2'
import Screen3 from './src/containers/screen3'
//import HeaderNavigationBar from './src/containers/HeaderNavigatorBar'

/*class HeaderNavigationBar extends Component {
  render() {
    return (<View style={{
      height: 70,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <TouchableHighlight
        style={{marginLeft: 10, marginTop: 15}}
        onPress={() => {
          this.props.navigation.openDrawer()
        }}>
        <Image
          style={{width: 32, height: 32}}
          source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
        />
      </TouchableHighlight>
    </View>);
  }
}*/

/*export class HomeScreen extends Component {

  render() {
    return (<View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <HeaderNavigationBar {...this.props} />
      <View style={{
        flex: 1,
        backgroundColor: '#4885ed',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}>
          This is Home Screen
        </Text>

      </View>
    </View>);
  }
}

export class InfoScreen extends Component {

  render() {
    return (<View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <HeaderNavigationBar {...this.props} />
      <View style={{
        flex: 1,
        backgroundColor: '#61ac17',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}>
          This is Info Screen
        </Text>

      </View>
    </View>);
  }

}*/

const MyDrawerNavigator = createDrawerNavigator(
  {
    Screen1: {
      screen: Screen1
    },
    Screen2: {
      screen: Screen2
    },
    Screen3: {
      screen: Screen3
    }
  }, {
    initialRouteName: 'Screen1',
  }
)

const MyApp = createAppContainer(MyDrawerNavigator)

export default MyApp