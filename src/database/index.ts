import { connect, set } from 'mongoose';
import { NODE_ENV, MONGO_URI } from '@config';

export const dbConnection = async () => {
  const dbConfig = {
    url: MONGO_URI,
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  set('strictQuery', true);

  await connect(dbConfig.url);
};
