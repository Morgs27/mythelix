import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(options);

  if (!session){
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <div>You are a server side member! Hooray
      <p>
        {session?.user?.role}
      </p>
    </div>
  )
}

export default page