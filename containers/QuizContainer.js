import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class QuizContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Quizzz página</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

  export default QuizContainer