import Redis from 'ioredis';
import { env } from '../env/env';

const RedisSingleton = () => {
    const redisClient = new Redis(env.REDIS_URL)
    console.warn('REDIS CLIENT INSTANTIATED');
    return redisClient;
}

declare const globalThis : {
    redisGlobal : ReturnType<typeof RedisSingleton>
} & typeof global;

const redis = globalThis.redisGlobal ?? RedisSingleton();

export default redis;