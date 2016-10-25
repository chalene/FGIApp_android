'use strict';
import React, { Component } from 'react';
import {
  TabBarIOS,  //IOS only
  StatusBarIOS,
  Text,  
  StyleSheet,    
  Image,
  View,
} from 'react-native';

import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons'; //ios only
import Store from './store';
import User from './user';
import Order from './order';
import Update from './update';
import TabNavigator from 'react-native-tab-navigator';
//import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
//import WeixinTabBar from './WeixinTabBar';
  
const TabNavigatorItem = TabNavigator.Item;  
  
const TAB_NORMAL_1=require('./image/icon_bottomtag_home_n.png');  
const TAB_NORMAL_2=require('./image/icon_bottomtag_market_n.png');  
const TAB_NORMAL_3=require('./image/icon_bottomtag_cart_n.png');  
const TAB_NORMAL_4=require('./image/icon_bottomtag_me_n.png');  
  
const TAB_PRESS_1=require('./image/icon_bottomtag_home_s.png');  
const TAB_PRESS_2=require('./image/icon_bottomtag_market_s.png');  
const TAB_PRESS_3=require('./image/icon_bottomtag_cart_s.png');  
const TAB_PRESS_4=require('./image/icon_bottomtag_me_s.png');  
/**
 * isFirstTime:
 *   -true. Only User tab is enabled. User needs to fill
 *   out the info before using other functions.
 *   -false. fully functioned. 
 */

class Bar extends Component{
  static defaultProps = {
    isFirstTime: "0"
  };

  static propTypes = {
    uid: React.PropTypes.string.isRequired,
    isFirstTime: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.isFirstTime==="1"? '我的帐户':'华大商城',
      isFirstTime: this.props.isFirstTime==="1"? true: false,
    };
  }

  componentDidMount() {
    //StatusBarIOS.setStyle(0);
  }



//   _changeTab(tabName) {
//     if (!this.state.isFirstTime) {
//       this.setState({
//         selectedTab: tabName,
//       });
//     };
//   }

//   //ToolbarAndroid for android
//   //TabBarItem for IOS
//   render() {
//     // return (
//     //   <TabNavigator
//     //     tintColor="#1E868C">
//     //     <TabNavigator.Item
//     //       title="华大商城"
//     //       iconName="ios-home-outline"
//     //       selectedIconName="ios-home"
//     //       onPress={ () => this._changeTab('华大商城') }
//     //       selected={ this.state.selectedTab === '华大商城' }>
//     //       <Store uid={this.props.uid}/>
//     //     </TabNavigator.Item>
//     //     <Icon.ToolbarAndroid
//     //       title="推广动态"
//     //       iconName="ios-eye-outline"
//     //       selectedIconName="ios-eye"
//     //       onPress={ () => this._changeTab('推广动态') }
//     //       selected={ this.state.selectedTab === '推广动态'}>    
//     //       <Update uid={this.props.uid}/>
//     //     </Icon.ToolbarAndroid>
//     //     <Icon.ToolbarAndroid
//     //       title="全部订单"
//     //       iconName="ios-list-outline"
//     //       selectedIconName="ios-list"
//     //       onPress={ () => this._changeTab('全部订单') }
//     //       selected={ this.state.selectedTab === '全部订单'} >
//     //       <Order uid={this.props.uid}/>
//     //     </Icon.ToolbarAndroid>
//     //     <Icon.ToolbarAndroid
//     //       title="我的帐户"
//     //       iconName="ios-person-outline"
//     //       selectedIconName="ios-person"
//     //       onPress={ () => this._changeTab('我的帐户') }
//     //       selected={ this.state.selectedTab === '我的帐户'} >
//     //       <User uid={this.props.uid} isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}/>
//     //     </Icon.ToolbarAndroid>
//     //   </TabNavigator>
//     // );
//     return (
//     <TabNavigator>
//       <TabNavigatorItem
//         selected={this.state.selectedTab === '华大商城'}
//         renderIcon={()=><Image style={styles.tabIcon} source={TAB_NORMAL_1}/>}
//         renderSelectedIcon={()=><Image style={styles.tabIcon} source={TAB_PRESS_1}/>}
//         selectedTitleStyle={{color:'#f85959'}} 
//         title="华大商城"
//         onPress={() => this.setState({ selectedTab: '华大商城' })}>
//         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>华大商城</Text></View>
//         <Store uid={this.props.uid}/>
//       </TabNavigatorItem>
//       <TabNavigatorItem
//         selected={this.state.selectedTab === '推广动态'}
//         title="推广动态"
//         renderBadge={()=>true?<View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View>:null} 
//         onPress={() => this.setState({ selectedTab: '推广动态' })}>
//         <Update uid={this.props.uid}/>
//       </TabNavigatorItem>
//       <TabNavigatorItem
//         selected={this.state.selectedTab === '全部订单'}
//         title="全部订单"
//         onPress={() => this.setState({ selectedTab: '全部订单' })}>
//         <Order uid={this.props.uid}/>
//       </TabNavigatorItem>
//       <TabNavigatorItem
//         selected={this.state.selectedTab === '我的帐户'}
//         title="我的帐户"
//         onPress={() => this.setState({ selectedTab: '我的帐户' })}>
//         <User uid={this.props.uid} isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}/>
//       </TabNavigatorItem> 
//     </TabNavigator>
//     );
//   }
// }

/** 
  tab点击方法 
  **/  
  onPress(tabName){  
    if(tabName){  
      this.setState(  
        {  
          selectedTab:tabName,  
        }  
      );  
    }  
  }  
   /** 
   渲染每项 
   **/  
   renderTabView(title,tabName,tabContent,isBadge){  
     var tabNomal;  
     var tabPress;  
     var navigatorview;
     switch (tabName) {  
       case '华大商城':  
         tabNomal=TAB_NORMAL_1;  
         tabPress=TAB_PRESS_1; 
         navigatorview=<Store uid={this.props.uid}/>;
         break;  
     case '推广动态':  
       tabNomal=TAB_NORMAL_2;  
       tabPress=TAB_PRESS_2;
       navigatorview=<Update uid={this.props.uid}/>;
       break;  
     case '全部订单':  
       tabNomal=TAB_NORMAL_3;  
       tabPress=TAB_PRESS_3; 
       navigatorview=<Order uid={this.props.uid}/>;
       break;  
     case '我的帐户':  
       tabNomal=TAB_NORMAL_4;  
       tabPress=TAB_PRESS_4;
       navigatorview=<User uid={this.props.uid} isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}/>;
       break;  
       default:  
  
     }  
     return(  
       <TabNavigatorItem  
        title={title}  
        renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}  
        renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}  
        selected={this.state.selectedTab===tabName}  
        selectedTitleStyle={{color:'#f85959'}}  
        onPress={()=>this.onPress(tabName)}  
        renderBadge={()=>isBadge?<View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View>:null}  
       >  
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{tabContent}</Text>
        {navigatorview}
        </View> 
         
       </TabNavigatorItem>  
     );  
   }  
  
   /** 
   自定义tabbar 
   **/  
  tabBarView(){  
    return (  
      <TabNavigator  
       tabBarStyle={styles.tab}  
      >  
      {this.renderTabView('华大商城','华大商城','华大商城',false)}  
      {this.renderTabView('推广动态','推广动态','推广动态',true)}  
      {this.renderTabView('全部订单','全部订单','全部订单',false)}  
      {this.renderTabView('我的帐户','我的帐户','我的帐户',false)}  
      </TabNavigator>  
    );  
  }  
  
  
  render() {  
    var tabBarView=this.tabBarView();  
    return (  
      <View style={styles.container}>  
        {tabBarView}  
      </View>  
    );  
  }  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#F5FCFF',  
  },  
  welcome: {  
    fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
  },  
  instructions: {  
    textAlign: 'center',  
    color: '#333333',  
    marginBottom: 5,  
  },  
  tab:{  
    height: 52,  
    alignItems:'center',  
    backgroundColor:'#f4f5f6',  
  },  
  tabIcon:{  
    width:25,  
    height:25,  
  },  
  badgeView:{  
    width:22,  
    height:14 ,  
    backgroundColor:'#f85959',  
    borderWidth:1,  
    marginLeft:10,  
    marginTop:3,  
    borderColor:'#FFF',  
    alignItems:'center',  
    justifyContent:'center',  
    borderRadius:8,  
  },  
  badgeText:{  
    color:'#fff',  
    fontSize:8,  
  }  
});  
  

module.exports = Bar;
