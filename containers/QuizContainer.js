import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import ModalGame from '../components/ModalGame'

class QuizContainer extends Component {
  state = {
    answer: '',
    isShowAnswer: false,
    questionNumber: 0,
    correctAnswers: 0,
    isVisibleModal: false,
  }

  onHandleCorrectAnswer = answer => {
    const { questionNumber, correctAnswers } = this.state
    debugger
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
    }else{
        this.setState({
            finishAnswers: true,
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

  render() {
    const title = this.props.navigation.state.params.deckTitle

    const {
      questionNumber,
      correctAnswers,
      answer,
      isShowAnswer,
      isVisibleModal,
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
            return (
              <View key={index}>
                {questionNumber === deck.questions.length && (
                  <View>
                    <View>
                      <Text>
                        Congratulations! You have finished quiz
                      </Text>
                      <Text>
                        You have correctly answered
                      </Text>
                      <Text>
                        on {correctAnswers} of {deck.questions.length}
                        questions
                      </Text>
                    </View>
                    <View>
                      <Button
                        onPress={() =>
                          this.setState({
                            questionNumber: 0,
                            correctAnswers: 0
                          })
                        }
                        title="Restart quiz"
                        color="#000"
                      />
                    </View>
                    <View>
                      <Button
                        onPress={() => navigation.goBack()}
                        title="Back to deck"
                        color="#fff"
                      />
                    </View>
                  </View>
                )}

                <View key={deck.title}>
                  <Text>
                    {questionNumber + 1}/{deck.questions.length}
                  </Text>
                </View>

                  {(!isShowAnswer && questionNumber < deck.questions.length) && (
                    <View>
                      <View>
                        <Text
                          style={{
                            color: '#f0f',
                            fontSize: 16,
                            marginBottom: 10
                          }}
                        >
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
                      <View>
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
                      <View>
                        <Button
                          onPress={() =>
                            this.onHandleCorrectAnswer(
                              questionNumber === deck.questions.length
                                ? (undefined)
                                : (deck.questions[questionNumber].answer)
                            )
                          }
                          title="Resposta Correta"
                          color="#0ff"
                          style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 10
                          }}
                        />
                      </View>
                      <View>
                        <Button
                          onPress={this.onHandleIncorrectAnswer.bind(this)}
                          title="Resposta Incorreta"
                          color="#ff0"
                        />
                      </View>
                    </View>
                  )}
                  {isShowAnswer &&(
                    <View>
                      <View>
                        <Text>{deck.questions[questionNumber].answer}</Text>
                      </View>
                      <Button
                        onPress={() => this.setState({ isShowAnswer: false })}
                        title="Voltar para a Pergunta"
                        color="#f0f"
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
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingBottom: 70
  },
  questionNumbersContainer: {
    margin: 5,
    height: 30,
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  questionNumbersText: {
    textAlign: 'left',
    fontSize: 16
  },
  questionAnswerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  questionContainerTitleBox: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 0
  },
  questionContainerTitle: {
    fontSize: 40,
    textAlign: 'center'
  },
  questionInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 3,
    paddingRight: 3,
    width: '80%',
    marginLeft: '10%',
    marginTop: 30,
    marginBottom: 30
  },
  questionInput: {
    marginTop: 8,
    marginBottom: 5
  },
  questionButtonCorrect: {
    backgroundColor: '#00FF00',
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '50%',
    marginLeft: '25%',
    marginBottom: 10
  },
  questionButtonIncorrect: {
    backgroundColor: '#ff0',
    borderWidth: 1,
    borderColor: '#ff0',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '50%',
    marginLeft: '25%'
  },
  resultContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 70
  },
  resultContainerTitleContainer: {
    alignItems: 'center',
    width: '80%',
    marginLeft: '12%',
    marginBottom: 30
  },
  resultContainerTitle: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20
  },
  resultContainerResult: {
    fontSize: 20,
    textAlign: 'center'
  },
  resultButtonTakeAgain: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '50%',
    marginLeft: '25%',
    marginBottom: 10
  },
  resultButtonBackToDecks: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '50%',
    marginLeft: '25%'
  }
})
