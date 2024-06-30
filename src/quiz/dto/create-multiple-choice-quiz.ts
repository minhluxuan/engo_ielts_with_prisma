import { IsString } from 'class-validator';
import { Quiz } from '@prisma/client';

export class CreateMultipleChoiceQuizDto {
    options: any;
    description: string[]
    answer: string[];
    quizId: string;

    constructor(options: any, description: string[], answer: string[], quizId: string) {
        this.options = options;
        this.description = description;
        this.answer = answer;
        this.quizId = quizId;
    }
}