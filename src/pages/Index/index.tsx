import React from 'react';
import BaseProp from '@/components/BaseProps/BaseProp';
import CompeteEnvironment from '@/components/Snake/CompeteEnvironment';
import DefaultEnvironment from '@/components/Snake/DefaultEnvironment';
import { DefaultSnake } from '@/components/Snake/DefaultSnake';
import { DefaultFood } from '@/components/Snake/DefaultFood';
import { CompetitionSnake } from '@/components/Snake/CompetitionSnake';

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
                                            }), //传统蛇，食物副作用只有变长
                                            new CompetitionSnake('啥是gay', 5, '#ff7d6c', 20, 12, 150), //不设置按键则为上下左右键,食物副作用变长，变慢
                                          ]}
                                          food={new DefaultFood()}/>);
    return competeEnv;
  }
};
