// Procedural animated ASCII art generators inspired by ascii.rest
// Pure functions — zero dependencies, lightweight per-frame string generation.

const DOT_RAMP = [" ", " ", "·", "·", "•", "•", "●"];

/**
 * Hero animated dot-matrix scene: undulating neural signal landscape
 * with drifting starlight nodes and subtle topographic ridges.
 */
export function renderHeroScene(frame, cols = 104, rows = 26) {
  const t = frame * 0.08;
  const lines = new Array(rows);

  for (let y = 0; y < rows; y++) {
    let row = "";
    const ny = y / (rows - 1);

    for (let x = 0; x < cols; x++) {
      const nx = x / (cols - 1);

      // Multi-harmonic flowing neural wave ridges
      const ridge1 =
        0.52 +
        0.16 * Math.sin(nx * 5.2 + t * 0.9) +
        0.08 * Math.cos(nx * 11.4 - t * 0.55);
      const ridge2 =
        0.68 +
        0.11 * Math.sin(nx * 7.8 - t * 0.7 + 1.4) +
        0.05 * Math.cos(nx * 15.0 + t * 0.4);
      const ridge3 =
        0.34 +
        0.12 * Math.sin(nx * 3.8 + t * 0.5 + 2.6) * Math.cos(nx * 2.1 - t * 0.25);

      const d1 = Math.abs(ny - ridge1);
      const d2 = Math.abs(ny - ridge2);
      const d3 = Math.abs(ny - ridge3);

      // Interference field energy
      const wave =
        Math.sin(nx * 9.0 + ny * 4.5 - t) *
        Math.cos(nx * 4.5 - ny * 6.0 + t * 0.65);

      let density = 0;

      // Upper sky: sparse twinkling constellation dots
      if (ny < ridge3 - 0.05) {
        const hash = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        const frac = hash - Math.floor(hash);
        if (frac > 0.965) {
          const pulse = Math.sin(t * 1.4 + x * 0.7 + y * 1.3);
          density = pulse > 0.35 ? 0.82 : 0.35;
        } else if (frac > 0.91 && wave > 0.45) {
          density = 0.28;
        }
      }

      // Ridge contours
      if (d3 < 0.06) {
        density = Math.max(density, (1 - d3 / 0.06) * 0.52);
      }
      if (d1 < 0.085) {
        density = Math.max(density, (1 - d1 / 0.085) * 0.96);
      }
      if (d2 < 0.075) {
        density = Math.max(density, (1 - d2 / 0.075) * 0.78);
      }

      // Soft terrain fill below primary ridge
      if (ny > ridge1) {
        const depth = Math.min(1, (ny - ridge1) / 0.45);
        const ripple = 0.5 + 0.5 * Math.sin(nx * 18.0 + ny * 12.0 - t * 1.1);
        const terrain = (0.28 + 0.38 * ripple) * (1 - depth * 0.45);
        density = Math.max(density, terrain);
      }

      // Travelling signal pulse along ridge1
      const pulseX = ((t * 0.14) % 1.3) - 0.15;
      const distPulse = Math.hypot((nx - pulseX) * 2.2, ny - ridge1);
      if (distPulse < 0.14) {
        density = Math.max(density, (1 - distPulse / 0.14) * 1.0);
      }

      const idx = Math.max(
        0,
        Math.min(DOT_RAMP.length - 1, Math.floor(density * DOT_RAMP.length))
      );
      row += DOT_RAMP[idx];
    }
    lines[y] = row;
  }

  return lines.join("\n");
}

/**
 * Helper to create a fixed 2D char grid for project previews.
 */
function createGrid(cols, rows, fill = " ") {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

function writeText(grid, x, y, text) {
  if (y < 0 || y >= grid.length) return;
  for (let i = 0; i < text.length; i++) {
    const cx = x + i;
    if (cx >= 0 && cx < grid[0].length) {
      grid[y][cx] = text[i];
    }
  }
}

function drawBox(grid, x, y, w, h, title = "") {
  for (let i = 0; i < w; i++) {
    writeText(grid, x + i, y, i === 0 ? "┌" : i === w - 1 ? "┐" : "─");
    writeText(grid, x + i, y + h - 1, i === 0 ? "└" : i === w - 1 ? "┘" : "─");
  }
  for (let j = 1; j < h - 1; j++) {
    writeText(grid, x, y + j, "│");
    writeText(grid, x + w - 1, y + j, "│");
  }
  if (title) {
    writeText(grid, x + 2, y, ` ${title} `);
  }
}

function gridToString(grid) {
  return grid.map((r) => r.join("")).join("\n");
}

const PREVIEW_COLS = 38;
const PREVIEW_ROWS = 12;

/**
 * Unique procedural animated ASCII preview per project ID.
 */
export function renderProjectPreview(projectId, frame) {
  const cols = PREVIEW_COLS;
  const rows = PREVIEW_ROWS;
  const g = createGrid(cols, rows);
  const t = frame;

  switch (projectId) {
    case "pm25-bandung": {
      // 5 Bandung stations · +3h PM2.5 forecast & 39 µg/m³ warning threshold
      writeText(g, 1, 0, "pm2.5 bandung · +3h     recall 94%");
      const stations = [
        { name: "dago     ", base: 24, amp: 8 },
        { name: "soetta   ", base: 46, amp: 14 },
        { name: "cibeureum", base: 36, amp: 12 },
        { name: "antapani ", base: 31, amp: 10 },
        { name: "u.berung ", base: 28, amp: 9 },
      ];
      stations.forEach((st, idx) => {
        const y = 2 + idx * 2;
        const val = Math.round(st.base + Math.sin(t * 0.22 + idx * 1.4) * st.amp);
        const len = Math.max(2, Math.min(13, Math.round((val / 70) * 13)));
        const warn = val >= 39;
        writeText(g, 1, y, st.name);
        writeText(g, 10, y, "│");
        writeText(g, 11, y, "█".repeat(len) + "░".repeat(13 - len));
        writeText(g, 25, y, `${String(val).padStart(2, " ")}µg`);
        writeText(g, 30, y, warn ? "[WARN]" : "[ OK ]");
      });
      return gridToString(g);
    }

    case "stable-diffusion": {
      // Latent denoising canvas (noise -> crisp scene) + StudioAI modes on Modal T4
      const cycle = t % 28;
      const clarity = Math.min(1, cycle / 18);
      const stepNum = Math.min(50, Math.round(clarity * 50));
      writeText(
        g,
        1,
        0,
        `sd v1.5 · modal t4 · step ${String(stepNum).padStart(2, "0")}/50`
      );

      drawBox(g, 1, 2, 19, 9, "denoise");
      const target = [
        "    ·   *   ○  ",
        "        ·      ",
        "     /\\        ",
        "    /  \\  /\\   ",
        "   / /\\ \\/  \\  ",
        "  / /  \\    /\\ ",
        " ▓▓▓▓▓▓▓▓▓▓▓▓▓ ",
      ];
      const noiseChars = ["·", ":", "░", "▒", "▓"];
      for (let r = 0; r < target.length; r++) {
        for (let c = 0; c < target[r].length; c++) {
          const hash = Math.sin((r + 1) * 91.7 + (c + 1) * 47.3) * 43758.5453;
          const threshold = hash - Math.floor(hash);
          const resolved = clarity >= threshold * 0.85;
          const ch = resolved
            ? target[r][c]
            : noiseChars[(r * 7 + c * 3 + t) % noiseChars.length];
          writeText(g, 3 + c, 3 + r, ch);
        }
      }

      drawBox(g, 22, 2, 15, 9, "studioai");
      const modes = ["txt2img", "img2img", "inpaint", "outpaint"];
      const activeMode = Math.floor(t / 7) % modes.length;
      modes.forEach((m, idx) => {
        const prefix = idx === activeMode ? ">" : " ";
        writeText(g, 24, 4 + idx, `${prefix} ${m}`);
      });
      const barFill = Math.round(clarity * 10);
      writeText(g, 24, 9, "█".repeat(barFill) + "░".repeat(10 - barFill));
      return gridToString(g);
    }

    case "legal-rag": {
      // Vector DB -> Hybrid Search / HyDE -> Llama-3 GRPO
      drawBox(g, 1, 1, 11, 5, "docs");
      writeText(g, 3, 3, "uu-13/03");
      writeText(g, 3, 4, "chroma");

      drawBox(g, 24, 1, 13, 5, "grpo");
      const dots = ".".repeat((Math.floor(t / 3) % 3) + 1).padEnd(3, " ");
      writeText(g, 26, 3, "llama-3");
      writeText(g, 26, 4, `think${dots}`);

      // Animated retrieval packets flowing left -> right
      const span = 12;
      const pulse = t % span;
      for (let i = 0; i < span; i++) {
        const ch = i === pulse ? "●" : i === (pulse - 1 + span) % span ? "•" : "·";
        writeText(g, 12 + i, 3, ch);
      }
      writeText(g, 14, 2, "hyde+rag");

      // Bottom token stream box
      drawBox(g, 1, 7, 36, 4, "reasoning");
      const barLen = 4 + (t % 26);
      writeText(g, 3, 9, "▓".repeat(barLen) + "░".repeat(30 - barLen));
      return gridToString(g);
    }

    case "bitcoin-forecast": {
      // Animated candlesticks + LSTM forecast line
      writeText(g, 1, 0, "btc/usd  24h lstm+mha    mae 0.0115");
      for (let x = 1; x < cols - 1; x++) {
        writeText(g, x, rows - 1, "─");
      }
      for (let i = 0; i < 11; i++) {
        const x = 2 + i * 3;
        const phase = i * 0.65 + t * 0.14;
        const mid = Math.round(5.5 + Math.sin(phase) * 2.6 + Math.cos(phase * 0.5) * 1.1);
        const hi = Math.max(1, mid - 2);
        const lo = Math.min(rows - 2, mid + 2);
        const isForecast = i >= 8;
        for (let y = hi; y <= lo; y++) {
          const ch = isForecast
            ? y === mid
              ? "○"
              : "┆"
            : y === mid
              ? "█"
              : y === mid - 1 || y === mid + 1
                ? "┃"
                : "│";
          writeText(g, x, y, ch);
        }
      }
      writeText(g, 26, 1, "forecast");
      return gridToString(g);
    }

    case "fraud-detection": {
      // K-Means clusters + scanning anomaly radar
      writeText(g, 1, 0, "k-means -> rf classifier");
      const c1 = [
        [6, 4], [8, 3], [5, 5], [9, 5], [7, 6], [10, 4], [6, 3],
      ];
      const c2 = [
        [21, 7], [23, 8], [20, 9], [24, 7], [22, 6], [25, 8], [19, 8],
      ];
      c1.forEach(([x, y]) => writeText(g, x, y, "•"));
      c2.forEach(([x, y]) => writeText(g, x, y, "•"));
      writeText(g, 7, 4, "◎");
      writeText(g, 22, 7, "◎");

      // Sweep scanner line
      const scanX = 1 + (t % (cols - 2));
      for (let y = 2; y < rows - 1; y++) {
        if (g[y][scanX] === " ") writeText(g, scanX, y, "·");
      }

      // Blinking anomaly node
      const alert = Math.floor(t / 4) % 2 === 0;
      writeText(g, 31, 3, alert ? "[!]" : " ! ");
      writeText(g, 27, 4, "anomaly");
      return gridToString(g);
    }

    case "fruit-cnn": {
      // Sliding 3x3 conv kernel across input image grid
      writeText(g, 1, 0, "cnn 3x3 kernel           acc 98.8%");
      const kx = 2 + (t % 10);
      const ky = 2 + (Math.floor(t / 10) % 5);

      for (let y = 2; y <= 9; y++) {
        for (let x = 2; x <= 14; x++) {
          const inside = x >= kx && x <= kx + 2 && y >= ky && y <= ky + 2;
          const v = (x + y) % 3 === 0 ? "•" : "·";
          writeText(g, x, y, inside ? "▓" : v);
        }
      }
      writeText(g, 17, 5, "──►");

      drawBox(g, 22, 2, 15, 8, "export");
      const active = Math.floor(t / 6) % 3;
      const targets = ["SavedModel", "TFLite", "TF.js"];
      targets.forEach((name, idx) => {
        const prefix = idx === active ? ">" : " ";
        writeText(g, 24, 4 + idx * 2, `${prefix} ${name}`);
      });
      return gridToString(g);
    }

    case "sentiment-grab": {
      // Polarity equalizer bars for 50k reviews
      writeText(g, 1, 0, "50k reviews  gru vs ml");
      const labels = ["pos", "neu", "neg"];
      const base = [20, 9, 14];
      labels.forEach((lbl, idx) => {
        const y = 3 + idx * 3;
        const delta = Math.round(Math.sin(t * 0.25 + idx * 2.1) * 3);
        const len = Math.max(3, Math.min(26, base[idx] + delta));
        writeText(g, 2, y, lbl);
        writeText(g, 6, y, "│");
        writeText(g, 7, y, "█".repeat(len) + "░".repeat(26 - len));
      });
      return gridToString(g);
    }

    case "workflow-ci": {
      // Animated CI/CD DAG pipeline
      writeText(g, 1, 0, "github actions · ci/cd");
      const stages = ["train", "mlflow", "docker", "push"];
      const active = Math.floor(t / 5) % stages.length;

      stages.forEach((st, idx) => {
        const y = 2 + idx * 2;
        const done = idx < active;
        const curr = idx === active;
        const mark = done ? "[ok]" : curr ? "[..]" : "[  ]";
        const arrow = idx < stages.length - 1 ? "│" : " ";
        writeText(g, 3, y, `${mark} ${st}`);
        if (idx < stages.length - 1) {
          writeText(g, 5, y + 1, arrow);
        }
        const bar = done
          ? "██████████"
          : curr
            ? "▓".repeat(2 + (t % 8)).padEnd(10, "░")
            : "░░░░░░░░░░";
        writeText(g, 20, y, bar);
      });
      return gridToString(g);
    }

    case "car-price": {
      // Linear regression scatter plot & normal equation fit
      writeText(g, 1, 0, "theta = (X^T X)^-1 X^T y");
      for (let y = 2; y < rows - 1; y++) writeText(g, 2, y, "│");
      for (let x = 2; x < cols - 1; x++) writeText(g, x, rows - 1, "─");
      writeText(g, 2, rows - 1, "└");

      const pts = [
        [6, 9], [9, 8], [12, 8], [15, 7], [18, 6], [21, 6], [24, 5], [27, 4], [30, 3], [33, 3],
      ];
      pts.forEach(([x, y]) => writeText(g, x, y, "•"));

      // Animated fitted line drawing across
      const progress = 4 + (t % 30);
      for (let x = 4; x < Math.min(cols - 2, progress); x++) {
        const y = Math.round(9.5 - ((x - 4) / 31) * 7.0);
        if (y >= 2 && y < rows - 1) {
          writeText(g, x, y, "╱");
        }
      }
      return gridToString(g);
    }

    case "transformer": {
      // Self-attention matrix heatmap
      writeText(g, 1, 0, "softmax(QK^T / sqrt(d)) V");
      const shades = [" ", "·", "░", "▒", "▓", "█"];
      const toks = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7"];
      for (let r = 0; r < 8; r++) {
        writeText(g, 2, 2 + r, toks[r]);
        for (let c = 0; c < 14; c++) {
          const val =
            0.5 +
            0.5 *
              Math.sin(r * 0.75 - c * 0.55 + t * 0.18) *
              Math.cos((r - c * 0.5) * 0.6);
          const idx = Math.min(shades.length - 1, Math.floor(val * shades.length));
          writeText(g, 6 + c * 2, 2 + r, shades[idx] + shades[idx]);
        }
      }
      return gridToString(g);
    }

    case "book-u": {
      // Desktop library TUI table
      drawBox(g, 1, 1, 36, 10, "book-u // javafx");
      writeText(g, 3, 3, "id   title             status");
      writeText(g, 3, 4, "───────────────────────────────");
      const items = [
        "001  deep learning     [in]",
        "002  clean code        [out]",
        "003  prml bishop       [in]",
        "004  design patterns   [in]",
      ];
      const sel = Math.floor(t / 6) % items.length;
      items.forEach((line, i) => {
        writeText(g, 3, 5 + i, (i === sel ? ">" : " ") + line.slice(0, 31));
      });
      return gridToString(g);
    }

    case "moontime": {
      // C CLI cycle tracker with lunar phases
      writeText(g, 1, 0, "$ ./moontime --predict");
      const phases = ["○", "◔", "◑", "◕", "●", "◕", "◑", "◔"];
      const pIdx = Math.floor(t / 4) % phases.length;
      drawBox(g, 2, 2, 13, 7, "cycle");
      writeText(g, 8, 5, phases[pIdx]);
      writeText(g, 4, 7, `day ${String((t % 28) + 1).padStart(2, "0")}/28`);

      writeText(g, 18, 3, "period  : d01-05");
      writeText(g, 18, 5, "fertile : d12-16");
      writeText(g, 18, 7, "lang    : C99");
      const fill = (t % 16) + 1;
      writeText(g, 2, 10, "[" + "═".repeat(fill) + "·".repeat(16 - fill) + "] ok");
      return gridToString(g);
    }

    default: {
      return renderHeroScene(frame, cols, rows);
    }
  }
}

/**
 * Converts an HTMLImageElement to a grayscale ASCII string.
 */
export function imageToAscii(img, cols = 48, rows = 26) {
  const ramp = " .:-=+*#%@";
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "";

  ctx.drawImage(img, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);
  const lines = [];

  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3] / 255;
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) * a;
      const idx = Math.min(ramp.length - 1, Math.floor((lum / 255) * ramp.length));
      line += ramp[idx];
    }
    lines.push(line);
  }
  return lines.join("\n");
}
