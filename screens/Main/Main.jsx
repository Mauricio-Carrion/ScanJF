import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BarCodeScanner } from 'expo-barcode-scanner'

const Main = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanStatus, setScanStatus] = useState(false)
  const [scanned, setScanned] = useState(false)
  //const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    const askForCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status == 'granted')
    }

    askForCameraPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const removeUserOnStorage = async () => {
    try {
      await AsyncStorage.removeItem('usuario')
      await AsyncStorage.removeItem('senha')
      navigation.navigate('Login')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topBar}>
        <TouchableOpacity title='logout' style={styles.logout} onPress={removeUserOnStorage}>
          <Icon name="logout" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cameraView} onPress={() => setScanStatus(true)}>
        {
          hasPermission && scanStatus ?
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ width: 460, height: 465 }}
            />
            :
            <>
              <Icon name='barcode-scan' size={80} color="#007FFF" />
              <Text style={{ color: "#007FFF", fontSize: 20, margin: 10 }}>Consultar produto</Text>
            </>
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    height: 85,
    borderRadius: 15,
    backgroundColor: '#007FFF',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  mainView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  logout: {
    width: 30,
    height: 30,
    color: 'white',
    margin: 10
  },

  cameraView: {
    height: 150,
    width: 350,
    borderWidth: 2,
    borderColor: '#007FFF',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    overflow: 'hidden'
  }
})

export default Main