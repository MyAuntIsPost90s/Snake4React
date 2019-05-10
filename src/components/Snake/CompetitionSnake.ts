import { DefaultSnake } from '@/components/Snake/DefaultSnake';

/**
 * 竞赛蛇类
 *
 * @author cch
 */
export class CompetitionSnake extends DefaultSnake {
  growth(): void {
    super.growth();
    // 变慢
    this.sp = this.sp + 5;
    clearInterval(this.handler);
    this.handler = setInterval(this.moveHandler, this.sp);
  }
}
