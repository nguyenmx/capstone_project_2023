import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';
import { useNavigation } from '@react-navigation/native';
import Currency from './Currency';
import { Audio } from 'expo-av';
import { withCurrency } from '../../components/CurrencyContext';
import mango from '../../images/Food/Mango.png'
import boba from '../../images/Food/Bobba_Green.png'
import salad from '../../images/Food/Salat.png'
import burger from '../../images/Food/Burger.png'
import shrimp from '../../images/Food/Shrimp.png'

const window = Dimensions.get('window');

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 180, // 3 minutes in seconds
    };
    this.soundObject = new Audio.Sound();
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        clearInterval(this.timerInterval);
        // Timer has reached 0, perform any actions needed
        console.log('Timer has reached 0');
      }
    }, 1000);
  };

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
    console.log('Current inv:', inventoryItems);

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
    const { timer } = this.state;
    const minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return (
      <ImageBackground
        source={require('../../images/Backgrounds/CoinShop.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View>
          <Currency optionalStyles={{ top: 130, left: 15 }} />
        </View>

        <View style={[styles.container, { top: 140 }]}>
          <Text style={styles.timerText}>
            {'Restocking in... ' + minutes + ':' + seconds}
          </Text>
          <View style={styles.shopItem}>
            {this.renderShopItem({ imageSource: require('../../images/Food/Apple.png'), price: 5, currencyType: 'coins' })}
            {this.renderShopItem({ imageSource: require('../../images/Food/Bread.png'), price: 10, currencyType: 'coins' })}
            {this.renderShopItem({ imageSource: require('../../images/Food/CakeSlice_Regular.png'), price: 20, currencyType: 'coins' })}
          </View>
        </View>

        <View style={[styles.container, {}]}>
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
    height: 50,
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
    width: 28,
    height: 23,
    marginLeft: 5,
    marginTop: 10
  },
  currencyText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 16,
    marginLeft: 5,
  },
  timerText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 30,
    color: 'white',
    bottom: -170,
    position: 'absolute'
  },
});

export default withCurrency(Shop);
