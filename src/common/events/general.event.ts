import { v4 as uuid } from 'uuid';

export class GeneralEvent {
  specVersion: string;
  source: string;
  id: string;
  timestamp: string;
  contentType: string;
  data: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(data: any) {
    this.specVersion = '1.0';
    this.source = 'SERVICE_NAME';
    this.id = uuid();
    this.timestamp = new Date().toISOString();
    this.contentType = 'application/json';
    this.data = data;
  }
}
