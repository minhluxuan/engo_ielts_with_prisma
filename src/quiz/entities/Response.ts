export class Response<T> {
    private success: boolean;
    private message: string;
    private data: T

    constructor(success: boolean, message: string, data: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}