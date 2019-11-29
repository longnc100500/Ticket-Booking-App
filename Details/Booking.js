import * as React from 'react';
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
  TouchableHighlight,
} from 'react-native';
import API from '../API';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {dataSource:null,checkedday:0,checkedTime:0,checkedCinema:0,likeCount:100,dislikeCount:30,
      arrSeat:[
      'A1','A2','A3','A4','A5','A6','A7','A8','A9',
      'B1','B2','B3','B4','B5','B6','B7','B8','B9',
      'C1','C2','C3','C4','C5','C6','C7','C8','C9',
      'D1','D2','D3','D4','D5','D6','D7','D8','D9',
      'E1','E2','E3','E4','E5','E6','E7','E8','E9',
      'F1','F2','F3','F4','F5','F6','F7','F8','F9',
      'G1','G2','G3','G4','G5','G6','G7','G8','G9',
      'H1','H2','H3','H4','H5','H6','H7',
    ],
      arrCheckedSeat:[],
      bookingSeatBill:{
        seatList:[],
        day:'',
        time:'',
        location:'',
        filmName:'',
      },
      arrDate:[`${parseInt(this.pickDate())}/${this.pickMonth()}`,`${parseInt(this.pickDate())+1}/${this.pickMonth()}`,`${parseInt(this.pickDate())+2}/${this.pickMonth()}`,`${parseInt(this.pickDate())+3}/${this.pickMonth()}`,`${parseInt(this.pickDate())+4}/${this.pickMonth()}`],
      arrCine:['Lotte','Galaxy','CGV','Beta','BHD Start','CineBox'],
      arrTime:['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30']};
    const {navigation} =this.props;
    const movieID=navigation.getParam('movieID');
    API.view(movieID).then((data)=>{
      this.setState(data);
    })
    
  
  }
  pickDate()
  {
    let date=new Date();
    let d=date.getDate();
    
    return `${d}`;
  }
  pickMonth()
  {
    let date=new Date();
    let m=date.getMonth();
    return `${m}`;
  }

  pushTo=(value)=>{
   var newArr=this.state.arrCheckedSeat;
   newArr.push(value);
   return newArr;
  }
  removeAt=(delVal)=>{
    var DelArr=this.state.arrCheckedSeat;
    DelArr.splice(this.state.arrCheckedSeat.indexOf(delVal),1);
    return DelArr;
  }
  getCinema=(idx)=>{
    var cine='';
    cine=this.state.arrCine[idx];
    return cine;
  }
  getDay=(idx)=>{
    var day='';
    day=this.state.arrDate[idx];
    return day;
  }
  getTime=(idx)=>{
    var time='';
    time=this.state.arrTime[idx];
    return time;
  }
  setBookingBill(idxCine,idxDay,idxTime)
  {
    var tmp=this.state.bookingSeatBill;
    tmp.day=this.getDay(idxDay);
    tmp.location=this.getCinema(idxCine);
    tmp.time=this.getTime(idxTime);
    tmp.seatList=this.state.arrCheckedSeat;
    tmp.filmName=this.state.original_title;
    
    return tmp;
  }
 
  render() {
    return (
      <ImageBackground style={{flex:1,}}
      source={require('../Image/background.png')}
      >
      <ScrollView style={{backgroundColor:'#FFFFFF10',paddingTop:15}}>
          <StatusBar hidden={true} />
        <View style={{padding:5,backgroundColor:'#FFFFFF10',borderRadius:10,alignItems:'center',marginBottom:10}}>
        <View style={styles.head}>
            <Image style={styles.posterImage}
            source={{
              uri:
                `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.state.poster_path}`,
            }}
            />
            <View style={styles.title}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>
                    {this.state.original_title}
                </Text>
                <Text style={{marginTop:3}}>{this.state.release_date}</Text>
                    <Text style={{color:'#9E9E9E',marginTop:3}}>Runtime: {this.state.runtime}</Text>
                <View style={{borderRadius:10,width:120,height:30,backgroundColor:'#FFCA28',color:'white',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#212121'}}>Rating: {this.state.vote_average}</Text>
                </View>
            </View>
        </View>
        <View style={styles.likeBox}>
            <TouchableOpacity
            onPress={()=>{
              this.setState({likeCount:this.state.likeCount+1})
            }}
            >
                <Image source={require('../Image/like_icon.png')}
                style={{width:30,height:30,tintColor:'#00C853'}}
                />   
            </TouchableOpacity>
          <Text>{this.state.likeCount}</Text>
            <TouchableOpacity
            onPress={()=>{
              this.setState({dislikeCount:this.state.dislikeCount+1})
            }}
            >
                <Image source={require('../Image/dislike_icon.png')}
                style={{width:30,height:30,tintColor:'#D32F2F',margin:30}}
                />
                
            </TouchableOpacity>
          <Text>{this.state.dislikeCount}</Text>
        </View>
        <View style={styles.selectDayBox}>
          <Text>Day:</Text> 
          <ScrollView style={{flexDirection:'row',width:Dimensions.get('window').width}} horizontal={true}>
            {this.state.arrDate.map((arrDate,key)=>{
              return(
                <View style={{alignItems:'center'}}>
                  {this.state.checkedday==key?
                  <TouchableHighlight
                   onPress={()=>{this.setState({checkedday:key,bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
                   style={styles.selectDayButtonIsChecked}>
                      <Text style={{color:'white'}}>{arrDate}</Text>
                  </TouchableHighlight>:
                  <TouchableHighlight 
                  onPress={()=>{this.setState({checkedday:key,bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
                  style={styles.selectDayButton}>
                      <Text style={{color:'#D32F2F'}}>{arrDate}</Text>
                    </TouchableHighlight>}
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.selectTimeBox}>
          <Text>Time:</Text>
          <ScrollView style={{flexDirection:'row'}} horizontal={true} >
          {this.state.arrTime.map((arrTime,key)=>{
              return(
                <View>
                  {this.state.checkedTime==key?
                  <TouchableHighlight
                   onPress={()=>{this.setState({checkedTime:key,bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
                   style={styles.selectTimeButtonIsChecked}>
                      <Text style={{color:'white'}}>{arrTime}</Text>
                  </TouchableHighlight>:
                  <TouchableHighlight 
                  onPress={()=>{this.setState({checkedTime:key,bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
                  style={styles.selectTimeButton}>
                      <Text style={{color:'#0D47A1'}}>{arrTime}</Text>
                    </TouchableHighlight>}
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.selectCinema}>
          <Text>Select cinema:</Text>
            <ScrollView style={{flexDirection:'row',width:Dimensions.get('window').width}} horizontal={true}>
            {this.state.arrCine.map((arrCine,key)=>{
              return(
                <View>
                  {this.state.checkedCinema==key?
                  <TouchableHighlight
                   onPress={()=>{this.setState({checkedCinema:key,bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
                   style={styles.selectCinemaButtonIsChecked}>
                      <Text style={{color:'white'}}>{arrCine}</Text>
                  </TouchableHighlight>:
                  <TouchableHighlight 
                  onPress={()=>{this.setState({checkedCinema:key,bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
                  style={styles.selectCinemaButton}>
                      <Text style={{color:'#1B5E20'}}>{arrCine}</Text>
                    </TouchableHighlight>}
                </View>
              )
            })}
            </ScrollView>
        </View>
        <Text style={{marginVertical:5}}>Select seat:</Text>
        <View style={styles.selectSeat}>
          {this.state.arrSeat.map((curVal,idx,arr)=>{
            return(
              this.state.arrCheckedSeat.indexOf(curVal)==-1?
              <TouchableOpacity 
              onPress={()=>{this.setState({arrCheckedSeat:this.pushTo(curVal),bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
              style={styles.selectSeatButton}
              />
                
             
              :
              <TouchableOpacity style={styles.selectSeatButtonChecked}
              onPress={()=>{this.setState({arrCheckedSeat:this.removeAt(curVal),bookingSeatBill:this.setBookingBill(this.state.checkedCinema,this.state.checkedday,this.state.checkedTime)})}}
              />
                
              
            )
          })}
        </View>
        <TouchableOpacity style={styles.addToCardButton} 
        onPress={()=>{this.props.navigation.navigate('releaseBill',{bill:this.state.bookingSeatBill})}}
        >
          <Text style={{color:'white',fontSize:15}}>Pay</Text>
        </TouchableOpacity>
        </View>
        <View style={{height:20}}></View>
      </ScrollView></ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  head:{
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
    
    flexDirection:'row',
    justifyContent:'center',
  },
  likeBox:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.05,
    
    marginTop:10,
    alignItems:'center',
    justifyContent:'center'

  },
  selectDayBox:{
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.1,
    
    marginTop:10,
  },
  selectTimeBox:{
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.1,
    
    marginTop:10,
  },
  selectCinema:{
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.1,
    
    marginTop:10,
  },
  selectSeat:{
    width:Dimensions.get('window').width,
    flexDirection:'row',
    marginTop:10,
    flexWrap:'wrap',
    alignContent:'space-between',
    marginLeft:5,
  },
  addToCardButton:{
    width:Dimensions.get('window').width*0.4,
    height:Dimensions.get('window').height*0.05,
    marginLeft:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    backgroundColor:'#FF1307',
  },
  posterImage:{
      flex:3,
      height: Dimensions.get('window').height * 0.38,
      borderRadius:10,
      justifyContent:'center'
  },
  title:{
      flex:5,
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:10,
  },
  selectDayButton:{
    width:80,
    height:30,
    borderRadius:15,
    margin:10,
    borderColor:'#D32F2F',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
  },
  selectTimeButton:{
    width:80,
    height:30,
    borderRadius:15,
    margin:10,
    borderColor:'#0D47A1',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
   
  },
  selectCinemaButton:{
    width:80,
    height:30,
    borderRadius:15,
    margin:10,
    borderColor:'#1B5E20',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
  },
  selectDayButtonIsChecked:{
    width:80,
    height:30,
    borderRadius:15,
    margin:10,
    backgroundColor:'#D32F2F',
    alignItems:'center',
    justifyContent:'center',
  },
  selectTimeButtonIsChecked:{
    width:80,
    height:30,
    borderRadius:15,
    margin:10,
    backgroundColor:'#0D47A1',
    //borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    
  },
  selectCinemaButtonIsChecked:{
    width:80,
    height:30,
    borderRadius:15,
    margin:10,
    backgroundColor:'#1B5E20',
    alignItems:'center',
    justifyContent:'center',
  },
  selectSeatButton:{
    width:25,
    height:25,
    backgroundColor:'#FFCDD2',
    borderColor:'#B71C1C',
    borderWidth:1,
    margin:5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
  },
  selectSeatButtonChecked:{
    width:25,
    height:25,
    backgroundColor:'#B71C1C',
    margin:5,alignItems:'center',
    justifyContent:'center',
    borderRadius:20,  
  }
  
});
