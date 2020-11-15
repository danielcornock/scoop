import { startCase } from 'lodash';

export const emptyValidatorConfig = {
  message: (args) => `${startCase(args.property)} is a required field`
};
