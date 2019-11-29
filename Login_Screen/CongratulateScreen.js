import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
export default class CongratulateScreen extends React.Component {
 
  
 
  render() {
    return (
      <View style={styles.container}>
      
        <Text style={styles.congraText}>Đăng ký thành công!</Text>
        <TouchableOpacity style={styles.startButton}
        onPress={() => this.props.navigation.navigate('Default')}
        >
        <Text style={{color:'white'}}>Bắt đầu !</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#424242',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  congraText:{
    fontSize:35,
    color:'yellow',
  },
  startButton:{
    backgroundColor: '#F97676',
    borderRadius: 20,
    width: 200,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom:20,
    color: 'white',
    margin:20,
  }
  
  
});

