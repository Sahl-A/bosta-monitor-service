import * as dayjs from 'dayjs';
export const getNow = (mockedNow) =>
  dayjs(mockedNow || '2021-01-01T00:00:00.000Z');
