import { Observable } from 'rxjs'
import { publish } from 'rxjs/operators'

class StreamUtil {
  // from: https://github.com/Reactive-Extensions/rx-node/blob/master/index.js
  streamToRx<T = any> (
    stream: NodeJS.ReadableStream,
    finishEventName = 'end',
    dataEventName = 'data',
  ): Observable<T> {
    stream.pause()

    return publish<T>()(
      new Observable<T>(observer => {
        const dataHandler = (data: T) => observer.next(data)
        const errorHandler = (err: any) => observer.error(err)
        const endHandler = () => observer.complete()

        stream
          .addListener(dataEventName, dataHandler)
          .addListener('error', errorHandler)
          .addListener(finishEventName, endHandler)

        stream.resume()

        return () => {
          stream
            .removeListener(dataEventName, dataHandler)
            .removeListener('error', errorHandler)
            .removeListener(finishEventName, endHandler)
        }
      }),
    ).refCount()
  }
}

export const streamUtil = new StreamUtil()
