import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { addQuestion } from '../utils/api'
import { connect } from 'react-redux'

class DeckContainer extends Component {
  render() {
    const { allDecks } = this.props

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

        {allDecks &&
          allDecks.map(deck => {
            if (
              deck.title === this.props.navigation.state.params.deckTitle &&
              deck.questions.length > 0
            ) {
              return (
                <TouchableOpacity
                  key={deck.title}
                  onPress={() =>
                    this.props.navigation.navigate('Quiz', {
                      operation: 'add',
                      deckTitle: this.props.navigation.state.params.deckTitle
                    })
                  }
                >
                  <Text>Começar Quiz</Text>
                </TouchableOpacity>
              )
            }
          })}
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    allDecks: state.deckInfo.allDecks
  }
}

export default connect(mapStateToProps, {})(DeckContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
