import {IConfig} from 'umi-types';
import BaseConfig from './config';

// UMI_ENV=dev 则调用 config.dev.js test类推，详见 https://umijs.org/zh/guide/env-variables.html#如何配置
// 注:在umi中会将 process.env.NODE_ENV 做字符替换，不可以直接使用process.env.NODE_ENV，
// 由于不是大的问题，故不做更改，如要使用process.env.NODE_ENV，请将process.env赋值给新的变量，webpack将做自动替换
const DevConfig: IConfig = {
  ...BaseConfig,
  define: {
    'process.env': {
      ENV: 'dev',
    }
  },
}

export default DevConfig;
