import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SocketClient<NamespaceT> = Socket<DefaultEventsMap, DefaultEventsMap>;
type SocketNamespace = '/orders';

type SocketInstance = {
  '/orders': SocketClient<'/orders'>;
}

const socketsStore = new Map<SocketNamespace, SocketClient<SocketNamespace>>();

const useSockets = <T extends SocketNamespace>(namespace: T): SocketInstance[T] => {
  const config = useRuntimeConfig();
  const socketsUrl = config.public.webSocketsUrl + namespace;

  if (socketsStore.has(namespace)) {
    return socketsStore.get(namespace)!;
  }

  const socket = io(socketsUrl, {
    transports: ['websocket'],
    autoConnect: true,
  });

  socketsStore.set(namespace, socket);

  socket.on('connect', () => {
    console.log(`Connected WS to namespace ${namespace}`);
  });

  return socket;
};

export { useSockets };
