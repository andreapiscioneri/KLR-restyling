"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { adminLoginAction } from "@/lib/admin-actions";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { pending } = useFormStatus();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    
    try {
      const result = await adminLoginAction(email, password);
      // Se il server action ritorna un risultato (non redirect), c'è stato un errore
      if (result && !result.ok) {
        setError(result.error || "Errore durante l'accesso");
      }
      // Se il server action lancia redirect, non arriviamo qui
    } catch (err: unknown) {
      // Il redirect() lancia un errore speciale che Next.js cattura a livello superiore
      // Qui catchiamo solo errori di rete/runtime
      setError("Errore durante l'accesso. Prova di nuovo.");
      console.error("Login error:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 sm:mb-5">
        <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={pending}
          autoComplete="email"
          className="min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-[0.95rem] text-white outline-none placeholder:text-white/30 sm:text-sm disabled:opacity-50"
          placeholder="andrea.piscioneri@denani.it"
        />
      </div>
      <div className="mb-6 sm:mb-7">
        <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 6, fontWeight: 500 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={pending}
          autoComplete="current-password"
          className="min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-[0.95rem] text-white outline-none placeholder:text-white/30 sm:text-sm disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <div className="mb-4 text-center text-[0.8rem] text-[#ff6b6b] sm:text-[0.82rem]">{error}</div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 w-full rounded-xl bg-[#F8AE01] px-4 py-3 text-[0.95rem] font-bold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
      >
        {pending ? "Accesso in corso..." : "Accedi"}
      </button>
    </form>
  );
}

export default function AdminLogin() {
  useEffect(() => {
    document.body.dataset.cursorTheme = "yellow";
    return () => {
      delete document.body.dataset.cursorTheme;
    };
  }, []);


  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0c0934_0%,#2E2784_60%,#1a1660_100%)] px-4 py-8 flex items-center justify-center sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px] rounded-[24px] border border-white/12 bg-white/5 p-6 backdrop-blur-[20px] sm:p-8 md:p-10">
        <div className="mb-8 text-center sm:mb-10">
          <Image src="/klr-logo.png" alt="KLR" width={160} height={54} className="mx-auto mb-4 h-8 w-auto sm:h-9" />
          <div className="mt-2 text-[0.8rem] text-white/50 sm:text-[0.82rem]">Pannello di Amministrazione</div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
