import { IsString, IsOptional } from 'class-validator';
import { QuizType, Skill } from "@prisma/client";
import { CreateMultipleChoiceQuizDto } from './create-multiple-choice-quiz';
import { CreateFillingQuizDto } from './create-filling-quiz-dto';

export class CreateQuizDto {
    @IsString()
    content: string;

    type: QuizType;

    skill: Skill;
    
    @IsOptional()
    multipleChoice: CreateMultipleChoiceQuizDto;

    @IsOptional()
    filling: CreateFillingQuizDto;
}
