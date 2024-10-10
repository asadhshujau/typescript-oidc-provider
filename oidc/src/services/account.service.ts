import { Account } from '../db/mongodb/models/Account'

export const get = async (key: string) => Account.findOne({ username: key })
export const set = async (payload: any) => Account.create(payload)
