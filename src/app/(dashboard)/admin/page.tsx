import { authOptions } from "@/app/api/lib/authOptions";
import AdminPage from "@/component/admin/AdminPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <AdminPage />
    </div>
  );
};

export default page;
