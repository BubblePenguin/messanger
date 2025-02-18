import prisma from "@/app/libs/prismadb";
import getCurrentuser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentuser();

  if (!currentUser?.id) return [];

  try {
    const conversation = await prisma.conversation.findMany({
      orderBy: {
        leastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversation;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
