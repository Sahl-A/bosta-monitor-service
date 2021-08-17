export interface ILog {
  created_at: Date;

  updated_at: Date;

  status: string;

  response_time: number;
}

export interface Ireport {
  status?: string; // Current state of URL

  availability?: number; // percentage of URL availability

  outages?: number; // The total number of URL downtimes

  downtime?: number; // The total time, in seconds, of the URL downtime

  uptime?: number; // The total time, in seconds, of the URL uptime

  averageResponseTime?: number; // The average response time for the URL

  history?: ILog[]; // Timestamped logs of the polling requests.
}
