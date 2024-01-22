// animationUtils.js
const getCharacterSheetCelebrateFrames = () => [
    require('../images/CharacterSheet/CharacterSheet-10.png'),
    require('../images/CharacterSheet/CharacterSheet-11.png'),
    require('../images/CharacterSheet/CharacterSheet-12.png'),
    require('../images/CharacterSheet/CharacterSheet-13.png'),
  ];
  
  const getSquidCharacterCelebrateFrames = () => [
    require('../images/Squid_Character/tile056.png'),
    require('../images/Squid_Character/tile057.png'),
    require('../images/Squid_Character/tile058.png'),
    require('../images/Squid_Character/tile059.png'),
  ];
  
  export const getCelebrateFrames = (duckType) => {
    switch (duckType) {
      case 5:
        return getCharacterSheetCelebrateFrames();
      case 6:
        return getSquidCharacterCelebrateFrames();
      default:
        return [];
    }
  };
  