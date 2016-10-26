'use strict';

import React, { Component } from 'react';
import { 
  //NavigatorIOS,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBarIOS,
  SegmentedControlIOS,
  RefreshControl,
  Text,
  Image,
  ScrollView,
  View,
  AsyncStorage,
  ActivityIndicator,
  AlertIOS
} from 'react-native';

import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { BlurView, VibrancyView } from 'react-native-blur';
import ItemOrder from './itemOrder';

// Configuration file
import { url } from '../config';

/**
 * Store
 * - StoreView 
 *   - Store Items 
 *     - ItemDetail
 *       - ItemOrder
 *         - Alipay
 *         
 * @important
 * (Pictures are for demo purpose only! 
 * with 3 deomos, find your own pics! I don't have the copyright
 * to those pics. Find your own pics and replace with current ones.)
 */

/**
 * storeItemData
 * @static 
 * List of all services. 
 * 
 * Data Flow
 * sotreItemData -> Store -> StoreItems 
 * StoreItems -> sotreItemData{key} -> ItemOrder        
 */

const storeItemData=[{
  title:"DNA档案",
  star: 5,
  key: "djsfhkfjdhskf",
  img: "store1",
  price: 1200,
  type:"司法类／非司法类",
  deliver:"免运费",
  tag:"特价优惠",
  lines: 4,
  orderItem: "0",
  orderID:"",
  relation:[{label: "父亲",value:"f"},{label:"母亲",value:"m"},{label: "爷爷",value:"ff"},{label:"奶奶",value:"mm"},{label: "外公",value:"f"},{label:"外婆",value:"m"}],
  sample:[{label: "血液",value:"f"},{label:"。。。",value:"m"}],
  fullIntro:"华大DNA服务提供的DNA档案是用DNA技术建立一个人的基因组图谱，主要用于银行、保险、交通行业、人身安全、人身担保、遗产继承、失踪、急救医学等目的。人身担保、遗产继承、失踪、急救医学等目的。",
  intro:"华大DNA服务提供的DNA档案是用DNA技术建立一个人的基因组图谱，主要用于银行、保险、交通行业、人身安全、人身担保",
  detailImg: require("./img/detail1.jpg"),
  detailImgRatio: 3.52, //actual img height/width
  reviews:[{key:1,user:"用户1***",date:"2016-02-13",review:"★★★★☆"},{key:2,user:"用户2***",date:"2016-01-12",review:"★★★★★"}],
  sales:[{key:1,user:"用户1***",date:"2016-02-13",price:"¥1200"},{key:2,user:"用户2***",date:"2016-01-12",price:"¥1200"}],
},{
  title:"亲子鉴定",
  star: 4,
  key: "sgahdgaskhdaks",
  img: "store3",
  price: 1800,
  type:"司法类／非司法类",
  deliver:"免运费",
  tag:"特价优惠",
  lines:4,
  orderItem: "1",
  orderID:"",
  relation:[{label: "父亲",value:"f"},{label:"母亲",value:"m"}],
  sample:[{label: "血液",value:"f"},{label:"。。。",value:"m"}],
  fullIntro: "亲子鉴定服务可以判定谁是孩子的亲生父亲或者生物学父亲，即鉴定父与子的血缘关系。华大DNA提供法医亲子鉴定、家庭亲子鉴定以及妊娠亲子鉴定三大服务，以满足客户的不同需求。",
  intro:"亲子鉴定服务可以判定谁是孩子的亲生父亲或者生物学父亲，即鉴定父与子的血缘关系",
  detailImg: require("./img/detail1.jpg"),
  detailImgRatio: 3.52, //actual img height/width
  reviews:[{key:1,user:"用户1***",date:"2016-02-13",review:"★★★★☆"},{key:2,user:"用户2***",date:"2016-01-12",review:"★★★★★"}],
  sales:[{key:1,user:"用户1***",date:"2016-02-13",price:"¥1200"},{key:2,user:"用户2***",date:"2016-01-12",price:"¥1200"}],
},{
  title:"DNA家谱",
  star: 4,
  key:"dsjfhlfuiurei",
  img: "store2",
  price: 3200,
  type:"司法类／非司法类",
  deliver:"免运费",
  tag:"特价优惠",
  lines: 4,
  orderItem: "2",
  orderID:"",
  relation:[{label: "父亲",value:"f"},{label:"母亲",value:"m"}],
  sample:[{label: "血液",value:"f"},{label:"。。。",value:"m"}],
  fullIntro:"华大DNA服务提供源自同一父系或母系的成员之间的亲缘关系鉴定，例如曾祖父、祖父、与孙子、曾孙子之间，同胞兄弟之间，叔侄之间，外曾祖母，外祖母，与外孙女，之间的关系鉴定，绘制父系或母系家谱和遗传关系。",
  intro:"华大DNA服务提供源自同一父系或母系的成员之间的亲缘关系鉴定，例如曾祖父、祖父、与孙子、曾孙子之间，同胞兄弟之间，叔侄之间",
  detailImg: require("./img/detail1.jpg"),
  detailImgRatio: 3.52, //actual img height/width
  reviews:[{key:1,user:"用户1***",date:"2016-02-13",review:"★★★★☆"},{key:2,user:"用户2***",date:"2016-01-12",review:"★★★★★"}],
  sales:[{key:1,user:"用户1***",date:"2016-02-13",price:"¥1200"},{key:2,user:"用户2***",date:"2016-01-12",price:"¥1200"}],
}]

class ItemDetail extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    uid: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  _onPress = (data) => {
    this.props.navigator.push({
      title: "填写订单",
      component:ItemOrder,
      navigationBarHidden: false,
      passProps: { data: data, uid: this.props.uid},
    })
  };

  _onChange = (event) => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  };

  _renderDetail = () => {
    if (this.state.selectedIndex==0) {
      const images = this.props.data.detailImg.map((image, index) => {
        return <Image key={index} source={{uri:image.img}} style={{height: (Util.size.width-40) * image.imgRatio, width: Util.size.width-40, resizeMode: Image.resizeMode.contain}}></Image>;
      });
      return(
        <View style={{paddingTop:10, alignItems: 'center'}}>
          {images}
        </View>
      )
    }else{
      const sales = this.props.data.sales.map((elem) => {
        return(
          <View key={elem.key} style={styles.reviews}>
            <Text style={{flex:2,paddingLeft:10,alignItems:"center"}}>{elem.user}</Text>
            <Text style={{flex:3,paddingLeft:10,alignItems:"center"}}>{elem.date}</Text>
            <Text style={{flex:3,paddingLeft:10,alignItems:"center"}}>{elem.price}</Text>
          </View>
        )
      })
      return(
        <View style={{marginTop:10}}>
          {sales}
        </View>
      );
    }
  };



  render() {
    const {data} = this.props;
    let star = '★'.repeat(data.star) + '☆'.repeat(5-data.star);
    return(
      <ScrollView showsVerticalScrollIndicator={false} style={styles.detailContainer}>
        <View style={styles.detailImg}>
          <View style={styles.bgImageWrapper}>
            <Image source={{uri:data.img}} style={styles.backgroundImage}>
                <View style={{paddingTop: 70, paddingLeft: 30,}}>
                  <Text style={{color:"rgba(255,255,255,0.7)",fontSize:28}}>{data.title}</Text>
                  <Text style={{color:"rgba(255,255,255,0.7)",fontSize:15,marginTop:5}}>{star}</Text>
                  <View style={styles.detailPrice}>
                    <Text numberOfLines={data.lines} style={{color:"rgba(255,255,255,0.7)",fontSize:20}}>¥ {data.price}</Text>
                  </View>
                  <View style={{flexWrap:"wrap",width:Util.size.width-60,flexDirection:"row",marginTop:10}}>
                    <Icon color="rgba(255,255,255,0.7)" size={15} style={{paddingRight:15}} name="dot-circle-o"> <Text>{data.type}</Text></Icon>
                    <Icon color="rgba(255,255,255,0.7)" size={15} style={{paddingRight:15}} name="shopping-bag"> <Text>{data.deliver}</Text></Icon>
                    <Icon color="rgba(255,255,255,0.7)" size={15} style={{paddingRight:15}} name="tags"> <Text>{data.tag}</Text></Icon>
                  </View>
                </View>
            </Image>
            <View style={styles.noblur}>
              <Text numberOfLines={data.lines} style={{fontSize:12,color:"rgba(0,0,0,0.5)",flex:1}}>{data.fullIntro}</Text>
            </View>
            <View style={styles.placeorderContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onPress(data)} style={styles.placeorder}><Text style={{color:"rgba(0,0,0,0.4)"}}>填写订单</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
          <SegmentedControlIOS 
          values={['产品详情']} 
          tintColor="#888" 
          selectedIndex={0}
          onChange={this._onChange}/>
          {this._renderDetail()}      
        </View>
      </ScrollView>
    )
  }
}


class StoreItemList extends Component{
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    uid: React.PropTypes.string.isRequired,
  };

  _onPress = (index) => {
    const data = this.props.data[index];
    this.props.navigator.push({
      title: data.title,
      component:ItemDetail,
      navigationBarHidden: false,
      passProps: { data: data, uid: this.props.uid },
    })
  };

  render() {
    const data = this.props.data;
    let star = '';
    const StoreItems = data.map((elem,index) => {
      star = '★'.repeat(elem.star) + '☆'.repeat(5-elem.star)
      return (
        <TouchableHighlight style={{marginBottom: 5, width: Util.size.width}}  key={elem.key} onPress={()=>this._onPress(index)}>
          <View style={styles.storeItemContainer}>
            <View style={styles.bgImageWrapper}>
              <Image style={styles.backgroundImage} source={{uri:elem.img}}></Image>
            </View>
            <View style={styles.itemDrop}>
              <View style={styles.itemText1}>
                <Text style={styles.itemTitle}>{elem.title}</Text>
                <Text style={styles.itemStar}>{star}</Text>
                <Text style={styles.itemInfo}> ¥ {elem.price}</Text>
              </View>
              <View style={styles.itemText2}>
                <Text numberOfLines={2} style={styles.itemIntro}>{elem.intro}</Text>
              </View>
            </View>
            <Icon style={styles.itemNav} name="angle-right" size={35}></Icon>
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <View style={{flex:1}}>
        {StoreItems}
      </View>
    );
  }

}

//class StoreView extends Component{
export default class extends Component{
  static propTypes = {
    uid: React.PropTypes.string.isRequired,
  }

  constructor(props){
    super(props);
    this.state = {
      animating: true,
      ready: false
    };
    AsyncStorage.getItem("version").then(version => {
      if (!version) {
        version = 0;
      }
      Util.post(`${url}/products/`, {'version':  version}, (resData) => {
        if (resData.error) {
          console.log('error');
          AlertIOS.alert("网络错误", "请联网后重新开启app");
          this.setState({
            ready: false,
            animating: false
          })
        } else {
          // need to be updated
          if (resData.data) {
            this.setState ({
              // isRefreshing: false,
              // loaded: 0,
              rowData: resData.data,
              ready: true,
              animating: false
              // refreshTitle: "下拉更新",
            });
            AsyncStorage.setItem('version', resData.version.toString());
            AsyncStorage.setItem('products', JSON.stringify(resData.data));
          } else {
            // just use cache
            AsyncStorage.getItem('products').then(data => {
              this.setState ({
                // isRefreshing: false,
                // loaded: 0,
                rowData: JSON.parse(data),
                ready: true,
                animating: false
                // refreshTitle: "下拉更新",
              });
            });
          } 
        }
      });

    });
    
  }

  // _onRefresh() {
  //   this.setState({
  //     isRefreshing: true,
  //     refreshTitle: "正在更新"
  //   });
  //   setTimeout(() => {
  //     // get new data via SSH
  //     this.setState({
  //       // loaded: this.state.loaded,
  //       isRefreshing: false,
  //       rowData: storeItemData,
  //       refreshTitle: "更新完毕"
  //     });
  //     // 1s after refresh
  //     setTimeout(() => {
  //       this.setState({
  //         refreshTitle: "下拉更新"
  //       });
  //     }, 1000);

  //   }, 1000);
  // }

  render() {
    var content;
    if (!this.state.ready) {
      content = <View></View>;
    } else {
      content = <StoreItemList navigator={this.props.navigator} uid={this.props.uid} data={this.state.rowData}></StoreItemList>;
    }
    return(
      <ScrollView showsVerticalScrollIndicator={false} style={styles.storeContainer}>
        {content}
        <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
        />
      </ScrollView>
    )
  }

}

// export default class extends Component{
//   static propTypes = {
//     uid: React.PropTypes.string.isRequired,
//   };

//   componentDidMount() {
//     //StatusBarIOS.setStyle(0);
//   }

//   render(){
//     return (
//       <Navigator
//       ref='nav'
//       style={styles.container}
//       initialRoute={{
//         title:"华大商城",
//         component: StoreView,
//         passProps:{uid:this.props.uid},
//         shadowHidden: true
//       }}
//       renderScene={ ( route, navigator ) => StoreView }
//       itemWrapperStyle={styles.itemWrapper}
//       tintColor="#777"/>
//     );
//   }
// }

/**
 * responsive
 *
 * @iphone5/5s ratio=2
 * 
 */
let responsive = {};

if (Util.ratio === 2 ) {
  responsive = {
    noblurT: 180,
    placeorderContainerB:17
  }
}else{
  responsive = {
    noblurT:170,
    placeorderContainerB:25
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#eaeaea'
  },
  storeContainer:{

  },
  storeItemContainer:{
    height: 100,
    flex: 1
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  itemDrop:{
    flex: 1,
    height: 100,
    backgroundColor:"rgba(0,0,0,0.15)"
  },
  itemText1:{
    position: "absolute",
    left: 20,
    top: 15,
    flexDirection: "row",
  },
  itemIntro:{
    color:"#ddd",
    flex: 1,
    fontSize: 10
  },
  itemText2:{
    position: "absolute",
    flexWrap:"wrap",
    width: Util.size.width-40,
    left: 20,
    top: 60,
    flexDirection: "row"
  },
  itemTitle:{
    fontSize: 30,
    color: "#ddd",
  },
  itemStar:{
    fontSize: 13,
    color: "#ddd",
    marginTop:17,
    marginLeft:20
  },
  itemInfo:{
    fontSize: 13,
    color: "#ddd",
    marginTop:16,
    marginLeft: 20
  },
  itemNav:{
    position:"absolute",
    top:30,
    right:10,
    color: "rgba(255,255,255,0.7)",
    backgroundColor:"transparent"
  },
  detailContainer:{
    flex:1,
    position:"relative",
    top: -50,
  },
  detailImg:{
    height:300
  },
  blur:{
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor:"rgba(0,0,0,0.15)"
  },
  noblur:{
    flexWrap:"wrap",
    position:"absolute",
    width: Util.size.width-60,
    top:responsive.noblurT,
    left: 30,
    backgroundColor:"transparent"
  },
  detailPrice:{
    position:"absolute",
    top:95,
    right: 30,
    backgroundColor:"transparent"
  },
  placeorderContainer:{
    alignItems:'center',
    position:"absolute",
    bottom:responsive.placeorderContainerB,
    width:Util.size.width,
    flex:1
  },
  placeorder:{
    width:200,
    height:30,
    backgroundColor:"rgba(255,255,255,0.3)",
    justifyContent:"center",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth:0.3,
    borderRadius:4,
    flex:1,
    alignItems:'center'
  },
  reviews:{
    alignItems:"center",
    flexDirection:"row",
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#bbb",
    paddingLeft:10
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});


