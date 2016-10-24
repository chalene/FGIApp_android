'use strict';
import React, { Component } from 'react';
import {
  TabBarIOS,  //IOS only
  StatusBarIOS,
  Text,
  View} from 'react-native';

import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons'; //ios only
import Store from './store';
import User from './user';
import Order from './order';
import Update from './update';
import TabNavigator from 'react-native-tab-navigator';


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

  _changeTab(tabName) {
    if (!this.state.isFirstTime) {
      this.setState({
        selectedTab: tabName,
      });
    };
  }

  //ToolbarAndroid for android
  //TabBarItem for IOS
  render() {
    // return (
    //   <TabNavigator
    //     tintColor="#1E868C">
    //     <TabNavigator.Item
    //       title="华大商城"
    //       iconName="ios-home-outline"
    //       selectedIconName="ios-home"
    //       onPress={ () => this._changeTab('华大商城') }
    //       selected={ this.state.selectedTab === '华大商城' }>
    //       <Store uid={this.props.uid}/>
    //     </TabNavigator.Item>
    //     <Icon.ToolbarAndroid
    //       title="推广动态"
    //       iconName="ios-eye-outline"
    //       selectedIconName="ios-eye"
    //       onPress={ () => this._changeTab('推广动态') }
    //       selected={ this.state.selectedTab === '推广动态'}>    
    //       <Update uid={this.props.uid}/>
    //     </Icon.ToolbarAndroid>
    //     <Icon.ToolbarAndroid
    //       title="全部订单"
    //       iconName="ios-list-outline"
    //       selectedIconName="ios-list"
    //       onPress={ () => this._changeTab('全部订单') }
    //       selected={ this.state.selectedTab === '全部订单'} >
    //       <Order uid={this.props.uid}/>
    //     </Icon.ToolbarAndroid>
    //     <Icon.ToolbarAndroid
    //       title="我的帐户"
    //       iconName="ios-person-outline"
    //       selectedIconName="ios-person"
    //       onPress={ () => this._changeTab('我的帐户') }
    //       selected={ this.state.selectedTab === '我的帐户'} >
    //       <User uid={this.props.uid} isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}/>
    //     </Icon.ToolbarAndroid>
    //   </TabNavigator>
    // );
    return (
    <TabNavigator>
      <TabNavigator.Item
        selected={this.state.selectedTab === '华大商城'}
        title="华大商城"
        onPress={() => this.setState({ selectedTab: '华大商城' })}>
        <Store uid={this.props.uid}/>
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={this.state.selectedTab === '推广动态'}
        title="推广动态"
        onPress={() => this.setState({ selectedTab: '推广动态' })}>
        <Update uid={this.props.uid}/>
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={this.state.selectedTab === '全部订单'}
        title="全部订单"
        onPress={() => this.setState({ selectedTab: '全部订单' })}>
        <Order uid={this.props.uid}/>
      </TabNavigator.Item>
      <TabNavigator.Item
        selected={this.state.selectedTab === '我的帐户'}
        title="我的帐户"
        onPress={() => this.setState({ selectedTab: '我的帐户' })}>
        <User uid={this.props.uid} isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}/>
      </TabNavigator.Item>
    </TabNavigator>
    );
  }
}

module.exports = Bar;
