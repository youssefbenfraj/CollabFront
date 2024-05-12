export interface Pomodoro {
  id: number;
  startTime: Date;
  endTime: Date;
  breakTime: number;
  status: string;
 cycleCount: number; // Track number of cycles
 userId:any;
}
