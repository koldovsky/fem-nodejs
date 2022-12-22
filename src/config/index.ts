import staging from './staging';
import production from './production';
import local from './local';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
    envConfig = production;
} else if (stage === 'staging') {
    envConfig = staging;
} else {
    envConfig = local;
}

const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    logging: false
};

export default {
    ...defaultConfig,
    ...envConfig
}
