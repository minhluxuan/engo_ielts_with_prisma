import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prisma : PrismaService) {};

  async create(createTestDto: CreateTestDto) {
    const createdTest = await this.prisma.test.create({
      data: {}
    });

    if (createTestDto.reading && createTestDto.reading.length > 0) {
      for (const quizId of createTestDto.reading) {
        await this.prisma.testOnQuiz.create({
          data: {
            testId: createdTest.id,
            quizId: quizId
          }
        });
      }
    }

    if (createTestDto.listening && createTestDto.listening.length > 0) {
      for (const quizId of createTestDto.listening) {
        await this.prisma.testOnQuiz.create({
          data: {
            testId: createdTest.id,
            quizId: quizId
          }
        });
      }
    }

    if (createTestDto.writing && createTestDto.writing.length > 0) {
      for (const quizId of createTestDto.writing) {
        await this.prisma.testOnQuiz.create({
          data: {
            testId: createdTest.id,
            quizId: quizId
          }
        });
      }
    }

    if (createTestDto.speaking && createTestDto.speaking.length > 0) {
      for (const quizId of createTestDto.speaking) {
        await this.prisma.testOnQuiz.create({
          data: {
            testId: createdTest.id,
            quizId: quizId
          }
        });
      }
    }
  }

  async findAll() {
    const tests = await this.prisma.test.findMany({
      include: {
        reading: true,
        listening: true,
        writing: true,
        speaking: true,
      }
    });
  
    const testIds = tests.map(test => test.id);
    
    const quizzes = await this.prisma.testOnQuiz.findMany({
      where: {
        testId: { in: testIds }
      },
      include: {
        quiz: {
          include: {
            multipleChoice: {
              select: {
                id: true,
                options: true,
                description: true,
                answer: true
              }
            },
            filling: {
              select: {
                id: true,
                description: true,
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
  
    const uniqueTests = tests.map(test => ({
      ...test,
      reading: quizzesByTestId[test.id]?.reading || [],
      listening: quizzesByTestId[test.id]?.listening || [],
      writing: quizzesByTestId[test.id]?.writing || [],
      speaking: quizzesByTestId[test.id]?.speaking || []
    }));
  
    return uniqueTests;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
