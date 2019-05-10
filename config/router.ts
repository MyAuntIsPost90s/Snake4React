import AuthRoute from '../src/components/BaseProps/AuthRoute';

// component根路径基于 src/page
// Routes根路径基于项目根目录
const router: AuthRoute[] = [
  {
    path: "/",
    component: '../layouts/index',
    Routes: ['./src/components/AuthRoute'],   // 转接到自己的路由
    routes: [
      {
        path: "/login",
        component: './Login'
      },
      {
        path: "/",
        component: './Index'
      }
    ],
  }
];
export default router;
