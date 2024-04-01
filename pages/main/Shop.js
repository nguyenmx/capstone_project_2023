import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import diamond from '../../images/PetHouse/Portrait/diamond.png';
import coin from '../../images/PetHouse/Portrait/coin.png';
import { useNavigation } from '@react-navigation/native';
import Currency from './Currency';
import { Audio } from 'expo-av';
import { withCurrency } from '../../components/CurrencyContext';
import mango from '../../images/Food/Mango.png';
import boba from '../../images/Food/Bobba_Green.png';
import salad from '../../images/Food/Salat.png';
import burger from '../../images/Food/Burger.png';
import shrimp from '../../images/Food/Shrimp.png';
import lemonade from '../../images/Food/Drink_Lemonade.png';
import ItemModal from '../main/ItemModal';


const window = Dimensions.get('window');

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
      foodItems: [
        { imageSource: require('../../images/Food/Apple.png'), price: 5, currencyType: 'coins' },
        { imageSource: require('../../images/Food/Bread.png'), price: 10, currencyType: 'coins' },
        { imageSource: require('../../images/Food/CakeSlice_Regular.png'), price: 20, currencyType: 'coins' }
      ],
      otherItems: [
        { imageSource: require('../../images/Food/Carton_Blue.png'), price: 1, currencyType: 'diamonds' },
        { imageSource: require('../../images/Food/Beef_Grilled.png'), price: 3, currencyType: 'diamonds' },
        { imageSource: require('../../images/Food/CannedFood_Fish.png'), price: 1, currencyType: 'diamonds' }
      ],
      isModalVisible: false // Initialize isModalVisible to false
    };
    this.soundObject = new Audio.Sound();
  }

  handleFoodItemPress = (item) => {
    this.setState({ selectedItem: item.imageSource, isModalVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedItem: null, isModalVisible: false });
  };

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

        console.log('Timer has reached 0');
        this.switchShopItems();
      }
    }, 1000);
  };

  switchShopItems = () => {

    this.setState({
      foodItems: [
        { imageSource: boba, price: 4, currencyType: 'coins' },
        { imageSource: shrimp, price: 24, currencyType: 'coins' },
        { imageSource: mango, price: 12, currencyType: 'coins' }
      ],
      otherItems: [
        { imageSource: salad, price: 8, currencyType: 'coins' },
        { imageSource: burger, price: 11, currencyType: 'coins' },
        { imageSource: lemonade, price: 4, currencyType: 'diamonds' }
      ]
    });
  };

  handleBuyPress = async (item) => {


    if (this.soundObject._loaded) {
      try {

        await this.soundObject.replayAsync();
      } catch (error) {
        console.error('Error replaying the sound:', error);
      }
    } else {

      try {
        await this.soundObject.loadAsync(require('../../assets/sfx/purchaseClick.wav'));
        await this.soundObject.playAsync();
      } catch (error) {
        console.error('Error loading or playing the sound:', error);
      }
    }


    const { coins, diamonds, earnCurrency, spendCurrency, addItemToInventory, imageSource, inventoryItems } = this.props.currency;

    console.log('Current coins:', coins);
    console.log('Current diamonds:', diamonds);
    console.log('Current inv:', inventoryItems);


    if (item.currencyType === 'coins' && coins >= item.price) {
      console.log('Deducting coins:', item.price);
      spendCurrency('coins', item.price);
      addItemToInventory(item.imageSource);
      console.log(imageSource)
    } else if (item.currencyType === 'diamonds' && diamonds >= item.price) {
      console.log('Deducting diamonds:', item.price);
      spendCurrency('diamonds', item.price);
      addItemToInventory(item.imageSource); 
    } else {
      console.warn('Insufficient funds');
    }
  };

  renderShopItem = (item) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => this.handleFoodItemPress(item)}> 
        <Image source={item.imageSource} style={styles.itemImage} />
      </TouchableOpacity>
  
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
    const { timer, foodItems, otherItems, isModalVisible, selectedItem } = this.state;
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
          <Currency optionalStyles={{ top: 140, left: window.width * .12 }} />
        </View>

        <View style={[styles.container, { top: 150 }]}>
          <Text style={styles.timerText}>
            {'Restocking in... ' + minutes + ':' + seconds}
          </Text>
          <View style={styles.shopItem}>
            {foodItems.map((item, index) => (
              <React.Fragment key={index}>
                {this.renderShopItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={[styles.container, { marginBottom: 40 }]}>
          <View style={styles.shopItem}>
            {otherItems.map((item, index) => (
              <React.Fragment key={index}>
                {this.renderShopItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <ItemModal visible={isModalVisible} item={selectedItem} onClose={this.handleCloseModal} />

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
    marginVertical: -23,
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
  timerText: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    bottom: window.height * -.29
    
  },
});

export default withCurrency(Shop);
