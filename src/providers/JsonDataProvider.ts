import { IDataProvider } from '../providers';
import { DataModel } from '../models';
import { JSONObject, JSONData } from '../types';

export interface JsonDataProviderOptions {
    /** Accept a json object or an array of json object */
    data: JSONData
};

export class JsonDataProvider implements IDataProvider {
    private data: DataModel[] = [];

    constructor(options: JsonDataProviderOptions) {
        if (options.data instanceof Array) {
            this.data = (options.data as JSONObject[])
                .filter(a => a.key)
                .map(a => ({
                    key: a.key,
                    value: a.value,
                    description: a.description
                })) as DataModel[];
        } else {
            const keys = Object.keys(options.data);
            this.data = keys.map(key => ({
                key,
                value: (options.data as JSONObject)[key]
            })) as DataModel[];
        }
    }

    async getAll(): Promise<DataModel[]> {
        return this.data;
    }

    async get(key: string): Promise<DataModel | undefined> {
        return this.data.find(a => a.key === key);
    }
}