import React from 'react'
import {StyleSheet, View, WebView} from 'react-native'
import HeaderNavigationBar from "../HeaderNavigatorBar"

export default class Screen3 extends React.Component {

  render() {

    return (<View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <HeaderNavigationBar {...this.props} />
      <View style={{
        flex: 1,
      }}>
        <WebView
          source={{uri: 'http://m.tut.by'}}
        />
      </View>
    </View>)
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})*/
