import React  from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'dva/router';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    activeKey: ['1']
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  menuclick = (val)=>{
    const {activeKey} = this.state;
    const arrayCopy = activeKey.slice();  //获取数组的副本
    arrayCopy[0] = val.key;

    this.setState({
      activeKey: arrayCopy
    }, ()=>{
      // console.log(2, this.state.activeKey)
    })
  }

  render() {
    const { collapsed, activeKey, } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={activeKey} mode="inline" onClick={this.menuclick}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/test">test</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} title="User">
              <Link to="/form">form</Link>
            </Menu.Item>
            {/* <Menu.Item key="9" icon={<FileOutlined />}>
              <Link to="/teng">teng</Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <a href="http://www.beian.gov.cn/portal/index" target="_blank">鄂ICP备18013597号-1</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;