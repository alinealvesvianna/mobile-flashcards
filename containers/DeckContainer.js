import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { addQuestion } from '../utils/api'
import { connect } from 'react-redux'

class DeckContainer extends Component {
  render() {
    const { allDecks } = this.props

    return (
      <View style={styles.containerDeck}>
        <Text style={styles.deckContainerTitle}>
          {this.props.navigation.state.params.deckTitle}
        </Text>
        {allDecks.map((deck, index) => {
          if (deck.title === this.props.navigation.state.params.deckTitle) {
            return (
              <Text key={index} style={styles.deckContainerQuestions}>{`${
                deck.questions.length
              } Perguntas`}</Text>
            )
          }
        })}

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('NewQuestion', {
              deckTitle: this.props.navigation.state.params.deckTitle
            })
          }
        >
          <View style={styles.button}>
            <Text>Adicionar Perguntas</Text>
          </View>
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
                      deckTitle: this.props.navigation.state.params.deckTitle
                    })
                  }
                >
                  <View style={styles.button}>
                    <Text>Começar Quiz</Text>
                  </View>
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
    allDecks: state.deckInfo.allDecks,
    deckTitle: ownProps.navigation.state.params.deckTitle
  }
}

export default connect(mapStateToProps, {})(DeckContainer)

const styles = StyleSheet.create({
  containerDeck: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckContainerTitle: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  deckContainerQuestions: {
    color: '#757575',
    fontSize: 16
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#000',
    borderWidth: 1,
    margin: 16,
    padding: 8
  }
})
