import {linkedPackage} from '@_linked/core/utils/Package';

export const {
  linkedShape,
  linkedUtil,
  linkedOntology,
  registerPackageExport,
  registerPackageModule,
  getPackageShape,
  packageExports,
  packageName,
} = linkedPackage('@_linked/npm', {mirrors: 'https://linked.cm/ont/npm/'});
