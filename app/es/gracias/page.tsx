import Link from "next/link";
import LanguageSwitcher from "../../components/language-switcher";

export default function SpanishThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur text-center">
        <div className="mb-6 flex justify-center">
          <LanguageSwitcher current="es" enHref="/thank-you" esHref="/es/gracias" />
        </div>
        <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
          Solicitud recibida
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
          Gracias por enviar su informacion a Jetizon.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Su solicitud de pre-evaluacion fue enviada con exito. Jetizon revisara
          los detalles del sitio y cualquier material adjunto, y dara seguimiento si
          la ubicacion parece valer una revision mas profunda.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/es"
            className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Volver al inicio
          </Link>

          <Link
            href="/es/pre-evaluacion"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Enviar otra solicitud
          </Link>

          <a
            href="mailto:andre@jetizonmotorbikeintech.com"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Enviar correo a Jetizon
          </a>
        </div>
      </div>
    </div>
  );
}
