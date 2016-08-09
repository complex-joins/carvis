import Stork from './stork/Stork';
import { DB_CONFIG_OBJ } from '../../secret/config';

export const db = new Stork(DB_CONFIG_OBJ);
