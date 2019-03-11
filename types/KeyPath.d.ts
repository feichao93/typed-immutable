import { List, Map, Record, Set } from 'immutable'

type valueof<T> = T[keyof T]

type KeyPath<D> = readonly [] | KeyPath1<D>

// prettier-ignore
type KeyPath1<D> = readonly [] | (
  D extends List<infer L> ? readonly[number] | KeyPath2<number, L> :
  D extends Set<infer S> ? readonly[S] | KeyPath2<S, S> :
  D extends Map<infer MK, infer MV> ? readonly[MK] | KeyPath2<MK, MV> :
  D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[Key] | KeyPath2<Key, R[Key]> }> :
  never
)

// prettier-ignore
type KeyPath2<K1, D> =
  D extends List<infer L> ? readonly[K1, number] | KeyPath3<K1, number, L>:
  D extends Set<infer S> ? readonly[K1, S] | KeyPath3<K1, S, S> :
  D extends Map<infer MK, infer MV> ? readonly[K1, MK] | KeyPath3<K1, MK, MV> :
  D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, Key] | KeyPath3<K1, Key, R[Key]> }> :
  never

// prettier-ignore
type KeyPath3<K1, K2, D> =
  D extends List<infer L> ? readonly[K1, K2, number] | KeyPath4<K1, K2, number, L> :
  D extends Set<infer S> ? readonly[K1, K2, S] | KeyPath4<K1, K2, S, S> :
  D extends Map<infer MK, infer MV> ? readonly[K1, K2, MK] | KeyPath4<K1, K2, MK, MV> :
  D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, K2, Key] | KeyPath4<K1, K2, Key, R[Key]> }> :
  never

// prettier-ignore
type KeyPath4<K1, K2, K3, D> =
  D extends List<any> ? readonly[K1, K2, K3, number] :
  D extends Set<infer S> ? readonly[K1, K2, K3, S] :
  D extends Map<infer MK, any> ? readonly[K1, K2, K3, MK] :
  D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, K2, K3, Key] }> :
  never

// // prettier-ignore
// type KeyPath4<K1, K2, K3, D> =
//   D extends List<infer L> ? readonly[K1, K2, K3, number] | KeyPath5<K1, K2, K3, number, L> :
//   D extends Set<infer S> ? readonly[K1, K2, K3, S] | KeyPath5<K1, K2, K3, S, S> :
//   D extends Map<infer MK, infer MV> ? readonly[K1, K2, K3, MK] | KeyPath5<K1, K2, K3, MK, MV> :
//   D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, K2, K3, Key] | KeyPath5<K1, K2, K3, Key, R[Key]> }> :
//   never

// // prettier-ignore
// type KeyPath5<K1, K2, K3, K4, D> =
//   D extends List<infer L> ? readonly[K1, K2, K3, K4, number] | KeyPath6<K1, K2, K3, K4, number, L> :
//   D extends Set<infer S> ? readonly[K1, K2, K3, K4, S] | KeyPath6<K1, K2, K3, K4, S, S> :
//   D extends Map<infer MK, infer MV> ? readonly[K1, K2, K3, K4, MK] | KeyPath6<K1, K2, K3, K4, MK, MV> :
//   D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, K2, K3, K4, Key] | KeyPath6<K1, K2, K3, K4, Key, R[Key]> }> :
//   never

// // prettier-ignore
// type KeyPath6<K1, K2, K3, K4, K5, D> =
//   D extends List<infer L> ? readonly[K1, K2, K3, K4, K5, number] | KeyPath7<K1, K2, K3, K4, K5, number, L> :
//   D extends Set<infer S> ? readonly[K1, K2, K3, K4, K5, S] | KeyPath7<K1, K2, K3, K4, K5, S, S> :
//   D extends Map<infer MK, infer MV> ? readonly[K1, K2, K3, K4, K5, MK] | KeyPath7<K1, K2, K3, K4, K5, MK, MV> :
//   D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, K2, K3, K4, K5, Key] | KeyPath7<K1, K2, K3, K4, K5, Key, R[Key]> }> :
//   never

// // prettier-ignore
// type KeyPath7<K1, K2, K3, K4, K5, K6, D> =
//   D extends List<any> ? readonly[K1, K2, K3, K4, K5, K6, number] :
//   D extends Set<infer S> ? readonly[K1, K2, K3, K4, K5, K6, S] :
//   D extends Map<infer MK, any> ? readonly[K1, K2, K3, K4, K5, K6, MK] :
//   D extends Record<infer R> ? valueof<{ [Key in keyof R]: readonly[K1, K2, K3, K4, K5, K6, Key] }> :
//   never

export default KeyPath
