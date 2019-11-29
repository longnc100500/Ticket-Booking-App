import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
ImageBackground,
} from 'react-native';
import CardView from 'react-native-cardview';
import { DrawerActions } from 'react-navigation-drawer';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 120;

export default class NowPlaying extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Now Playing',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../Image/movie.png')}
        //source={require('../Image/movie.jpg')}
        style={{ tintColor: tintColor, width: 20, height: 20 }}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    const {navigation}=this.props;
    const url =
      'https://api.themoviedb.org/3/movie/now_playing?api_key=b5d5cdc41bceae3132ead55454bde93c&language=en-US&page=1';
    this.state = { dataSource: [] };
  }
  componentDidMount() {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=b5d5cdc41bceae3132ead55454bde93c&language=en-US&page=2'
    )
      .then(response => response.json())

      .then(data => this.setState({ dataSource: data.results }));
  }
  filterSearch(text){
    var arr=[];
    if(text=='')
    this.componentDidMount()
    else{
    if(this.state.dataSource!=undefined)
    {
      
      let checkText=text.toUpperCase();
      
      this.state.dataSource.forEach(element => {
        const beCheck=element.title.toUpperCase();
        console.log(beCheck);
        if(beCheck.indexOf(checkText)>-1)
        {
          arr.push(element);
        }
      });
      
      this.setState({dataSource:arr});
    }
    else
     { 
       return undefined;
     }
    }
  }
  checkAudult(bol)
  {
    if(bol!=undefined)
    {
      if(bol==true)
      {
        return 'Yes';
      }
      else
      return 'No';
    }
    else
    return 'No';
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
  render() {
    
    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: ['#6A1B9A', '#4A148C'],
        extrapolate: 'clamp'
      });
    return (
      <View style={{flex:1,flexDirection: 'column',backgroundColor:'white',
      alignItems: 'center',
      justifyContent:'center',}}>
        <View style={styles.innerBox}>
          <View style={styles.oval}></View>
          <View
          style={{
          width: 200,
          height: 200,
          backgroundColor:'white',
          borderRadius:150,
          borderWidth:2,borderColor:'#4A148C',
          marginBottom:20,
          }}
          ></View>
          <View
          style={{
          width: 200,
          height: 200,
          backgroundColor:'white',
          borderRadius:150,
          borderWidth:2,borderColor:'#4A148C',
          marginTop:'50%',
          marginRight:'50%',
          }}
          ></View>
        </View>
        <FlatList
         
         contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
         scrollEventThrottle={16}
         onScroll={Animated.event(
           [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
         )}
         
         style={styles.container}
         data={this.state.dataSource}
         enableEmptySections={true}
         renderItem={itemData => {
           return (
             <View style={styles.buttonFilm}
            
             
             >
               <View style={styles.row}>
                 
               
                 <View style={styles.filmBox}>
                  <View style={styles.imageView}>
                 <Image
                   style={styles.image}
                   source={{
                     uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                       itemData.item.poster_path
                     }`,
                   }}
                 /></View>
                   <View style={styles.inforBox}>
                   <Text
                     style={
                       (styles.title, { fontSize: 20, color: '#8B00DD',fontWeight:'bold' })
                     }>
                     {itemData.item.title}
                   </Text>
                    <View style={{flexDirection:'row'}}>
                       {this.vote(itemData.item.vote_average)}
                    </View>
                   
                   <Text style={styles.title}>18+: {this.checkAudult(itemData.item.adult)}</Text>
                   </View>
                   <View style={styles.bookView}>
                   <TouchableOpacity style={styles.bookButton}
                     onPress={()=>this.props.navigation.navigate('bookingDetails',{movieID:itemData.item.id})}
                   >
                     <Image style={{width:50,height:50,tintColor:'#4A148C'}}
                     source={require('../Image/add.png')}
                     />
                   </TouchableOpacity>
                   </View>
                 </View>
                 
                 </View>
                 
              
             </View>
           );
         }}
       />
     
         
       
        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: headerBackgroundColor }]}>
        <TextInput style={styles.searchBar}
          onChangeText={(text)=>this.filterSearch(text)}
          placeholder='Filter'
          placeholderTextColor='white'
          />

        </Animated.View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF10',
    
  },
  title: {
    fontSize: 10,
    color: '#8B00DD',
  },
  image: {
    flex: 1,
    borderRadius: 10,
    height: Dimensions.get('window').width*0.35,
    width:Dimensions.get('window').width*0.35,
    resizeMode:'cover',
   
   
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
   
    height: Dimensions.get('window').height * 0.28,
    width: Dimensions.get('window').width,
   
    
  },
  buttonFilm: {
    height: Dimensions.get('window').height * 0.28,
    width: Dimensions.get('window').width,
  
    //elevation: 3,
    
    borderRadius: 20,
 
  },
  buttonFilmText: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 5,
    position:'absolute',
    bottom:0,right: 0,
    backgroundColor:'red',
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: (Platform.OS == 'ios') ? 20 : 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection:'row',
    
  },
  headerText: {
    color: 'white',
    fontSize: 22
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: 'black',
    fontSize: 16
  },
  searchBar:{
    width:200,
    height:40,
    
    opacity:0.5,
    borderRadius:20,
    borderWidth:1,
    width: Dimensions.get('window').width * 0.7,
    borderColor:'white',
  },
  filmBox:{
    borderRadius:10,
    position:'absolute',
    bottom:0,
    right:5,
    height: Dimensions.get('window').height * 0.22,
    width: Dimensions.get('window').width * 0.7,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    elevation:10,

  },
  inforBox:{
    position:'absolute',
    left:'20%',
    maxWidth:Dimensions.get('window').width * 0.5,
    
    
  },
  replace:{
    flexDirection: 'column',
    flex: 1,
    marginLeft: 5,
    backgroundColor:'red',
  },
  innerBox:{
    position:'absolute',
    marginVertical:Dimensions.get('window').height,
    width: Dimensions.get('window').width*3,
    height: Dimensions.get('window').height*0.6,
    backgroundColor:'#4A148C',
    rotation:120,
    //justifyContent:'flex-end',
    alignItems:'center',
    
  },
  oval:{
    width: 200,
    height: 200,
    backgroundColor:'white',
    borderRadius:150,
    marginRight:Dimensions.get('window').width,
    marginTop:Dimensions.get('window').width/3,
    
  },
  imageView:{
    flex: 2,
    borderRadius: 10,
    height: Dimensions.get('window').width*0.35,
    width:Dimensions.get('window').width*0.35,
    resizeMode:'cover',
    position:'absolute',
    top:'-20%',
    left:'-37%',
    backgroundColor:'#4A148C',
    elevation:20,
  },
  bookButton:{
    width:50,
    height:50,
  },
  bookView:{
    width:50,
    height:50,
    position:'absolute',
    right: 20,
    bottom:20,
    elevation:10,
    borderRadius:25,
  }
});