import React from 'react';
import { Table, Card, Input} from 'antd';
import { connect } from 'dva';
import styles from './all.less';
// import TableHeader from '../../../components/TableHeader';

const { Search } = Input;


@connect(({ historyCommand }) => ({
  historyCommand,
}))
export default class HistoryCommand extends React.Component{
  componentWillMount(){
    this.onSearch();
  }
  
  onSearch = (e) => {
    console.log(e);
    const {
      props: { dispatch },
    } = this;
    dispatch({
      type: 'historyCommand/RetrievePaging',
      payload: {
        search : e,
      },
    });
  };

  handleButtonRefresh = () => {
    const {
      props: { dispatch },
    } = this;
    dispatch({
      type: 'HistoryCommand/RetrievePaging',
    });
  };

    render(){
       const columns = [{
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        }, {
          title: '命令ID',
          dataIndex: 'commandId',
          key: 'commandId',
        },{
          title: 'SN',
          dataIndex: 'SN',
          key: 'SN',
        }, {
          title: '命令创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        }, {
          title: '送达设备时间',
          dataIndex: 'arriveTime',
          key: 'arriveTime',
        },{
          title: '设备执行时间',
          dataIndex: 'executeTime',
          key: 'executeTime',
        },{
          title: '命令参数',
          dataIndex: 'command',
          key: 'command',
        }];
        const { data }  = this.props.historyCommand;
        return (
          <div> 
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.header}>
                  <Search placeholder="搜索关键词 命令ID| SN" onSearch={this.onSearch} enterButton style={{ width: 350 }} />
                </div>
                <Table className={styles.Table} bordered columns={columns} dataSource={data.list} />
              </div>
            </Card>
          </div>
        )
    }
}