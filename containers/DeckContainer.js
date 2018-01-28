import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class DeckContainer extends Component {

    
  render() {
    return (
      <View style={styles.container}>
        <Text>Deckassas página</Text>
        <Text>Deckassas página - {JSON.stringify(this.props.navigation.state.params.deckTitle)}</Text>
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

  export default DeckContainer