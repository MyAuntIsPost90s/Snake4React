import Location from './Location';

export default interface History {

  location: Location;

  action: string;

  block(): void;

  createHref(location: Location): void;

  go(n: number): void;

  goBack(): void;

  goForward(): void;

  push(path: any, state?: any): void;

  replace(path: any, state: any): void;
}
