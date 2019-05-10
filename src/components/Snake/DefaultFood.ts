import BaseFood from '@/components/Snake/BaseFood';
import BaseSnake from '@/components/Snake/BaseSnake';

export class DefaultFood implements BaseFood {

  private foodPosition: Array<number> = [];

  effect(snake: BaseSnake): any {
    snake.growth(); //成长
  }

  createNewFood(disable: { [index: string]: boolean | undefined }, width: number, height: number) {
    let enablePosition = new Array<Array<number>>();
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < height; x++) {
        if (!disable[x + '-' + y]) {
          enablePosition.push([x, y]);
        }
      }
    }
    this.foodPosition = enablePosition[Math.round(Math.random() * (enablePosition.length - 1))];
  }

  inFood(x: number, y: number): boolean {
    return this.foodPosition[0] === x && this.foodPosition[1] === y;
  }

}
