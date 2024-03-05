import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {heart_empty} from "../../images/ProfilePage/heart_empty.png"
import {heart_half} from "../../images/ProfilePage/heart_half.png"
import {heart_full} from "../../images/ProfilePage/heart_full.png"


const MAX_FRIENDSHIP = 5;

const FriendshipLevel = () => {
  const [friendshipLevel, setFriendshipLevel] = useState(MAX_FRIENDSHIP);

  // Function to update the hearts display
  const updateHearts = () => {
    const hearts = [];
    for (let i = 0; i < MAX_FRIENDSHIP; i++) {
      const heartImage = (
        <Image
          key={i}
          source={i < friendshipLevel ? {heart_full} : heart_empty}
          style={styles.heart}
        />
      );
      hearts.push(heartImage);
    }
    return hearts;
  };

  return (
    <View style={styles.container}>
      {updateHearts()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  heart: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});

export default FriendshipLevel;
