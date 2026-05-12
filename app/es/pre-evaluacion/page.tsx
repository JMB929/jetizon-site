import Link from "next/link";
import PreAssessmentForm from "../../components/pre-assessment-form";
import LanguageSwitcher from "../../components/language-switcher";

export default function SpanishPreAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,225,0,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(95,183,0,0.12),transparent_22%),linear-gradient(to_bottom,rgba(7,9,7,0.97),rgba(2,2,2,1))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_18px_rgba(132,225,0,0.7)]" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-300">
                Flujo de evaluacion de Jetizon
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher
                current="es"
                enHref="/pre-assessment"
                esHref="/es/pre-evaluacion"
              />
              <Link
                href="/es"
                className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300 transition hover:text-lime-300"
              >
                Volver al inicio
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Pre-evaluacion de Jetizon
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Envie detalles del sitio, fotos y documentos antes de una revision mas profunda.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                Este formulario es para propietarios, administradores y anfitriones que
                estan explorando carga Nivel 2 o carga para micromovilidad. Comparta lo
                basico ahora y Jetizon puede evaluar si el sitio merece avanzar hacia una
                conversacion con contratista, aliado, utility o coanfitrion.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:andre@jetizonmotorbikeintech.com"
                  className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Enviar correo a Jetizon
                </a>
                <Link
                  href="/es#contact"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ver resumen del sitio
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-lime-400/20 bg-black/25 p-7 shadow-2xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-300">
                Antes del paso tecnico completo
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Jetizon usa esta pagina para separar sitios creibles de sitios debiles.
              </h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Uso actual
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Evaluacion temprana antes de precios de contratista, recopilacion de
                    documentos de utilidad o revision con aliados.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Resultado tipico
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Siguiente paso mas claro, camino probable del proyecto y una lectura
                    temprana sobre si la oportunidad parece simple, condicionada o demasiado compleja.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                    Mejor senal inicial
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Un anfitrion que puede compartir control del sitio, contexto del
                    estacionamiento y fotos utiles desde la primera revision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
              Paquete inicial
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Comparta suficiente informacion para decidir si el sitio debe avanzar.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            La meta no es un paquete final de ingenieria. Es suficiente contexto para
            evaluar la oportunidad, detectar problemas obvios y decidir si vale la pena
            una revision mas profunda.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr]">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-lime-400/20 bg-lime-400/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                Que subir
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Fotos del estacionamiento, garaje, borde o zona de carga</li>
                <li>Fotos del panel electrico, cuarto de medidores o acceso de servicio</li>
                <li>Cartas de utilidad, planos o croquis si ya existen</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                Mejor encaje
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Propiedades multifamiliares o de uso mixto con estacionamiento</li>
                <li>Hoteles, garajes, lotes y sitios anfitriones de barrio</li>
                <li>Negocios explorando carga para inquilinos, huespedes o micromovilidad</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
                    Resumen del formulario
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Este formulario captura lo basico del sitio, fotos, rol del anfitrion
                    y objetivo de carga necesarios para una revision practica de primera pasada.
                  </p>
                </div>
                <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 px-4 py-3 text-xs font-medium uppercase tracking-[0.22em] text-lime-300">
                  Uso interno: evaluar primero
                </div>
              </div>
            </div>

            <PreAssessmentForm
              layout="full"
              locale="es"
              thankYouPath="/es/gracias"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
