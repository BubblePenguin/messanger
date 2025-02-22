import getCurrentuser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentuser = await getCurrentuser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentuser) return new NextResponse("UNATHORIZED", { status: 401 });

    const updatedUser = await prisma.user.update({
      where: {
        id: currentuser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error, "ERROR_SETTINGS");
    return new NextResponse("SettingRouteError", { status: 500 });
  }
}
