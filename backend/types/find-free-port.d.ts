declare module 'find-free-port' {
    type FindFreePortCallback = (err: Error | null, freePort: number) => void;
    function findFreePort(startPort: number, cb: FindFreePortCallback): void;
    export default findFreePort;
  }
  