import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { addCard } from '../utils/api'
import { addCardToDeck } from '../actions/deck-actions'
import { connect } from 'react-redux'

class NewQuestionContainer extends Component {
  state = {
    question: '',
    answer: '',
    isAddCard: false,
  }

  onPress = () => {
    const title = this.props.navigation.state.params.deckTitle

    const dataQuestion = {
      question: this.state.question,
      answer: this.state.answer
    }
    addCard(title, dataQuestion)
    .then(data => console.log('foi um sucesso no servidor', data))
    // .then(console.log('esse é o allDecks', this.props.allDecks))
    .then((title,dataQuestion) => this.props.addCardToDeck(title,dataQuestion))
    .then(data => console.log('foi um sucesso na store reduxXX', this.props.allDecks))
  }

  render() {
    const { isAddCard,question, answer } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text>{`Você está adicionando uma pergunta e resposta para ${this.props.navigation.state.params.deckTitle}`}</Text>

          <View style={styles.formContainerInputBox}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={question => this.setState({ question })}
              placeholder="Escreva sua Pergunta"
              value={question}
            />
          </View>

          <View style={styles.formContainerInputBox}>
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
              <View style={styles.formContainerButton}>
                <Button
                  style={styles.formContainerInput}
                  title="Enviar"
                  color="#000"
                  onPress={this.onPress}
                />
              </View>
            )}

            {isAddCard && (console.log('testette', this.props.allDecks))}
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
    justifyContent: 'center'
  }
})

// export default NewQuestionContainer

function mapStateToProps(state, ownProps) {
    return {
      allDecks: state.deckInfo.allDecks
    }
  }
  
  export default connect(mapStateToProps, {
    addCardToDeck
  })(NewQuestionContainer)
