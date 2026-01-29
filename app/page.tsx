"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMoon, FaSun, FaUpload, FaShieldAlt, FaBolt, FaImage, FaTimes
} from "react-icons/fa";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);


  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleCompress = async () => {
    if (!file) return alert("Pilih file dulu!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/compress", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

    } catch (err) {
      console.error(err);
      alert("Backend belum jalan atau error.");
    } finally {
      setLoading(false);
    }
  };


  /* ===== ANIMATION VARIANTS ===== */

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="min-h-screen flex flex-col scroll-smooth">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 backdrop-blur bg-[var(--color-card)]/70 border-b border-[var(--color-border)] z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-lg text-[var(--color-primary)]">SmartCompress</h1>
          <div className="flex items-center gap-6 text-sm">
            <a href="#features" className="opacity-70 hover:opacity-100">Features</a>
            <a href="#upload" className="opacity-70 hover:opacity-100">Try Now</a>
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
              {dark ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="text-center py-24 px-6"
      >
        <motion.div
          variants={fadeUp}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <FaUpload className="mx-auto text-6xl text-[var(--color-primary)] mb-6" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">
          Compress Files Without Losing Quality
        </motion.h2>

        <motion.p variants={fadeUp} className="opacity-70 mb-6 max-w-xl mx-auto">
          Smart optimization for images, videos, and documents — fast, secure, and effortless.
        </motion.p>

        <motion.a
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#upload"
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Start Compressing
        </motion.a>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        id="features"
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-20 px-6 bg-black/5 dark:bg-white/5"
      >

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          {[FaBolt, FaShieldAlt, FaImage].map((Icon, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="p-6 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] shadow"
            >
              <Icon className="mx-auto text-3xl text-[var(--color-primary)] mb-4" />
              <h3 className="font-semibold mb-2">
                {i === 0 ? "Super Fast" : i === 1 ? "Secure" : "No Quality Loss"}
              </h3>
              <p className="text-sm opacity-60">
                {i === 0
                  ? "Optimized processing for instant results."
                  : i === 1
                    ? "Files auto-deleted after processing."
                    : "Smart compression keeps visuals sharp."}
              </p>
            </motion.div>
          ))}

        </div>
      </motion.section>

      {/* UPLOAD */}
      <section id="upload" className="relative flex-1 py-24 px-4 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

        {/* FLOATING ICONS ANIMATED */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6 }}
          className="absolute left-10 top-20 opacity-20 text-4xl">📄</motion.div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5 }}
          className="absolute right-12 top-32 opacity-20 text-4xl">🎥</motion.div>

        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7 }}
          className="absolute left-20 bottom-20 opacity-20 text-4xl">🖼️</motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h3 variants={fadeUp} className="text-2xl font-bold mb-3">Upload Your File</motion.h3>
          <motion.p variants={fadeUp} className="text-sm opacity-60 mb-8">
            Fast • Secure • No quality loss
          </motion.p>

          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-[var(--color-border)] rounded-3xl p-14 bg-[var(--color-card)] shadow-xl transition relative group"
          >
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] transition pointer-events-none" />

            <FaUpload className="mx-auto text-6xl text-[var(--color-primary)] mb-6" />
            <h4 className="font-semibold mb-2 text-lg">Drag & Drop your file</h4>
            <p className="text-sm opacity-60 mb-4">or click to browse</p>

            <label className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl cursor-pointer hover:opacity-90">
              Choose File
              <input
                type="file"
                hidden
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const selected = e.target.files?.[0] || null;
                  setFile(selected);
                }}
              />


            </label>

            {/* FILE CARD ANIMATION */}
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-black/5 dark:bg-white/5 p-4 rounded-xl flex justify-between items-center"
              >
                <span className="text-sm">{file.name}</span>
                <button onClick={() => setFile(null)} className="opacity-60 hover:opacity-100">
                  <FaTimes />
                </button>
              </motion.div>
            )}
          </motion.div>

          {preview && (
            <div className="mt-4">
              {file && file.type.startsWith("image/") && (
                <img src={preview} alt="preview" className="mx-auto max-h-40 rounded-lg shadow" />
              )}
              {file && file.type.startsWith("video/") && (
                <video src={preview} controls className="mx-auto max-h-40 rounded-lg shadow" />
              )}
            </div>
          )}

          {/* BUTTON COMPRESS */}
          {file && !downloadUrl && (
            <button
              onClick={handleCompress}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
            >
              {loading ? "Compressing..." : "Compress File"}
            </button>
          )}

          {/* BUTTON DOWNLOAD */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="compressed-file"
              className="mt-6 block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Download Compressed File
            </a>
          )}


          <motion.div variants={fadeUp} className="mt-10 flex flex-col md:flex-row justify-center gap-6 text-xs opacity-60">
            <span>🔒 Files auto deleted</span>
            <span>⚡ Instant processing</span>
            <span>🛡️ Secure transfer</span>
          </motion.div>

        </motion.div>
      </section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center py-6 border-t border-[var(--color-border)] text-sm opacity-60"
      >
        SmartCompress © 2026 — Built with ❤️ for fast file optimization
      </motion.footer>

    </main>
  );
}
