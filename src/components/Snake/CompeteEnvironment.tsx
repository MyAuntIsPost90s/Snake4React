import React from 'react';
import { message } from 'antd';
import { BaseEnvironment, BaseEnvironmentProp } from '@/components/Snake/BaseEnvironment';
import BaseSnake from '@/components/Snake/BaseSnake';
import BaseFood from '@/components/Snake/BaseFood';

interface IProp extends BaseEnvironmentProp {
  snakes: Array<BaseSnake>
  foods: Array<BaseFood>
}

/**
 * 多蛇竞争环境
 *
 * @author cch
 */
export default class CompeteEnvironment extends BaseEnvironment<IProp> {

  protected start(): void {
    this.initFoods();
    this.snakeStartMove();
  }

  private snakeStartMove = () => {
    for (let i = 0; i < this.props.snakes.length; i++) {
      this.props.snakes[i].onStartMove(() => {
        if (this.checkEnv(this.props.snakes[i])) {
          this.forceUpdate();
        }
      });
    }
  };

  private initFoods = () => {
    let disablePosition: { [index: string]: boolean | undefined } = {};
    for (let i = 0; i < this.props.snakes.length; i++) {
      for (let key in this.props.snakes[i].getSnakeSet()) {
        disablePosition[key] = this.props.snakes[i].getSnakeSet()[key];
      }
    }
    for (let i = 0; i < this.props.foods.length; i++) {
      let food = this.props.foods[i].createNewFood(disablePosition, this.props.width, this.props.height);
      disablePosition[food[0] + '-' + food[1]] = true;
    }
  };

  private createFood = (food: BaseFood) => {
    let disablePosition: { [index: string]: boolean | undefined } = {};
    for (let i = 0; i < this.props.snakes.length; i++) {
      for (let key in this.props.snakes[i].getSnakeSet()) {
        disablePosition[key] = this.props.snakes[i].getSnakeSet()[key];
      }
    }
    for (let i = 0; i < this.props.foods.length; i++) {
      if (food !== this.props.foods[i]) {
        let foodPosition = this.props.foods[i].getFoodPosition();
        disablePosition[foodPosition[0] + '-' + foodPosition[1]] = true;
      }
    }
    food.createNewFood(disablePosition, this.props.width, this.props.height);
  };

  protected inFood(x: number, y: number): BaseFood | undefined {
    for (let i = 0; i < this.props.foods.length; i++) {
      if (this.props.foods[i].inFood(x, y)) {
        return this.props.foods[i];
      }
    }
  }

  protected inSnake(x: number, y: number): BaseSnake | undefined {
    for (let i = 0; i < this.props.snakes.length; i++) {
      if (this.props.snakes[i].inSnake(x, y)) {
        return this.props.snakes[i];
      }
    }
  }

  protected renderFood(food: BaseFood, baseClass: string, key: string): any {
    return (
      <div className={baseClass}
           style={{ backgroundColor: food.getColor(), ...this.itemStyle }}
           key={key}>
        {food.getContent()}
      </div>
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
          break;
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
  protected checkEnv = (snake: BaseSnake): boolean => {
    //边界
    let head = snake.getSnakeHead();
    if (head[0] < 0 || head[0] >= this.props.width) {
      snake.dead();
      message.error(`${snake.getName()}死亡，游戏结束`);
      return false;
    }
    if (head[1] < 0 || head[1] >= this.props.height) {
      snake.dead();
      message.error(`${snake.getName()}死亡，游戏结束`);
      return false;
    }
    //自己
    if (snake.headInBody()) {
      snake.dead();
      message.error(`${snake.getName()}死亡，游戏结束`);
      return false;
    }
    //其他蛇
    for (let i = 0; i < this.props.snakes.length; i++) {
      if (this.props.snakes[i].getName() !== snake.getName()) {
        if (this.props.snakes[i].inSnake(head[0], head[1])) {
          snake.dead();
          message.error(`${snake.getName()}死亡，游戏结束`);
          return false;
        }
      }
    }
    //食物
    for (let i = 0; i < this.props.foods.length; i++) {
      if (this.props.foods[i].inFood(head[0], head[1])) {
        snake.eat(this.props.foods[i]);
        this.createFood(this.props.foods[i]);
        break;
      }
    }
    return true;
  };

}
