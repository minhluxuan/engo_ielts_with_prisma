import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizType } from '@prisma/client';
import { GetRecordDto } from './dto/get-record.dto';

@Injectable()
export class RecordService {
  constructor(private readonly prisma : PrismaService) {};

  async create(createRecordDto: CreateRecordDto) {
    const test = await this.prisma.test.findUnique({
      where: {
        id: createRecordDto.testId
      },
      include: {
        reading: true,
        listening: true,
        writing: true,
        speaking: true,
      }
    });

    const quizzes = await this.prisma.testOnQuiz.findMany({
      where: {
        testId: createRecordDto.testId
      },
      include: {
        quiz: {
          include: {
            multipleChoice: {
              select: {
                id: true,
                answer: true
              }
            },
            filling: {
              select: {
                id: true,
                answer: true
              }
            },
          }
        }
      }
    });
  
    const quizzesByTestId = quizzes.reduce((acc, item) => {
      if (!acc[item.testId]) {
        acc[item.testId] = {
          reading: [],
          listening: [],
          writing: [],
          speaking: []
        };
      }
  
      acc[item.testId][item.quiz.skill.toLowerCase()].push(item.quiz);
  
      return acc;
    }, {});
  
    const answers = {
      ...test,
      reading: quizzesByTestId[test.id]?.reading || [],
      listening: quizzesByTestId[test.id]?.listening || [],
      writing: quizzesByTestId[test.id]?.writing || [],
      speaking: quizzesByTestId[test.id]?.speaking || []
    };

    let mark = 0;
    for (const quiz of answers.reading) {
      for (const submitQuiz of createRecordDto.reading) {
        if (quiz.id === submitQuiz.id) {
          if (quiz.type === QuizType.MULTIPLE_CHOICE) {
            if (quiz.multipleChoice.answer.length === submitQuiz.answer.length) {
              for (let i = 0; i < quiz.multipleChoice.answer.length; i++) {
                if (quiz.multipleChoice.answer[i] === submitQuiz.answer[i]) {
                  mark++;
                }
              }
            }
          }
          else if (quiz.type === QuizType.FILLING) {
            if (quiz.filling.answer.length === submitQuiz.answer.length) {
              for (let i = 0; i < quiz.filling.answer.length; i++) {
                if (quiz.filling.answer[i] === submitQuiz.answer[i]) {
                  mark++;
                }
              }
            }
          }
  
        }
      }
    }

    for (const quiz of answers.listening) {
      for (const submitQuiz of createRecordDto.listening) {
        if (quiz.id === submitQuiz.id) {
          if (quiz.type === QuizType.MULTIPLE_CHOICE) {
            if (quiz.multipleChoice.answer.length === submitQuiz.answer.length) {
              for (let i = 0; i < quiz.answer.length; i++) {
                if (quiz.answer[i] === submitQuiz.answer[i]) {
                  mark++;
                }
              }
            }
          }
          else if (quiz.type === QuizType.FILLING) {
            if (quiz.filling.answer.length === submitQuiz.answer.length) {
              for (let i = 0; i < quiz.filling.answer.length; i++) {
                if (quiz.filling.answer[i] === submitQuiz.answer[i]) {
                  mark++;
                }
              }
            }
          }
        }
      }
    }

    await this.prisma.record.create({
      data: {
        userId: createRecordDto.userId,
        testId: createRecordDto.testId,

        reading: createRecordDto.reading,
        listening: createRecordDto.listening,
        writing: createRecordDto.writing,
        speaking: createRecordDto.speaking,

        score: mark,
      }
    });

    return mark;
  }

  findAll(getRecordDto : GetRecordDto) {
    console.log(getRecordDto.testId);
    return this.prisma.record.findMany({
      where: {
        testId: getRecordDto.testId,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
