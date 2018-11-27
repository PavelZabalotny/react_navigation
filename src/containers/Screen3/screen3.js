import React from 'react'
import {StyleSheet, Text, View, WebView, Button} from 'react-native'
import HeaderNavigationBar from "../HeaderNavigatorBar"

export default class Screen3 extends React.Component {
  /*state = {
    isPressButton: false,

  }*/

  render() {
    //const {isPressButton} = this.state

    return (<View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <HeaderNavigationBar {...this.props} />
      <View style={{
        flex: 1,
        /*backgroundColor: '#edb8a4',
        alignItems: 'center',
        justifyContent: 'center'*/
      }}>
        <WebView
          source={{uri: 'http://m.tut.by'}}
        />

        {/*{
          isPressButton
            ? <View>
              <Button
                title="Go back"
                onPress={() => {
                  this.setState({
                    isPressButton: false,
                  })
                  this.props.navigation.navigate('Screen3')
                }}
              />
              <WebView
                source={{uri: 'http://m.tut.by'}}
              />
            </View>

            : <Button
              onPress={this.handlePressButton}
              title="Загрузить m.tut.by"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
        }*/}

      </View>
    </View>)
  }

  /*handlePressButton = () => {
    this.setState({
      isPressButton: true,
    })
  }*/
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
