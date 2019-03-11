import { List } from 'immutable'
import { getIn, KeyPath, Plain } from 'typed-immutable'
import { Bullet, Position, Tank } from './interfaces'

/* ============ Position 使用示例 ============ */
const p1 = new Position() // `Position` 可以作为「值的名称」
const p2 = Position() // 🚫 ts(2348)

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

// 从空对象中构造 👍
Tank.fromJS({})

// 从已有的 tank 对象中构造 👍
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
  direction: 'foo', // 🚫 ts(2322)
})

// 从 key-value pair 中构造 👍
Tank.fromJS(<const>[['direction', 'up'], ['pos', new Position()]])
