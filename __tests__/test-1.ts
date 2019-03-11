import { List, Record } from 'immutable'
import { getIn, KeyPath, Plain } from 'typed-immutable'

type Direction = 'up' | 'left' | 'right' | 'down'

class Position extends Record({
  x: 0,
  y: 0,
}) {
  static fromJS(obj: any) {
    return new Position(obj)
  }

  // Position.distance(p1, p2) 计算两个位置之间的距离
  static distance(p1: Position, p2: Position) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }
}

class Bullet extends Record({
  pos: new Position(),
  direction: 'up' as Direction,
}) {}

class Tank extends Record({
  pos: new Position(),
  direction: 'up' as Direction,
  bullets: List<Bullet>(), // 子弹列表，一架坦克有多发子弹
}) {}

/* ============ Position 使用示例 ============ */
const p1 = new Position() // `Position` 可以作为「值的名称」
const p2 = Position() // 🚫 TS(2348): Value of type 'typeof Position' is not callable.

const p3: Position = null // `Position` 也可以作为「类型的名称」
const list1 = List<Position>() // 作为泛型参数
function f1(pos: Position) {} // 或作为函数参数类型声明

type T2 = Plain<Tank>
// type T2 = {
//   pos: { x: number; y: number }
//   direction: Direction
//   bullets: Array<{
//     pos: { x: number; y: number }
//     direction: Direction
//   }>
// }

// 准确表达 toJS() 方法的返回值类型了 👍
const tank = new Tank()
const plainTank: Plain<Tank> = tank.toJS()

type TankKeyPath = KeyPath<Tank>
// =>
// type TankKeyPath =
//   | readonly['pos']
//   | readonly['pos', 'x']
//   | readonly['pos', 'y']
//   | readonly['direction']
//   | readonly['bullets', number]
//   | readonly['bullets', number, 'pos']
//   | readonly['bullets', number, 'pos', 'x']
//   | readonly['bullets', number, 'pos', 'y']
//   | readonly['bullets', number, 'direction']

// 获取坦克下标为 3 的子弹的 x 坐标
const x = getIn(tank, <const>['bullets', 3, 'pos'])

const x2 = getIn(tank, <const>[])
