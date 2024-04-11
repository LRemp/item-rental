type ErrorResponse = {
  code: string;
  description: string;
};

type ApiRequest = {
  endpoint: string;
  method: string;
  authenticate?: boolean;
  body?: Record<string, any>;
};

type EventLog = {
  resource: string;
  eventName: string;
  title: string;
  description: string;
  timestamp: string;
};
