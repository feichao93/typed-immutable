import { List, Map, Record } from 'immutable'

// prettier-ignore
type ResolveLevel1<D, K1> =
  D extends List<infer L> ? (K1 extends number ? L : never) :
  D extends Map<infer MK, infer MV> ? (K1 extends MK ? MV : never) :
  D extends Record<infer R> ? (K1 extends keyof R ? R[K1] : never) :
  never

type ResolveLevel2<D, K1, K2> = ResolveLevel1<ResolveLevel1<D, K1>, K2>
type ResolveLevel3<D, K1, K2, K3> = ResolveLevel1<ResolveLevel2<D, K1, K2>, K3>
type ResolveLevel4<D, K1, K2, K3, K4> = ResolveLevel1<ResolveLevel3<D, K1, K2, K3>, K4>
// type ResolveLevel5<D, K1, K2, K3, K4, K5> = ResolveLevel1<ResolveLevel4<D, K1, K2, K3, K4>, K5>
// type ResolveLevel6<D, K1, K2, K3, K4, K5, K6> = ResolveLevel1<ResolveLevel5<D, K1, K2, K3, K4, K5>, K6>
// type ResolveLevel7<D, K1, K2, K3, K4, K5, K6, K7> = ResolveLevel1<ResolveLevel6<D, K1, K2, K3, K4, K5, K6>, K7>

/** 用于从不可变数据中获取 keyPath 对应的数据类型 */
// prettier-ignore
type Resolve<D, KS extends readonly any[]> =
  KS extends readonly[] ? D :
  KS extends readonly[infer K1] ? ResolveLevel1<D, K1> :
  KS extends readonly[infer K1, infer K2] ? ResolveLevel2<D, K1, K2> :
  KS extends readonly[infer K1, infer K2, infer K3] ? ResolveLevel3<D, K1, K2, K3> :
  KS extends readonly[infer K1, infer K2, infer K3, infer K4] ? ResolveLevel4<D, K1, K2, K3, K4> :
  // KS extends readonly[infer K1, infer K2, infer K3, infer K4, infer K5] ? ResolveLevel5<D, K1, K2, K3, K4, K5> :
  // KS extends readonly[infer K1, infer K2, infer K3, infer K4, infer K5, infer K6] ? ResolveLevel6<D, K1, K2, K3, K4, K5, K6> :
  // KS extends readonly[infer K1, infer K2, infer K3, infer K4, infer K5, infer K6, infer K7] ? ResolveLevel7<D, K1, K2, K3, K4, K5, K6, K7> :
  never

export default Resolve
