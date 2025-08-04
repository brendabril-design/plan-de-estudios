import React, { useState, useEffect } from "react";

type Materia = {
  codigo: string;
  nombre: string;
  correlativas: string[];
  ciclo: "CBC" | "CFG" | "CFP";
  esElectiva?: boolean;
};

const malla: Materia[] = [
  // CBC
  { codigo: "CBC-IPC", nombre: "Introducción al Pensamiento Científico", correlativas: [], ciclo: "CBC" },
  { codigo: "CBC-ICI", nombre: "Introducción al Conocimiento de la Sociedad y el Estado", correlativas: [], ciclo: "CBC" },
  { codigo: "CBC-PSI", nombre: "Psicología", correlativas: [], ciclo: "CBC" },
  { codigo: "CBC-BIO", nombre: "Biología", correlativas: [], ciclo: "CBC" },
  { codigo: "CBC-SEMIO", nombre: "Semiología", correlativas: [], ciclo: "CBC" },
  { codigo: "CBC-MAT", nombre: "Matemática", correlativas: [], ciclo: "CBC" },

  // CFG Obligatorias
  { codigo: "CFG-PPB", nombre: "Procesos Psicológicos Básicos", correlativas: ["CBC-PSI"], ciclo: "CFG" },
  { codigo: "CFG-ESTA", nombre: "Estadística", correlativas: ["CBC-MAT"], ciclo: "CFG" },
  { codigo: "CFG-PSOC", nombre: "Psicología Social", correlativas: [], ciclo: "CFG" },
  { codigo: "CFG-PSAP", nombre: "Psicología del Aprendizaje", correlativas: [], ciclo: "CFG" },
  { codigo: "CFG-PSFREUD", nombre: "Psicoanálisis Freud", correlativas: [], ciclo: "CFG" },
  { codigo: "CFG-NEURO", nombre: "Neurofisiología", correlativas: ["CBC-BIO"], ciclo: "CFG" },
  { codigo: "CFG-HPSI", nombre: "Historia de la Psicología", correlativas: ["CBC-PSI"], ciclo: "CFG" },
  { codigo: "CFG-MINV", nombre: "Metodología de la Investigación", correlativas: ["CFG-ESTA"], ciclo: "CFG" },
  { codigo: "CFG-SPSM", nombre: "Salud Pública y Salud Mental", correlativas: ["CFG-PPB"], ciclo: "CFG" },
  { codigo: "CFG-TTGRU", nombre: "Teoría y Técnica de Grupos", correlativas: ["CFG-PPB"], ciclo: "CFG" },
  { codigo: "CFG-PNIN", nombre: "Psicología Evolutiva Niñez", correlativas: ["CFG-PPB"], ciclo: "CFG" },
  { codigo: "CFG-PADO", nombre: "Psicología Evolutiva Adolescencia", correlativas: ["CFG-PNIN"], ciclo: "CFG" },
  { codigo: "CFG-PSICPAT", nombre: "Psicopatología", correlativas: ["CFG-PPB"], ciclo: "CFG" },
  { codigo: "CFG-TTED", nombre: "Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo I", correlativas: ["CFG-PPB"], ciclo: "CFG" },
  { codigo: "CFG-TTED2", nombre: "Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo II", correlativas: ["CFG-TTED"], ciclo: "CFG" },

  // CFG Electivas
  { codigo: "CFG-EL1", nombre: "Electiva 1", correlativas: [], ciclo: "CFG", esElectiva: true },
  { codigo: "CFG-EL2", nombre: "Electiva 2", correlativas: [], ciclo: "CFG", esElectiva: true },
  { codigo: "CFG-IDIOMA", nombre: "Requisito Idioma", correlativas: ["CFG-PPB"], ciclo: "CFG", esElectiva: true },

  // CFP Obligatorias
  { codigo: "CFP-PSDH", nombre: "Psicología, Ética y Derechos Humanos", correlativas: ["CFG-PPB"], ciclo: "CFP" },
  { codigo: "CFP-PSIN", nombre: "Psicología Institucional", correlativas: ["CFG-PPB"], ciclo: "CFP" },
  { codigo: "CFP-PSEDU", nombre: "Psicología Educacional", correlativas: ["CFG-PPB"], ciclo: "CFP" },
  { codigo: "CFP-PSTRAB", nombre: "Psicología del Trabajo", correlativas: ["CFG-PPB"], ciclo: "CFP" },
  { codigo: "CFP-CLINAD", nombre: "Clínica Psicológica y Psicoterapias: Clínica de Adultos", correlativas: ["CFG-PSICPAT"], ciclo: "CFP" },
  { codigo: "CFP-PSJUR", nombre: "Psicología Jurídica", correlativas: ["CFG-PSICPAT"], ciclo: "CFP" },
  { codigo: "CFP-PSIPE", nombre: "Clínica Psicológica y Psicoterapias: Psicoterapias, Emergencias e Interconsultas", correlativas: ["CFG-PSICPAT"], ciclo: "CFP" },
  { codigo: "CFP-PPI", nombre: "Práctica Profesional y de Investigación", correlativas: ["CFP-CLINAD", "CFP-PSEDU", "CFP-PSJUR", "CFP-PSTRAB"], ciclo: "CFP" },

  // CFP Electivas
  { codigo: "CFP-EL1", nombre: "Electiva 1", correlativas: [], ciclo: "CFP", esElectiva: true },
  { codigo: "CFP-EL2", nombre: "Electiva 2", correlativas: [], ciclo: "CFP", esElectiva: true },
  { codigo: "CFP-EL3", nombre: "Electiva 3", correlativas: [], ciclo: "CFP", esElectiva: true },
];

export default function MallaInteractiva() {
  const [aprobadas, setAprobadas] = useState<string[]>([]);

  useEffect(() => {
    const guardadas = localStorage.getItem("materiasAprobadas");
    if (guardadas) setAprobadas(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
  }, [aprobadas]);

  const toggleMateria = (codigo: string) => {
    setAprobadas((prev) =>
      prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]
    );
  };

  const puedeCursarse = (materia: Materia) =>
    materia.correlativas.every((cod) => aprobadas.includes(cod));

  const ciclos: ("CBC" | "CFG" | "CFP")[] = ["CBC", "CFG", "CFP"];

  const totalMaterias = malla.length;
  const aprobadasCount = aprobadas.length;
  const porcentajeGlobal = Math.round((aprobadasCount / totalMaterias) * 100);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "1rem",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#963564",
          fontWeight: "bold",
        }}
      >
        Malla de Psicología UBA - Plan 2025
      </h1>

      <div
        style={{
          maxWidth: 600,
          margin: "0 auto 2rem",
          backgroundColor: "#e7d5e9",
          padding: "1rem 1.5rem",
          borderRadius: 12,
          boxShadow: "0 0 8px rgba(150, 53, 100, 0.3)",
          fontWeight: "600",
          fontSize: "1.1rem",
          textAlign: "center",
          color: "#5b2e54",
          width: "90%",          // para que sea responsivo en móvil
          wordWrap: "break-word" // que el texto no se corte fuera de pantalla
        }}
      >
        Progreso global: {porcentajeGlobal}% ({aprobadasCount} de {totalMaterias} materias)
      </div>

      {ciclos.map((ciclo) => {
        const materiasCiclo = malla.filter((m) => m.ciclo === ciclo && !m.esElectiva);
        const electivasCiclo = malla.filter((m) => m.ciclo === ciclo && m.esElectiva);

        return (
          <div key={ciclo} style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                backgroundColor:
                  ciclo === "CBC"
                    ? "#f2e6f0"
                    : ciclo === "CFG"
                    ? "#f8f0f6"
                    : "#f9f5f7",
                padding: "0.5rem 1rem",
                borderRadius: 8,
                color: "#963564",
              }}
            >
              {ciclo}
            </h2>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: 8,
              }}
            >
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{ color: "#444", marginBottom: 8 }}>Obligatorias</h3>
                {materiasCiclo.length === 0 && <p>No hay materias obligatorias.</p>}
                {materiasCiclo.map((m) => {
                  const aprobada = aprobadas.includes(m.codigo);
                  const habilitada = puedeCursarse(m);
                  return (
                    <div
                      key={m.codigo}
                      onClick={() => habilitada && toggleMateria(m.codigo)}
                      title={habilitada ? "Click para marcar/aprobar" : "Correlativas no aprobadas"}
                      style={{
                        userSelect: "none",
                        padding: "0.6rem 1rem",
                        borderRadius: 8,
                        marginBottom: 6,
                        cursor: habilitada ? "pointer" : "not-allowed",
                        textDecoration: aprobada ? "line-through" : "none",
                        backgroundColor: aprobada
                          ? "#7D2C58"
                          : habilitada
                          ? "#B080B0" // más oscuro para las habilitadas
                          : "#E5D7E8",
                        color: aprobada ? "#f3e9f1" : "#5b2e54",
                        boxShadow: aprobada ? "0 0 8px #582240" : "none",
                        transition: "background-color 0.3s, box-shadow 0.3s",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {m.nombre}
                    </div>
                  );
                })}
              </div>

              <div style={{ flex: 1, minWidth: 140 }}>
                <h3 style={{ color: "#444", marginBottom: 8 }}>Electivas</h3>
                {electivasCiclo.length === 0 && <p>No hay electivas.</p>}
                {electivasCiclo.map((e) => {
                  const aprobada = aprobadas.includes(e.codigo);
                  return (
                    <div
                      key={e.codigo}
                      onClick={() => toggleMateria(e.codigo)}
                      title="Click para marcar/aprobar electiva"
                      style={{
                        userSelect: "none",
                        padding: "0.6rem 1rem",
                        borderRadius: 8,
                        marginBottom: 6,
                        cursor: "pointer",
                        textDecoration: aprobada ? "line-through" : "none",
                        backgroundColor: aprobada ? "#7D2C58" : "#E8D3E9",
                        color: aprobada ? "#f3e9f1" : "#6e3d66",
                        boxShadow: aprobada ? "0 0 8px #582240" : "none",
                        transition: "background-color 0.3s, box-shadow 0.3s",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {e.nombre}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
