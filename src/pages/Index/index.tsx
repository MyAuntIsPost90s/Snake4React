import React from 'react';
import BaseProp from '@/components/BaseProps/BaseProp';
import CompeteEnvironment from '@/components/Snake/CompeteEnvironment';
import DefaultEnvironment from '@/components/Snake/DefaultEnvironment';
import DefaultSnake from '@/components/Snake/DefaultSnake';
import DefaultFood from '@/components/Snake/DefaultFood';
import SpeedFood from '@/components/Snake/SpeedFood';
import ReduceFood from '@/components/Snake/ReduceFood';

export default class extends React.Component<BaseProp> {

  render() {
    // 蛇环境（传统贪吃蛇）
    let defaltEnv = (<DefaultEnvironment height={40}
                                         width={80}
                                         snake={new DefaultSnake('大蛇丸', 5, '#409EFF', 20, 6, 150, {
                                           up: 'w',
                                           down: 's',
                                           right: 'd',
                                           left: 'a',
                                         })}
                                         food={new DefaultFood()}/>);

    // 蛇环境（竞赛贪吃蛇）
    let competeEnv = (<CompeteEnvironment height={40}
                                          width={80}
                                          snakes={[
                                            new DefaultSnake('大蛇丸', 5, '#409EFF', 20, 6, 150, {
                                              up: 'w',
                                              down: 's',
                                              right: 'd',
                                              left: 'a',
                                            }),
                                            new DefaultSnake('啥是gay', 5, '#ff7d6c', 20, 12, 150), //默认 上下左右键
                                          ]}
                                          foods={[
                                            new DefaultFood(), //普通食物 副作用：长大 1
                                            new DefaultFood(),
                                            new DefaultFood(),
                                            new DefaultFood(),
                                            new DefaultFood(),
                                            new DefaultFood(),
                                            new SpeedFood(),  //速度食物 副作用：提速 2
                                            new ReduceFood(), //缩小食物 副作用：提速 2 长大 -1
                                          ]}/>);
    return competeEnv;
  }
};
