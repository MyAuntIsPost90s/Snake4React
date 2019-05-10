import BaseSnake from '@/components/Snake/BaseSnake';
import BaseFood from '@/components/Snake/BaseFood';

/**
 * 系统默认蛇类
 *
 * @author cch
 */
export class DefaultSnake implements BaseSnake {
  private static readonly Direction = {
    LEFT: 1,
    RIGHT: 2,
    TOP: 3,
    BOTTOM: 4,
  };
  private readonly upKey: string = 'ArrowUp';
  private readonly downKey: string = 'ArrowDown';
  private readonly leftKey: string = 'ArrowLeft';
  private readonly rightKey: string = 'ArrowRight';
  private position = new Array<Array<number>>();
  private positionSet: { [index: string]: boolean | undefined } = {};
  private direction = 0;  //方向
  private handler: any;
  private keyCache: any;
  private readonly sp: number = 200;
  private readonly color: string = '#409EFF';
  private readonly name: string = new Date().getTimezoneOffset().toString();
  private static keyUpEventBus:Array<any> = [];   //事件总线

  constructor(name: string, size: number, color: string, x: number, y: number, sp: number, keys?: { up: string, down: string, left: string, right: string }) {
    this.sp = sp;
    this.color = color;
    this.name = name;
    if (keys) {
      this.upKey = keys.up;
      this.downKey = keys.down;
      this.leftKey = keys.left;
      this.rightKey = keys.right;
    }

    for (let i = 0; i < size; i++) {
      this.position.push([x + i, y]);
      this.positionSet[(x + i) + '-' + y] = true;
    }
    this.setToLeft();
    this.setEvent();
  }


  getName(): string {
    return this.name;
  }

  getColor(): string {
    return this.color;
  }

  inSnake(x: number, y: number): boolean | undefined {
    return this.positionSet[x + '-' + y];
  }

  getSnakeHead(): Array<number> {
    return this.position[0];
  }

  getSnake(): Array<Array<number>> {
    return this.position;
  }

  getSnakeSet(): { [p: string]: boolean | undefined } {
    return this.positionSet;
  }

  growth(): void {
    this.position.push([0, 0]);
    this.move();
  }

  eat(food: BaseFood): void {
    food.effect(this);
  }

  headInBody(): boolean {
    let head = this.getSnakeHead();
    for (let i = 1; i < this.position.length; i++) {
      if (this.position[i][0] === head[0] && this.position[i][1] === head[1]) {
        return true;
      }
    }
    return false;
  }

  onStartMove(cb: any) {
    this.handler = setInterval(() => {
      this.setDirection();
      this.move();
      cb();
    }, this.sp);
  }

  dead(): void {
    clearInterval(this.handler);
  }

  /**
   * 设置事件
   *
   * @param
   */
  private setEvent = () => {
    if(!document.onkeyup){
      document.onkeyup = function(event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        for(let i=0;i<DefaultSnake.keyUpEventBus.length;i++){
          DefaultSnake.keyUpEventBus[i](e);
        }
      };
    }
    DefaultSnake.keyUpEventBus.push((e:any)=>{
      console.log(e);
      this.keyCache = e.key;
    })
  };

  /**
   * 设置方向
   *
   * @param
   */
  private setDirection = () => {
    if (this.keyCache === this.leftKey) {
      this.setToLeft();
    }
    if (this.keyCache === this.rightKey) {
      this.setToRight();
    }
    if (this.keyCache === this.upKey) {
      this.setToUp();
    }
    if (this.keyCache === this.downKey) {
      this.setToDown();
    }
  };

  /**
   * 向前移动一格
   *
   * @param
   */
  private move(): void {
    this.positionSet[this.position[this.position.length - 1][0] + '-' + this.position[this.position.length - 1][1]] = undefined;  //移除最后一个
    this.position.splice(this.position.length - 1, 1); //移除最后一个
    // 根据情况加到头部
    if (this.direction === DefaultSnake.Direction.LEFT) {
      this.position.unshift([this.position[0][0] - 1, this.position[0][1]]);
    }
    if (this.direction === DefaultSnake.Direction.RIGHT) {
      this.position.unshift([this.position[0][0] + 1, this.position[0][1]]);
    }
    if (this.direction === DefaultSnake.Direction.TOP) {
      this.position.unshift([this.position[0][0], this.position[0][1] - 1]);
    }
    if (this.direction === DefaultSnake.Direction.BOTTOM) {
      this.position.unshift([this.position[0][0], this.position[0][1] + 1]);
    }
    this.positionSet[this.position[0][0] + '-' + this.position[0][1]] = true;
  }

  /**
   * 设置向下移动
   *
   * @param
   */
  private setToDown(): void {
    if (this.direction === DefaultSnake.Direction.TOP) {
      //this.position.reverse();  //需要反转
      return;
    }
    this.direction = DefaultSnake.Direction.BOTTOM;
  }

  /**
   * 设置向左移动
   *
   * @param
   */
  private setToLeft(): void {
    if (this.direction === DefaultSnake.Direction.RIGHT) {
      //this.position.reverse(); //需要反转
      return;
    }
    this.direction = DefaultSnake.Direction.LEFT;
  }

  /**
   * 设置向右移动
   *
   * @param
   */
  private setToRight(): void {
    if (this.direction === DefaultSnake.Direction.LEFT) {
      //this.position.reverse(); //需要反转
      return;
    }
    this.direction = DefaultSnake.Direction.RIGHT;
  }

  /**
   * 设置向上移动
   *
   * @param
   */
  private setToUp(): void {
    if (this.direction === DefaultSnake.Direction.BOTTOM) {
      //this.position.reverse(); //需要反转
      return;
    }
    this.direction = DefaultSnake.Direction.TOP;
  }
}
