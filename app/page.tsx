"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Screenshot = {
  src: string;
  alt: string;
};

type Work = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  screenshots?: Screenshot[];
};

const works: Work[] = [
  {
    number: "01",
    title: "工藤防災株式会社 Webサイト",
    description:
      "会社のWebサイトを制作しています。スマートフォンでの見やすさや、必要な情報を探しやすい構成を意識しました。現在も改善を進めています。",
    tech: ["Next.js", "Tailwind CSS", "microCMS"],
    screenshots: [
      {
        src: "/portfolio/kudo-bousai-top.png",
        alt: "トップページ画面",
      },
      {
        src: "/portfolio/kudo-bousai-contact.png",
        alt: "お問い合わせ画面",
      },
      {
        src: "/portfolio/kudo-bousai-mobile.png",
        alt: "Webサイトのスマートフォン表示",
      },
      {
        src: "/portfolio/kudo-bousai-menu.png",
        alt: "ハンバーガーメニュー",
      },
    ],
  },
  {
    number: "02",
    title: "AIなぞなぞバトル",
    description:
      "AIがなぞなぞを出題し、回答を判定するWebアプリです。GeminiとGroqのAPIを利用し、問題の生成や回答判定、エラー発生時の切り替え処理に取り組みました。",
    tech: ["JavaScript", "Express", "Gemini API", "Groq API"],
    screenshots: [
      {
        src: "/portfolio/ai-nazonazo-level.png",
        alt: "難易度選択",
      },
      {
        src: "/portfolio/ai-nazonazo-generate.png",
        alt: "問題生成",
      },
      {
        src: "/portfolio/ai-nazonazo-question.png",
        alt: "問題画面",
      },
      {
        src: "/portfolio/ai-nazonazo-hint.png",
        alt: "ヒント機能",
      },
      {
        src: "/portfolio/ai-nazonazo-result.png",
        alt: "10問正解でクリア",
      },
    ],
  },
  {
    number: "03",
    title: "SNSアプリ",
    description:
      "Next.jsとSupabaseを利用して、投稿やユーザー情報などを扱うSNSアプリを勉強しています。画面の実装に加え、データベースとの連携にも取り組んでいます。",
    tech: ["Next.js", "React", "Supabase", "TypeScript"],
    screenshots: [
      {
        src: "/portfolio/twitter-clone-registration.png",
        alt: "新規登録画面",
      },
      {
        src: "/portfolio/twitter-clone-login.png",
        alt: "ログイン画面",
      },
      {
        src: "/portfolio/twitter-clone-home.png",
        alt: "投稿一覧(掲示板)",
      },
      {
        src: "/portfolio/twitter-clone-menu.png",
        alt: "ハンバーガーメニュー",
      },
      {
        src: "/portfolio/twitter-clone-profile.png",
        alt: "プロフィール編集画面",
      },
    ],
  },
  {
    number: "04",
    title: "SoftBank社とのハッカソン",
    description:
      "5人チームでポーカーアプリの制作に取り組みました。情報収集や資料作成、発表を担当し、チームで最優秀賞を受賞しました。",
    tech: ["チーム開発", "情報収集", "資料作成", "プレゼンテーション"],
  },
];

const skills = [
  "HTML / CSS",
  "Java",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Git / GitHub",
  "Figma",
];

function ScreenshotSlider({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (screenshots.length === 0) return null;

  const screenshot = screenshots[current];
  const imageFailed = failedImages.includes(screenshot.src);

  const previous = () => {
    setCurrent((index) =>
      index === 0 ? screenshots.length - 1 : index - 1
    );
  };

  const next = () => {
    setCurrent((index) =>
      index === screenshots.length - 1 ? 0 : index + 1
    );
  };

  const selectImage = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setCurrent((index) =>
          index === 0 ? screenshots.length - 1 : index - 1
        );
      }

      if (event.key === "ArrowRight") {
        setCurrent((index) =>
          index === screenshots.length - 1 ? 0 : index + 1
        );
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxOpen, screenshots.length]);

  return (
    <div className="screenshot-slider">
      <div className="slider-image-container">
        {imageFailed ? (
          <div className="slider-image-error" role="status">
            <p>画像を読み込めませんでした。</p>
            <p className="slider-image-path">{screenshot.src}</p>

            <button
              type="button"
              onClick={() => {
                setFailedImages((images) =>
                  images.filter((src) => src !== screenshot.src)
                );
              }}
            >
              もう一度読み込む
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="slider-image-link"
            onClick={() => setLightboxOpen(true)}
            aria-label="スクリーンショットを拡大表示"
          >
            <img
              className="slider-image"
              src={screenshot.src}
              alt={screenshot.alt}
              onError={() => {
                setFailedImages((images) =>
                  images.includes(screenshot.src)
                    ? images
                    : [...images, screenshot.src]
                );
              }}
            />

            <span className="image-zoom-hint">
              クリックして拡大
            </span>
          </button>
        )}
      </div>

      <div className="slider-controls">
        <button
          type="button"
          onClick={previous}
          aria-label="前の画像"
          className="slider-arrow"
          disabled={screenshots.length < 2}
        >
          ‹
        </button>

        <span className="slider-count" aria-live="polite">
          {current + 1} / {screenshots.length}
        </span>

        <button
          type="button"
          onClick={next}
          aria-label="次の画像"
          className="slider-arrow"
          disabled={screenshots.length < 2}
        >
          ›
        </button>
      </div>

      <p className="slider-caption">{screenshot.alt}</p>

      <div className="slider-dots">
        {screenshots.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className={`slider-dot ${
              index === current ? "active" : ""
            }`}
            onClick={() => selectImage(index)}
            aria-label={`${index + 1}枚目の画像を表示`}
            aria-pressed={index === current}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="スクリーンショット拡大表示"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="拡大表示を閉じる"
          >
            ×
          </button>

          {screenshots.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                previous();
              }}
              aria-label="前の画像"
            >
              ‹
            </button>
          )}

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className="lightbox-image"
              src={screenshot.src}
              alt={screenshot.alt}
            />

            <p className="lightbox-caption">
              {screenshot.alt}
            </p>

            <p className="lightbox-count">
              {current + 1} / {screenshots.length}
            </p>
          </div>

          {screenshots.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label="次の画像"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            Yuki
          </Link>

          <div className="nav-links">
            <a href="#works">制作実績</a>
            <a href="#about">自己紹介</a>
            <a href="#learning">学習内容</a>
            <a href="#contact">連絡先</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PORTFOLIO</p>

          <h1>Yuki</h1>

          <h2>システムエンジニアを目指しています。</h2>

          <p className="hero-text">
            専門学校でWeb制作やプログラミングを学んでいます。
          </p>

          <div className="hero-actions">
            <a href="#works" className="button primary">
              制作実績を見る
            </a>

            <a href="#about" className="button secondary">
              自己紹介
            </a>
          </div>
        </div>
      </section>

      <section id="works" className="section">
        <div className="section-heading">
          <div>
            <p className="label">WORKS</p>
            <h2>制作実績</h2>
          </div>
        </div>

        <div className="works-grid">
          {works.map((work) => (
            <article className="work-card" key={work.number}>
              <div className="work-visual">
                <span>{work.number}</span>
              </div>

              <div className="work-body">
                <h3>{work.title}</h3>

                <p>{work.description}</p>

                {work.screenshots && (
                  <>
                    <ScreenshotSlider
                      screenshots={work.screenshots}
                    />

                    <p className="screenshot-note">
                      制作画面の一部です。画像をクリックすると拡大できます。
                    </p>
                  </>
                )}

                <div className="tags">
                  {work.tech.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section dark-section">
        <div className="section-heading">
          <div>
            <p className="label">ABOUT ME</p>
            <h2>自己紹介</h2>
          </div>
        </div>

        <div className="about-card">
          <div className="about-photo-wrapper">
            <img
              src="/profile-photo.jpg"
              alt="Yukiのプロフィール写真"
              className="about-photo"
            />
          </div>

          <div className="about-content">
            <h3>Yuki</h3>

            <p className="about-role">
              システムエンジニア志望
            </p>

            <p className="about-message">
              専門学校でWeb制作やプログラミングを学んでいます。
            </p>

            <div className="about-hobbies">
              <span>筋トレ</span>
              <span>読書</span>
              <span>Web制作</span>
            </div>
          </div>
        </div>
      </section>

      <section id="learning" className="section">
        <div className="section-heading">
          <div>
            <p className="label">LEARNING</p>
            <h2>学習内容</h2>
          </div>

          <p>現在学習している技術や分野を紹介します。</p>
        </div>

        <div className="skills">
          {skills.map((skill, index) => (
            <div className="skill" key={skill}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{skill}</strong>
            </div>
          ))}
        </div>

        <div className="learning-note">
          <div>
            <p className="label">現在の目標</p>
            <h3>基本情報技術者試験の学習</h3>
          </div>

          <p>資格取得に向け勉強中です。</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="label">CONTACT</p>

        <h2>ご覧いただきありがとうございます。</h2>

        <p>
          制作物や学習内容について、詳しくご紹介できればと思います。
        </p>

        <a
          className="button primary"
          href="mailto:aoyamayuki2027@gmail.com"
        >
          メールで連絡する
        </a>
      </section>

      <footer>
        <div className="footer-inner">
          <strong>Yuki</strong>
          <p>© 2026 Yuki Portfolio</p>
        </div>
      </footer>
    </main>
  );
}