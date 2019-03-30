import KeyPath from './KeyPath'
import Resolve from './Resolve'

type Updater<T> = (prev: T) => T

export declare function hasIn<D>(data: D, keyPath: KeyPath<D>): boolean

export function getIn<D, KS extends KeyPath<D>, NSV = Resolve<D, KS>>(
  data: D,
  keyPath: KS,
  notSetValue?: NSV,
): Resolve<D, KS> | NSV

export function setIn<D, KS extends KeyPath<D>>(data: D, keyPath: KS, value: Resolve<D, KS>): D

export function updateIn<D, KS extends KeyPath<D>>(
  data: D,
  keyPath: KS,
  updater: Updater<Resolve<D, KS>>,
): D

export function removeIn<D>(data: D, keyPath: KeyPath<D>): D
