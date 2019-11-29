import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
export default class Cart extends React.Component{
  constructor(props)
  {
    super(props);
    global.films=[];
    global.foods=[];

    
    
  }
  render(){
    return(
     <View style={{flex:1}}>
        <Text>Order</Text>
        <View>
          <Text>Items</Text>
          <View style={styles.filmTicketBox}>

          </View>
          <View style={styles.foodBox}>

          </View>
          <View style={styles.totalPay}></View>
          <View style={styles.payment}></View>
          <View style={styles.submit}></View>
          </View>
     </View>
    )
  }
}
const styles = StyleSheet.create({
})