import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import SpriteAnimation from './SpriteAnimation'; // Import the SpriteAnimation component

const window = Dimensions.get('window');

// Data for different types of ducks
const duckData = {
  0: {
    name: 'Quacky',
    age: 2,
    favorite_food: 'Bread',
    imageSource: require('../images/PlayableAnimals/duckWave.gif'),
  },
  1: {
    name: 'Capycutie',
    age: 1,
    favorite_food: 'Veggies',
    imageSource: require('../images/PlayableAnimals/capyKnife.gif'),
  },
  2: {
    name: 'Rizzy',
    age: 3,
    favorite_food: 'Fish',
    imageSource: require('../images/PlayableAnimals/duckRizz.gif'),
  },
  3: {
    name: 'Coffee Quacker',
    age: 4,
    favorite_food: 'Coffee (not recommended)',
    imageSource: require('../images/PlayableAnimals/duckCoffee.gif'),
  },
  4: {
    name: 'Ducky',
    age: 5,
    favorite_food: 'Seeds',
    imageSource: require('../images/PlayableAnimals/ducky.gif'),
  },
};

export const getSpriteFrames = duckType => {
  if (duckType === 5) {
    return {
      idleFrames: [
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-2.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),

      ],
      walkFrames: [
        require('../images/CharacterSheet/CharacterSheet-21.png'),
        require('../images/CharacterSheet/CharacterSheet-22.png'),
        require('../images/CharacterSheet/CharacterSheet-23.png'),
        require('../images/CharacterSheet/CharacterSheet-24.png'),
      ],
      celebrateFrames: [
        require('../images/CharacterSheet/CharacterSheet-10.png'),
        require('../images/CharacterSheet/CharacterSheet-11.png'),
        require('../images/CharacterSheet/CharacterSheet-12.png'),
        require('../images/CharacterSheet/CharacterSheet-13.png'),
      ],
      deadFrames: [
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-0.png'),
        require('../images/CharacterSheet/CharacterSheet-1.png'),
        require('../images/CharacterSheet/CharacterSheet-34.png'),
        require('../images/CharacterSheet/CharacterSheet-35.png'),
        require('../images/CharacterSheet/CharacterSheet-36.png'),
      ],
    };
  } else if (duckType === 6) {
    return {
      idleFrames: [
        require('../images/Squid_Character/tile000.png'),
        require('../images/Squid_Character/tile001.png'),
        require('../images/Squid_Character/tile002.png'),
        require('../images/Squid_Character/tile003.png'),
        require('../images/Squid_Character/tile004.png'),
        require('../images/Squid_Character/tile005.png'),
        require('../images/Squid_Character/tile006.png'),
        require('../images/Squid_Character/tile007.png'),
      ],
      walkFrames: [
        require('../images/Squid_Character/tile008.png'),
        require('../images/Squid_Character/tile009.png'),
        require('../images/Squid_Character/tile010.png'),
        require('../images/Squid_Character/tile011.png'),
        require('../images/Squid_Character/tile012.png'),
      ],
      celebrateFrames: [
        require('../images/Squid_Character/tile056.png'),
        require('../images/Squid_Character/tile057.png'),
        require('../images/Squid_Character/tile058.png'),
        require('../images/Squid_Character/tile059.png'),
      ],
      deadFrames: [
        require('../images/Squid_Character/tile000.png'),
        require('../images/Squid_Character/tile001.png'),
        require('../images/Squid_Character/tile002.png'),
        require('../images/Squid_Character/tile003.png'),
        require('../images/Squid_Character/tile048.png'),
        require('../images/Squid_Character/tile049.png'),
        require('../images/Squid_Character/tile050.png'),
        require('../images/Squid_Character/tile051.png'),
        require('../images/Squid_Character/tile052.png'),
        require('../images/Squid_Character/tile052.png'),
        require('../images/Squid_Character/tile052.png'),

      ],
    };
  } else {
    // Default frames if not a SpriteAnimation duck
    return {
      idleFrames: [],
      walkFrames: [],
      celebrateFrames: [],
      deadFrames: [],
    };
  }
};

const Duck = ({ duckType, Optional: customStyle }) => {
  let duckContent;
  let duckInfo;

  // Check if duckType is valid
  if (duckData.hasOwnProperty(duckType)) {
    duckInfo = duckData[duckType];
  } else {
    // Default to duckType 0 if not found
    duckInfo = duckData[0];
  }

  const spriteFrames = getSpriteFrames(duckType);

  // Set duckContent based on duckType
  if (duckType === 5 || duckType === 6) {
    duckContent = (
      <SpriteAnimation
        onIdleAnimationFinish={() => {}}
        idleFrames={spriteFrames.idleFrames}
        walkFrames={spriteFrames.walkFrames}
        celebrateFrames={spriteFrames.celebrateFrames}
        deadFrames={spriteFrames.deadFrames}
      />
    );
  } else {
    // Default to image if not a SpriteAnimation duck
    duckContent = (
      <Image
        source={duckInfo.imageSource}
        style={{ width: window.width * 0.58, height: window.width * 0.58 }}
      />
    );
  }

  const imageWidth = window.width * 0.58;
  const imageHeight = imageWidth;

  return (
    <View style={[{ position: 'relative' }, customStyle]}>
      {duckContent}
    </View>
  );
};

export default Duck;
