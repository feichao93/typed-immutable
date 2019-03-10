import Immutable from 'immutable'
import KeyPath from './KeyPath'
import Resolve from './Resolve'

type Updater<T> = (prev: T) => T

export function hasIn<D>(data: D, keyPath: KeyPath<D>) {
  return Immutable.hasIn(data, keyPath)
}

export function getIn<D, KS extends KeyPath<D>, NSV = Resolve<D, KS>>(
  data: D,
  keyPath: KS,
  notSetValue?: NSV,
): Resolve<D, KS> | NSV {
  return Immutable.getIn(data, keyPath, notSetValue)
}

export function setIn<D, KS extends KeyPath<D>>(data: D, keyPath: KS, value: Resolve<D, KS>): D {
  return Immutable.setIn(data, keyPath, value)
}

export function updateIn<D, KS extends KeyPath<D>>(
  data: D,
  keyPath: KS,
  updater: Updater<Resolve<D, KS>>,
): D {
  return Immutable.updateIn(data, keyPath, updater)
}

export function removeIn<D>(data: D, keyPath: KeyPath<D>): D {
  return Immutable.removeIn(data, keyPath)
}
