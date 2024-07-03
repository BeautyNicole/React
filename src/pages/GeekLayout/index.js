
import './index.scss'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo} from '@/store/modules/user';

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/artical',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
];

function GeekLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 获取当前路由路径
  const location = useLocation();
  const pathname = location.pathname;

  const userInfo = useSelector(state => state.user?.userInfo);

  const sideMenuClick = (e) => {
    console.log('sidemenu clicked....', e);
    navigate(e.key);
  }

  const onConfirm = () => {
    console.log('logging out...');
    dispatch(clearUserInfo());
    navigate('/login');

  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo?.nickName}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={pathname}
            defaultOpenKeys={['1']}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={sideMenuClick}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout;