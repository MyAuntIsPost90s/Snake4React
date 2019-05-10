/**
 * 食物接口
 *
 * @param
 */
import BaseSnake from '@/components/Snake/BaseSnake';

export default interface BaseFood {

  /**
   * 生成食物
   *
   * @param
   */
  createNewFood(disable: { [index: string]: boolean | undefined }, width: number, height: number): void

  /**
   * 当前节点是否在食物内
   *
   * @param
   */
  inFood(x: number, y: number): boolean;

  /**
   * 食物产生的副作用
   *
   * @param
   */
  effect(snake: BaseSnake): any
}
