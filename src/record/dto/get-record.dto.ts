export class GetRecordDto {
    testId: string;
    userId: string;

    constructor(testId: string, userId: string) {
        this.testId = testId;
        this.userId = userId;
    }
}