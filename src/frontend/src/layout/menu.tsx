import React, { FunctionComponent } from 'react';

import { Menu, Icon, Layout } from 'antd';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

export const AppMenu: FunctionComponent = () => {
  return (
    <Sider width={300} style={{ background: '#fff' }}>
      <Menu
        // theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              subnav 1
            </span>
          }
        >
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
