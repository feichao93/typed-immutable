import { Map, Set, List, Record } from 'immutable'

// TODO 添加对 OrderedSet/OrderedMap 的支持

/** 利用 Plain 将一个对象的所有字段转换为「普通 JS 数据类型 」*/
type PlainObject<T> = { [P in keyof T]: Plain<T[P]> }

/** 从不可变数据类型中生成「普通 JS 数据类型 」，支持 `Record / List / Map / Set`.
 * 嵌套层次最多为 4
 */
// prettier-ignore
type Plain<D> =
  D extends Record<infer R> ? PlainObject<R> :
  D extends List<infer L> ? Array<Plain2<L>> :
  D extends Set<infer S> ? Array<Plain2<S>> :
  D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
  D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
  D

// prettier-ignore
type Plain2<D> =
  D extends Record<infer R> ? PlainObject<R> :
  D extends List<infer L> ? Array<Plain3<L>> :
  D extends Set<infer S> ? Array<Plain3<S>> :
  D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
  D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
  D

// prettier-ignore
type Plain3<D> =
  D extends Record<infer R> ? PlainObject<R> :
  D extends List<infer L> ? Array<Plain4<L>> :
  D extends Set<infer S> ? Array<Plain4<S>> :
  D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
  D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
  D

// prettier-ignore
type Plain4<D> =
  D extends Record<infer R> ? PlainObject<R> :
  D extends List<infer L> ? Array<L> :
  D extends Set<infer S> ? Array<S> :
  D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
  D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
  D

// // prettier-ignore
// type Plain4<D> =
//   D extends Record<infer R> ? PlainObject<R> :
//   D extends List<infer L> ? Array<Plain5<L>> :
//   D extends Set<infer S> ? Array<Plain5<S>> :
//   D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
//   D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
//   D

// // prettier-ignore
// type Plain5<D> =
//   D extends Record<infer R> ? PlainObject<R> :
//   D extends List<infer L> ? Array<Plain6<L>> :
//   D extends Set<infer S> ? Array<Plain6<S>> :
//   D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
//   D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
//   D

// // prettier-ignore
// type Plain6<D> =
//   D extends Record<infer R> ? PlainObject<R> :
//   D extends List<infer L> ? Array<Plain7<L>> :
//   D extends Set<infer S> ? Array<Plain7<S>> :
//   D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
//   D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
//   D

// // prettier-ignore
// type Plain7<D> =
//   D extends Record<infer R> ? PlainObject<R> :
//   D extends List<infer L> ? Array<L> :
//   D extends Set<infer S> ? Array<S> :
//   D extends Map<number, infer MV> ? { [key: number]: Plain<MV> } :
//   D extends Map<any, infer MV> ? { [key: string]: Plain<MV> } :
//   D

export default Plain
