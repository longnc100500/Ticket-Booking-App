import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ScrollView,
    ImageBackground,
    Image,
    FlatList,
} from 'react-native';
import Modal from 'react-native-modalbox';
export default class App extends React.Component{
    constructor(props)
    {
        super(props);
        const {navigation} =this.props;
        globalThis.obj={
            
        };
        obj=navigation.getParam('bill');
        console.log(obj);
        this.state={
            isOpen: false,
            isDisabled: false,
            swipeToClose: false,
            sliderValue: 0.3,
        }
        
        
    }
    getSeat()
    {
       
       var a=globalThis.obj.seatList.join('-');
       console.log(a);
       return a;
    }
    caculatePrice()
    {
        let n=globalThis.obj.seatList.length;
        return `${n*10}$`;
    }
    render(){
        var BContent = (
            //Close button component
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ isOpen: false })}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>
          );
        return(
            <ImageBackground style={{flex:1,justifyContent:'center',flexDirection:'column'}}
            source={require('../Image/background.png')}
            >
            
                <View style={styles.containerChild}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:30,fontWeight:'bold'}}>Invoice</Text>
                    </View>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Items</Text>
                    
                        
                        <View style={styles.filmTicketBox}>
                            <View style={styles.filmsName}>
                                <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline',marginLeft:3}}>Film name:</Text>
        <Text style={{fontSize:17,marginHorizontal:10,}}>{globalThis.obj.filmName}</Text>
                            </View>
                            <View style={{width:Dimensions.get('window').width,height:1,backgroundColor:'lightgray'}}></View>
                            <View style={styles.dateShow}>
                                <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline',marginLeft:3}}>Date:</Text>
        <Text style={{fontSize:20,marginHorizontal:10,}}>{globalThis.obj.day}</Text>
                            </View>
                            <View style={{width:Dimensions.get('window').width,height:1,backgroundColor:'lightgray'}}></View>
                            <View style={styles.timeShow}>
                                <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline',marginLeft:3}}>Time:</Text>
        <Text style={{fontSize:20,marginHorizontal:10,}}>{globalThis.obj.time}</Text>
                            </View>
                            <View style={{width:Dimensions.get('window').width,height:1,backgroundColor:'lightgray'}}></View>
                            <View style={styles.seatChecked}>
                                <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline',marginLeft:3}}>Seat:</Text>
        <Text style={{fontSize:20,marginHorizontal:10,}}>{this.getSeat()}</Text>
                            </View>
                            <View style={{width:Dimensions.get('window').width,height:1,backgroundColor:'lightgray'}}></View>
                            <View style={styles.seatChecked}>
                                <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline',marginLeft:3}}>Cinema:</Text>
        <Text style={{fontSize:20,marginHorizontal:10,}}>{globalThis.obj.location}</Text>
                            </View>
                            <Modal
                            ref={'modal'}
                            isOpen={this.state.isOpen}
                            backdropOpacity={0}
                            onClosed={() => {
            
                            this.setState({ isOpen: false }),
                            this.props.navigation.dispatch(StackActions.replace({routeName:'Default',params:this.passData()}))
                            }}
                            style={styles.modal}
                            position={'bottom'}>
                        <View style={{flexDirection:'column',width:200,height:200,justifyContent:'center',alignItems:'center'}}>
                            <Image
                            source={require('../Image/success.png')}
                            style={{width:80,height:80}}/>
                            <Text style={{ 
                                    color: '#757575',
                                    marginTop:10,fontSize:20,}}>Pay Successfull!</Text>
                        </View>
          
                        </Modal>
                            
                        </View>
                       
                        <View style={styles.totalPay}>
                            <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline'}}>Total:</Text>
        <Text style={{fontSize:20}}>{this.caculatePrice()}</Text>
                        </View>
                        <View style={styles.payment}>
                            <TouchableOpacity 
                            onPress={() => this.refs.modal.open()}
                            style={{width:200,height:50,backgroundColor:'red',
                            borderRadius:10,elevation:3,
                            alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Pay</Text>
                            </TouchableOpacity>
                           
                        </View>
                    </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    containerChild:{
        flex:1,flexDirection:'column',
    },
    filmTicketBox:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:7,
        marginRight:7,
        elevation: 3,
        borderRadius:10,
    },
    filmsName:{
        flexDirection:'row',
        marginVertical:10,
    },
    dateShow:{
        flexDirection:'row',
        marginVertical:10,
    },
    timeShow:{
        flexDirection:'row',
        marginVertical:10,
    },
    seatChecked:{
        flexDirection:'row',
        marginVertical:10,
    },
    totalPay:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    payment:{
        alignItems:'center',
        justifyContent:'center',
    },
    modal: {
    height: Dimensions.get('window').height*0.25,
    width:Dimensions.get('window').width*0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    position:'absolute',
    elevation:4,
    backgroundColor: '#FAFAFA',
    zIndex:1,
    },
    text:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
    },
    
   


})