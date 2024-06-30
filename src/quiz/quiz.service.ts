import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMultipleChoiceQuizDto } from './dto/create-multiple-choice-quiz';
import { CreateFillingQuizDto } from './dto/create-filling-quiz-dto'

@Injectable()
export class QuizService {

  constructor(private readonly prisma : PrismaService) {};

  createQuiz(createQuizDto : CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        type: createQuizDto.type,
        skill: createQuizDto.skill,
        content: createQuizDto.content
      }
    });
  }

  createMultipleChoiceQuiz(createMultipleChoiceQuizDto: CreateMultipleChoiceQuizDto) {
    return this.prisma.multipleChoiceQuiz.create({
      data: {
        options: createMultipleChoiceQuizDto.options,
        description: createMultipleChoiceQuizDto.description,
        answer: createMultipleChoiceQuizDto.answer,
        quiz: { connect: { id: createMultipleChoiceQuizDto.quizId } }
      }
    });
  }

  createFillingQuiz(createFillingQuizDto: CreateFillingQuizDto) {
    return this.prisma.fillingQuiz.create({
      data: {
        description: createFillingQuizDto.description,
        answer: createFillingQuizDto.answer,
        quiz: { connect: { id: createFillingQuizDto.quizId } }
      }
    });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        multipleChoice: true,
        filling: true,
      },
    });

    return quizzes;
  }

  findOne(id: string) {
    return this.prisma.quiz.findUnique({ 
      where: {
        id
      }
    });
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
