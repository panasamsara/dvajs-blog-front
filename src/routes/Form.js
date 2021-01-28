import React, { useState } from 'react';
import { Select, Divider, Input, Breadcrumb, } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Home from '../layout';

const { Option } = Select;

let index = 0;

class IndexPage extends React.Component {
  state = {
    items: ['jack', 'lucy'],
    name: '',
  };

  onNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  addItem = () => {
    console.log('addItem');
    const { items, name } = this.state;
    this.setState({
      items: [...items, name || `New item ${index++}`],
      name: '',
    });
  };

  render() {
    const { items, name } = this.state;
    return (
      <Home>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>form</Breadcrumb.Item>
        </Breadcrumb>
        <Select
          style={{ width: 240 }}
          placeholder="custom dropdown render"
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                <a
                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                  onClick={this.addItem}
                >
                  Add item
                </a>
              </div>
            </div>
          )}
        >
          {items.map(item => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </Home>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
