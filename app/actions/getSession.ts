import { getServerSession } from "next-auth";
import authOptions from "@/app/libs/configs/auth/authOptions";

export default async function getSession() {
  return getServerSession(authOptions);
}
