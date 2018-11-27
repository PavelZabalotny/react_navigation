import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import HeaderNavigationBar from "../HeaderNavigatorBar"
import Camera from './Camera'

export default class Screen2 extends React.Component {
  state = {
    isPressButton: false,
    timestamp: null,
    geolocation: {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      error: null,
    },
  }

  render() {
    const {isPressButton, timestamp} = this.state
    const {latitude, longitude, altitude, accuracy, error} = this.state.geolocation

    return (<View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <HeaderNavigationBar {...this.props} />
      <View style={{
        flex: 1,
      }}>
        {
          isPressButton
            ? <Camera isReady={this.handleReadyCamera}/>
            : <View>
              <Button
                onPress={this.handlePressButton}
                title="Запустить камеру"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
              {
                error
                  ? <Text>Error: {error}</Text>
                  : <View>
                    <Text>Latitude: {latitude}</Text>
                    <Text>Longitude: {longitude}</Text>
                    <Text>Altitude: {altitude}</Text>
                    <Text>Accuracy: {accuracy}</Text>
                    <Text>Timestamp: {timestamp}</Text>
                  </View>
              }
            </View>
        }
      </View>
    </View>);
  }

  handleReadyCamera = (geolocation, timestamp) => {
    const {latitude, longitude, altitude, accuracy, error} = geolocation
    if (!error) {
      this.setState({
        isPressButton: false,
        timestamp,
        geolocation: {
          latitude,
          longitude,
          altitude,
          accuracy,
          error,
        },
      })
    } else {
      this.setState({
        isPressButton: false,
        geolocation: {
          error
        }
      })
    }
  }

  handlePressButton = () => {
    this.setState({
      isPressButton: true,
    })
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
