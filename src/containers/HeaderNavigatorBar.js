import React, {Component} from "react"
import {Image, TouchableHighlight, View} from "react-native"

export default class HeaderNavigationBar extends Component {
  render() {
    return (<View style={{
      height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <TouchableHighlight
        style={{marginLeft: 10, marginTop: 0}}
        onPress={() => {
          this.props.navigation.toggleDrawer()
        }}>
        <Image
          style={{width: 32, height: 32}}
          source={require('../../image/drawer.png')}
        />
      </TouchableHighlight>
    </View>);
  }
}