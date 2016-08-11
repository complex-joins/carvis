const DB_CONFIG_OBJ = require('../../secret/config').DB_CONFIG_OBJ;
import Stork from './stork/index';

export default new Stork(DB_CONFIG_OBJ, 'pg');
