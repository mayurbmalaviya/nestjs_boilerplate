import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            namingStrategy: new SnakeNamingStrategy(),
            entities: [
                
            ],
            synchronize: true,
            logging: true,
        };
    }
}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService],
};
