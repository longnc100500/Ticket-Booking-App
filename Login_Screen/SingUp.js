import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modalbox';
import { StackActions } from 'react-navigation';
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props)
  {
    super(props);
    const {navigation} =this.props;
    this.state={
      name:'',number:'',email:'',password:'', isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3,
      
    }
    globalThis.obj=this.state;
    
  }
  passData()
  {
    globalThis.obj={
      name:this.state.name,
      number:this.state.number,
      email:this.state.email,
      password:this.state.password,
    };
    return globalThis.obj;
  }
  seperator() {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: 'lightgray',
           width: 200,
           marginBottom:5,
        }}
      />
    );
  }
 
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.innerBox}>
          <View style={styles.oval}></View>
        </View>
        <View style={styles.logo} />
        <View style={styles.child}>
          <Text style={{color:'#4A148C',fontSize:25,fontWeight:'bold'}}>Sing Up</Text>
          <View style={styles.textInput}>
          <Image style={styles.icon}
              source={require('../Image/user_icon.png')}
              />
          <TextInput
            style={styles.inputAcc}
            placeholder=' Enter your name'
            onChangeText={(name)=>{
              this.setState({name:name})
            }}
            
          />
          </View>
          
          <View style={styles.textInput}>
          <Image style={styles.icon}
          
              source={require('../Image/email.png')}
              />
          <TextInput
            style={styles.inputAcc} 
            placeholder=' Enter your email'
            onChangeText={(email)=>{
              this.setState({email:email})
            }}
          />
          </View>
          
          <View style={styles.textInput}>
          <Image style={styles.icon}
              source={require('../Image/phone.png')}
              />
          <TextInput
            style={styles.inputAcc} 
            placeholder=' Enter your phone number'
            
            onChangeText={(num)=>{
              this.setState({number:num})
            }}
          />
          </View>
          
          <View style={styles.textInput}>
          <Image style={styles.icon}
              source={require('../Image/key.png')}
              />
          <TextInput
            style={styles.inputAcc}
            placeholder=' Enter password'
            secureTextEntry={true}
            onChangeText={(pass)=>{
              this.setState({password:pass})
            }}
          /></View>
          
          <View style={styles.textInput}>
          <Image style={styles.icon}
              source={require('../Image/confirm.png')}
              />
          <TextInput
            style={styles.inputAcc}
            placeholder=' Confirm password'
            secureTextEntry={true}
            onChangeText={(pass)=>{
              this.setState({password:pass})
            }}
          /></View>
          <TouchableOpacity style={styles.loginButton}
          onPress={() => this.refs.modal.open()}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Sing Up</Text>
          </TouchableOpacity>
          <Modal
          ref={'modal'}
          isOpen={this.state.isOpen}
          backdropOpacity={0}
          onClosed={() => {
            
          this.setState({ isOpen: false }),
          this.props.navigation.dispatch(StackActions.replace({routeName:'Default',params:this.passData()}))
        
                                
          }}
          style={styles.modal}
          position={'center'}>
          <View style={{flexDirection:'column',width:200,height:200,justifyContent:'center',alignItems:'center'}}>
            <Image
            source={require('../Image/success.png')}
            style={{width:80,height:80}}
            />
          <Text style={styles.text}>Singup Successfull!</Text>
          </View>
          
        </Modal>
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A148C',
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  child: {
    flexDirection: 'column',
    alignItems:'center',
    borderRadius:20,
    elevation:5,
    height:Dimensions.get('window').height*0.7,
     width: Dimensions.get('window').width*0.8,
     backgroundColor:'white',
   justifyContent:'center',
  },
  inputAcc: {
    width:200,
    height:30,
    marginLeft:10,
    color:'#4A148C',
    borderWidth:1,
    borderColor:'lightgray',
    margin:10,
    borderRadius:5,
    
  },
  loginButton: {
    backgroundColor: '#4A148C',
    borderRadius: 20,
    width: 250,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    color: 'white',
    elevation:3,
  },
  text:{
    color: '#D8D8D8',
    marginTop:10,
  },
  textInput:{
    flexDirection:'row',  
  },
  icon:{
    width:23,height:23,tintColor:'#4A148C',marginTop:10,
  },
  modal: {
      height: Dimensions.get('window').height*0.25,
      width:Dimensions.get('window').width*0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    position:'absolute',
    elevation:4,
},
innerBox:{
  position:'absolute',
  marginVertical:Dimensions.get('window').height,
  width: Dimensions.get('window').width*3,
  height: Dimensions.get('window').height*0.6,
  backgroundColor:'white',
  rotation:150,
  //justifyContent:'flex-end',
  alignItems:'center',
  
},
oval:{
  width: 200,
  height: 200,
  backgroundColor:'#4A148C',
  borderRadius:150,
  marginRight:Dimensions.get('window').width,
  marginTop:Dimensions.get('window').width/3,
  
}
});
