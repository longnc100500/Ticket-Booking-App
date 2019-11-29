import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,Dimensions,Image
} from 'react-native';
export default class UserProfile extends React.Component{
  constructor(props)
  {
    super(props);
    const {navigation} =this.props;
    globalThis.pro=navigation.state.params;
    this.state={name:'',avartar:'',age:0,sex:'',email:''};
    console.log(globalThis.pro);
  }
  render(){
    return(
      <View style={styles.container}>
      <View style={styles.innerBox}></View>
      
      <View style={styles.box}>
        <Image source={require('../Image/avatar.jpg')}
        style={styles.avatar}
        />
        
        <Text style={{color:'#4A148C',fontSize:20}}>{globalThis.pro.name}</Text>
        <Text style={{color:'#CE93D8'}}>{globalThis.pro.email}</Text>
      </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    backgroundColor:'#AA00FF',
    flex:1,
    alignItems:'center',
    justifyContent:'center',

  },
  innerBox:{
    position:'absolute',
    marginVertical:Dimensions.get('window').height,
    width: Dimensions.get('window').width*3,
    height: Dimensions.get('window').height*0.6,
    backgroundColor:'white',
    rotation:20,
    
  },
  box:{
    backgroundColor:'#F3E5F5',
    borderRadius:20,
    height: Dimensions.get('window').height * 0.7,
    width: Dimensions.get('window').width*0.8,
    elevation:10,
    flexDirection:'column',
    //position: 'relative',
    alignItems:'center',
    justifyContent:'center',
    
  },
  avatar:{
    width:150,height:150,
    tintColor:'#4A148C',
  }
})