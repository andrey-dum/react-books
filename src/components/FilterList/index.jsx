import React from 'react';
import { NavLink } from 'react-router-dom';

import {Menu } from 'antd';
import {
  HeartOutlined,
  CheckCircleOutlined,
  BookOutlined
} from '@ant-design/icons';


const FilterList = ({user}) => {

    return (
      <>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

          { [
              { path: '/favorite', title: 'Понравившиеся', icon: <HeartOutlined/> },
              { path: '/marked', title: 'Отложенные', icon: <BookOutlined /> },
              { path: '/read', title: 'Прочитанные', icon: <CheckCircleOutlined /> },
            ].map( item => (
              <Menu.Item key={item.url} icon={item.icon}>
                <NavLink  to={item.path} >{item.title}</NavLink >
              </Menu.Item>
            ))
          }
          </Menu>
        </>
    );
}

export default FilterList;
