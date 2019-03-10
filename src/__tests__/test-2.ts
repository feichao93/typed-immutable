import { List, Record } from 'immutable'
import FromJS from '../FromJS'

type Direction = 'up' | 'left' | 'right' | 'down'

class Position extends Record({ x: 0, y: 0 }) {
  static fromJS(obj: any) {
    return new Position(obj)
  }
}

class Bullet extends Record({
  pos: new Position(),
  direction: 'up' as Direction,
}) {
  static fromJS(obj: any) {
    return new Bullet(obj).update('pos', Position.fromJS)
  }
}

class Tank extends Record({
  pos: new Position(),
  direction: 'up' as Direction,
  bullets: List<Bullet>(),
}) {
  static fromJS(obj: FromJS<Tank>) {
    return new Tank(obj as any)
      .update('pos', Position.fromJS)
      .update('bullets', bullets => List(bullets).map(Bullet.fromJS))
  }
}

// 从空对象中构造 👍
Tank.fromJS({})

// 从已有的 tank 对象中构造 👍
const tank = new Tank()
Tank.fromJS(tank)

// 从普通 JS 数据结构中构造 👍
Tank.fromJS({
  direction: 'left',
  pos: { x: 1, y: 2 },
  bullets: [{ direction: 'left', pos: { x: 2, y: 2 } }],
})

// 只提供 bullets 字段 👍
Tank.fromJS({
  bullets: [{ direction: 'left', pos: { x: 2, y: 2 } }],
})

// bullets 字段使用不可变数据结构 👍
Tank.fromJS({
  bullets: List([new Bullet()]),
})

// 混用普通 JS 数据结构与不可变数据结构 👍
Tank.fromJS({
  bullets: [new Bullet(), { direction: 'left', pos: new Position() }],
})

// 输入不正确时，正确报告类型错误 👍
Tank.fromJS({
  direction: 'foo',  // ts(2322): Type '"foo"' is not assignable to type 'Direction'.
})

// 🚫 ts(2559): Type 'readonly [...]' has no properties in common with type 'Readonly<Partial<...>>'
Tank.fromJS(<const>[['direction', 'up'], ['pos', new Position()]])
