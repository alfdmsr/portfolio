export const messages = {
    ABOUT: ["TENTANG", "ABOUT"],
    PROJECTS: ["PROYEK", "PROJECTS"],
    SKILLS: ["TEKNOLOGI", "SKILLS"],
    CONTACT: ["KONTAK", "CONTACT"],

    "ABOUT.LOG": ["TENTANG.LOG", "ABOUT.LOG"],
    "PROJECTS.DB": ["PROYEK.DB", "PROJECTS.DB"],
    "TECH_STACK.CFG": ["TEKNOLOGI.CFG", "TECH_STACK.CFG"],
    "CONTACT.SEND": ["KONTAK.SEND", "CONTACT.SEND"],

    "SYSTEM ONLINE": ["SISTEM AKTIF", "SYSTEM ONLINE"],
    ENGINEER: ["ENGINEER", "ENGINEER"],
    ACCESS: ["AKSES", "ACCESS"],
    "ENGINEER CODE": ["KODE ENGINEER", "ENGINEER CODE"],
    
    "MACHINE LEARNING ENGINEER": [
        "MACHINE LEARNING ENGINEER",
        "MACHINE LEARNING ENGINEER",
    ],

    heroTitle: [
        "MACHINE LEARNING ENG.",
        "MACHINE LEARNING ENG.",
    ],

    profileLabel: [
        "Profil Alif Masrur",
        "Alif Masrur's profile",
    ],

    heroBio: [
        "Nama saya Alif Masrur. Saya seorang machine learning dan software engineer. Saya senang membangun sesuatu dari nol untuk benar-benar memahami cara kerjanya — mulai dari arsitektur Transformer hingga pipeline MLOps yang berjalan otomatis.",
        "My name is Alif Masrur. I am a machine learning & software engineer. I like building things from scratch to really understand how they work — from Transformer architectures to MLOps pipelines that ship themselves.",
    ],

    aboutBio: [
        "Saya senang membedah cara kerja sesuatu dari dasarnya: mengimplementasikan arsitektur Transformer dengan NumPy, membangun regresi linear dari nol, hingga merancang pipeline MLOps otomatis dengan MLflow, Docker, dan GitHub Actions. Bagi saya, memahami mengapa sesuatu bekerja sama pentingnya dengan hasil akhirnya.",
        "I enjoy understanding how things work from the ground up: implementing Transformer architectures with NumPy, building linear regression from scratch, and designing automated MLOps pipelines with MLflow, Docker, and GitHub Actions. To me, understanding why something works is as important as the final result.",
    ],

    "VIEW RESUME ↗": [
        "LIHAT RESUME (INGGRIS) ↗",
        "VIEW RESUME ↗",
    ],

    "Loading portfolio...": [
        "Memuat portofolio...",
        "Loading portfolio...",
    ],

    "SYSTEM.PORTFOLIO // BOOT": [
        "SYSTEM.PORTFOLIO // MEMULAI",
        "SYSTEM.PORTFOLIO // BOOT",
    ],

    "INITIALIZING SYSTEM.PORTFOLIO...": [
        "MENYIAPKAN SYSTEM.PORTFOLIO...",
        "INITIALIZING SYSTEM.PORTFOLIO...",
    ],

    "LOADING MODULE: MACHINE_LEARNING [OK]": [
        "MEMUAT MODUL: MACHINE_LEARNING [OK]",
        "LOADING MODULE: MACHINE_LEARNING [OK]",
    ],

    "LOADING MODULE: SOFTWARE_ENGINEERING [OK]": [
        "MEMUAT MODUL: SOFTWARE_ENGINEERING [OK]",
        "LOADING MODULE: SOFTWARE_ENGINEERING [OK]",
    ],

    "RENDERING IDENTITY CARD...": [
        "MENAMPILKAN KARTU IDENTITAS...",
        "RENDERING IDENTITY CARD...",
    ],

    "IDENTITY VERIFIED - WELCOME": [
        "IDENTITAS TERVERIFIKASI - SELAMAT DATANG",
        "IDENTITY VERIFIED - WELCOME",
    ],

    ROLE: ["PERAN", "ROLE"],
    FOCUS: ["FOKUS", "FOCUS"],
    BASED: ["LOKASI", "BASED"],
    STATUS: ["STATUS", "STATUS"],

    "ML / SOFTWARE ENGINEER": [
        "ML / SOFTWARE ENGINEER",
        "ML / SOFTWARE ENGINEER",
    ],

    "DEEP LEARNING, MLOPS, NLP": [
        "DEEP LEARNING, MLOPS, NLP",
        "DEEP LEARNING, MLOPS, NLP",
    ],

    INDONESIA: ["INDONESIA", "INDONESIA"],

    "OPEN TO COLLAB": [
    "TERBUKA UNTUK KOLABORASI",
    "OPEN TO COLLAB",
  ],

  "PROJECTS SHIPPED": [
    "PROYEK DIRILIS",
    "PROJECTS SHIPPED",
  ],

  "MODELS TRAINED": [
    "MODEL DILATIH",
    "MODELS TRAINED",
  ],

  "FROM-SCRATCH BUILDS": [
    "DIBANGUN DARI NOL",
    "FROM-SCRATCH BUILDS",
  ],

  "CI/CD PIPELINES": [
    "PIPELINE CI/CD",
    "CI/CD PIPELINES",
  ],

  entries: [
    "PROYEK DITEMUKAN — DIURUTKAN DARI TERBARU",
    "ENTRIES FOUND — SORTED BY RECENT",
  ],

  DEPLOYED: ["DIRILIS", "DEPLOYED"],
  COMPLETE: ["SELESAI", "COMPLETE"],

  "OPEN_REPOSITORY →": [
    "BUKA_REPOSITORI →",
    "OPEN_REPOSITORY →",
  ],

  technologies: [
    "Teknologi yang pernah saya gunakan dalam proyek.",
    "Technologies I have used in projects.",
  ],

  NOTIFICATIONS: ["NOTIFIKASI", "NOTIFICATIONS"],

  "READY TO BUILD SOMETHING TOGETHER?": [
    "SIAP MEMBANGUN SESUATU BERSAMA?",
    "READY TO BUILD SOMETHING TOGETHER?",
  ],

  language: ["Pilih bahasa", "Choose language"],

  description: [
    "Alif Masrur — Machine Learning & Software Engineer. Portofolio proyek ML, deep learning, dan MLOps.",
    "Alif Masrur — Machine Learning & Software Engineer. A portfolio of ML, deep learning, and MLOps projects.",
  ],

  REASONING: ["PENALARAN", "REASONING"],
  PIPELINE: ["PIPELINE", "PIPELINE"],
  "2-STAGE": ["2 TAHAP", "2-STAGE"],
  ACCURACY: ["AKURASI", "ACCURACY"],
  DATASET: ["DATASET", "DATASET"],
  "50K ROWS": ["50RB BARIS", "50K ROWS"],
  AUTOMATION: ["OTOMATISASI", "AUTOMATION"],
  FULL: ["PENUH", "FULL"],
  BUILT: ["DIBANGUN", "BUILT"],
  "FROM 0": ["DARI NOL", "FROM 0"],
  PAPER: ["MAKALAH", "PAPER"],
  PLATFORM: ["PLATFORM", "PLATFORM"],
  LANG: ["BAHASA", "LANG"],

  "FINE-TUNE": ["FINE-TUNING", "FINE-TUNE"],

  "DEEP LEARNING": [
    "PEMBELAJARAN MENDALAM",
    "DEEP LEARNING",
  ],

  "TIME SERIES": ["DERET WAKTU", "TIME SERIES"],
  CLUSTERING: ["PENGELOMPOKAN", "CLUSTERING"],
  CLASSIFICATION: ["KLASIFIKASI", "CLASSIFICATION"],
  "COMPUTER VISION": ["VISI KOMPUTER", "COMPUTER VISION"],
  SENTIMENT: ["SENTIMEN", "SENTIMENT"],
  "FROM SCRATCH": ["DARI NOL", "FROM SCRATCH"],
  "DESKTOP APP": ["APLIKASI DESKTOP", "DESKTOP APP"],
  "C LANG": ["BAHASA C", "C LANG"],
};

export function translate(language, key) {
    return messages[key]?.[language === "id" ? 0 : 1] ?? key;
}

export const LANGUAGE_KEY = "portfolio-language";

export function initialLanguage(storage, browserLanguages = []) {
    try {
        const saved = storage?.getItem(LANGUAGE_KEY);
        if (saved === "id" || saved === "en") {
            return saved;
        }
    } catch {
        // Penyimpanan dapat diblokir oleh pengaturan privasi browser
    }

    const prefrred = browserLanguages.find((value) =>
        /^(id|en)(-|$)/i.test(value)
    );

    return prefrred?.toLowerCase().startsWith("id") ? "id" : "en";
}

