import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {addQuestion} from '../utils/api'

class DeckContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.params.deckTitle}</Text>
        <Text>{`${
          this.props.navigation.state.params.deckNumberQuestions.length
        } Perguntas`}</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('NewQuestion', {
              operation: 'add',
              deckTitle: this.props.navigation.state.params.deckTitle
            })
          }
        >
          <Text>Adicionar Perguntas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Quiz', {
              operation: 'add',
              deckTitle: this.props.navigation.state.params.deckTitle
            })
          }
        >
          <Text>Começar Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default DeckContainer
