import {IConfig} from 'umi-types';
import routes from './router';

// ref: https://umijs.org/config/
const config: IConfig = {
  base: '/snake',
  publicPath: '/snake/',
  treeShaking: true,
  routes: routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'snake',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
        hardSource: true
      },
    }],
  ],
}

export default config;
