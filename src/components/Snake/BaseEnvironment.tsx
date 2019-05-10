import styles from './BaseEnvironment.css';
import React from 'react';
import BaseSnake from '@/components/Snake/BaseSnake';
import BaseFood from '@/components/Snake/BaseFood';

export interface BaseEnvironmentProp {
  width: number
  height: number
}

/**
 * 基础环境
 *
 * @author cch
 */
export abstract class BaseEnvironment<T extends BaseEnvironmentProp> extends React.Component<T> {

  protected itemSize = 20;
  protected itemStyle = { width: this.itemSize, height: this.itemSize };

  componentWillMount() {
    this.start();
  }

  /**
   * 启动运行
   *
   * @param
   */
  protected abstract start(): void

  /**
   * 当前坐标属于食物
   *
   * @param
   */
  protected abstract inFood(x: number, y: number): BaseFood | undefined

  /**
   * 勾绘食物
   *
   * @param
   */
  protected abstract renderFood(food: BaseFood, baseClass: string, key: string): any

  /**
   * 当前坐标属于蛇
   *
   * @param
   */
  protected abstract inSnake(x: number, y: number): BaseSnake | undefined

  /**
   * 勾绘蛇
   *
   * @param
   */
  protected abstract renderSnake(snake: BaseSnake, baseClass: string, key: string): any

  /**
   * 渲染行
   *
   * @param
   */
  protected renderRows = () => {
    let rows = [];
    for (let y = 0; y < this.props.height; y++) {
      for (let x = 0; x < this.props.width; x++) {
        let snake = this.inSnake(x, y);
        if (snake) { // 蛇
          rows.push(this.renderSnake(snake, styles.item, x + '-' + y));
        }
        let food = this.inFood(x, y);
        if (food) {  // 食物
          rows.push(this.renderFood(food, (styles.item + ' ' + styles.active), (x + '-' + y)));
        }
        if (!food && !snake) {  //背景
          rows.push(
            <div className={styles.item}
                 key={x + '-' + y}
                 style={this.itemStyle}></div>,
          );
        }
      }
    }
    return rows;
  };

  render() {
    let bgStyle = {
      width: (this.itemSize - 1) * this.props.width,
      height: (this.itemSize - 1) * this.props.height,
      margin: 'auto',
    };
    return (
      <div style={bgStyle}>
        {this.renderRows()}
      </div>
    );
  }

}
