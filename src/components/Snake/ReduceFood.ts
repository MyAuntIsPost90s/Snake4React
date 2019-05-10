import BaseSnake from '@/components/Snake/BaseSnake';
import DefaultFood from '@/components/Snake/DefaultFood';

/**
 * 吃了会缩小的食物
 *
 * @author cch
 */
export default class ReduceFood extends DefaultFood {

  getContent(): string {
    return '小';
  }

  getColor(): string {
    return '#F56C6C';
  }

  effect(snake: BaseSnake): any {
    snake.growth(-1); //变短
    snake.speed(-2); //变快2
  }
}
