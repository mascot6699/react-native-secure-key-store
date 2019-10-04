/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { Button, ScrollView, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";


type Props = {};
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
    this.remove = this.remove.bind(this);

    // State
    this.state = {
      userInput: null,
      value: null,
      isStored: undefined,
    }
  }

    set() {
      if (this.state.userInput !== null) {
            RNSecureKeyStore.set("key1", this.state.userInput, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
              .then((res) => {
                this.setState({
                  isStored: true
                })
              }, (err) => {
                alert(err);
              });

            RNSecureKeyStore.set("key2", "lol" + this.state.userInput + "lol", {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
              .then((res) => {
                this.setState({
                  isStored: true
                })
              }, (err) => {
                alert(err);
              });
      } else {
        alert("Please enter a value")
      }
    }

    get() {
        RNSecureKeyStore.get("key2").then((val) => {
          this.setState({
            value: val
          })
        }).catch((err) => {
          alert(err)
        })
    }

    remove() {
      RNSecureKeyStore.remove("key1")
        .then((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });

      RNSecureKeyStore.remove("key2")
        .then((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });
}

    render() {
        return (
        <ScrollView
            bounces={false}
            keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>
            <View>
              <View>
                <Text style={{
                  fontSize: 12,
                  paddingBottom: 10,
                }}>Enter a value</Text>
                <TextInput style={styles.valueInput} placeholder={'Enter a value for storing'}
                           onChangeText={(text) => this.setState({ userInput: text })}/>
              </View>
              <View style={styles.buttonSet}>
                <Button title={"SET"} onPress={this.set}/>
                <Button title={"GET"} onPress={this.get}/>
                <Button title={"REMOVE"} onPress={this.remove}/>
              </View>
              <View style={styles.showcase}>
                <View style={{
                  flexDirection: 'row',
                  paddingBottom: 20
                }}><Text style={{
                  paddingRight: 20,
                }}>Value is stored:</Text><Text style={{
                  color: this.state.isStored ? '#478e47' : '#b43535'
                }}>{this.state.isStored ? "true" : "false"}</Text></View>
                <View style={styles.valueArea}>
                  <View style={styles.valueTitle}><Text style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>VALUE</Text></View>
                  <Text style={styles.value}>{this.state.value}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
    )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: Dimensions.get('window').height
  },
  valueInput: {
    padding: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1f1f1'
  },
  buttonSet: {
    flexDirection: 'row',
    paddingVertical: 25,
    justifyContent: 'space-between'
  },
  showcase: {
    paddingVertical: 10
  },
  valueArea: {
    paddingVertical: 10,
    flexDirection: 'column'
  },
  valueTitle: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomColor: '#333'
  },
  value: {
    paddingTop: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});
