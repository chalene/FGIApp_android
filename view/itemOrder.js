'use strict';
import React, { Component } from 'react';
import { 
  AsyncStorage,
  //ProgressViewIOS,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  //AlertIOS,
  Alert,
  ScrollView,
  Text,
  View,
  findNodeHandle
} from 'react-native';

import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Alipay from './alipay';
import Form from 'react-native-form';
import ModalPicker from 'react-native-modal-picker';

import { url } from '../config';

/**
 * ItemOrder
 * @props data: storeItemData.key
 */  
  
/**
 * ItemOrderData
 * @dynamic based on the passed key; get init form1 and form2 value via SSH
 *   - form1
 *     - ...
 *   - form2
 *     - ...
 *   - orderID
 *   - price
 *   - userID 
 */

export default class extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    uid: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    let data = props.data;
    super(props);
    styles.form1={
    }
    styles.form2={
      width:0,
      height:0,
      opacity:0
    }
    styles.form3={
      width:0,
      height:0,
      opacity:0
    }
    /*
    const ItemOrderData ={
      orderID: "dsjhflsjdklcxsnkds", 
      price:1200, 
      userID:"fiorujewlknmwenfmsd",
      currentStep:0,
      form1:{
        name:"",
        phoneNum: "",
        email:"",
        address:""
      },
      form2:{

      }
   }
   */
   this.state = {
      progress: 0,
      title: data.title,
      step: 0,
      serviceKey: this.props.data,
      stepTitle: "第一步: 委托人／受检人信息",
      numOfTesters: 1,
      orderID: data.orderID,
      originPrice:data.price,
      price: data.price,
      userID: props.uid,
      samples:{},
      relations:{},
      form1:{
        name:"",
        phoneNum: "",
        email:"",
        address:""
      },
      form2:{

      }
    };
  }

  componentWillMount() {
    // let ItemOrderData ={};
    // Util.post("http://dnafw.com:8100/iosapp/init_order/",{
    //   uid: AsyncStorage.getItem("uid"),
    //   orderItem: this.props.data.orderItem,
    // },(resData) => {
    //     if (resData.ItemOrderData) {
    //       if (resData.error) {
    //          console.log("error")
    //       }else{
    //           ItemOrderData = resData.ItemOrderData
    //       }
    //     }else{
    //       AlertIOS.alert('创建订单失败', '服务器无响应');
    //     }
    // })
  }

  componentDidMount() {
    this._updateStep(this.state.step)
  }

  _getProgress (progress) {
    return Math.sin(progress % Math.PI) % 1;
  }

  _updateStep = (step) => {
    var title = '';
    this.setState({
      form1: this.refs.form1.getValues(),
      form2: this.refs.form2.getValues()
    })
    switch(step){
      case 0:
        title = "第一步: 委托人／受检人信息";
        styles.form1={
        }
        styles.form2={
          width:0,
          height:0,
          opacity:0
        }
        styles.form3={
          width:0,
          height:0,
          opacity:0
        }
        break;
      case 1: 
        title = "第二步：被鉴定人信息";
        styles.form2={
        }
        styles.form1={
          width:0,
          height:0,
          opacity:0
        }
        styles.form3={
          width:0,
          height:0,
          opacity:0
        }
        break;
      case 2: 
        var tempPrice = 0;
          // Update Price 
        switch (this.state.title){
          case "亲子鉴定":
          case "收养亲子鉴定":
          case "妊娠亲子鉴定": 
            if (this.state.numOfTesters > 2) {
              tempPrice = this.state.originPrice+(this.state.numOfTesters-2)*1000;
              Alert.alert("价格变动","被检测人数为"+this.state.numOfTesters);
            } else {
              tempPrice = this.state.originPrice; 
            }  
            break;
          case "DNA档案": 
            if (this.state.numOfTesters >1 ){
              tempPrice = this.state.originPrice+(this.state.numOfTesters-1)*this.state.originPrice;
              Alert.alert("价格变动","被检测人数为"+this.state.numOfTesters);
            } else {
              tempPrice = this.state.originPrice;
            }
            break;
          case "DNA家谱":
            if (this.state.numOfTesters >1 ){
              tempPrice = this.state.originPrice+(this.state.numOfTesters-1)*1000;
              Alert.alert("价格变动","被检测人数为"+this.state.numOfTesters);
            } else {
              tempPrice = this.state.originPrice;
            }
            break;
          default: tempPrice = this.state.originPrice;
            break;
        }
        
        for (var s in this.state.samples) {
          if (this.state.samples[s].slice(-1) === 'I') {
            if (this.state.samples[s].slice(-2 )=== 'II') {
              Alert.alert("价格变动",this.state.samples[s]);
              tempPrice = tempPrice+800;
            } else {
              tempPrice = tempPrice+400;
              Alert.alert("价格变动",this.state.samples[s]);
            }
          } else {
            tempPrice = tempPrice;
          }
        }
        this.setState({price:tempPrice});

        title = "第三步：创建订单"
        styles.form3={
        }
        styles.form1={
          width:0,
          height:0,
          opacity:0
        }
        styles.form2={
          width:0,
          height:0,
          opacity:0
        }
        break;
    }
    this.refs.scrollView.scrollTo({y: -20, animated:true});
    this.setState({
      step: step,
      stepTitle: title,
    });
  };

  _pay(data) {
    const info1 = this.refs.form1.getValues();
    const info = this.refs.form2.getValues();
    let valid = true;
    let error = '';


    //file in relations and samples 
    for (var i =1; i <= this.state.numOfTesters; i++) {
      if (this.state.relations[i] ===  "请选择"){
        valid = false;
        error = "关系为空";
      } else { 
        info['rel'+i] = this.state.relations[i];
      }
      if (this.state.samples[i] ===  "请选择"){
        valid = false;
        error = "样本类型为空";
      } else {
        info['sample'+i] = this.state.samples[i];
      }
    }

    // Alert.alert("传值检查1",this.refs.form2.rel1); //const
    // Alert.alert("传值检查1 1",info['rel'+1]); //changed yes

    //client information
    for (var key1 in info1) {
      if (info1[key1]==="" || info1[key1]===undefined) {
        valid = false;
        error = key1+"为空";
      }
    }
    
    for (var key in info) {
      if (key.substring(0,3) ==='msg'){
        if (info[key]==="" || info[key]===undefined) {
          info[key] = "-";
        }
      }
      if (info[key]==="" || info[key]===undefined || info[key]==="请选择") {
        valid = false;
        error = key+"为空";
      }
    }

    if (valid) {
      Util.post(`${url}/create_order/`,{
        form2:info,
        uid: this.props.uid,
        pay_price: this.state.price,
        form1:this.refs.form1.getValues(),
        //form2:this.refs.form2.getValues(),
        orderId: this.state.orderID,
        // should from create order
      },(resData) => {
        if (resData.error !== "true") {
            if (resData.message==="0") {
              Alert.alert('订单信息有误', resData.errMsg);
            }else{
              this.props.navigator.push({
                title: "支付宝付款",
                component:Alipay,
                navigationBarHidden: false,
                passProps: {...resData},
              })
            }
          }else{
            Alert.alert('服务器无响应', '请稍后再试');
          }
      })
    } else {
      Alert.alert('提交失败', error)
    }
  }


  _addTester() {
    this.setState({
      numOfTesters: this.state.numOfTesters+1,
    });
  }

  _refFocus(nextField,i) {
    this.refs[nextField+i].focus();
  }

  _inputFocused(refName) {
    /*
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50); */
  }

  _renderSecondFormItem = (index) => {
    let indexR = 0;
    const relationA = [
            { key: indexR++, section: true, label: '关系' },
            { key: indexR++, label: '爷爷' },
            { key: indexR++, label: '奶奶' },
            { key: indexR++, label: '外公' },
            { key: indexR++, label: '外婆' },
            { key: indexR++, label: '父亲' },
            { key: indexR++, label: '母亲' },
            { key: indexR++, label: '儿子' },
            { key: indexR++, label: '女儿' },
        ];
    let indexS = 0;
    const sampleA = [
            { key: indexS++, section: true, label: '样本类型' },
            { key: indexS++, label: '血液－常规检材' },
            { key: indexS++, label: '血痕－常规剪裁' },
            { key: indexS++, label: '毛发(带毛囊)－常规检材' },
            { key: indexS++, label: '口腔拭子－常规检材' },
            { key: indexS++, label: '羊水－特殊检材I' },
            { key: indexS++, label: '胎儿流产物－特殊检材I' },
            { key: indexS++, label: '绒毛组织－特殊检材I' },
            { key: indexS++, label: '精斑－特殊检材I' },
            { key: indexS++, label: '烟蒂－特殊检材I' },
            { key: indexS++, label: '牙刷－特殊检材I' },
            { key: indexS++, label: '特殊血痕－特殊检材I' },
            { key: indexS++, label: '指甲－特殊检材II' },
            { key: indexS++, label: '骨骼－特殊检材II' },
            { key: indexS++, label: '病理蜡块－特殊检材II' },
            { key: indexS++, label: '切片组织－特殊检材II' },
        ];

    return(
      <View key={"form2"+index}>
        <View style={{marginTop:20, paddingBottom:5, borderBottomColor:"#aaa",borderBottomWidth: 1}}>
          <Text>被鉴定人{index}</Text>
        </View>
        <View style={styles.orderInputContainer}>
          <Text style={styles.orderInputText}>姓名：</Text>
          <TextInput ref={"name"+index} onFocus={()=>this._inputFocused('name'+index)} returnKeyType = {"next"} onSubmitEditing={(event) => {this._refFocus("rel",index);}} type="TextInput" name={"name"+index} style={styles.orderInput}/>
        </View>
        <View style={{width:Util.size.width-80,marginTop:20}}>
          <Text style={styles.orderInputText}>关系：</Text>
          <ModalPicker
            data={relationA} 
            type="ModalPicker"
            initValue="请选择"
            onChange={(option)=>{ 
              var temp = this.state.relations;
              temp[index] = option.label;
              this.setState(temp);
            }
          }>
          </ModalPicker>
        </View>
        <View style={{width:Util.size.width-80,marginTop:20}}>
          <Text style={styles.orderInputText}>样本类型：</Text>
          <ModalPicker
            data={sampleA} 
            type="ModalPicker"
            initValue="请选择"
            onChange={(option)=>{ 
              var temp = this.state.samples;
              temp[index] = option.label;
              this.setState(temp);
            }
          }>
          </ModalPicker>
        </View>
        <View style={styles.orderInputContainer}>
          <Text style={styles.orderInputText}>附加信息：</Text>
          <TextInput ref={"msg"+index} onFocus={()=>this._inputFocused('msg'+index)} type="TextInput" name={"msg"+index} style={styles.orderInput}/>
        </View>
      </View>
    )
  };

  _renderSecondForm() {
    var formContainer = [], form2Elem;
    for (var i = 1; i <= this.state.numOfTesters; i++) {
      if (this.state.title == "亲子鉴定" || this.state.title == "收养亲子鉴定" || this.state.title == "妊娠亲子鉴定") { 
        if (i < 5) {
          form2Elem = this._renderSecondFormItem(i);
          formContainer.push(form2Elem);
        } else {
          Alert.alert("添加失败","被鉴定人不得多于四人");
          break;
        }
      } else {
        if (i < 6) {
          form2Elem = this._renderSecondFormItem(i);
          formContainer.push(form2Elem);
        } else {
          Alert.alert("添加失败","被鉴定人不得多于五人");
          break;
        }
      }  
    };
    return(formContainer);
  }

  render() {
    return(
      <ScrollView ref='scrollView' showsVerticalScrollIndicator={false} style={{marginTop:30,paddingLeft:20, paddingRight:20, backgroundColor:"#f7f7f7"}}>
        <Text style={{marginTop: 10}}>{this.state.stepTitle}</Text>
        <View style={[styles.orderContainer,styles.form1]}>
            <Form ref="form1">
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>姓名：</Text>
                <TextInput ref="FirstInput" onFocus={()=>this._inputFocused("FirstInput")} returnKeyType = {"next"} onSubmitEditing={(event) => {this.refs.SecondInput.focus(); }} defaultValue={this.state.form1.name}  type="TextInput" name="name" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>手机号：</Text>
                <TextInput ref="SecondInput" onFocus={()=>this._inputFocused("SecondInput")} returnKeyType = {"next"} onSubmitEditing={(event) => {this.refs.ThirdInput.focus(); }} defaultValue={this.state.form1.phoneNum} type="TextInput" name="phoneNum"  keyboardType="phone-pad" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>电子邮箱：</Text>
                <TextInput ref="ThirdInput" onFocus={()=>this._inputFocused("ThirdInput")} returnKeyType = {"next"} onSubmitEditing={(event) => {this.refs.FourthInput.focus(); }} defaultValue={this.state.form1.email} type="TextInput" name="email" keyboardType="email-address" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>地址：</Text>
                <TextInput ref="FourthInput" onFocus={()=>this._inputFocused("FourthInput")} defaultValue={this.state.form1.address} type="TextInput" name="address" style={styles.orderInput}/>
              </View>
            </Form>
            <View style={styles.orderInputContainer}>
              <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={()=>this._updateStep(1)}>
                <Text style={{color:'#fff'}}>下一步</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.orderContainer, styles.form2]}>
            <Form ref="form2">
              {this._renderSecondForm()}
            </Form>
            <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm,{marginTop:30,backgroundColor:"#aaa"}]} onPress={() => this._addTester()}>
                <Text style={{color:'#fff'}}>添加被鉴定人</Text>
              </TouchableHighlight>
            <View style={{flexDirection:"row", marginLeft:10, marginTop:10, marginBottom:30}}>
              <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(0)}>
                <Text style={{color:'#fff'}}>上一步</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._updateStep(2)}>
                <Text style={{color:'#fff'}}>下一步</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.orderContainer,styles.form3]}>
            <View style={{alignItems:"flex-start", width: Util.size.width-80}}>
              <Text style={{marginTop:20,fontWeight:"500",marginBottom:5}}>订单详情</Text>
              <Text style={styles.detailListReg}><Text style={styles.detailListEm}>订单项目：{this.state.title}</Text></Text>
              <Text style={styles.detailListReg}><Text style={styles.detailListEm}>应付款金额：{this.state.price}</Text></Text>
            </View>
            <View style={{flexDirection:"row", marginLeft:20, marginTop:20}}>
              <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(1)}>
                <Text style={{color:'#fff'}}>上一步</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._pay(this.state.orderID)}>
                <Text style={{color:'#fff'}}>前往支付</Text>
              </TouchableHighlight>
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  progressView: {
    marginTop: 10,
    width: Util.size.width-40,
  },
  orderContainer:{
    alignItems:'center',
    flex:1,
    width: Util.size.width-40,
    overflow: 'hidden',
    height: 1000
  },
  orderInputContainer:{
    marginTop: 20, 
  },
  orderInputText:{
    fontSize:12,
  },
  orderInput:{
    marginTop: 10,
    paddingLeft:10,
    paddingRight: 10,
    paddingTop:5,
    paddingBottom:5,
    width:Util.size.width-80,
    borderWidth:Util.pixel,
    height:40,
    borderColor:'#777',
    borderRadius:2,
    color:"#333",
  },
  btn_pm:{
    marginTop:13,
    width:280,
    height:40,
    borderRadius:2,
    backgroundColor:'#1E868C',
    justifyContent:'center',
    alignItems:'center',
  },
  btn_pm_half:{
    marginTop:13,
    width:135,
    marginRight:10,
    height:40,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:"row",
    flexWrap: 'wrap',
  },
  form1:{
  },
  form2:{
    width:0,
    height:0,
    opacity:0,
  },
  form3:{
    width:0,
    height:0,
    opacity:0,
  },
  detailListEm:{
    color: "#333",
    paddingRight:10
  },
  detailListReg:{
    color:"#555",
    paddingBottom:5,
  },
})
