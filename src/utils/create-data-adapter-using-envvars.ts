import * as dotenv from 'dotenv';
import { XLSXAdapter } from '../adapters/xlsx';
import path from 'path';

export const createDataAdapterUsingEnvVars = async () => {
  dotenv.config();

  const dataTemplate = process.env.CT_DATA_TEMPLATE || 'alkemio-sdgs.ods';
  const data = new XLSXAdapter(path.join(__dirname, '../..', dataTemplate));

  return data;
};
