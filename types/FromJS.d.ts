import Compatible from './Compatible'

type FromJS<T> = Readonly<Partial<Compatible<T>>>
export default FromJS
