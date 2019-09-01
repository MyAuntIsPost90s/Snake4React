import BaseSnake from '@/components/Snake/BaseSnake';
import DefaultFood from '@/components/Snake/DefaultFood';

/**
 * 吃了会加速的食物
 *
 * @author cch
 */
export default class SpeedFood extends DefaultFood {

  getContent(): string {
    return '速';
  }

  getColor(): string {
    return '#E6A23C';
  }

  effect(snake: BaseSnake): any {
    //snake.growth(1); //成长
    snake.speed(-5); //变快2
  }
}
