import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import heart_empty from "../../images/ProfilePage/heart_empty.png";
import heart_full from "../../images/ProfilePage/heart_full.png";

const MAX_FRIENDSHIP = 5;

const FriendshipLevel = ({ style }) => {
  const [friendshipLevel, setFriendshipLevel] = useState(MAX_FRIENDSHIP);

  // Function to update the hearts display
  const updateHearts = () => {
    const hearts = [];
    for (let i = 0; i < MAX_FRIENDSHIP; i++) {
      const heartImage = (
        <Image
          key={i}
          source={i < friendshipLevel ? heart_empty : heart_full}
          style={styles.heart}
        />
      );
      hearts.push(heartImage);
    }
    return hearts;
  };

  return (
    <View style={[styles.container, style]}>
      {updateHearts()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  heart: {
    height: 49,
    width: 55,
    top:10,
    transform: [{ scale: .8 }],
  },
});

export default FriendshipLevel;
