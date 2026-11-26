// Alle stabilen IDs aus den gebauten Inhalten, nach Art.
export function alleIds(folgen, glossar) {
  const f = [...folgen.values()];
  return {
    folgen: f.map((x) => x.id),
    fragen: f.flatMap((x) => x.quiz.map((q) => q.id)),
    karten: f.flatMap((x) => x.karten.map((k) => k.id)),
    uebungen: f.flatMap((x) => x.abschnitte.flatMap((a) => a.teile.filter((t) => t.id).map((t) => t.id))),
    glossar: glossar.map((b) => b.id),
  };
}
