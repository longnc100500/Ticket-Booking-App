import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  DrawerItems,

} from 'react-navigation-drawer';
import NowPlayingList from './Main Screen/NowPlayingList';
import SaleList from './Main Screen/SaleList';

import UpcomingList from './Main Screen/UpcomingList';
import UserProfile from './Main Screen/UserProfile';
import LoginScreen from './Login Screen/LoginScreen';
import SingUp from './Login Screen/SingUp';

import MovieDetails from './Details/MovieDetails';
import Booking from './Details/Booking';
import Bill from './Details/Bill';
import AppInfor from './Main Screen/AppInfor';

const CustomDrawerComponent = props => (
  
  <SafeAreaView style={{ flex: 1 }}>
   
    <View style={{ backgroundColor: '#4A148C', height: 150,flexDirection:'column',alignItems:'center',justifyContent:'center' }} >
    <Image
      source={require('./Image/userImage.png')}
      style={{width:80,height:80,tintColor:'white'}}
    />
      <Text style={{color:'white',fontWeight:'bold',textAlign:'center',fontSize:10}}>{props.navigation.state.params.name}</Text>
    </View>
    <ScrollView style={{backgroundColor:'black'}}>
      <DrawerItems {...props} navigation={props.navigation}/>
      
    </ScrollView>
  </SafeAreaView>
);

const tabNavigator = createMaterialTopTabNavigator(
  {
    Upcoming: {
      screen: UpcomingList,
      navigationOptions: {
        title: 'Upcoming',
      },
    },
    NowPlaying: {
      screen: NowPlayingList,
      navigationOptions: {
        title: 'Upcoming',
      },
    },
    Sale: {
      screen: SaleList,
      navigationOptions: {
        title: 'Upcoming',
      },
    },
  },
  {
    swipeEnabled: true,
    //navigationOptions: {
    //title:'hello',
    //},
    tabBarPosition: 'bottom',
    tabBarOptions: {
      //activeTintColor: '#6239B9',
      //inactiveTintColor:'#C6C5C9',
      activeTintColor: '#6239B9',
      inactiveTintColor: 'white',
      showIcon: true,
      tabStyle: { backgroundColor: '#0F0523', marginBottom: 2, height: 55 },
      indicatorStyle: { backgroundColor: '#6239B9' },
      labelStyle: { fontSize: 10 },
      style: { backgroundColor: '#0F0523' },
    },
  }
);
const drawerNavigator = createDrawerNavigator(
  
  {
    HomeScreen: 
    
    {
      
      screen: tabNavigator,
      
      navigationOptions : {
        title: 'Home',
        
      }
    },
    Profile: { screen: UserProfile,
      navigationOptions : {
        
        title: 'User Profile',
        
      },
    },
    Infomation: {
      screen: AppInfor,
      navigationOptions : {
        title: 'App Information',
      }
    },
  },
  {
    
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      inactiveTintColor: 'orange',
      activeTintColor:'white',
      
    },
    navigationOptions: {header:null,},
   
    
  }
);
const styles = StyleSheet.create({
  searchBar:{
    height:30,
    width: Dimensions.get('window').width * 0.7,
    color:'white',
    borderColor:'lightgray',
    borderRadius:20,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
  
  }
  
  });
  const AppNavigator = createStackNavigator({
    
    Default: { screen:LoginScreen,
    navigationOptions: {header:null,},
     },
    
    SingUpScreen: { screen: SingUp },
    SlideMenu: {
      screen: drawerNavigator,
      
      navigationOptions: {
        header:null
      },
    },
    upComingDetails:{
      screen: MovieDetails,
      navigationOptions: {header:null},
    },
    bookingDetails:{
      screen:Booking,
      navigationOptions: {header:null},
    },
    releaseBill:{
      screen:Bill,
      navigationOptions: {header:null},
    }
  });
export default createAppContainer(AppNavigator);