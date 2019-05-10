import {IConfig} from 'umi-types';
import BaseConfig from './config';

// UMI_ENV=dev 则调用 config.dev.js test类推，详见 https://umijs.org/zh/guide/env-variables.html#如何配置
const TestConfig: IConfig = {
  ...BaseConfig,
  define: {
    'process.env': {
      ENV: 'test'
    }
  },
}

export default TestConfig;
