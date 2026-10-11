"use client";
import { useRef, useState } from "react";
import type { Locale, PortfolioProject } from "@/src/content";
import { photo } from "@/src/content";
import { getMessages } from "@/src/i18n";
import { projectPath } from "@/src/i18n/routes.mjs";
export function ProjectCard({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const t = project.translations[locale];
  return (
    <a className="project-card" href={projectPath(locale, project)}>
      <div className="project-image">
        <img
          src={photo(project.coverImage)}
          srcSet={`${photo(project.coverImage, 800)} 800w, ${photo(project.coverImage)} 1600w`}
          sizes="(max-width: 700px) 100vw, 50vw"
          alt={t.alt}
          width="1600"
          height="1200"
          loading="lazy"
        />
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="project-info">
        <h3>{t.shortTitle}</h3>
        <span>{getMessages(locale).common.kitchens}</span>
      </div>
    </a>
  );
}
export function Portfolio({
  projects,
  locale,
}: {
  projects: PortfolioProject[];
  locale: Locale;
}) {
  const [filter, setFilter] = useState("all");
  const m = getMessages(locale).projectsPage;
  const selected = projects.filter(
    (p) =>
      filter === "all" ||
      (filter === "island" ? p.id === "island" : p.id !== "island"),
  );
  return (
    <>
      <div
        className="filters"
        role="group"
        aria-label={locale === "pt" ? "Filtrar projetos" : "Filter projects"}
      >
        {[
          ["all", m.filterAll],
          ["island", m.filterIsland],
          ["other", m.filterClassic],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
        <span aria-live="polite">
          {selected.length} {m.count}
        </span>
      </div>
      <div className="projects-grid">
        {selected.length === 0 && <p>{getMessages(locale).common.noProjects}</p>}
        {selected.map((p) => (
          <ProjectCard key={p.id} project={p} locale={locale} />
        ))}
      </div>
    </>
  );
}
export function Gallery({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const m = getMessages(locale).common;
  const images = project.gallery;
  const shift = (n: number) =>
    setIndex((i) => (i + n + images.length) % images.length);
  return (
    <>
      <div className="gallery-grid">
        {images.map((name, i) => (
          <button
            key={name}
            className={i === 0 ? "gallery-main" : ""}
            aria-label={`${m.openImage} ${i + 1}`}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setIndex(i);
              dialog.current?.showModal();
            }}
          >
            <img
              src={photo(name)}
              alt={`${project.translations[locale].alt} · ${i + 1}`}
              width="1600"
              height="1200"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <dialog
        className="lightbox"
        ref={dialog}
        onClose={() => opener.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") shift(-1);
          if (e.key === "ArrowRight") shift(1);
        }}
        aria-label={project.translations[locale].shortTitle}
      >
        <button
          className="lightbox-close"
          autoFocus
          onClick={() => dialog.current?.close()}
          aria-label={m.closeGallery}
        >
          ×
        </button>
        <img
          src={photo(images[index])}
          alt={`${project.translations[locale].alt} · ${index + 1}`}
          width="1600"
          height="1200"
        />
        <div className="lightbox-controls">
          <button onClick={() => shift(-1)} aria-label={m.previous}>
            ←
          </button>
          <span aria-live="polite">
            {m.image} {index + 1} {m.of} {images.length}
          </span>
          <button onClick={() => shift(1)} aria-label={m.next}>
            →
          </button>
        </div>
      </dialog>
    </>
  );
}
