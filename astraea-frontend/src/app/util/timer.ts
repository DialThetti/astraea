export class Timer {
  private readonly delay = 100;
  private intervalId?: ReturnType<typeof setInterval>;
  private _remaining: number;

  private lastTick: number;
  constructor(
    private time: number,
    private fn: () => void,
    private onTick: () => void = () => {}
  ) {
    this._remaining = time;
    this.lastTick = Date.now();
  }

  start() {
    this.intervalId = setInterval(() => this.tick(), this.delay);
  }

  private tick() {
    this._remaining -= Date.now() - this.lastTick;
    this.lastTick = Date.now();
    if (this._remaining <= 0) {
      clearInterval(this.intervalId);
      this.fn();
    }
    this.onTick();
  }
  get remainingTime(): number {
    return this._remaining;
  }
}
