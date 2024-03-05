import React from 'react';
import { View, Image,Text, Dimensions } from 'react-native';
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

  // Set duckContent based on duckType
  if (duckType === 5) {
    duckContent = (
      <SpriteAnimation
        onIdleAnimationFinish={() => {}}
        idleFrames={[
          require('../images/CharacterSheet/CharacterSheet-0.png'),
          require('../images/CharacterSheet/CharacterSheet-1.png'),
        ]}
        walkFrames={[
          require('../images/CharacterSheet/CharacterSheet-6.png'),
          require('../images/CharacterSheet/CharacterSheet-7.png'),
          require('../images/CharacterSheet/CharacterSheet-8.png'),
          require('../images/CharacterSheet/CharacterSheet-9.png'),
        ]}
        celebrateFrames={[
          require('../images/CharacterSheet/CharacterSheet-10.png'),
          require('../images/CharacterSheet/CharacterSheet-11.png'),
          require('../images/CharacterSheet/CharacterSheet-12.png'),
          require('../images/CharacterSheet/CharacterSheet-13.png'),
        ]}
      />
    );
  } else if (duckType === 6) {
    duckContent = (
      <SpriteAnimation
        onIdleAnimationFinish={() => {}}
        idleFrames={[
          require('../images/Squid_Character/tile000.png'),
          require('../images/Squid_Character/tile001.png'),
          require('../images/Squid_Character/tile002.png'),
          require('../images/Squid_Character/tile003.png'),
          require('../images/Squid_Character/tile004.png'),
          require('../images/Squid_Character/tile005.png'),
          require('../images/Squid_Character/tile006.png'),
          require('../images/Squid_Character/tile007.png'),
        ]}
        walkFrames={[
          require('../images/Squid_Character/tile008.png'),
          require('../images/Squid_Character/tile009.png'),
          require('../images/Squid_Character/tile010.png'),
          require('../images/Squid_Character/tile011.png'),
          require('../images/Squid_Character/tile012.png'),
        ]}
        celebrateFrames={[
          require('../images/Squid_Character/tile056.png'),
          require('../images/Squid_Character/tile057.png'),
          require('../images/Squid_Character/tile058.png'),
          require('../images/Squid_Character/tile059.png'),
        ]}
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
