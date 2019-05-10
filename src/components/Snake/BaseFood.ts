import BaseSnake from '@/components/Snake/BaseSnake';

/**
 * 基础食物接口
 *
 * @author cch
 */
export default interface BaseFood {

  /**
   * 获取食物描述
   *
   * @param
   */
  getContent():string;

  /**
   * 获取食物颜色
   *
   * @param
   */
  getColor():string;

  /**
   * 生成食物
   *
   * @param
   */
  createNewFood(disable: { [index: string]: boolean | undefined }, width: number, height: number): Array<number>

  /**
   * 获取食物位置
   *
   * @param
   */
  getFoodPosition(): Array<number>

  /**
   * 当前节点是否在食物内
   *
   * @param
   */
  inFood(x: number, y: number): boolean

  /**
   * 食物产生的副作用
   *
   * @param
   */
  effect(snake: BaseSnake): any
}
