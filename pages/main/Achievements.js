import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import award1 from '../../images/ProfilePage/Achievements/label.png';
import award2 from '../../images/ProfilePage/Achievements/food_complete.png';
import award3 from '../../images/ProfilePage/Achievements/paw.png';
import award4 from '../../images/ProfilePage/Achievements/ribbon.png';
import FriendshipLevel from '../../components/main_game_logic/FriendshipLevel';

const Achievements = ({ shopItems, allItemsPurchased, winCount }) => {
    
    const petIds = [0, 1, 2, 3, 4, 5, 6];
    
  //Temporary award3 style
  return (
    <View>
    <View style={{display: 'none'}}><FriendshipLevel id={0} /></View> 
    <View style={styles.container}>
      <Image source={award1} style={[styles.achievementImage, winCount <= 0 && styles.tintedImage]} />
      <Image source={award2} style={[styles.achievementImage, !allItemsPurchased && styles.tintedImage]} />
      <Image source={award3} style={[styles.achievementImage, winCount <= 50 && styles.tintedImage ]} /> 
      <Image source={award4} style={[styles.achievementImage, winCount <= 10 && styles.tintedImage]} />
    </View>
    
    </View>
  );

  
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    zIndex: 1000,
    position: 'absolute',
    bottom: -100 
  },
  achievementImage: {
    width: 60,
    height: 60,
  },
  tintedImage: {
    tintColor: 'black', // Untint the image
  },
});

export default Achievements;
