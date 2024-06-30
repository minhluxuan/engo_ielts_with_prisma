export class CreateTestDto {

    reading: string[];
    listening: string[];
    writing: string[];
    speaking: string[];

    constructor(reading: string[], listening: string[], writing: string[], speaking: string[]) {
        this.reading = reading;
        this.listening = listening;
        this.writing = writing;
        this.speaking = speaking;
    }
}
