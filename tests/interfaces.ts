import { List, Record } from 'immutable'
import { FromJS } from 'typed-immutable'

export type Direction = 'up' | 'left' | 'right' | 'down'

export class Position extends Record({ x: 0, y: 0 }) {
  static fromJS(obj: any) {
    return new Position(obj)
  }
}

export class Bullet extends Record({
  pos: new Position(),
  direction: 'up' as Direction,
}) {
  static fromJS(obj: any) {
    return new Bullet(obj).update('pos', Position.fromJS)
  }
}

export class Tank extends Record({
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
