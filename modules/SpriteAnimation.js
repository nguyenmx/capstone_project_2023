import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import SpriteSheet from 'react-native-sprite-sheet';



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
  
    return (
      <View style={styles.container}>
        {/* Add other components as needed */}
        <SpriteSheet
          ref={spriteSheetRef}
          source={require('./path/to/your/sprite-sheet.png')}
          columns={4} // Replace with the number of columns in your sprite sheet
          rows={4} // Replace with the number of rows in your sprite sheet
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
  