# typed-immutable

一些用于嵌套 Immutable.js 数据结构下 TS 类型工具。详情可见 [知乎专栏文章](https://zhuanlan.zhihu.com/p/58679875)。

## 安装

本项目要求 TS 版本 >= 3.4。鉴于 TS 3.4 尚未发布，目前只能通过 `yarn add typescript@next` 进行安装，故安装本项目请使用 githubname/reponame 的方式。

```bash
yarn add shinima/typed-immutable
```

## API

### 类型安全的 `getIn/setIn`

提供了类型安全的 `getIn, hasIn, removeIn, setIn, updateIn`。注意参数 keyPath 需要使用 `<const>[...]` 的方式进行书写。下方 `Tank` 相关类型的定义详见 [/tests/interfaces.ts](/tests/interfaces.ts)。

```typescript
import { Map, List, Set, Record } from 'immutable'
import { getIn, hasIn, removeIn, setIn, updateIn } from 'typed-immutable'

const tank = new Tank()
const x = getIn(tank, <const>['bullets', 3, 'pos', 'x'])
```

**效果预览：**

![getIn 效果预览](https://cdn.nlark.com/yuque/0/2019/gif/169379/1551972611194-508b51bb-d240-4777-bb35-2fc14cf7a720.gif)

### `Plain<D>`

从不可变数据类型中生成「普通 JS 数据类型 」，支持 `Record / List / Map / Set`，数据结构的嵌套层次最多为 4。

```typescript
import { Map, List, Set, Record } from 'immutable'
import { Plain } from 'typed-immutable'

type A1 = Plain<List<number>>
// type A1 = number[]

type A2 = Plain<Map<string, Set<number>>>
// type A2 = { [key: string]: number[] }

class Point extends Record({ x: 0, y: 0 }) {}
type A3 = Plain<Point>
// type A3 = { x: number, y: number }

class Polygon extends Record({
  points: List<Point>(),
  stroke: 'black',
  fill: 'none',
}) {}
type A4 = Plain<Polygon>
// type A4 = {
//   points: Array<{ x: number, y: number }>
//   stroke: string
//   fill: string
// }
```

### `Resolve<D, KS>`

用于从不可变数据（类型为 `D`）中获取 keyPath（类型为 `KS`）对应的数据类型，支持 `Record / List / Map / Set`，数据结构的嵌套层次最多为 4。

```typescript
type A = Resolve<List<string>, [number]>
// type A = string

type B1 = Resolve<Map<string, List<number>>, [string]>
// type B1 = List<number>
type B2 = Resolve<Map<string, List<numebr>>, [string, number]>
// type B2 = number

type C1 = Resolve<Tank, ['bullets']> // Tank 类型来自 /tests/interfaces.ts
// type C1 = List<Bullet>
type C2 = Resolve<Tank, ['pos', 'x']>
// type C2 = number
```

### `KeyPath<D>`

计算不可变数据的合法索引序列的类型，支持 `Record / List / Map / Set`，数据结构的嵌套层次最多为 4。

```typescript
type A = KeyPath<List<string>>
// type A = readonly[] | readonly[number]

type B = KeyPath<Map<string, List<number>>>
// type B =
//   | readonly[]
//   | readonly[string]
//   | readonly[string, number]

// Tank 类型来自 /tests/interfaces.ts
type C = KeyPath<Tank>
// type C =
//   | readonly[]
//   | readonly['pos']
//   | readonly['pos', 'x']
//   | readonly['pos', 'y']
//   | readonly['direction']
//   | readonly['bullets', number]
//   | readonly['bullets', number, 'pos']
//   | readonly['bullets', number, 'pos', 'x']
//   | readonly['bullets', number, 'pos', 'y']
//   | readonly['bullets', number, 'direction']
```

### `Compatible<D>` TODO

### `FromJS<D>` TODO
