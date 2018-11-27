import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Alert} from 'react-native'
import {RNCamera} from 'react-native-camera'
import moment from 'moment'
import RNFS from 'react-native-fs'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      disabled: false,
      /*geolocation: {
        latitude: null,
        longitude: null,
        altitude: null,
        error: null,
      },*/
    }
    this.geolocation = {}
    this.imageUri = null
  }

  /*componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          error: null,
        }
      },
      (error) => this.geolocation.error = error.message,
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }*/

  static async requestDiskPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your disk'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the disk")
      } else {
        console.log("Camera permission denied")
        Alert.alert('Disk Permission',
          'denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async componentDidMount() {
    await Camera.requestDiskPermission()
  }

  render() {
    return (
      <View style={styles.container}>

        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          captureAudio={true}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>

            {/*Кнопка съемки фото*/}
            <TouchableOpacity
              onPress={this.takePicture}
              style={styles.capture}
              disabled={this.state.disabled}
            >
              {
                this.state.disabled
                  ? <Text style={{fontSize: 14}}> Working... </Text>
                  : <Text style={{fontSize: 14}}> Photo </Text>
              }
            </TouchableOpacity>

            {/*Кнопка съемки видео*/}
            {/*<TouchableOpacity
              onPress={this.takeVideo}
              style={styles.capture}
            >
              {
                this.state.isRecording
                  ? <Text style={{fontSize: 14}}> ☕ </Text>
                  : <Text style={{fontSize: 14}}> Video </Text>
              }
            </TouchableOpacity>*/}

          </View>
        </RNCamera>

      </View>
    )
  }

  writeDir = () => '/storage/emulated/0/DCIM/Camera/'
  fileName = format => this.writeDir() + moment().format('x') + '.' + format

  /*getGps = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          error: null,
        }
      },
      (error) => this.geolocation.error = error.message,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    )
  }*/

  /*loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition()
      const {latitude, longitude, altitude, accuracy} = position.coords

      this.geolocation = {
        latitude,
        longitude,
        altitude,
        accuracy,
        error: null,
      }
    } catch (error) {
      this.geolocation.error = error.message
    }
  }

  getCurrentPosition = (options = {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }*/

  /*takeVideo = () => {
    try {
      this.state.isRecording
        ? this.stopRecordVideo()
        : this.startRecordVideo()
    } catch (e) {
      console.log(e)
    }
  }

  startRecordVideo = async () => {
    if (this.camera) {

      this.setState({
        isRecording: true,
      })

      const file = this.fileName('mp4')

      const options = {
        path: file,
        mute: false,
        quality: RNCamera.Constants.VideoQuality["720p"],
      }

      //console.log('startRecording')

      await RNFS.mkdir(this.writeDir())

      await this.camera.recordAsync(options)

      //const {latitude, longitude, altitude} = this.state.geolocation
      const {latitude, longitude, altitude, accuracy} = this.geolocation

      console.log(`${this.getTime()} / latitude: ${latitude} / longitude: ${longitude} / altitude: ${altitude} / accuracy: ${accuracy} / ${file}`)

      this.props.isReady(true, this.geolocation)
    }
  }

  stopRecordVideo = () => {
    this.camera.stopRecording()

    this.setState({
      isRecording: false,
    })

    //console.log('stopRecording')
  }*/

  //getTime = () => moment().format('DD-MM-YYYY HH:mm:ss')

  getCurrentPosition = () => {
    const options = {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  takePicture = async () => {
    if (this.camera) {
      try {
        this.setState({
          disabled: true,
        })

        const options = {
          quality: 1.0,
          exif: true,
        }
        const data = await this.camera.takePictureAsync(options)
        this.imageUri = data.uri
        const position = await this.getCurrentPosition()
        const {latitude, longitude, altitude, accuracy} = position.coords
        this.geolocation = {
          latitude,
          longitude,
          altitude,
          accuracy,
          error: null,
        }
        RNFS.mkdir(this.writeDir())
        const file = this.fileName('jpg')
        RNFS.moveFile(data.uri, file)
        console.log(`${data.exif.DateTime} / latitude: ${latitude} / longitude: ${longitude} / altitude: ${altitude} / ${file}`)
        this.props.isReady(this.geolocation, data.exif.DateTime)
      } catch (error) {
        this.geolocation.error = error.message
        console.log(error.message)
        if(this.imageUri){
          RNFS.unlink(this.imageUri)
        }
        //Alert.alert('Error', error.message)
        this.props.isReady(this.geolocation)
      }

      /*navigator.geolocation.getCurrentPosition(
        (position) => {
          this.geolocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            error: null,
          }
          console.log('pos.timestamp', position.timestamp)
          RNFS.mkdir(this.writeDir())
          const {latitude, longitude, altitude} = this.geolocation
          const options = {
            quality: 1.0,
            exif: true,
          }
          const data = this.camera.takePictureAsync(options)
          console.log('---', data)
          const file = this.fileName('jpg')
          RNFS.moveFile(data.uri, file)
          console.log(`${data.exif.DateTime} / latitude: ${latitude} / longitude: ${longitude} / altitude: ${altitude} / ${file}`)
          this.props.isReady(true, this.geolocation, data.exif.DateTime)
        },
        (error) => {
          this.geolocation.error = error.message
          console.log('error = ', error.message)
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 0},
      )*/
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
})
