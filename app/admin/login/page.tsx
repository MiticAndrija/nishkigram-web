import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { isAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminSession()) {
    redirect("/admin/blog");
  }

  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans selection:bg-[#5c4a3d]/20">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6 pt-24">
        <form
          action="/api/admin/login"
          method="post"
          className="w-full max-w-md rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-8 shadow-xl"
        >
          <h1 className="font-serif text-3xl text-[#4a382b]">
            Prijava na sistem
          </h1>
          <p className="mt-2 text-sm text-[#5c4a3d]/75">
            Unesite lozinku za pristup administratorskom panelu.
          </p>
          <label className="mt-6 block">
            <span className="mb-2 block font-semibold text-[#4a382b]">
              Lozinka
            </span>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#f4efe6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
            />
          </label>
          <button className="mt-6 w-full rounded-lg bg-[#5c4a3d] px-6 py-3 font-semibold text-[#fdfaf6] transition-colors hover:bg-[#47382f]">
            Prijavi se
          </button>
        </form>
      </main>
    </div>
  );
}
