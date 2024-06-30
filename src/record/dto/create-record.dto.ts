export class CreateRecordDto {
    testId: string;
    userId: string;

    reading: any;
    listening: any;
    writing: any;
    speaking: any;
    
    constructor(testId: string, userId: string, reading: any, listening: any, writing: any, speaking: any) {
        this.testId = testId;
        this.userId = userId;
        this.reading = reading;
        this.listening = listening;
        this.writing = writing;
        this.speaking = speaking;
    }
}
