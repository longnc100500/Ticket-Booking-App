import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';
import { StackActions } from 'react-navigation';
import Modal from 'react-native-modalbox';
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header:null,
  };
  constructor(props)
  {
    
    super(props);
    const {navigation} =this.props;
   
    globalThis.a=navigation.state.params;
    

    this.state={
      data:{
        email:'admin',
        password:'admin',
      }, 
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3,
    }
   
    this.getEmail=this.getEmail.bind(this);
    this.getPass=this.getPass.bind(this);
    this.setEmai=this.setEmail.bind(this);
    this.setPass=this.setPass.bind(this);
    
  }
  getEmail()
  {
    if(globalThis.a==undefined)
      return 'adm';
    else
      return globalThis.a.email;
  }
  getPass()
  {
    if(globalThis.a==undefined)
      return 'adm';
    else
      return globalThis.a.password;
  }
  setEmail(value)
  {
    this.setState({data:{email:value,pass:this.state.data.password}});
  }
 setPass(val)
 {
  this.setState({data:{password:val,email:this.state.data.email}});
 }
 check(mail1,mail2,pass1,pass2)
 {
   if(mail1==mail2&&pass1==pass2){
    console.log(globalThis.a);
   return true;
  }
   else{
    console.log(globalThis.a);
   return false;
  }
 }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <View style={styles.oval}></View>
        </View>
        <View style={styles.logo} >
        <Image
        style={{width:100,height:100}}
        />
         </View>
        <View style={styles.child}>
        <Text style={{color:'#4A148C',fontSize:25,fontWeight:'bold',marginBottom:20}}>Sing In</Text>
          <Text style={{ color: '#7B1FA2',textAlign:'center' }}>Email</Text>
          <TextInput
            style={styles.inputAcc}
            //ref= {(ol) => { this.email = ol; }}
            onChangeText={(email)=>{this.setEmai(email)}}
          />
          <Text style={{ color: '#7B1FA2',textAlign:'center' }}>Password</Text>
          <TextInput
            style={styles.inputAcc}
            secureTextEntry={true}
            //ref= {(el) => { this.pass = el; }}
            onChangeText={(pass)=>{this.setPass(pass)}}
          />
          <TouchableOpacity style={styles.loginButton}
            onPress={this.check(this.state.data.email,this.getEmail(),this.state.data.password,this.getPass())?
              () => this.props.navigation.dispatch(StackActions.replace({routeName:'SlideMenu',params:globalThis.a}))
              :
              ()=> this.refs.notifi.open()
          }
           >
            <Text style={{color:'white',textAlign:'center'}}>Sing In</Text>
          </TouchableOpacity>
          <View style={styles.singUp}>
            <Text style={{ color: '#4A148C' }}>Don't have an account? </Text>
            <TouchableOpacity style={styles.singupButton}
            onPress={() => this.props.navigation.dispatch(StackActions.replace({routeName:'SingUpScreen'}))}
           
            >
              <Text style={styles.singUpText}>Sing up</Text>
            </TouchableOpacity>
          </View>
          <Modal
          ref={'notifi'}
          isOpen={this.state.isOpen}
          backdropOpacity={0}
          onClosed={() => {
            
          this.setState({ isOpen: false })       
          }}
          style={styles.modal}
          position={'center'}>
          <View style={{flexDirection:'column',width:200,height:200,justifyContent:'center',alignItems:'center'}}>
            <Image
            source={require('../Image/error.png')}
            style={{width:80,height:80}}
            />
          <Text style={styles.text}>Sing in failed!</Text>
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
    alignItems: 'center',
    justifyContent:'center',
  },
  child:{
   
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
   margin:20,
   borderBottomWidth: 1,
   borderColor:'lightgray',
   width:200,
  color:'#BA68C8',
  },
  singUp: {
    flexDirection:'row',
  },
  singUpText: {
    fontWeight: 'bold',
    color: '#4A148C',
  },
  loginButton: {
    backgroundColor: '#4A148C',
    borderRadius: 20,
    width: 200,
    height:40,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
    color:'white',
  },
  modal: {
    height: Dimensions.get('window').height*0.25,
    width:Dimensions.get('window').width*0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    backgroundColor:'white',
    elevation:5,
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
  
},
text:{
  color: '#D8D8D8',
  marginTop:10,
},
});
