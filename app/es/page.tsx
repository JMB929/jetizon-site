"use client";

import Link from "next/link";
import FaqBlock from "../components/faq-block";
import LanguageSwitcher from "../components/language-switcher";

export default function SpanishPage() {
  const operatingModel = [
    "Filtrar sitios anfitriones prometedores antes de que entren en la ruta equivocada.",
    "Coordinar las preguntas tempranas de utilidades, contratistas y aliados que definen la viabilidad.",
    "Avanzar los sitios seleccionados con estructuras de coanfitrion y alianzas que realmente puedan escalar.",
  ];

  const fitSignals = [
    "Ya existe estacionamiento o acceso de borde util",
    "El propietario del sitio puede autorizar la exploracion",
    "La carga responde a una necesidad clara de residentes, huespedes o micromovilidad",
  ];

  const pillars = [
    {
      title: "Micromovilidad Electrica",
      text: "Jetizon se enfoca en oportunidades practicas de movilidad electrica que conectan sitios anfitriones, acceso de carga y casos reales de uso urbano.",
    },
    {
      title: "Desarrollo de Sitios",
      text: "Jetizon ayuda a propietarios, negocios y anfitriones a evaluar y avanzar oportunidades de carga Nivel 2 y micromovilidad.",
    },
    {
      title: "Inteligencia de Baterias",
      text: "Con el tiempo, la vision de Jetizon busca expandirse hacia una mayor conciencia de baterias, seguridad e infraestructura de carga guiada por datos.",
    },
  ];

  const roadmap = [
    {
      phase: "Fase 1",
      title: "Originacion de Sitios Anfitriones",
      text: "Construir la ruta de captacion y evaluacion de Jetizon, calificar oportunidades y crear un camino practico para proyectos iniciales.",
    },
    {
      phase: "Fase 2",
      title: "Proyectos con Aliados y Coanfitriones",
      text: "Avanzar sitios seleccionados con aliados de instalacion, estructuras de coanfitrion y despliegues escalonados que prueben traccion real.",
    },
    {
      phase: "Fase 3",
      title: "Ecosistema Mas Amplio de Carga",
      text: "Expandirse desde la facilitacion y proyectos dirigidos por aliados hacia un ecosistema mas amplio de carga Jetizon con crecimiento inteligente de infraestructura.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,225,0,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(95,183,0,0.12),transparent_22%),linear-gradient(to_bottom,rgba(7,9,7,0.97),rgba(2,2,2,1))]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
            <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 uppercase tracking-[0.24em] text-lime-300">
              Infraestructura de carga y movilidad electrica
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-slate-400">
              <LanguageSwitcher current="es" enHref="/" esHref="/es" />
              <a href="#vision" className="transition hover:text-lime-300">
                Vision
              </a>
              <a href="#roadmap" className="transition hover:text-lime-300">
                Ruta
              </a>
              <a href="#contact" className="transition hover:text-lime-300">
                Pre-evaluacion
              </a>
              <a href="#faq" className="transition hover:text-lime-300">
                Preguntas
              </a>
            </div>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6">
                <img
                  src="/jetizon-brand-banner.webp"
                  alt="Jetizon EV y Energia"
                  className="h-auto w-[20rem] max-w-full object-contain"
                />
                <span className="mt-4 block text-sm font-medium uppercase tracking-[0.28em] text-lime-400">
                  Jetizon Motorbike Intech LLC
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
                Haciendo mas facil evaluar, estructurar y avanzar oportunidades de carga.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Jetizon esta construyendo un negocio de facilitacion de sitios de carga
                y desarrollo de sitios anfitriones enfocado en oportunidades de Nivel 2
                y micromovilidad, con una vision de largo plazo hacia un ecosistema de
                carga mas conectado.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Contactar a Jetizon
                </a>
                <a
                  href="#roadmap"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ver ruta
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold text-lime-400">NYC</div>
                  <p className="mt-1 text-sm text-slate-300">Enfoque urbano</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold text-lime-400">EV + Micro</div>
                  <p className="mt-1 text-sm text-slate-300">Vision del ecosistema</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold text-lime-400">Seguridad</div>
                  <p className="mt-1 text-sm text-slate-300">Hoja de ruta de baterias</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-full max-w-2xl rounded-[2rem] border border-lime-400/15 bg-white/5 p-6 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                  <img
                    src="/jetizon-brand-banner.webp"
                    alt="Logo de Jetizon"
                    className="mx-auto w-full max-w-[28rem] opacity-95 drop-shadow-[0_0_24px_rgba(132,225,0,0.35)]"
                  />
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-lime-300">
                      Modelo operativo actual
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                      {operatingModel.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-lime-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.5rem] border border-lime-400/20 bg-lime-400/8 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-lime-300">
                      Senales fuertes
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-200">
                      {fitSignals.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-lime-300">
                        Mejor camino inicial
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Empezar con evaluacion, avanzar con despliegue apoyado por aliados
                        y escalar solo los sitios que demuestren traccion real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr]">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">La vision</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Jetizon comienza con facilitacion, no con exageracion.
            </h2>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7">
            <p className="text-lg leading-8 text-slate-300">
              El papel de Jetizon en esta etapa es ayudar a identificar, evaluar y avanzar
              oportunidades reales de carga. Con el tiempo, ese trabajo busca crecer hacia
              un ecosistema mas amplio apoyado por mejor inteligencia del sitio, alianzas
              mas fuertes y una infraestructura de carga mas inteligente.
            </p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-lime-400/60 via-white/10 to-transparent" />
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Jetizon esta construyendo una ruta disciplinada desde la evaluacion del sitio
              hasta el despliegue practico, alianzas mas fuertes y mayor capacidad operativa
              a largo plazo.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur"
            >
              <div className="mb-4 h-12 w-12 rounded-2xl bg-lime-400/10 ring-1 ring-lime-400/30" />
              <h3 className="text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">Ruta</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Como la vision toma forma.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Jetizon se esta desarrollando por fases, empezando con base de marca,
            luego despliegues piloto y colaboraciones estrategicas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {roadmap.map((item) => (
            <div
              key={item.phase}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 shadow-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm uppercase tracking-[0.25em] text-lime-400">
                  {item.phase}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-lime-400/50 to-transparent" />
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
              Pre-evaluacion
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Comparta detalles del sitio antes de una revision mas profunda.
            </h2>
            <p className="mt-6 text-sm leading-8 text-slate-300">
              Jetizon puede revisar la informacion basica, fotos y contexto del sitio
              para decidir si la oportunidad merece avanzar hacia una conversacion con
              contratista, aliado, utilidad o coanfitrion.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/es/pre-evaluacion"
                className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Abrir pre-evaluacion
              </Link>
              <a
                href="mailto:andre@jetizonmotorbikeintech.com"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Enviar correo
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">Contacto</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
              <p>
                <span className="font-semibold text-white">Correo:</span>{" "}
                <a
                  href="mailto:andre@jetizonmotorbikeintech.com"
                  className="text-lime-400 underline"
                >
                  andre@jetizonmotorbikeintech.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Telefono:</span> (646) 982-7986
              </p>
              <p>
                <span className="font-semibold text-white">Enfoque:</span> propiedades
                multifamiliares, uso mixto, estacionamientos, campus y otros entornos
                urbanos o de destino.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqBlock
        title="Preguntas frecuentes"
        intro="Jetizon ayuda a aclarar si un sitio parece listo para avanzar antes de entrar en una ruta de implementacion mas profunda."
        items={[
          {
            question: "Que hace Jetizon exactamente?",
            answer:
              "Jetizon ayuda a identificar, evaluar y estructurar oportunidades iniciales de carga y micromovilidad antes de involucrar a contratistas, aliados o revisiones tecnicas mas profundas.",
          },
          {
            question: "Jetizon ya instala o posee una red completa?",
            answer:
              "No. Jetizon esta construyendo una ruta disciplinada desde la evaluacion del sitio hasta despliegues practicos apoyados por aliados.",
          },
          {
            question: "Que tipo de sitios encajan mejor?",
            answer:
              "Multifamiliares, propiedades de uso mixto, hoteles, estacionamientos, campus y otros sitios privados o de destino con una necesidad clara de carga o micromovilidad.",
          },
        ]}
      />
    </div>
  );
}
