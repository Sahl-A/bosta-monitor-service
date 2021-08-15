interface Authentication {
  username: string;

  password: string;
}

interface Assert {
  statusCode: number;
}

export interface IpollingRequestConfig {
  timeout?: number;

  ignoreSsl?: boolean;

  authentication?: Authentication;

  httpHeaders?: Record<string, unknown>;

  assert?: Assert;
}
