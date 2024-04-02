import { Environment } from './environment.model';
import { overrides } from './environment.development';

export const environment: Environment = {
  travelSpeed: 1,
  ...overrides,
};
