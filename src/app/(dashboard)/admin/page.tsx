import { authOptions } from "@/app/api/lib/authOptions";
import AdminPage from "@/component/admin/AdminPage";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session.user) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  return (
    <div>
      <AdminPage />
    </div>
  );
};

export default page;
