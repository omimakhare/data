import JSONAPICache from '@ember-data/json-api';
import type Model from '@ember-data/model';
import { instantiateRecord, teardownRecord } from '@ember-data/model';
import { buildSchema, modelFor } from '@ember-data/model/hooks';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import DataStore, { CacheHandler } from '@ember-data/store';
import type { Cache } from '@ember-data/types/cache/cache';
import type { CacheCapabilitiesManager } from '@ember-data/types/q/cache-store-wrapper';
import type { StableRecordIdentifier } from '@ember-data/types/q/identifier';

export default class Store extends DataStore {
  constructor(args: unknown) {
    super(args);

    const manager = (this.requestManager = new RequestManager());
    manager.use([Fetch]);
    manager.useCache(CacheHandler);

    this.registerSchema(buildSchema(this));
  }

  createCache(capabilities: CacheCapabilitiesManager): Cache {
    return new JSONAPICache(capabilities);
  }

  instantiateRecord(identifier: StableRecordIdentifier, createRecordArgs: { [key: string]: unknown }): unknown {
    return instantiateRecord.call(this, identifier, createRecordArgs);
  }

  teardownRecord(record: Model): void {
    return teardownRecord.call(this, record);
  }

  modelFor(type: string) {
    return modelFor.call(this, type);
  }
}
