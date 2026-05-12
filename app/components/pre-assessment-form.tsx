"use client";

import { ValidationError, useForm } from "@formspree/react";
import { useEffect, useState } from "react";

type PreAssessmentFormProps = {
  layout?: "compact" | "full";
  locale?: "en" | "es";
  thankYouPath?: string;
};

function getDefaultFormData(locale: "en" | "es") {
  return {
    name: "",
    email: "",
    phone: "",
    organization: "",
    interest: locale === "es" ? "Solicitud de pre-evaluacion" : "Pre-Assessment Request",
    contactRole: locale === "es" ? "Propietario" : "Property Owner",
    propertyType: locale === "es" ? "Multifamiliar" : "Multifamily",
    siteAddress: "",
    siteControl:
      locale === "es"
        ? "Propietario / representante autorizado"
        : "Owner / Authorized Representative",
    parkingSpaces: "",
    chargingGoal: locale === "es" ? "Carga Nivel 2" : "Level 2 Charging",
    message: "",
    authorizationConfirmed: false,
    company: "",
  };
}

export default function PreAssessmentForm({
  layout = "compact",
  locale = "en",
  thankYouPath,
}: PreAssessmentFormProps) {
  const [state, handleSubmit] = useForm("meevjrzz");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState(() => getDefaultFormData(locale));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileNames = Array.from(e.target.files ?? []).map((file) => file.name);
    setSelectedFiles(fileNames);
  };

  useEffect(() => {
    if (!state.succeeded) return;

    const timer = window.setTimeout(() => {
      window.location.href = thankYouPath || (locale === "es" ? "/es/gracias" : "/thank-you");
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [locale, state.succeeded, thankYouPath]);

  const copy =
    locale === "es"
      ? {
          subject: "Nueva solicitud de pre-evaluacion de Jetizon",
          fullName: "Nombre completo",
          fullNamePlaceholder: "Su nombre",
          phoneNumber: "Numero de telefono",
          phonePlaceholder: "(646) 555-1234",
          emailAddress: "Correo electronico",
          emailPlaceholder: "usted@ejemplo.com",
          organization: "Nombre de la propiedad o negocio",
          organizationPlaceholder: "Nombre de la propiedad, negocio o portafolio",
          requestType: "Tipo de solicitud",
          role: "Su rol",
          propertyType: "Tipo de propiedad",
          chargingGoal: "Objetivo de carga",
          siteAddress: "Direccion del sitio",
          siteAddressPlaceholder: "Direccion del sitio que desea evaluar",
          siteControl: "Control del sitio",
          parkingSpaces: "Espacios aproximados de estacionamiento",
          parkingSpacesPlaceholder: "Ejemplo: 12 o solo frente de calle",
          siteDetails: "Detalles del sitio",
          siteDetailsPlaceholder:
            "Describa el sitio, el tipo de carga que esta considerando, lo que sabe del acceso electrico y cualquier objetivo de tiempo o incentivos.",
          attachments: "Fotos o archivos de apoyo",
          attachmentHelp:
            "Suba fotos del sitio, documentos de utilidad, croquis o referencias del estacionamiento para una revision preliminar. Su configuracion actual de Formspree permite hasta 10 archivos por envio, con un limite de 25 MB por archivo.",
          attachmentMulti:
            "Puede seleccionar varios archivos en un solo paso. En computadora, mantenga presionado Command o Shift al seleccionar. En algunos telefonos, la seleccion multiple debe activarse dentro del selector antes de tocar listo.",
          selectedFiles: "Archivos seleccionados",
          authorization:
            "Confirmo que estoy autorizado para enviar esta informacion del sitio y que deseo que Jetizon revise la propiedad para una evaluacion preliminar de carga EV o micromovilidad.",
          success: "Gracias. Su solicitud de pre-evaluacion fue enviada con exito.",
          sending: "Enviando...",
          submit: "Solicitar revision del sitio",
          antiSpam:
            "Protegido por un campo oculto contra spam. Para una proteccion mas fuerte, active Formspree reCAPTCHA en su panel de Formspree.",
          requestOptions: [
            "Solicitud de pre-evaluacion",
            "Oportunidad para anfitrion de carga",
            "Revision de carga para micromovilidad",
            "Conversacion de alianza",
            "Consulta general",
          ],
          roleOptions: [
            "Propietario",
            "Administrador de propiedad",
            "Propietario de negocio",
            "Inquilino / operador",
            "Consultor / contratista",
            "Otro",
          ],
          propertyOptions: [
            "Multifamiliar",
            "Comercio / uso mixto",
            "Hotel",
            "Garaje / estacionamiento",
            "Oficina / lugar de trabajo",
            "Industrial / comercial",
            "Otro",
          ],
          chargingOptions: [
            "Carga Nivel 2",
            "Carga para micromovilidad",
            "Ambos",
            "Aun no estoy seguro",
          ],
          siteControlOptions: [
            "Propietario / representante autorizado",
            "Administrador de propiedad",
            "Inquilino / operador",
            "Explorando permiso",
            "No estoy seguro",
          ],
        }
      : {
          subject: "New Jetizon pre-assessment request",
          fullName: "Full Name",
          fullNamePlaceholder: "Your name",
          phoneNumber: "Phone Number",
          phonePlaceholder: "(646) 555-1234",
          emailAddress: "Email Address",
          emailPlaceholder: "you@example.com",
          organization: "Business or Property Name",
          organizationPlaceholder: "Property, business, or portfolio name",
          requestType: "Request Type",
          role: "Your Role",
          propertyType: "Property Type",
          chargingGoal: "Charging Goal",
          siteAddress: "Site Address",
          siteAddressPlaceholder: "Street address of the site to be reviewed",
          siteControl: "Site Control",
          parkingSpaces: "Approximate Parking Spaces",
          parkingSpacesPlaceholder: "Example: 12 or street frontage only",
          siteDetails: "Site Details",
          siteDetailsPlaceholder:
            "Describe the site, the type of charging you are considering, what electrical access you know about, and any timing or rebate goals.",
          attachments: "Photos or Supporting Files",
          attachmentHelp:
            "Upload site photos, utility documents, sketches, or parking layout references for a preliminary review. Your current Formspree setup supports up to 10 files per submission, with a 25 MB limit per file.",
          attachmentMulti:
            "You can select multiple files in one step. On desktop, hold Command or Shift while selecting. On some phones, multi-select has to be chosen inside the photo picker before tapping done.",
          selectedFiles: "Selected Files",
          authorization:
            "I confirm that I am authorized to submit this site information, and I want Jetizon to review the property for preliminary EV or micromobility charging fit.",
          success: "Thank you. Your pre-assessment request was sent successfully.",
          sending: "Sending...",
          submit: "Request Site Review",
          antiSpam:
            "Protected by a hidden anti-spam field. For stronger protection, enable Formspree reCAPTCHA in your Formspree dashboard.",
          requestOptions: [
            "Pre-Assessment Request",
            "Charging Host Opportunity",
            "Micromobility Charging Review",
            "Partnership Discussion",
            "General Inquiry",
          ],
          roleOptions: [
            "Property Owner",
            "Property Manager",
            "Business Owner",
            "Tenant / Operator",
            "Consultant / Contractor",
            "Other",
          ],
          propertyOptions: [
            "Multifamily",
            "Retail / Mixed Use",
            "Hotel",
            "Parking Garage / Lot",
            "Office / Workplace",
            "Industrial / Commercial",
            "Other",
          ],
          chargingOptions: [
            "Level 2 Charging",
            "Micromobility Charging",
            "Both",
            "Not Sure Yet",
          ],
          siteControlOptions: [
            "Owner / Authorized Representative",
            "Property Manager",
            "Tenant / Operator",
            "Exploring Permission",
            "Not Sure",
          ],
        };

  const shellClassName =
    layout === "full"
      ? "rounded-[2rem] border border-lime-400/15 bg-black/30 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur md:p-10"
      : "rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur";

  return (
    <div className={shellClassName}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <input
          type="hidden"
          name="_subject"
          value={copy.subject}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
              {copy.fullName}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
              placeholder={copy.fullNamePlaceholder}
            />
            <ValidationError
              prefix={copy.fullName}
              field="name"
              errors={state.errors}
              className="mt-2 text-sm text-red-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
              {copy.phoneNumber}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
              placeholder={copy.phonePlaceholder}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              {copy.emailAddress}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
              placeholder={copy.emailPlaceholder}
            />
            <ValidationError
              prefix={copy.emailAddress}
              field="email"
              errors={state.errors}
              className="mt-2 text-sm text-red-200"
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {copy.organization}
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
              placeholder={copy.organizationPlaceholder}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="interest" className="mb-2 block text-sm font-medium text-slate-200">
              {copy.requestType}
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            >
              {copy.requestOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ValidationError
              prefix={copy.requestType}
              field="interest"
              errors={state.errors}
              className="mt-2 text-sm text-red-200"
            />
          </div>

          <div>
            <label
              htmlFor="contactRole"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {copy.role}
            </label>
            <select
              id="contactRole"
              name="contactRole"
              value={formData.contactRole}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            >
              {copy.roleOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="propertyType"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {copy.propertyType}
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            >
              {copy.propertyOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="chargingGoal"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {copy.chargingGoal}
            </label>
            <select
              id="chargingGoal"
              name="chargingGoal"
              value={formData.chargingGoal}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            >
              {copy.chargingOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="siteAddress"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            {copy.siteAddress}
          </label>
          <input
            id="siteAddress"
            name="siteAddress"
            type="text"
            value={formData.siteAddress}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            placeholder={copy.siteAddressPlaceholder}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="siteControl"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {copy.siteControl}
            </label>
            <select
              id="siteControl"
              name="siteControl"
              value={formData.siteControl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            >
              {copy.siteControlOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="parkingSpaces"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {copy.parkingSpaces}
            </label>
            <input
              id="parkingSpaces"
              name="parkingSpaces"
              type="text"
              value={formData.parkingSpaces}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
              placeholder={copy.parkingSpacesPlaceholder}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
            {copy.siteDetails}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
            placeholder={copy.siteDetailsPlaceholder}
          />
          <ValidationError
            prefix={copy.siteDetails}
            field="message"
            errors={state.errors}
            className="mt-2 text-sm text-red-200"
          />
        </div>

        <div>
          <label
            htmlFor="attachments"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            {copy.attachments}
          </label>
          <input
            id="attachments"
            name="attachments"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic,.webp"
            onChange={handleFileChange}
            className="block w-full rounded-2xl border border-dashed border-white/15 bg-slate-900 px-4 py-4 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-lime-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
          />
          <p className="mt-2 text-xs leading-6 text-slate-400">
            {copy.attachmentHelp}
          </p>
          <p className="mt-2 text-xs leading-6 text-slate-400">
            {copy.attachmentMulti}
          </p>
          {selectedFiles.length > 0 && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
                {copy.selectedFiles}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {selectedFiles.map((fileName) => (
                  <li key={fileName}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <label className="flex items-start gap-3 text-sm leading-7 text-slate-300">
            <input
              name="authorizationConfirmed"
              type="checkbox"
              checked={formData.authorizationConfirmed}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-lime-400 focus:ring-lime-400/50"
            />
            <span>
              {copy.authorization}
            </span>
          </label>
        </div>

        {state.succeeded && (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {copy.success}
          </div>
        )}

        {state.errors && !state.succeeded && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            <ValidationError errors={state.errors} className="text-red-200" />
          </div>
        )}

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.submitting ? copy.sending : copy.submit}
        </button>

        <p className="text-xs leading-6 text-slate-400">
          {copy.antiSpam}
        </p>
      </form>
    </div>
  );
}
