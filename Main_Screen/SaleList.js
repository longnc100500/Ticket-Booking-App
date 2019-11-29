import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,StatusBar,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class SaleList extends React.Component{
   static navigationOptions= {
       
        tabBarLabel: 'Sale',
        tabBarIcon:({ tintColor }) => (
          <Image
            source={require('../Image/sale.png')}
            style={{ tintColor: tintColor,width:20,height:20 }}
          />
        ),
  };
  render(){
    return(
      <ScrollView style={{flex:1}}>
        <Image style={styles.img}
        source={require('../Image/km1.jpg')}
        />
        <Image style={styles.img}
        source={require('../Image/km2.jpg')}
        />
        <Image style={styles.img}
        source={require('../Image/km3.jpg')}
        />
        <Image style={styles.img}
        source={require('../Image/km4.jpg')}
        />
        <Image style={styles.img}
        source={require('../Image/km5.jpg')}
        />
        <Image style={styles.img}
        source={require('../Image/km6.jpg')}
        />
        <Image style={styles.img}
        source={require('../Image/km7.jpg')}
        />
       
        

      </ScrollView>
    )
  }
}
const styles=StyleSheet.create({
  img:{
    height: Dimensions.get('window').height*0.4,
    width:Dimensions.get('window').width,
    marginBottom:10,
    resizeMode:'cover',
  }
})