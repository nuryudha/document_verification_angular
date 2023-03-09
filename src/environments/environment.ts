// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ivEncryption: 'abc12345def67890',
  secretKeyEncryption: '12345abc67890def',
  detailUser: 'http://mff-gateway-acq-dev.apps.ocp4dev.muf.co.id/uaa-iam/user/',
  listCabang: 'http://master-acq-param-java-dev.apps.ocp4dev.muf.co.id/',
  findDocver: 'http://document-verification-search-period-java-dev.apps.ocp4dev.muf.co.id/',
  confirmDocver: 'http://confirm-docver-publisher-kafka-dev.apps.ocp4dev.muf.co.id/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
