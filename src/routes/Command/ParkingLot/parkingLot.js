import { Form, Select, InputNumber, Button, Card, Input, Cascader,Switch } from 'antd';
import React from 'react';
import {connect} from 'dva';
import styles from './all.less';

const FormItem = Form.Item;
const {Option} = Select;

const options = [{
  value: 'Background',
  label: '初始化 --- TCLD110S{(Background):{}}',
},{
  value: 'Reboot',
  label: '重启 --- TCLD110S{(Reboot):{}}',
},{
  value: 'NbHeart',
  label: '心跳间隔 --- TCLD110S{(NbHeart):{(val):?,(Magic):9}}',
  children: [{
    value: '4',
    label: '1小时',
  },{
    value: '8',
    label: '2小时',
  },{
    value: '12',
    label: '3小时',
  },{
    value: '16',
    label: '4小时',
  },{
    value: '20',
    label: '5小时',
  }],
},{
  value: 'Workmode',
  label: '工作模式 --- TCLD110S{(Workmode):{(val):?,(Magic):9}}',
  children: [{
    value: '0',
    label: '正常模式',
  },{
    value: '1',
    label: '调试模式',
  }],
},{
  value: 'Sense',
  label: '灵敏度 --- TCLD110S{(Sense):{(val):?,(Magic):9}}',
  children: [{
    value: '3',
    label: '高',
  },{
    value: '6',
    label: '次高',
  },{
    value: '9',
    label: '中等',
  },{
    value: '12',
    label: '次低',
  },{
    value: '15',
    label: '低',
  }],
},{
  value: 'RadarDbg',
  label: '雷达调试 --- TCLD110S{(RadarDbg):{(val):?,(Magic):9}}',
  children: [{
    value: '1',
    label: '15分钟',
  },{
    value: '2',
    label: '30分钟',
  },{
    value: '3',
    label: '45分钟',
  },{
    value: '4',
    label: '60分钟',
  },{
    value: '5',
    label: '75分钟',
  },{
    value: '6',
    label: '90分钟',
  },{
    value: '7',
    label: '105分钟',
  },{
    value: '8',
    label: '120分钟',
  }],
},{
  value: 'NBiotPSM',
  label: 'NB模式 --- TCLD110S{(NBiotPSM):{(val):?,(Magic):9}}',
  children: [{
    value: '0',
    label: ' NBiotPSM : DISABLE ',
  },{
    value: '1',
    label: ' NBiotPSM : ENABLE ',
  }],
},{
  value: 'DisRange',
  label: '雷达监测距离 --- TCLD110S{(DisRange):{(val):?,(Magic):9}}',
  children: [{
    value: '5',
    label: ' 50cm ',
  },{
    value: '6',
    label: ' 60cm ',
  },{
    value: '7',
    label: ' 70cm ',
  },{
    value: '8',
    label: ' 80cm ',
  },{
    value: '9',
    label: ' 90cm ',
  },{
    value: '10',
    label: ' 100cm ',
  },{
    value: '11',
    label: ' 110cm ',
  },{
    value: '12',
    label: ' 120cm ',
  },{
    value: '13',
    label: ' 130cm ',
  },{
    value: '14',
    label: ' 140cm ',
  },{
    value: '15',
    label: ' 150cm ',
  },{
    value: '16',
    label: ' 160cm ',
  }],
},{
  value: 'Server',
  label: 'IP地址 --- TCLD110S{(Server):{(IP):(?),(Port):5683}',
  children: [{
    value: '117.60.157.137',
    label: '生产平台(117.60.157.137)',
  },{
    value: '180.101.147.115',
    label: '测试平台(180.101.147.115)',
  }],
},{
  value: 'MagMod',
  label: '地铁模式 --- TCLD110S{(MagMod):{(val):?,(Magic):9}}',
  children:[{
    value:'1',
    label:'地铁模式',
  },{
    value: '0',
    label: '普通模式',
  }],
}];

@connect(({login}) => ({
  login,
}))
@Form.create()
export default class ParkingLot extends React.Component {
  state = {
    commandMode: false,
    cascaderValue: "TCLD110S{():{}}",
  }

  changeSwitch = (value) => {
    console.log('changeSwitch里面打印', value);
    this.setState({
      theme: value ? 'light' : 'dark',
      commandMode: value,
    });

  }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, value) => {
        const values = value;
        if (!err) {
          if(this.state.commandMode){
            values.command = this.state.cascaderValue;
          }
          const {
            dispatch,
          } = this.props;
          dispatch({
            type: 'login/submit',
            payload: {
              ...values,
            },
          });
        }
      });
    }

    CascaderChange = (e) => {
      let command = "";
      switch(e[0]) {
        case 'Background': command = 'TCLD110S{(Background):{}}'; break;
        case 'Reboot': command = 'TCLD110S{(Reboot):{}}'; break;
        case 'NbHeart': command = `TCLD110S{(NbHeart):{(val):${e[1]},(Magic):9}}`; break;
        case 'Workmode': command = `TCLD110S{(Workmode):{(val):${e[1]},(Magic):9}}`; break;
        case 'Sense': command = `TCLD110S{(Sense):{(val):${e[1]},(Magic):9}}`; break;
        case 'RadarDbg': command = `TCLD110S{(RadarDbg):{(val):${e[1]},(Magic):9}}`; break;
        case 'NBiotPSM': command = `TCLD110S{(NBiotPSM):{(val):${e[1]},(Magic):9}}`; break;
        case 'DisRange': command = `TCLD110S{(DisRange):{(val):${e[1]},(Magic):9}}`; break;
        case 'Server': command = `TCLD110S{(Server):{(IP):(${e[1]}),(Port):5683,(Magic):9}}`; break;
        case 'MagMod': command = `TCLD110S{(MagMod):{(val):${e[1]},(Magic):9}}`; break;
        default: command = 'TCLD110S{():{}}';break;
      }
      this.setState({
        cascaderValue : command,
      })
    }

    render() {
        const {
          getFieldDecorator,
        } = this.props.form;
        const formItemLayout = {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 14,
          },
        };
        const { commandResult = undefined } = this.props.login;
      return ( 
        <div className={styles.container}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="应用选择" hasFeedback> {
              getFieldDecorator('application', {
                rules: [{
                required: true,
                message: '请选择应用',
                }],
              })(
                <Select placeholder="点击选择要下发设备所属的应用">
                  <Option value="mubokeji">mubokeji---(带应答) </Option>
                  <Option value="VehicleDetectorNoRsp">VehicleDetectorNoRsp---(无应答)</Option>
                  <Option value="mubokeji2">mubokeji2---(无应答version2)</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="设备编号" required>{
              getFieldDecorator('SN', {
                rules: [{
                required: true,
                message: '请输入设备SN号',
                }],
              })( 
                <Input type="text" placeholder="请输入设备SN号" /> 
              )} 
            </FormItem> 
            <FormItem {...formItemLayout} label="命令参数"> {
            getFieldDecorator('command', {
              rules: [{
              required: true,
              message: '请输入需要发送的命令',
              }],
            })(
              (this.state.commandMode)?
                <Cascader className={styles.Cascader} onChange={this.CascaderChange} options={options} placeholder="点击选择命令"  />
                :<Input type="text" placeholder="请正确输入命令" />
                )}
              <Switch
                checked={this.state.theme === 'light'}
                onChange={this.changeSwitch}
                checkedChildren="选择命令"
                unCheckedChildren="选择命令"
                className={styles.Switch}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="超时时间"> {
              getFieldDecorator('expireTime', {
                initialValue: 3600,
                })( 
                  <InputNumber className={styles.InputNumber} min={0} max={100000} />
                  )} 
              <span className="ant-form-text"> 秒 </span>  
            </FormItem>
            <FormItem wrapperCol={{span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit"> 命令发送</Button>
            </FormItem>  
          </Form>
          <div className={styles.resultDiv}>
            <Card title="命令发送结果" className={styles.resultCard}>
              <p>命令ID： { commandResult ? commandResult.commandId:""} </p> 
              <p>创建时间： { commandResult ? commandResult.creationTime:''} </p>
              <p>执行状态： { commandResult ? commandResult.status:''} </p>
              <p className={styles.detail}>命令详情:<br /><br />  { commandResult?JSON.stringify(commandResult) :"请求失败"} </p>
            </Card> 
          </div> 
        </div>
        )
    }
}
