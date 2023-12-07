import React from 'react';
import { View, ImageBackground, Text, Image, StyleSheet } from 'react-native';

class Shop extends React.Component {
    render() {
        return (
          <ImageBackground source={require('../../images/CoinShop.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
    
              {/* Example: Display an item with an image and price */}
              <View style={styles.shopItem}>
                <Image source={require('../../images/Food/Apple_256x256.png')} style={styles.itemImage} />
                <Text style={styles.itemPrice}></Text>
                <Image source={require('../../images/Food/Bread_900x900.png')} style={styles.itemImage} />
                <Image source={require('../../images/Food/Cheese_256x256.png')} style={styles.itemImage} />
              </View>
    
              {/* Add more shop content as needed */}
            </View>
          </ImageBackground>
        );
      }
    }
    

    const styles = StyleSheet.create({
        backgroundImage: {
          flex: 1,
          width: '100%',
          height: '100%',
          // Additional styling for the background image, if needed
        },
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // Additional styling for the container, if needed
        },
        shopTitle: {
          fontSize: 24,
          color: 'white',
          // Additional styling for the title, if needed
        },


  shopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemImage: {
    width: 85,
    height: 85,
    top: 100,
    left: 10,
    // Additional styling for the item image, if needed
  },
  itemPrice: {
    fontSize: 18,
    color: 'white',
    // Additional styling for the item price, if needed
  },
        // Add more styles as necessary
      });
      
      export default Shop;
      