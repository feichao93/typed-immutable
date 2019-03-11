import { List, Map, Record, Set } from 'immutable'

type valueof<T> = T[keyof T]

export type CompatibleObject<T> = { [P in keyof T]: Compatible<T[P]> }

export type CompatibleKeyValuePairs<R> =
  ReadonlyArray<valueof<{ [P in keyof R]: readonly[P, Compatible<R[P]>] }>>

/** 从 immutable 数据类型中生成「普通 JS 数据类型 」 */
// prettier-ignore
export type Compatible<T> =
  T extends Record<infer R> ? CompatibleObject<R> | CompatibleKeyValuePairs<R> :
  T extends List<infer L> ? List<Compatible2<L>> | Array<Compatible2<L>> :
  T extends Set<infer S> ? Set<Compatible2<S>> | Array<Compatible2<S>> :
  T extends Map<number, infer MV> ? (
    | Map<number, Compatible2<MV>>
    | Iterable<readonly[number, Compatible2<MV>]>
    | { [key: number]: Compatible<MV> }
  ) :
  T extends Map<string, infer MV> ? (
    | Map<string, Compatible2<MV>>
    | Iterable<readonly[string, Compatible2<MV>]>
    | { [key: string]: Compatible<MV> }
  ) :
  T

// prettier-ignore
type Compatible2<T> =
  T extends Record<infer R> ? CompatibleObject<R> | CompatibleKeyValuePairs<R> :
  T extends List<infer L> ? List<Compatible3<L>> | Array<Compatible3<L>> :
  T extends Set<infer S> ? Set<Compatible3<S>> | Array<Compatible3<S>> :
  T extends Map<number, infer MV> ? (
    | Map<number, Compatible3<MV>>
    | Iterable<readonly[number, Compatible3<MV>]>
    | { [key: number]: Compatible<MV> }
  ) :
  T extends Map<string, infer MV> ? (
    | Map<string, Compatible3<MV>>
    | Iterable<readonly[string, Compatible3<MV>]>
    | { [key: string]: Compatible<MV> }
  ) :
  T

// prettier-ignore
type Compatible3<T> =
  T extends Record<infer R> ? CompatibleObject<R> | CompatibleKeyValuePairs<R> :
  T extends List<infer L> ? List<Compatible4<L>> | Array<Compatible4<L>> :
  T extends Set<infer S> ? Set<Compatible4<S>> | Array<Compatible4<S>> :
  T extends Map<number, infer MV> ? (
    | Map<number, Compatible4<MV>>
    | Iterable<readonly[number, Compatible4<MV>]>
    | { [key: number]: Compatible<MV> }
  ) :
  T extends Map<string, infer MV> ? (
    | Map<string, Compatible4<MV>>
    | Iterable<readonly[string, Compatible4<MV>]>
    | { [key: string]: Compatible<MV> }
  ) :
  T

// prettier-ignore
type Compatible4<T> =
  T extends Record<infer R> ? CompatibleObject<R> | CompatibleKeyValuePairs<R> :
  T extends List<infer L> ? Array<L> :
  T extends Set<infer S> ? Array<S> :
  T extends Map<number, infer MV> ? (
    | Map<number, MV>
    | Iterable<readonly[number, MV]>
    | { [key: number]: MV }
  ) :
  T extends Map<string, infer MV> ? (
    | Map<string, MV>
    | Iterable<readonly[string, MV]>
    | { [key: string]: Compatible<MV> }
  ) :
  T

export default Compatible
