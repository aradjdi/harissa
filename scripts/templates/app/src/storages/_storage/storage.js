import LocalForageStorage from './localForageStorage';

/* @ngInject */
export default function storageSrv() {
  this.createForageStorage = name => new LocalForageStorage(name);

  return this;
}
