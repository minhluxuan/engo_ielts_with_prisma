import { PrismaClient, QuizType, Skill } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

async function main() {
    const quiz1 = await prisma.quiz.upsert({
        where: { id: "abc" },
        update: {},
        create: {
            skill: Skill.LISTENING,
            type: QuizType.FILLING,
            content: "content of quiz 1"
        }
    });

    console.log(quiz1);
}

main().catch(e => {
    console.log(e);
}).finally(async () => {
    await prisma.$disconnect();
});