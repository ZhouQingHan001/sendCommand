/**
 * @author D.H. Zhang
 */

import React, { PureComponent } from 'react';
import { Row, Col, Button, Input, Menu, Dropdown } from 'antd';

export default class TableHeader extends PureComponent {
  state = {
    model: 'simple',
  };

  onButtonSearchwaySwitch = model => {
    this.setState({ model });
  };

  render() {
    const {
      state: { model = 'simple' },
      props: {
        placeholderSearch = '请输入关键字',
        onButtonSearch,
        onButtonRefresh,
        nameOfButtonCreate = '新建',
        onButtonCreate,
        nameOfButtonMultiCreate = '批量新建',
        onButtonMultiCreate,
        advancedHeader,
        isShowButtonMultiCreate = false,
        isShowButtonCreate = true,
        isShowButtonRefresh = true,
        isMultiMode = false,
      },
    } = this;

    if (isMultiMode && !advancedHeader) {
      throw new Error('当设置了onMultiMode为true时，必须传入advancedHeader。');
    }

    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={onButtonMultiCreate}>{nameOfButtonMultiCreate}</a>
        </Menu.Item>
      </Menu>
    );

    const NormalHeader = () => {
      return (
        <Row align="middle" justify="center">
          <Col span={8}>
            <span>
              <Input.Search
                enterButton
                placeholder={placeholderSearch}
                onSearch={onButtonSearch}
                style={{ margin: 8, float: 'left', width: 300 }}
              />
            </span>
          </Col>
          <Col span={8} />
          <Col span={8}>
            {isMultiMode ? (
              <Button
                shape="circle-outline"
                style={{ margin: 8, float: 'right' }}
                icon={model === 'simple' ? 'plus' : 'close'}
                onClick={() => {
                  this.onButtonSearchwaySwitch(model === 'simple' ? 'advanced' : 'simple');
                }}
              />
            ) : (
              <div />
            )}
            {isShowButtonRefresh ? (
              <Button
                style={{ margin: 8, float: 'right' }}
                icon="sync"
                type="primary"
                onClick={onButtonRefresh}
              >
                刷新
              </Button>
            ) : (
              <div />
            )}
            {isShowButtonCreate ? (
              <Dropdown overlay={isShowButtonMultiCreate ? menu : <div />}>
                <Button style={{ margin: 8, float: 'right' }} icon="plus" onClick={onButtonCreate}>
                  {nameOfButtonCreate}
                </Button>
              </Dropdown>
            ) : (
              <div />
            )}
          </Col>
        </Row>
      );
    };

    const DetailSearchHeader = () => {
      return (
        <div>
          {isMultiMode ? (
            <Button
              shape="circle-outline"
              style={{ margin: 8, float: 'right' }}
              icon={model === 'simple' ? 'plus' : 'close'}
              onClick={() => {
                this.onButtonSearchwaySwitch(model === 'simple' ? 'advanced' : 'simple');
              }}
            />
          ) : (
            <div />
          )}
          {advancedHeader}
        </div>
      );
    };

    return <Row>{model === 'simple' ? <NormalHeader /> : <DetailSearchHeader />}</Row>;
  }
}
