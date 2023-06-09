import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from 'src/utils/index';
const path = require('path');
import { PlatformTools } from 'typeorm/platform/PlatformTools';
// 也不知道脑瘫的 TypeORM为什么要强制把/变成\ 导致无法正则匹配 暂时没有解决办法 先覆盖方法
PlatformTools.pathNormalize = (pathStr) => {
  let normalizedPath = path.normalize(pathStr);
  console.log('补丁前', normalizedPath);
  if (process.platform === 'win32') {
    // Replace `\` with `/`
    pathStr = pathStr.replace(/\\/g, '/');
    // 如果匹配到了盘符 就把盘符去掉
    const pathRoot = path.parse(pathStr).root;
    if (pathRoot.match(/.*:.*/)) {
      pathStr = pathStr.substring(pathRoot.length - 1);
    }
    normalizedPath = path.posix.normalize(pathStr);
  }
  console.log('补丁后', normalizedPath);

  return normalizedPath;
};
// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';
const { MONGODB_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  entities: [path.join(__dirname, `../../**/*.${MONGODB_CONFIG.entities}.entity{.ts,.js}`)],
  // entities: [path.join(__dirname, `../../*.${MONGODB_CONFIG.entities}.entity{.ts,.js}`)],
  // entities: [`normalizedPath`],
};
console.log('MONGODB_DATABASE_CONFIG', MONGODB_DATABASE_CONFIG);

const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);
// console.log('MONGODB_DATA_SOURCE', MONGODB_DATA_SOURCE);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      await MONGODB_DATA_SOURCE.initialize();
      return MONGODB_DATA_SOURCE;
    },
  },
];
