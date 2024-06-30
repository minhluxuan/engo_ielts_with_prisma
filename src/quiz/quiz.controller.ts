import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Response } from './entities/Response';
import { QuizType } from '@prisma/client';
import { CreateMultipleChoiceQuizDto } from './dto/create-multiple-choice-quiz';
import { CreateFillingQuizDto } from './dto/create-filling-quiz-dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto, @Res() res): Promise<any> {
    try {
      if (createQuizDto.multipleChoice && createQuizDto.filling) {
        throw new HttpException("Hoặc là FILLING hoặc là MULTIPLE_CHOICE được cho phép", HttpStatus.BAD_REQUEST);
      }
  
      const createdQuiz = await this.quizService.createQuiz(createQuizDto);
      if (!createdQuiz) {
        throw new HttpException("Đã xảy ra lỗi. Vui lòng thử lại", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      if (createQuizDto.type == QuizType.MULTIPLE_CHOICE) {
        const createMultipleChoiceQuizDto = new CreateMultipleChoiceQuizDto(createQuizDto.multipleChoice.options, createQuizDto.multipleChoice.description, createQuizDto.multipleChoice.answer, createdQuiz.id);
        const createdMultipleChoiceQuiz = await this.quizService.createMultipleChoiceQuiz(createMultipleChoiceQuizDto);
        return res.status(HttpStatus.CREATED).json(new Response(true, "Tạo câu hỏi thành công", createdMultipleChoiceQuiz));
      }

      const createFillingQuizDto = new CreateFillingQuizDto(createQuizDto.filling.description, createQuizDto.filling.answer, createdQuiz.id);
      const createdFillingQuiz = await this.quizService.createFillingQuiz(createFillingQuizDto);
      return res.status(HttpStatus.CREATED).json(new Response(true, "Tạo câu hỏi thành công", createdFillingQuiz));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new Response(false, error.message, null));
    }
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
