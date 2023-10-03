import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Button, Alert } from 'react-native';



const image = {uri: 'https://www.teahub.io/photos/full/87-876944_yellow-rubber-ducks-yellow-and-red-rubber-duck.jpg'};



export default function App() {
  return (

    <View style={styles.container}>
      <ImageBackground 
        source={image} 
        resizeMode="cover" 
        style={styles.image}>

        <Text style= {styles.text}>Welcome to the Tamagotchi Game </Text>
        <Text style= {styles.text}> </Text>
        <Text style= {styles.text} >Please choose the mode you want to play</Text>
        <Text style= {styles.text}> </Text>
        <StatusBar style="auto" />
            
        <Button
          title="Pet Mode"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Button
          title="Combat Mode"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Button
          title="Story Mode"
          onPress={() => Alert.alert('Simple Button pressed')}
        />



      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 880,
    width: 420,
  },
  text: {
    color: 'black',
    fontSize: 42,
    textAlign: 'center'
  }



});


// the code to run the program is npx expo run
//npx expo start
//git checkout kperfiliev
 