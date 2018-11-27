import React from 'react'
//import {View, Text, TouchableHighlight, Image} from 'react-native'
import {createDrawerNavigator, createAppContainer} from 'react-navigation'
import Screen1 from './src/containers/Screen1/screen1'
import Screen2 from './src/containers/Screen2/screen2'
import Screen3 from './src/containers/Screen3/screen3'

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