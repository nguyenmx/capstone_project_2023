import React, { useRef } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
//import SpriteSheet from 'react-native-spritesheet';

const SpriteAnimation = () => {
  const spriteSheetRef = useRef(null);

  const startAnimation = () => {
    //spriteSheetRef.current.play();
    console.log("Animation is playing")
  };

  return (
    <View style={styles.container}>

      
      
      <Button title="Start Animation" onPress={startAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpriteAnimation;
