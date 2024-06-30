export class CreateFillingQuizDto {
    description: string[];
    answer: string[];
    quizId: string;

    constructor(description: string[], answer: string[], quizId: string) {
        this.description = description;
        this.answer = answer;
        this.quizId = quizId;
    }
}