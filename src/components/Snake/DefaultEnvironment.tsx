import React from 'react';
import { message } from 'antd';
import { BaseEnvironmentProp, BaseEnvironment } from '@/components/Snake/BaseEnvironment';
import BaseSnake from '@/components/Snake/BaseSnake';
import BaseFood from '@/components/Snake/BaseFood';

interface IProp extends BaseEnvironmentProp {
  snake: BaseSnake
  food: BaseFood
}

/**
 * 传统环境
 *
 * @param
 */
export default class DefaultEnvironment extends BaseEnvironment<IProp> {

  protected start(): void {
    this.props.food.createNewFood(this.props.snake.getSnakeSet(), this.props.width, this.props.height);
    this.props.snake.onStartMove(() => {
      if (this.checkEnv()) {
        this.forceUpdate();
      }
    });
  }

  protected inFood(x: number, y: number): BaseFood | undefined {
    return this.props.food.inFood(x, y) ? this.props.food : undefined;
  }

  protected inSnake(x: number, y: number): BaseSnake | undefined {
    return this.props.snake.inSnake(x, y) ? this.props.snake : undefined;
  }

  protected renderFood(food: BaseFood, baseClass: string, key: string): any {
    return (
      <div className={baseClass}
           style={this.itemStyle}
           key={key}>丸</div>
    );
  }

  protected renderSnake(snake: BaseSnake, baseClass: string, key: string): any {
    // 计算蛇名
    let content = '';
    for (let i = 0; i < snake.getSnake().length; i++) {
      let item = snake.getSnake()[i];
      if (key === item[0] + '-' + item[1]) {
        if (i < snake.getName().length) {
          content = snake.getName()[i];
        }
      }
    }
    return (
      <div className={baseClass}
           style={{ backgroundColor: snake.getColor(), ...this.itemStyle }}
           key={key}>
        {content}
      </div>
    );
  }

  /**
   * 检查
   *
   * @param
   */
  protected checkEnv = (): boolean => {
    //边界
    let head = this.props.snake.getSnakeHead();
    if (head[0] < 0 || head[0] >= this.props.width) {
      this.props.snake.dead();
      message.error('游戏结束');
      return false;
    }
    if (head[1] < 0 || head[1] >= this.props.height) {
      this.props.snake.dead();
      message.error('游戏结束');
      return false;
    }
    //自己
    if (this.props.snake.headInBody()) {
      this.props.snake.dead();
      message.error('游戏结束');
      return false;
    }
    //食物
    if (this.props.food.inFood(head[0], head[1])) {
      this.props.snake.eat(this.props.food);
      this.props.food.createNewFood(this.props.snake.getSnakeSet(), this.props.width, this.props.height);
    }
    return true;
  };
}
