import react from "react";
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator
        color='#007FFF'
        size='large'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
})

export default Loading