# Performance Testing Platform

Este repositorio contiene la plataforma de **pruebas de performance** del equipo.
Está diseñada para ejecutar **JMeter, k6 y Gatling** de forma unificada usando
**Taurus como orquestador** y **GitHub Actions como CI/CD**.

---

## 🧭 Principios de diseño

- 🔧 Cada herramienta define su **lógica y carga**
- 🐂 Taurus **NO define usuarios ni duración**
- 🚀 CI/CD solo orquesta y recoge resultados
- 📊 Los resultados son reproducibles local y en pipeline

---

## 🧰 Herramientas soportadas

| Engine   | Uso recomendado |
|--------|----------------|
| **JMeter** | Tests complejos, legacy, plugins (Ultimate TG) |
| **k6**     | APIs modernas, cloud, scripting JS |
| **Gatling**| Equipos Java, enfoque developer |

---

## 🏗️ Estructura del repositorio

```text
performance/
├── taurus/
│   ├── taurus-jmeter.yml
│   ├── taurus-k6.yml
│   └── taurus-gatling.yml
│
├── jmeter/
│   └── test.jmx
│
├── k6/
│   └── test.js
│
├── gatling/
│   └── pom.xml
│   └── src/test/java/simulations/
│
└── .github/workflows/
    └── performance.yml
