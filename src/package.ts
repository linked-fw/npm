import {linkedPackage} from '@_linked/core/utils/Package';

export const {
  linkedShape,
  linkedUtil,
  registerOntologies,
  registerPackageExport,
  registerPackageModule,
  getPackageShape,
  packageExports,
  packageName,
} = linkedPackage('@_linked/npm', {mirrors: 'https://linked.cm/ont/npm/'});
