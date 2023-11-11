declare class Server {
    private app;
    private port;
    private apiPaths;
    private server;
    constructor();
    private middlewares;
    private routes;
    listen(): void;
}
export default Server;
