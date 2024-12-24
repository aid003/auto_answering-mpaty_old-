import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function chekIdAdvForAnswer(idAdv) {
  let message = "";
  const currentIdAdv = [
    { id: 4580751880, type: "telegram" },
    { id: 4581321680, type: "telegram" },
    { id: 4517441116, type: "telegram" },
    { id: 4516692170, type: "telegram" },
  ];

  for (let adv of currentIdAdv) {
    if (adv.id === idAdv) {
      message = await prisma.messages.findUnique({
        where: {
          typeAdvertizing: adv.type,
        },
        select: {
          text: true,
        },
      });
    }
  }

  if (message === "") {
    message = await prisma.messages.findUnique({
      where: {
        typeAdvertizing: "all",
      },
      select: {
        text: true,
      },
    });
  }

  return message.text;
}
