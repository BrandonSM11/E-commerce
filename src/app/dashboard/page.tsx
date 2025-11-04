import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import ContactForm from "../component/contactForm";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">
        Bienvenido, {session.user?.name || "usuario"} 👋
      </h1>

      <ContactForm />
    </div>
  );
}