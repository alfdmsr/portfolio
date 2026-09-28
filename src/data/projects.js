export const projects = [
  {
    id: "legal-rag",
    name: {
      id: "Chatbot RAG Hukum",
      en: "Legal RAG Chatbot",
    },
    tags: ["LLM", "RAG", "FINE-TUNE"],
    status: "DEPLOYED",
    desc: {
      id: "Chatbot hukum ketenagakerjaan berbasis Llama-3-8B fine-tuned + GRPO reasoning, dengan hybrid search, HyDE, dan reranking.",
      en: "An employment law chatbot built on a fine-tuned Llama-3-8B with GRPO reasoning, hybrid search, HyDE, and reranking.",
    },
    stack: ["Unsloth", "LoRA", "LangChain", "ChromaDB"],
    url: "https://github.com/alfdmsr/Fine-tuned-Chatbot-Tim-Legal-berbasis-RAG",
    metric: {
      label: "REASONING",
      value: "GRPO",
    },
  },
  {
    id: "bitcoin-forecast",
    name: {
      id: "Peramalan Harga Bitcoin",
      en: "Bitcoin Forecasting",
    },
    tags: ["DEEP LEARNING", "TIME SERIES"],
    status: "COMPLETE",
    desc: {
      id: "Peramalan harga Bitcoin 24 jam ke depan dengan custom LSTM layer, multi-head attention buatan sendiri, dan custom training loop.",
      en: "Forecasting Bitcoin prices 24 hours ahead using a custom LSTM layer, self-built multi-head attention, and a custom training loop.",
    },
    stack: ["TensorFlow", "Custom Layers", "Seq2Seq"],
    url: "https://github.com/alfdmsr/Forecasting-Nilai-Bitcoin",
    metric: {
      label: "MAE",
      value: "0.0115",
    },
  },
  {
    id: "fraud-detection",
    name: {
      id: "Deteksi Penipuan Perbankan",
      en: "Bank Fraud Detection",
    },
    tags: ["CLUSTERING", "CLASSIFICATION"],
    status: "COMPLETE",
    desc: {
      id: "Deteksi anomali transaksi perbankan: K-Means clustering untuk menemukan pola, dilanjutkan klasifikasi supervised dari hasil cluster.",
      en: "Bank transaction anomaly detection: K-Means clustering identifies patterns, followed by supervised classification using the cluster results.",
    },
    stack: ["Scikit-learn", "K-Means", "Random Forest"],
    url: "https://github.com/alfdmsr/Bank-Transaction-Fraud-Detection-Klasifikasi---Clustering-",
    metric: {
      label: "PIPELINE",
      value: "2-STAGE",
    },
  },
  {
    id: "fruit-cnn",
    name: {
      id: "CNN Kesegaran Buah",
      en: "Fruit Freshness CNN",
    },
    tags: ["COMPUTER VISION", "CNN"],
    status: "DEPLOYED",
    desc: {
      id: "Klasifikasi gambar buah segar vs busuk dengan CNN, diekspor ke 3 format (SavedModel, TFLite, TF.js) siap produksi.",
      en: "Classifying fresh and rotten fruit images with a CNN, exported to three production-ready formats: SavedModel, TFLite, and TF.js.",
    },
    stack: ["TensorFlow", "CNN", "TFLite"],
    url: "https://github.com/alfdmsr/Klasifikasi-Gambar-Buah-CNN-",
    metric: {
      label: "ACCURACY",
      value: "98.8%",
    },
  },
  {
    id: "sentiment-grab",
    name: {
      id: "Analisis Sentimen Grab",
      en: "Grab Sentiment Analysis",
    },
    tags: ["NLP", "SENTIMENT"],
    status: "COMPLETE",
    desc: {
      id: "Analisis sentimen 50rb ulasan aplikasi Grab: scraping, lexicon-based labeling, dan perbandingan model ML klasik vs GRU.",
      en: "Sentiment analysis of 50,000 Grab app reviews: scraping, lexicon-based labeling, and comparing classical ML models with a GRU.",
    },
    stack: ["NLTK", "Sastrawi", "GRU"],
    url: "https://github.com/alfdmsr/Analisis-Sentimen-Grab",
    metric: {
      label: "DATASET",
      value: "50K ROWS",
    },
  },
  {
    id: "workflow-ci",
    name: {
      id: "Workflow-CI",
      en: "Workflow-CI",
    },
    tags: ["MLOPS", "CI/CD"],
    status: "DEPLOYED",
    desc: {
      id: "Pipeline CI/CD end-to-end: training otomatis, tracking MLflow, build & push Docker image, sepenuhnya via GitHub Actions.",
      en: "An end-to-end CI/CD pipeline: automated training, MLflow tracking, and Docker image builds and pushes, all through GitHub Actions.",
    },
    stack: ["MLflow", "Docker", "GitHub Actions"],
    url: "https://github.com/alfdmsr/Workflow-CI",
    metric: {
      label: "AUTOMATION",
      value: "FULL",
    },
  },
  {
    id: "car-price",
    name: {
      id: "Prediksi Harga Mobil",
      en: "Car Price Prediction",
    },
    tags: ["ML", "FROM SCRATCH"],
    status: "COMPLETE",
    desc: {
      id: "Model regresi linear diimplementasikan dari nol dengan NumPy (normal equation) untuk memprediksi harga mobil.",
      en: "Linear regression implemented from scratch with NumPy using the normal equation to predict car prices.",
    },
    stack: ["NumPy", "Pandas", "Linear Algebra"],
    url: "https://github.com/alfdmsr/Car-Price-Prediction-Project",
    metric: {
      label: "BUILT",
      value: "FROM 0",
    },
  },
  {
    id: "transformer",
    name: {
      id: "Transformer dari Nol",
      en: "Transformer from Scratch",
    },
    tags: ["DEEP LEARNING", "NLP"],
    status: "COMPLETE",
    desc: {
      id: "Implementasi arsitektur Transformer dari nol berdasarkan paper Attention Is All You Need — attention, encoder, decoder.",
      en: "A Transformer architecture implemented from scratch based on Attention Is All You Need, including attention, encoder, and decoder components.",
    },
    stack: ["Python", "NumPy"],
    url: "https://github.com/alfdmsr/transformer.git",
    metric: {
      label: "PAPER",
      value: "2017",
    },
  },
  {
    id: "book-u",
    name: {
      id: "Book-U",
      en: "Book-U",
    },
    tags: ["DESKTOP APP", "JAVA"],
    status: "COMPLETE",
    desc: {
      id: "Aplikasi desktop manajemen perpustakaan — peminjaman, pengembalian, dan manajemen pengguna untuk admin & anggota.",
      en: "A desktop library management app with borrowing, returns, and user management for administrators and members.",
    },
    stack: ["JavaFX", "MySQL"],
    url: "https://github.com/alfdmsr/Book-U",
    metric: {
      label: "PLATFORM",
      value: "DESKTOP",
    },
  },
  {
    id: "moontime",
    name: {
      id: "Moontime",
      en: "Moontime",
    },
    tags: ["CLI", "C LANG"],
    status: "COMPLETE",
    desc: {
      id: "Aplikasi CLI pelacak siklus menstruasi berbasis C — prediksi periode, masa subur, dan rekomendasi nutrisi.",
      en: "A C-based command-line menstrual cycle tracker with period predictions, fertility windows, and nutrition recommendations.",
    },
    stack: ["C", "CLI"],
    url: "https://github.com/alfdmsr/Moontime.v1",
    metric: {
      label: "LANG",
      value: "C",
    },
  },
];