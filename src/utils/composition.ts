type PromiseFunction<T, V> = (value: T) => Promise<V>|V

type ErrorPromiseFunction<T> = (err: any, value: T) => Promise<any>|any

export const sequence = <T, V>(initial: PromiseFunction<T, any>, ...funcs: PromiseFunction<any, any>[]): PromiseFunction<T, V> =>
  (value: T): Promise<V> =>
    funcs.reduce(
      (pipeline, func) =>
        pipeline.then((newValue: any) => Promise.resolve(func(newValue))),
      Promise.resolve(initial(value))
    )

export const parallel = <T>(...funcs: PromiseFunction<T, any>[]): PromiseFunction<T, any> =>
  (value: T): Promise<any> =>
    Promise.all(funcs.map(func => func(value)))

export const runForEach = <T, V>(func: PromiseFunction<T, V>): PromiseFunction<T[], any[]> =>
  (args: T[]): Promise<any[]> =>
    Promise.all(args.map(arg => func(arg)))

export const withHandler = <T, V>(func: PromiseFunction<T, V>, handler: ErrorPromiseFunction<T>) =>
  (value: T): Promise<V> =>
    Promise.resolve(func(value)).catch((err: any) => handler(err, value))
