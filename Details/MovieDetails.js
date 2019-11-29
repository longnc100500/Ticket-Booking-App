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
} from 'react-native';
import API from '../API';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    const {navigation} =this.props;
    const movieID=navigation.getParam('movieID');
    
    API.view(movieID).then((data)=>{
      this.setState(data);
    })
  
  }
  secondsToHms(d) {
    d = Number(d);
    d=d*60;
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "h" : "h") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "min" : "min") : "";
    
    return hDisplay + mDisplay ;
}
  vote(num)
  {
    let ratingBar=[];
    for(var i=1;i<=5;i++)
    {
      
      
          {i<=num/2?
          ratingBar.push(<Image
            style={{width:20,height:20}}
            source={require('../Image/star_filled.png')}
            />)
        :ratingBar.push(<Image
          style={{width:20,height:20}}
          source={require('../Image/star_corner.png')}
          />  )
        }
    
    }
    return ratingBar;
  }
  getConstructor()
  {
    var a=[];
    if(this.state.production_companies!=undefined)
    {
      this.state.production_companies.forEach(element => {
        if(element.logo_path!=null)
        {
          a.push(
            <View style={styles.productionItem}>
              <Text style={{flex:1}}>{element.name}</Text>
              <Image
              style={styles.productImage}
              source={{
                uri:
                  `https://image.tmdb.org/t/p/w600_and_h900_bestv2${element.logo_path}`,
              }}

              />
              
            </View>
          )
        }
      });
      if(a.length!=0)
        return a;
      else
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'red'}}>
          <Text style={{fontSize:30,fontWeight:'bold'}}>Unknow</Text>
        </View>
      );
    }
    else
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:30,fontWeight:'bold'}}>Unknow</Text>
      </View>
    );
  }
  getGenres()
  {
    let a=[];
    if(this.state.genres!=undefined)
    {
      this.state.genres.forEach(element => {
        a.push(
          <View style={{borderWidth:1,margin:5,borderRadius:5,borderColor:'lightgray'}}>
            <Text style={{color:'lightgray',fontSize:10,}}> { element.name.toUpperCase() } </Text>
          </View>
        )
      });
      return a;
    }
    else
    return null;
  }
  render() {
    return (
      <ImageBackground style={{flex:1,flexDirection: 'column',tintColor:'red'}}
      source={require('../Image/background.png')}
      >
        
        <View style={styles.header}>
          <Image style={styles.image}
          source={{
            uri:
              `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.state.poster_path}`,
          }}
          />
          <View style={styles.headerInf}> 
            <Text style={{fontWeight:'bold',fontSize:30,}}>{this.state.original_title}</Text>
            <Text>Rating: {this.vote(this.state.vote_average)}</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Image style={{width:15,height:15,tintColor:'lightgray'}}
              source={require('../Image/time.png')}
              />
              <Text> {this.secondsToHms(this.state.runtime)}</Text>
            </View>
            <View style={styles.genres}>{this.getGenres()}</View>
            
          </View>
        </View>
        <View style={styles.story}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Over view</Text>
        <Text style={{marginHorizontal:10,}}>{this.state.overview}</Text>
        </View>
        
        <View style={styles.Producer}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Production: </Text>
          <View style={{flexDirection:'row',flex:1}}>
          {this.getConstructor()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flex:4,
    flexDirection:'row',
    marginTop:'10%',
    borderRadius:20,
    elevation:10,
    backgroundColor:'white',
  },
  story:{
    flex: 3,
    margin:10,
    borderRadius:20,
    elevation:10,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },
  Producer:{
    flex: 3,
    flexDirection:'column',
    backgroundColor:'white',
    borderRadius:20,
    elevation:10,
    marginBottom:5,
    alignItems:'center',
    marginHorizontal:10,
  },
  image:{
    resizeMode:'center',
    marginLeft:4,
    position:'absolute',
    left:0,
    top:-20,
    height: Dimensions.get('window').height * 0.38,
    width: Dimensions.get('window').width * 0.4,
    borderRadius:20,
  },
  headerInf:{
    flexDirection:'column',
    marginLeft:20,
    justifyContent:'center',
    position:'absolute',
    right: '5%',
    bottom:'20%',
    maxWidth:Dimensions.get('window').width * 0.5,
  },
  productionItem:{
    flexDirection:'column',
    flex:1,
    alignContent:'center',
  },
  productImage:{
    flex:7,
    resizeMode:'center',
    
  },
  genres:{
    flexDirection:'row',
    marginTop:10,
    flexWrap:'wrap'

  },

});
