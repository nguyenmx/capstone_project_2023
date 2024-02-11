import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';
import { useNavigation } from '@react-navigation/native';
import Currency from './Currency';
import { Audio } from 'expo-av';
import { withCurrency } from '../../pages/main/CurrencyContext';
import Inventory from './Inventory';

const window = Dimensions.get('window');

class Shop extends React.Component {


  soundObject = new Audio.Sound();

  handleBuyPress = async (item) => {
    console.log(`Buy button pressed for item: ${item.price}`);
    // Check if the sound is already loaded
    if (this.soundObject._loaded) {
      try {
        // If loaded, play the sound
        await this.soundObject.replayAsync();
      } catch (error) {
        console.error('Error replaying the sound:', error);
      }
    } else {
      // If not loaded, load and play the sound
      try {
        await this.soundObject.loadAsync(require('../../assets/sfx/purchaseClick.wav'));
        await this.soundObject.playAsync();
      } catch (error) {
        console.error('Error loading or playing the sound:', error);
      }
    }

    // Destructure the currency values and earnCurrency function from the context
    const { coins, diamonds, earnCurrency, spendCurrency, addItemToInventory, imageSource, inventoryItems } = this.props.currency;

    console.log('Current coins:', coins);
    console.log('Current diamonds:', diamonds);
    console.log('Current diamonds:', inventoryItems);


    // Deduct the specified amount from the appropriate currency
    if (item.currencyType === 'coins' && coins >= item.price) {
      console.log('Deducting coins:', item.price);
      spendCurrency('coins', item.price);
      addItemToInventory(item.imageSource); // Ensure item.imageSource is passed correctly
      console.log(imageSource)
    } else if (item.currencyType === 'diamonds' && diamonds >= item.price) {
      console.log('Deducting diamonds:', item.price);
      spendCurrency('diamonds', item.price);
      addItemToInventory(item.imageSource); // Ensure item.imageSource is passed correctly

    } else {
      // Handle insufficient funds (optional)
      console.warn('Insufficient funds');
    }
  };

  renderShopItem = (item) => (
    <View style={styles.itemContainer}>
      <Image source={item.imageSource} style={styles.itemImage} />
      <TouchableOpacity onPress={() => this.handleBuyPress(item)}>
        <Text style={styles.itemPrice}>
          {item.price + ' '}
          {item.currencyType === 'coins' ? (
            <>
              <Image source={coin} style={styles.currencyIcon} />
            </>
          ) : (
            <>
              <Image source={diamond} style={styles.currencyIcon} />
            </>
          )}
        </Text>
        <Image source={require('../../images/BuyButton.png')} style={styles.buyBttn} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <ImageBackground
        source={require('../../images/Backgrounds/CoinShop.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View>
          <Currency />
        </View>
        <View style={[{ position: 'absolute', top: 125, left: 45 }]}>
          <View style={styles.priceContainer}>
            <Image source={diamond} style={[{ position: 'absolute', zIndex: 999, top: -15, left: -5 }]}></Image>
            <View style={styles.rect}></View>
          </View>

          <View>
            <Image source={coin} style={[{ position: 'relative', zIndex: 998, top: -24, left: 10, height: 35, width: 35 }]}></Image>
            <Image source={coin} style={[{ position: 'absolute', zIndex: 999, top: -15, left: -5 }]}></Image>
            <View style={styles.rect}></View>
          </View>
        </View>

        <View style={[styles.container, { top: window.width * 0.24 }]}>
          <View style={styles.shopItem}>
            {this.renderShopItem({ imageSource: require('../../images/Food/Apple.png'), price: 5, currencyType: 'coins' })}
            {this.renderShopItem({ imageSource: require('../../images/Food/Bread.png'), price: 10, currencyType: 'coins' })}
            {this.renderShopItem({ imageSource: require('../../images/Food/Cheese.png'), price: 20, currencyType: 'coins' })}
          </View>
        </View>

        <View style={[styles.container, { marginTop: window.width * -0.33 }]}>
          <View style={styles.shopItem}>
            {this.renderShopItem({ imageSource: require('../../images/Food/Carton_Blue.png'), price: 1, currencyType: 'diamonds' })}
            {this.renderShopItem({ imageSource: require('../../images/Food/Beef_Grilled.png'), price: 3, currencyType: 'diamonds' })}
            {this.renderShopItem({ imageSource: require('../../images/Food/CannedFood_Fish.png'), price: 1, currencyType: 'diamonds' })}
          </View>
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
  },
  rect: {
    width: 130,
    height: 42,
    backgroundColor: '#C6A2FD',
    padding: 10,
    borderRadius: 25,
    marginBottom: window.height * -0.1,
    position: 'absolute',
  },
  priceContainer: {
    left: 145,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  shopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buyBttn: {
    width: 109,
    height: 42,
  },
  itemImage: {
    width: 85,
    height: 85,
    marginVertical: -12,
  },
  itemPrice: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 33,
    color: 'white',
    top: 43,
    left: 25,
    zIndex: 998,
  },
  currencyIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  currencyText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default withCurrency(Shop);
