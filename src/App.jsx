import { useEffect, useState, useCallback } from 'react';
import {Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import {useStore, useActions, useSelector} from './hooks/store';

import auth, { signIn, signOut } from './api/auth';

import { getBooks } from './store/books';
import { getTopics } from './store/topics';
import { login, logout, getUser } from './store/user';

import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Topic from './pages/Topic';
import ListPage from './pages/List';
import FilterPage from './pages/FilterPage';


import TopicList from './components/TopicList';
import FilterList from './components/FilterList';

import { Avatar, Button, Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { getLists } from './store/lists';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const actionsToBind = {
  getTopics,
  getLists,
  login,
  logout,
  getUser
};


function App () {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const topics = useSelector(state => state.topics);
  const user = useSelector(state => state.user);
  const lists = useSelector(state => state.lists);
  const actions = useActions(actionsToBind);
  
  const history = useHistory();

  useEffect(() => {
    // auth.onAuthStateChanged(user => {
    //     if (user) {
    //         actions.login(user);
          
    //     } else {
    //         actions.logout();
    //     }
    // });
    if (user) {
      actions.getLists(user.uid + '')
    }
    actions.getTopics();
}, [actions]);

const handleSignOut = useCallback(() => {
  signOut();
  history.push('/');
}, [history]);


//Breadcrumb
const match = useRouteMatch('/topics/:topicId');
const book = useSelector(state => state.books.single);
const topic = match  && topics.find(t => t.id === match.params.topicId)
const title = (topic && topic.title) || (book && book.title) || '';
  
  return (
    <div className="app">
      <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" >
            {user ? <div onClick={() => handleSignOut}> {user.email} <Button><LogoutOutlined /></Button></div> : <div onClick={() => signIn()}> <Button>LOG IN</Button></div>}
          </div>

           { user &&  <FilterList /> }
           <TopicList topics={topics} lists={lists} user={user}/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>React Books</Breadcrumb.Item>
              <Breadcrumb.Item>{title && title}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
             
              <Switch>
                <Route exact path='/' component={Home} />
                  <Route path='/new' >
                        <h2>New</h2>
                  </Route>
                  <Route exact path='/topics/:topicId' component={Topic} />
                  
                  <Route exact path='/:filter' component={FilterPage} />
                  
                  <Route path='/books/:bookId' component={BookPage} />
                  <Route path='/lists/:listId' component={ListPage} />

              </Switch>
          
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>React books </Footer>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
