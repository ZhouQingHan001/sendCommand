import React, { Component } from 'react';
import { connect } from 'dva';
import { Button , Tabs } from 'antd';
import styles from './home.less';
import HistoryCommand from './HistoryCommand/HistoryCommand';
import ParkingLot from './ParkingLot/parkingLot';
import ParkingLock from './ParkingLock/ParkingLock';

const {TabPane} = Tabs;

@connect(({ login }) => ({
  login,
}))
export default class Home extends Component {
  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };

  parkingLot = ()=>{
    return (<div><ParkingLot /></div>)
  };

  parkingLock = ()=>{
    return (<div><ParkingLock /></div>)
  };

  historyCommand = ()=>{
    return (<div><HistoryCommand /></div>)
  };

  render() {
    return (
      <div className={styles.main}>
        <Tabs size="large" defaultActiveKey="1" tabBarExtraContent={<Button className={styles.button} type="primary" onClick={this.logout}>退出</Button>}>
          <TabPane tab={<span>车位</span>} key="1">
            <this.parkingLot />
          </TabPane>
          <TabPane tab={<span>车位锁</span>} key="2">
            <this.parkingLock />
          </TabPane>
          <TabPane tab={<span>历史命令</span>} key="3">
            <this.historyCommand />
          </TabPane>
        </Tabs>,
      </div>
    );
  }
}
