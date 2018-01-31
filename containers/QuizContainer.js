import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import ModalGame from '../components/ModalGame'

import {
  clearDailyNotification,
  setLocalNotification
} from '../utils/notifications'

class QuizContainer extends Component {
  state = {
    answer: '',
    isShowAnswer: false,
    questionNumber: 0,
    correctAnswers: 0,
    isVisibleModal: false
  }

  onHandleCorrectAnswer = answer => {
    const { questionNumber, correctAnswers } = this.state
    if (answer !== undefined) {
      if (this.state.answer !== '') {
        if (answer === this.state.answer) {
          this.setState((prevState, props) => ({
            correctAnswers: prevState.correctAnswers + 1
          }))
        }
        this.setState((prevState, props) => ({
          questionNumber: prevState.questionNumber + 1,
          answer: '',
          correctAnswers: prevState.correctAnswers
        }))
      } else {
        this.setState({ isVisibleModal: true })
      }
    } else {
      this.setState({
        finishAnswers: true
      })
    }
  }

  onHandleIncorrectAnswer() {
    const { questionNumber } = this.state
    this.setState((prevState, props) => ({
      questionNumber: prevState.questionNumber + 1,
      answer: ''
    }))
  }

  backToDeck = questions => {
    this.props.navigation.navigate('DeckContainer', {
      deckTitle: this.props.navigation.state.params.deckTitle,
      deckNumberQuestions: questions
    })
  }

  restartQuiz = () => {
    this.setState({
      answer: '',
      isShowAnswer: false,
      questionNumber: 0,
      correctAnswers: 0,
      isVisibleModal: false
    })
  }

  render() {
    const title = this.props.navigation.state.params.deckTitle

    const {
      questionNumber,
      correctAnswers,
      answer,
      isShowAnswer,
      isVisibleModal
    } = this.state
    const { allDecks } = this.props

    return (
      <View style={styles.container}>
        <ModalGame
          isVisible={isVisibleModal}
          errorMessage={'A resposta não pode ser vazia!'}
          onCloseClick={() => this.setState({ isVisibleModal: false })}
        />

        {allDecks.map((deck, index) => {
          if (deck.title === title) {
            {
              clearDailyNotification()
              .then(setLocalNotification())
            }
            return (
              <View key={index}>
                {questionNumber === deck.questions.length && (
                  <View>
                    <View>
                      <Text style={styles.formContentTitle}>
                        Parabéns, você finalizou o seu quiz!
                      </Text>
                      <Text style={styles.formContentTitle}>Você acertou</Text>
                      <Text style={styles.formContentTitleBold}>
                        {correctAnswers} de {deck.questions.length} perguntas!
                      </Text>
                    </View>
                    <View style={styles.formContentBtn}>
                      <Button
                        onPress={this.restartQuiz}
                        title="Recomeçar quiz"
                        color="#000"
                      />
                    </View>
                    <View style={styles.formContentBtn}>
                      <Button
                        onPress={() => this.backToDeck(deck.questions)}
                        title="Voltar para o baralho"
                        color="#000"
                      />
                    </View>
                  </View>
                )}

                <View key={deck.title}>
                  <Text>
                    {questionNumber + 1}/{deck.questions.length}
                  </Text>
                </View>

                {!isShowAnswer &&
                  questionNumber < deck.questions.length && (
                    <View>
                      <View>
                        <Text style={styles.formContentTitle}>
                          {deck.questions[questionNumber].question}
                        </Text>
                      </View>
                      <Button
                        onPress={() => this.setState({ isShowAnswer: true })}
                        title="Ver Resposta"
                        style={{
                          height: 40,
                          borderColor: 'gray',
                          borderWidth: 1,
                          marginBottom: 10,
                          color: '#000'
                        }}
                      />
                      <View style={styles.formContentInput}>
                        <TextInput
                          style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 10
                          }}
                          placeholder="Escreva a sua resposta"
                          onChangeText={answer => this.setState({ answer })}
                          value={this.state.answer}
                        />
                      </View>
                      <View style={styles.formContentBtn}>
                        <Button
                          onPress={() =>
                            this.onHandleCorrectAnswer(
                              questionNumber === deck.questions.length
                                ? undefined
                                : deck.questions[questionNumber].answer
                            )
                          }
                          title="Resposta Correta"
                          color="#17ab08"
                        />
                      </View>
                      <View style={styles.formContentBtn}>
                        <Button
                          onPress={this.onHandleIncorrectAnswer.bind(this)}
                          title="Resposta Incorreta"
                          color="#ca0526"
                        />
                      </View>
                    </View>
                  )}
                {isShowAnswer && (
                  <View>
                    <View>
                      <Text style={styles.formContentTitle}>
                        {deck.questions[questionNumber].answer}
                      </Text>
                    </View>
                    <Button
                      onPress={() => this.setState({ isShowAnswer: false })}
                      title="Voltar para a Pergunta"
                      color="#ca0526"
                    />
                  </View>
                )}
              </View>
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

export default connect(mapStateToProps, {})(QuizContainer)

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
  formContentTitleBox: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30
  },
  formContentTitle: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20
  },
  formContentTitleBold: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#07675f',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20
  }
})
