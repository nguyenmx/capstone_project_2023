import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import SpriteAnimation from './SpriteAnimation'; // Import the SpriteAnimation component

const window = Dimensions.get('window');

const Duck = ({ duckType, Optional: customStyle }) => {
  let duckContent;

  switch (duckType) {
    case 0:
      duckContent = <Image source={require('../images/PlayableAnimals/duckWave.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 1:
      duckContent = <Image source={require('../images/PlayableAnimals/capyKnife.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 2:
      duckContent = <Image source={require('../images/PlayableAnimals/duckRizz.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 3:
      duckContent = <Image source={require('../images/PlayableAnimals/duckCoffee.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 4:
      duckContent = <Image source={require('../images/PlayableAnimals/ducky.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
    case 5: duckContent = <SpriteAnimation
      onIdleAnimationFinish={() => {}}
      idleFrames={[require('../images/CharacterSheet/CharacterSheet-0.png'), require('../images/CharacterSheet/CharacterSheet-1.png')]}
      walkFrames={[require('../images/CharacterSheet/CharacterSheet-6.png'), require('../images/CharacterSheet/CharacterSheet-7.png'), require('../images/CharacterSheet/CharacterSheet-8.png'), require('../images/CharacterSheet/CharacterSheet-9.png')]}
      celebrateFrames={ [
        require('../images/CharacterSheet/CharacterSheet-10.png'),
        require('../images/CharacterSheet/CharacterSheet-11.png'),
        require('../images/CharacterSheet/CharacterSheet-12.png'),
        require('../images/CharacterSheet/CharacterSheet-13.png'),
      ]}
    />
      break;

      case 6: duckContent = <SpriteAnimation
      onIdleAnimationFinish={() => {}}
      idleFrames={[    require('../images/Squid_Character/tile000.png'),
      require('../images/Squid_Character/tile001.png'),
      require('../images/Squid_Character/tile002.png'),
      require('../images/Squid_Character/tile003.png'),  
      require('../images/Squid_Character/tile004.png'),
      require('../images/Squid_Character/tile005.png'),
      require('../images/Squid_Character/tile006.png'),
      require('../images/Squid_Character/tile007.png'), ]}
      walkFrames={[require('../images/Squid_Character/tile008.png'),
      require('../images/Squid_Character/tile009.png'),
      require('../images/Squid_Character/tile010.png'),
      require('../images/Squid_Character/tile011.png'),
      require('../images/Squid_Character/tile012.png')]}
      celebrateFrames={ [
        require('../images/Squid_Character/tile056.png'),
        require('../images/Squid_Character/tile057.png'),
        require('../images/Squid_Character/tile058.png'),  
        require('../images/Squid_Character/tile059.png'),
      ]}
    />
      break;
    default:
      duckContent = <Image source={require('../images/PlayableAnimals/duckWave.gif')} style={{ width: window.width * 0.58, height: window.width * 0.58 }} />;
      break;
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

