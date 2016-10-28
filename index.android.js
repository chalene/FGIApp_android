/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  //StatusBarIOS,
} from 'react-native';

import Login from './view/login';
import Signup from './view/signup';
import Bar from './view/bar';
import Util from './view/utils';

const updateData = [
  {
    title:"推广消息的标题1",
    date: "2016-02-18",
    link: "www.google.com",
    key:0,
    img: require('./view/img/chip.jpg'), //just pass the url
  },{
    title:"推广消息的标题2",
    date: "2016-02-19",
    link: "www.google.com",
    key:1,
    img: require('./view/img/forensics.jpg'),
  },
];


export default class FGIApp extends Component {
//class FGIApp extends Component {
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.welcome}>
  //         Welcome to React Native!
  //       </Text>
  //       <Text style={styles.instructions}>
  //         To get started, edit index.android.js
  //       </Text>
  //       <Text style={styles.instructions}>
  //         Double tap R on your keyboard to reload,{'\n'}
  //         Shake or press menu button for dev menu
  //       </Text>
  //     </View>
  //   );
  // }
  constructor() {
    super();
    
    //to check is logined
    // Util.get("http://dnafw.com:8100/iosapp/checkLogin?uid="+AsyncStorage.getItem('uid'),function(resData) {
    //     if (resData){
    //       AsyncStorage.setItem('uid', resData.uid);
    //       AsyncStorage.setItem('isFirstTime',resData.isFirstTime);
    //     }
    // })

    this.state = {
      isLogin: false,
      onSignup: false,
      isFirstTime: "0",
      uid: "",
      page: <View></View>,
    };

  }

  componentWillMount() {
    //StatusBarIOS.setStyle(1);
    this._renderPage();
  }

  _onStateChange = (newState) => {
    //login ,signup or logout
    this.setState(newState);
    this._renderPage();
  }

  _renderPage = () => {
    const _this = this;
    let content = null;
    AsyncStorage.getItem("uid").then((value) => {
      _this.setState({
        uid: value,
      });
      
    //   return AsyncStorage.getItem("isFirstTime");
    // }).then((value) => {
    //   this.setState({
    //     isFirstTime: value
    //   });

      return AsyncStorage.getItem("loginState");
    })
    .then((value) => {
      this.setState({
        isLogin: value=="1"? true:false,
      });
    })
    .done(()=>{
      let lsView = null;
      console.log(this.state);
      if (this.state.isLogin) {
        content = <Navigator
          //ref='navigator'
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          uid = {this.state.uid}
          initialRoute={{
            component: Bar,
            name: 'Bar',
            id:'Bar',
         }}
        />
      } else {
        if (this.state.onSignup) {
          lsView = <Signup
            isLogin={this.state.isLogin}
            onSignin={this.state.onSignin}
            callbackSignup={this._onStateChange.bind(this)}
          />
        } else {
          lsView = <Login
            isLogin={this.state.isLogin}
            onSignin={this.state.onSignin}
            callbackLogin={this._onStateChange.bind(this)}
          />
        }
        content = <View style={styles.container}>
          <Image source={require('./view/img/DNA1.png')} style={styles.bgImageWrapper}/>
          <View>
            <Image style={styles.logo} source={{uri:'dna15'}}></Image>
            <Text style={styles.logoText}>华大DNA</Text>
          </View>
          {lsView}
        </View>
      }  
      //update state in promise
      this.setState({
        page: content,
      });

    });

  }

  renderScene= (route, navigator) => {
    let Component = route.component

    
    if(route.id === 'Bar'){
      return (
        <Bar
          navigator={navigator} 
          route={route}
          data={updateData}
          uid={this.state.uid}
          isFirstTime={this.state.isFirstTime}
          callbackLogout={this._onStateChange.bind(this)}
        />
      );
    } else if (route.id === 'Product') {
      return (
        <Product
          name={route.name}
          onForward={() => {
            var nextIndex = route.index + 1;
            navigator.push({
              name: 'Scene ' + nextIndex,
              index: nextIndex,
            });
          }}
          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}
        />
      );
    } else {
      return (
        <Component navigator={navigator} route={route} />
      );
    }
  }

  configureScene= (route) => {
    if (route.name && route.name === 'Search') {
      return Navigator.SceneConfigs.FadeAndroid
    } else {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }
  }

  render() {
    return this.state.page;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
const styles = StyleSheet.create({
  container:{
    paddingTop:50,
    alignItems:'center',
    backgroundColor:"#222",
    height: Util.size.height,
    width: Util.size.width
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    height: Util.size.height,
    width: Util.size.width
  },
  logo:{
    width:70,
    height:70,
    resizeMode: Image.resizeMode.contain,
    marginBottom: 10
  },
  logoText:{
    color: "#fff",
    backgroundColor: "transparent",
    marginBottom:Util.ratio == 2? 40:50,
    fontSize: 16
  },
});

//AppRegistry.registerComponent('FGIApp', () => FGIApp);
AppRegistry.registerComponent('FGIApp', () => FGIApp);

