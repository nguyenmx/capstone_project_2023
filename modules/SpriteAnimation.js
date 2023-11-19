import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import SpriteSheet from 'react-native-sprite-sheet'; // Make sure to import the correct module

const SpriteAnimation = () => {
  const spriteSheetRef = useRef(null);

  const startAnimation = () => {
    // Trigger animation by calling play method on the spriteSheetRef
    spriteSheetRef.current.play({
      type: 'linear',
      frames: [0, 1, 2, 3], // Replace with your frame indices
      loop: true,
    });
  };

  const source = require('../images/CharacterSheet.png'); // Adjust the path based on your project structure
  console.log('Image Source:', source); // Log the image source

  return (
    <View style={styles.container}>
      {/* Add other components as needed */}
      <SpriteSheet
        ref={spriteSheetRef}
        source={source}
        columns={8} // Replace with the number of columns in your sprite sheet
        rows={7} // Replace with the number of rows in your sprite sheet
        width={100} // Replace with the width of each sprite frame
        height={100} // Replace with the height of each sprite frame
      />
      {/* Add other components as needed */}
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
