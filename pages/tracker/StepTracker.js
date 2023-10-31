import { View, Text, StyleSheet, ImageBackground } from 'react-native';



const backgroundImage = require('../../images/clouds.png');
const SteptrackerScreen = () => {
  


  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <View style={styles.container}>


    </View>
    </ImageBackground>
    
  );

}




export default SteptrackerScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
