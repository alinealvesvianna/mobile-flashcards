import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { addCard } from '../utils/api'
import { addCardToDeck } from '../actions/deck-actions'
import { connect } from 'react-redux'

class NewQuestionContainer extends Component {
  state = {
    question: '',
    answer: '',
    isAddCard: false
  }

  onPress = () => {
    const title = this.props.navigation.state.params.deckTitle

    const dataQuestion = {
      question: this.state.question,
      answer: this.state.answer
    }
    addCard(title, dataQuestion)
      .then(data => this.props.addCardToDeck(title, dataQuestion))
      .then(
        this.setState({
          isAddCard: true
        })
      )
  }

  render() {
    const { isAddCard, question, answer } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <Text
            style={styles.formContentTitle}
          >{`Você está adicionando uma pergunta e resposta para ${
            this.props.navigation.state.params.deckTitle
          }`}</Text>

          <View style={styles.formContentInput}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={question => this.setState({ question })}
              placeholder="Escreva sua Pergunta"
              value={question}
            />
          </View>

          <View style={styles.formContentInput}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10
              }}
              placeholder="Escreva sua resposta"
              onChangeText={answer => this.setState({ answer })}
              value={answer}
            />
          </View>

          {this.state.answer !== '' &&
            this.state.question !== '' && (
              <View style={styles.formContentBtn}>
                <Button title="Enviar" color="#fff" onPress={this.onPress} />
              </View>
            )}

          {isAddCard && <Text style={styles.message}>Pergunta adicionada com sucesso!</Text>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  formContent: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%'
  },

  formContentTitle: {
    fontSize: 40,
    marginBottom: 30,
    textAlign: 'center'
  },
  formContentInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 30
  },
  formContentBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  message:{
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#17ab08'
  }
})

function mapStateToProps(state, ownProps) {
  return {
    allDecks: state.deckInfo.allDecks
  }
}

export default connect(mapStateToProps, {
  addCardToDeck
})(NewQuestionContainer)
