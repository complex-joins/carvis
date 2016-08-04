import { UBER_CLIENT_ID, UBER_CLIENT_SECRET } from '../secret/apikeys';
export default {
  'server': {
    'protocol': 'http',
    'host': 'localhost:8000',
    // 'callback': '/callback',
    'transport': 'session',
    'state': true
  },
  'uber': {
    'key': UBER_CLIENT_ID,
    'secret': UBER_CLIENT_SECRET,
    // 'scope': ['scope1', 'scope2'],
    'callback': '/auth/uber/callback',
  },
  'lyft': {

  },
};
