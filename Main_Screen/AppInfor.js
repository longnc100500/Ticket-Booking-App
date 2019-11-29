import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
export default class AppInfor extends React.Component {
 
  
 
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>Information</Text>
          <View style={styles.inf}>
              <Image style={styles.icon}
              source={require('../Image/inforIcon.png')}
              />
              <Text style={styles.text}>Version: 1.0.0 </Text>
          </View>
          
              <TouchableOpacity style={styles.inf}>
                <Image style={styles.icon}
                 source={require('../Image/helpIcon.png')}
                />
              <Text style={styles.text}>Help </Text>
              </TouchableOpacity>
         
          
          <TouchableOpacity style={styles.inf}>
              <Image
              style={styles.icon}
              source={require('../Image/termIcon.png')}
              />
              <Text style={styles.text}>Term of service </Text>
            </TouchableOpacity>
         
          
            <TouchableOpacity style={styles.inf}>
              <Image style={styles.icon}
              source={require('../Image/contact.png')}
              />
              <Text style={styles.text}>Contact with us </Text>
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
    justifyContent: 'center',
    
  },
  text:{
      fontSize:20,
      color:'white',
      marginLeft:20,
  },
  inf:{
      flexDirection:'row',
      marginTop:10,
  },
  icon:
  {
      width:30,height:30,tintColor:'white'
  }
  
});

