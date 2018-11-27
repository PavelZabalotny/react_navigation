import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import HeaderNavigationBar from '../HeaderNavigatorBar'

export default class Screen1 extends React.Component {

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
          Screen1
        </Text>

      </View>
    </View>);
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
