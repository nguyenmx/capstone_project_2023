import React, { useContext, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Duck from '../../modules/CharDuck';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import HealthBar from '../../modules/HealthBar';

const window = Dimensions.get('window');
const backgroundImage = require('../../images/Backgrounds/background.gif');
const defeatBanner = require('../../images/CombatScreen/defeatBanner.png');

const LossScreen = ({navigation, route }) => {
  const { initialPlayerHealth, enemyFinalHealth } = route.params;
  const { selectedDuck, playerHealth } = useContext(ReferenceDataContext);

  // Create a ref for the HealthBar component
  const healthBarRef = useRef(null);

  // useEffect to update the HealthBar's initial health when finalHealth changes
  useEffect(() => {
    if (healthBarRef.current) {
      healthBarRef.current.setMaxHealth(initialPlayerHealth - Math.round(enemyFinalHealth * 0.15));
      healthBarRef.current.setCurrentHealth(0);
    }
  }, [playerHealth]);

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.bannerContainer}>
          <Image source={defeatBanner} style={styles.banner} />
        </View>
        <Duck duckType={selectedDuck} />
        <HealthBar ref={healthBarRef} barName="PlayerHealth" />  
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('CombatMode')}
        >
          <Text style={styles.buttonText}>Back To Menu</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LossScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: window.width * 0.7,
    height: window.height * 0.1,
    backgroundColor: '#FF4242',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: window.height * 0.05,
  },
  buttonText: {
    fontFamily: 'NiceTango-K7XYo',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: window.width * 0.075,
    color: 'white',
  },
  bannerContainer: {
    width: window.width * 0.7,
    aspectRatio: 702 / 614, // Adjust the aspect ratio to fit the banner image
    marginTop: window.height * 0.04,
    marginBottom: window.height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: window.width * 0.11,
    fontFamily: 'NiceTango-K7XYo',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: window.height * 0.06,
  },
});
