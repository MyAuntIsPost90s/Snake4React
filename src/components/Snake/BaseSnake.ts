/**
 * 蛇类接口(定义基础动作，事件)
 *
 * @author cch
 */
import BaseFood from '@/components/Snake/BaseFood';

export default interface BaseSnake {

  /**
   * 蛇名
   *
   * @param
   */
  getName(): string

  /**
   * 获取蛇的坐标
   *
   * @param
   */
  getSnake(): Array<Array<number>>

  /**
   * 获取蛇的坐标
   *
   * @param
   */
  getSnakeSet(): { [index: string]: boolean | undefined }

  /**
   * 判断是否在蛇内
   *
   * @param
   */
  inSnake(x: number, y: number): boolean | undefined

  /**
   * 获取蛇头的坐标
   *
   * @param
   */
  getSnakeHead(): any

  /**
   * 获取颜色
   *
   * @param
   */
  getColor(): string

  /**
   * 成长
   *
   * @param
   */
  growth(): void

  /**
   * 吃
   *
   * @param
   */
  eat(food: BaseFood): void

  /**
   * 蛇死亡
   *
   * @param
   */
  dead(): void

  /**
   * 是否头部进入身体
   *
   * @param
   */
  headInBody(): boolean

  /**
   * 开始移动事件
   *
   * @param
   */
  onStartMove(cb: any): void

}
