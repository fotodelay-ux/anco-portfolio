/* site-app.jsx — anco. portfolio */
const { useState, useEffect, useRef } = React;

/* ---------------- placeholder thumbnail ---------------- */
function Thumb({ color, label, fig = "", className = "", img = "" }) {
  return (
    <div className={"thumb " + className}>
      {img ?
      (/\.(mp4|webm)$/i.test(img) ?
        <video src={img} autoPlay loop muted playsInline className="thumb__img" /> :
        <img src={img} alt={label || ""} className="thumb__img" />) :
      <div className="thumb__field" style={{ background: color }}></div>
      }
      {/* <div className="thumb__grain"></div>
      <div className="thumb__frame"></div> */}
      {label && !img && <div className="thumb__label">{label}</div>}
      {fig && !img && <div className="thumb__fig">{fig}</div>}
    </div>);

}

/* ---------------- sidebar ---------------- */
function Sidebar({ active, goTo }) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[300px] border-r border-line flex-col justify-between py-7 pr-7 pl-[23px] z-30 bg-paper" style={{ fontFamily: "Inter" }}>
      <div>
        <nav className="flex flex-col gap-1.5">
          {NAV.map((n) =>
          <button
            key={n.id}
            onClick={() => goTo(n.id)}
            className={"nav-link font-sans uppercase flex items-center gap-2.5 text-[13px] tracking-[0.04em] leading-tight text-left " + (active === n.id ? "nav-link--on font-semibold" : "")} style={{ fontFamily: "Inter", fontSize: "15px" }}>
            
              <span className="nav-dot inline-block w-2 h-2 rounded-full bg-ink"></span>
              {n.label}
            </button>
          )}
        </nav>
        {/*<button
          onClick={() => goTo("contact")}
          className="mt-7 inline-flex items-center gap-2 whitespace-nowrap bg-ink text-paper text-[12px] uppercase tracking-[0.04em] rounded-full pl-4 pr-3.5 py-2.5 hover:opacity-90 transition" style={{ fontSize: "13px" }}>
          
          Start the project
          <span className="text-sm leading-none">↗</span>
        </button>*/}
      </div>

      <div>
        <div className="flip-card w-full">
          <div className="flip-inner">
            <div className="flip-front"><AncoLogo className="w-full text-ink" /></div>
            <div className="flip-back">
              <svg viewBox="0 0 661.45 145.18" className="w-full" aria-label="Jiyeon Kim">
                <text x="0" y="118" textLength="661.45" lengthAdjust="spacingAndGlyphs" fill="currentColor" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "135px", letterSpacing: "-4px" }}>Jiyeon Kim</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="mono text-[10px] opacity-50 mt-4 leading-relaxed">© 2026 anco. — Jiyeon Kim</div>
      </div>
    </aside>);

}

/* ---------------- mobile nav items ---------------- */
const MOBILE_NAV = [
{ id: "work", label: "Work." },
{ id: "about", label: "About." },
{ id: "contact", label: "Contact." }];

/* ---------------- mobile header (homepage hero) ---------------- */
function MobileHeader({ goTo }) {
  return (
    <header className="md:hidden px-[30px] pt-6 pb-0" style={{ fontFamily: "Inter" }}>
      <AncoLogo className="w-[100%] text-ink" />
      {/*<div className="w-full h-px bg-line mt-5"></div> */}
      <div className="mt-1 flex items-baseline gap-3">
        {/* <span className="text-[20px] tracking-[0.05em]" style={{ fontFamily: "Inter", fontWeight: 500 }}>Jiyeon Kim</span> */}
        {/* <span className="mono text-[13px] uppercase tracking-[0.16em] opacity-50">Visual Designer</span> */}
      </div>
      <nav className="mt-2 flex items-center flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-[0.3px]">
        {MOBILE_NAV.map((it) =>
        <button key={it.id} onClick={() => goTo(it.id)} className="ul-link font-medium uppercase text-[14px] text-center pb-1 " style={{ fontFamily: "Inter" }}>{it.label}</button>
        )}
      </nav>
    </header>);

}

/* ---------------- mobile top bar (inside detail overlays) ---------------- */
function MobileBar({ goTo, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden sticky top-0 z-30 bg-paper border-b border-line" style={{ fontFamily: "Inter" }}>
      <div className="flex items-center justify-between px-[7vw] py-4">
        <button onClick={onClose} aria-label="home"><AncoLogo className="h-[30px] text-ink" /></button>
        <button onClick={() => setOpen((v) => !v)} aria-label="menu" className="flex flex-col gap-[5px] py-2 pl-4">
          <span className="block w-6 h-px bg-ink"></span>
          <span className="block w-6 h-px bg-ink"></span>
          <span className="block w-6 h-px bg-ink"></span>
        </button>
      </div>
      {open &&
      <nav className="border-t border-line px-[7vw] pb-2">
          {MOBILE_NAV.map((it) =>
        <button key={it.id} onClick={() => {setOpen(false);goTo(it.id);}} className="block w-full text-left py-3.5 text-[14px] uppercase tracking-[0.1em] border-b border-line/50 last:border-0">{it.label}</button>
        )}
        </nav>
      }
    </div>);

}

/* ---------------- section frame ---------------- */
function Block({ id, index, label, labelKr, children, className = "" }) {
  return (
    <section id={id} className={"px-[20px] lg:px-10 pt-4 pb-16 lg:pt-6 lg:pb-20 border-t border-line first:border-t-0 " + className} style={{ lineHeight: "1.5", fontFamily: "Inter" }}>
      {/* <div className="mono text-[11px] uppercase tracking-[0.18em] opacity-50 mb-8 flex items-center gap-3 whitespace-nowrap" style={{ fontFamily: "Inter" }}>
        <span>({index})</span>
        <span className="w-8 h-px bg-ink/30 inline-block"></span>
        <span>{label}</span>
        <span className="opacity-60 shrink-0">· {labelKr}</span>
      </div> */}
      {children}
    </section>);

}

/* ---------------- About ---------------- */
const EN = [
"The name anco. comes from the French word inconnu — meaning the stranger, or the unknown. It focuses on untapped potential, looking closely at the hidden gaps of sensation yet to be discovered.",
"This aligns with the attitude of photographer Saul Leiter. I want to carry forward his way of being an “Always a Young Stranger.” Instead of standing in the spotlight, I step back to observe the familiar with fresh eyes, capturing the contexts and emotions hidden between the lines.",
"My work relies on intuition, but I believe true design should never look accidental. That is why I study human cognition, psychology, and storytelling. I strive for design that can explain itself — why it looks a certain way, and why it makes us feel something.",
"As an “Always a Young Stranger,” I don’t settle for the familiar. I move between sensation and thought to reveal the hidden meanings around us."];

const KO = [
"‘안코(anco.)’라는 이름은 ‘낯선 사람, 미지의 존재’를 뜻하는 프랑스어 ‘앙코뉴(inconnu)’의 어감과 정서에서 영감을 받았습니다. 여기에는 드러나지 않은 잠재된 상태, 즉 아직 온전히 발견되지 않은 감각의 틈새에 주목한다는 의미를 담고 있습니다.",
"이러한 시선은 제가 늘 마음 깊이 두어온 사진작가 사울 레이터의 태도와도 연결됩니다. 전면에 나서기보다 한 걸음 물러나 익숙한 세상을 낯설게 바라보고, 보이는 것보다 그 사이에 숨겨진 맥락과 감정을 포착하는 ‘언제나 젊은 이방인’으로서의 그의 시선을 저의 디자인 작업에서도 이어가고자 합니다.",
"보다 감각적이고 직관적인 디자인을 추구하지만, 그 감각이 우연으로 보이지 않기를 바랍니다. 그래서 인간의 인지체계와 심리, 스토리텔링을 꾸준히 익히며 디자인이 왜 그렇게 보이고, 왜 그렇게 느껴지는지를 설명할 수 있는 디자인을 지향하고 있습니다.",
"언제나 젊은 이방인으로서 익숙함에 머무르지 않고 감각과 사유 사이를 오가며, 우리 주변에 보이지 않던 숨겨진 의미를 드러내는 디자인을 만듭니다."];

const EXPERIENCE = [
{ period: "2025—present", org: "Freelance", role: "Creative Director" },
{ period: "2020—2023", org: "SLL (JTBC Studios)", role: "Manager, Digital Design Part" },
{ period: "2016—2020", org: "A+E Networks Korea", role: "Creative Designer" },
{ period: "2014—2015", org: "Style&", role: "Motion Graphic Designer" },
{ period: "2014", org: "Imagebakery", role: "Motion Graphic Designer" }];


function About() {
  return (
    <Block id="about" index="01" label="About" labelKr="소개">
      <div className="flex flex-col items-start md:flex-row md:items-end gap-2 md:gap-5">
        <AncoLogo className="h-12 lg:h-16 text-ink text-left" />
        {/* <div className="md:pb-1 text-[15px] lg:text-[18px]"><span className="font-medium" style={{ letterSpacing: "0px" }}>Jiyeon Kim,</span> <span className="opacity-55">Visual Designer</span></div> */}
      </div>

      <div className="mt-6 lg:mt-9 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-start">
        <div className="group w-full max-w-full">
          <div className="thumb bw aspect-[4/3] rounded-[10px]">
            <img src="site-img/profileImage_1.png" alt="Jiyeon Kim" className="w-full h-full object-cover" style={{ objectFit: "cover", margin: "0px", width: "100%" }} />
          </div>
        </div>

        <div className="lg:pt-1">
          <div className="md:pb-1 flex items-center gap-2.5 text-[15px] lg:text-[18px]">
            <span><span className="font-medium">Jiyeon Kim,</span> <span className="opacity-55">Visual Designer</span></span>
            <a href="https://www.linkedin.com/in/jiyeonkim-anco" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="opacity-60 hover:opacity-100 transition ml-9">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.33a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 18v-4.57c0-2.4-1.28-3.52-2.99-3.52-1.38 0-2 .76-2.34 1.29v-1.1h-2.67V18h2.67v-4.65c0-.25.02-.49.09-.67.2-.49.64-1 1.39-1 .98 0 1.37.74 1.37 1.83V18h2.81z"/></svg>
            </a>
            <a href="https://www.behance.net/fotodelay" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="opacity-60 hover:opacity-100 transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9.1 11.3c.7-.35 1.2-1 1.2-1.95C10.3 7.3 8.9 6.9 7.3 6.9H3v10.2h4.4c1.7 0 3.3-.8 3.3-2.7 0-1.18-.55-2.05-1.6-2.4zM5.2 8.6h1.8c.7 0 1.3.2 1.3 1 0 .75-.5 1.05-1.2 1.05H5.2V8.6zm2 6.8H5.2v-2.5h2.05c.85 0 1.4.35 1.4 1.25 0 .9-.65 1.25-1.45 1.25zM21 12.3c0-2.3-1.35-4.2-3.8-4.2-2.4 0-4.05 1.8-4.05 4.15 0 2.4 1.55 4.1 4.05 4.1 1.9 0 3.13-.85 3.7-2.65h-2.05c-.2.55-.75.85-1.55.85-1 0-1.6-.6-1.7-1.6H21c.03-.2.05-.4.05-.6zm-5.35-.85c.13-.9.7-1.45 1.55-1.45.9 0 1.4.6 1.45 1.45h-3zM15 7.2h4.3V8.4H15V7.2z"/></svg>
            </a>
          </div>
          <div className="flex flex-col mt-4">
            {EXPERIENCE.map((e, i) =>
            <div key={i} className="grid grid-cols-[110px_1fr] gap-x-5 py-3.5 border-t border-line first:border-t-0">
                <div className="mono text-[12px] opacity-40 pt-0.5 whitespace-nowrap">{e.period}</div>
                <div>
                  <div className="text-[15px] font-semibold tracking-tight leading-snug">{e.org}</div>
                  <div className="text-[13px] opacity-55 leading-snug mt-0.5">{e.role}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <h1 className="mt-20 font-semibold tracking-tight leading-tight text-[14px] lg:text-[15px]" style={{ fontFamily: "Poppins" }}>"Always a Young Stranger."</h1>
      {/* <p className="kr text-[13px] lg:text-[0.9vw] opacity-70 tracking-tight mt-1" style={{ fontWeight: "500", fontSize: "16px" }}>언제나 젊은 이방인의 시선으로.</p> */}

      <div className="mt-8 grid lg:grid-cols-2 gap-x-8 gap-y-5">
        <div className="space-y-4" style={{ fontFamily: "Roboto" }}>
          {/* <div className="mono text-[11px] uppercase tracking-widest opacity-40">English</div> */}
          {EN.map((t, i) =>
          <p key={i} className="text-[14.5px] lg:text-[15px] leading-relaxed opacity-80" style={{ fontFamily: "Roboto" }}>{t}</p>
          )}
        </div>
        <div className="space-y-4">
          {/* <div className="mono text-[11px] uppercase tracking-widest opacity-40">한국어</div> */}
          {KO.map((t, i) =>
          <p key={i} className="kr text-[13.5px] lg:text-[14px] leading-[1.85] opacity-80" style={{ fontFamily: "Pretendard",}}>{t}</p>
          )}
        </div>
      </div>
    </Block>);

}

/* ---------------- Work ---------------- */
function GridCard({ p, onOpen }) {
  return (
    <button onClick={() => onOpen(p)} className="group block text-left cursor-pointer w-full">
      <Thumb color={p.color} img={p.thumb} label={p.titleEn} fig={"no. " + p.num} className="w-full aspect-[16/9] rounded-[6px]" />
      <h3 className="text-[14px] lg:text-[16px] font-semibold tracking-tight mt-3 leading-snug">{p.title}</h3>
      <p className="text-[12px] lg:text-[13px] leading-relaxed opacity-70 mt-1.5 line-clamp-3" style={{ fontFamily: "Roboto" }}>{p.summary}</p>
      <span className="mono text-[12px] tracking-wide opacity-40 mt-2 inline-block group-hover:opacity-100 transition">See More →</span>
    </button>);

}

function PosterCard({ p, onZoom }) {
  const src = p.poster || p.thumb;
  return (
    <button onClick={() => onZoom(src)} className="group block text-left cursor-pointer w-full">
      <div className="w-full overflow-hidden rounded-[3px] bg-paper-2" style={{ aspectRatio: "297 / 420" }}>
        <img src={src} className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]" style={{ margin: "0px", width: "100%" }} />
      </div>
      <h3 className="text-[13px] lg:text-[15px] font-semibold tracking-tight mt-2.5 leading-snug">{p.title}</h3>
    </button>);

}
function LogoCard({ p, onZoom }) {
  const src = p.logo || p.thumb;
  return (
    <button onClick={() => onZoom(src)} className="group block text-left cursor-pointer w-full">
      <div className="w-full overflow-hidden rounded-[6px] bg-paper-2 aspect-[16/9]">
        <img src={src} className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]" style={{ margin: "0px", width: "100%" }} />
      </div>
      <h3 className="text-[13px] lg:text-[15px] font-semibold tracking-tight mt-2.5 leading-snug">{p.title}</h3>
    </button>);
}

function PosterLightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 cursor-zoom-out" style={{ background: "rgba(16,12,8,0.92)" }}>
      <button onClick={onClose} aria-label="close" className="absolute top-5 right-6 text-3xl leading-none" style={{ color: "rgba(237,231,218,0.8)" }}>×</button>
      <img src={src} onClick={(e) => e.stopPropagation()} className="max-w-full max-h-full object-contain cursor-default" style={{ margin: "0px", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }} />
    </div>);

}

function ProjectCard({ p, onOpen }) {
  return (
    <div className="group cursor-pointer" onClick={() => onOpen(p)}>
      {/* 1) 타이틀 + 메타 — 이미지보다 먼저 */}
      <div className="mb-2 flex flex-col sm:flex-row items-start sm:justify-between gap-2 sm:gap-4">
        <div>
          <h3 className="text-[24px] lg:text-[26px] font-semibold tracking-tight leading-tight">
            <span className="kr ul-link">{p.title}</span>
            <span className="hidden md:inline opacity-35 font-normal text-[13px] lg:text-[18px]"> — {p.titleEn}</span>
          </h3>
          <div className="md:hidden opacity-35 font-normal text-[14px]"> — {p.titleEn}</div>
          <div className="hidden md:block mono text-xs opacity-45 mt-1.5">{p.meta} · {p.year}</div>
        </div>
      </div>

      {/* 2) 왼쪽: 이미지 + 태그 / 오른쪽: 설명 */}
      <div className="grid lg:grid-cols-[3fr_1fr] gap-6 lg:gap-10 items-start">
        <div>
          <Thumb color={p.color} img={p.thumb} label={p.titleEn + " / " + p.tags[0]} fig={"no. " + p.num} className="aspect-[16/9] rounded-[10px]" />
          <div className="flex gap-2 flex-wrap mt-3">
            {p.tags.map((t) =>
            <span key={t} className="pill px-2 py-0.5 text-[12px] mono uppercase tracking-wide">{t}</span>
            )}
          </div>
        </div>
        <div>
          <p className="kr text-[14px] lg:text-[15px] leading-relaxed opacity-75 whitespace-pre-line line-clamp-[5] lg:line-clamp-[15]">{p.summary}</p>
          <span className="mono text-[15px] tracking-wide opacity-40 mt-[25px] inline-block group-hover:opacity-100 transition">See More →</span>
        </div>
      </div>
    </div>);

}

function Work({ filter, setFilter, onOpen, showFilters }) {
  const [zoom, setZoom] = useState(null);
  const filters = ["All","graphic","logo","Poster","motion"];
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));
  const isPoster = filter === "Poster";
  const isLogo = filter === "logo";
  const isGrid = filter === "graphic" || filter === "motion";
  return (
    <Block id="work" index="02" label="Work" labelKr="작업">
      {/* 타이틀 + 필터 (모바일에서는 필터 숨김) */}
      <div className="flex flex-wrap items-end justify-between gap-4 md:mb-6">
        <h2 className="hidden md:block text-[40px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1]" style={{ fontWeight: "800", fontFamily: "Inter" }}>
          Projects
        </h2>
        <div className={(showFilters ? "flex" : "hidden") + " md:flex flex-wrap gap-1.5 pb-1.5"}>
          {filters.map((f) =>
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={"pill px-2 py-0.5 text-[10px] md:px-3 md:py-1 md:text-[12px] mono uppercase tracking-wide " + (filter === f ? "pill--on" : "")}
            style={{ fontWeight: "500", fontFamily: "inter" }}>
              {f}
            </button>
          )}
        </div>
        {/* <div className="md:hidden flex flex-wrap gap-2.5 pb-1.5">
          {filters.map((f) =>
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={"mt-6 pill px-2 py-1 text-[10px] mono uppercase tracking-wide " + (filter === f ? "pill--on" : "")}
            style={{ fontWeight: "500", fontFamily: "inter" }}>
              {f}
            </button>
          )}
        </div> */}
      </div>


      {isPoster ?
      /* 포스터: A3 비율 3그리드, 클릭 시 라이트박스 */
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
          {list.map((p) => <PosterCard key={p.id} p={p} onZoom={setZoom} />)}
        </div> :
        isLogo ?
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
          {list.map((p) => <LogoCard key={p.id} p={p} onZoom={setZoom} />)}
        </div> :
      isGrid ?
      /* branding/graphic/motion: 인스타식 3그리드 (16:9 + 영문 소개) */
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
          {list.map((p) => <GridCard key={p.id} p={p} onOpen={onOpen} />)}
        </div> :
      /* All: 기존 리스트 */
      <div className="mt-4 grid grid-cols-1 gap-y-12">
          {list.map((p, idx) =>
        <div key={p.id} className={"w-full " + (idx !== list.length - 1 ? "border-b border-line pb-12" : "")}>
              <ProjectCard p={p} onOpen={onOpen} />
            </div>
        )}
        </div>
      }

      {zoom && <PosterLightbox src={zoom} onClose={() => setZoom(null)} />}
    </Block>);

}

/* ---------------- Project detail ---------------- */
function DetailBlock({ blk }) {
  if (blk.type === "section") {
    return (
      <div className="grid lg:grid-cols-[210px_1fr] gap-4 lg:gap-10 py-10 lg:py-14">
        <div className="lg:sticky lg:top-12 self-start">
          <div className="kr text-lg lg:text-xl font-semibold">{blk.label}</div>
          {blk.labelEn && <div className="mono text-[11px] uppercase tracking-wide opacity-40 mt-1">{blk.labelEn}</div>}
        </div>
        <div>
          <p className="kr text-[14px] lg:text-[16px] leading-[1.8] opacity-85 whitespace-pre-line">{blk.body}</p>
        </div>
      </div>);
  }
  if (blk.type === "image") {
    const auto = blk.ratio === "auto";
    const isVid = /\.(mp4|webm)$/i.test(blk.src);
    return (
      <figure className="m-0 mt-6 md:mt-10">
        <div className="-mx-[7vw] md:mx-0 rounded-none md:rounded-[3px] overflow-hidden"
             style={auto ? {} : { aspectRatio: (blk.ratio || "16/9").replace("/", " / ") }}>
          {isVid ?
            <video src={blk.src} autoPlay loop muted playsInline
                   className={"w-full " + (auto ? "h-auto block" : "h-full object-cover")}
                   style={{ margin: "0px", width: "100%" }} /> :
            <img src={blk.src}
                 className={"w-full " + (auto ? "h-auto block" : "h-full object-cover")}
                 style={{ margin: "0px", width: "100%" }} />}
        </div>
        {blk.caption && <figcaption className="kr text-[12px] opacity-45 mt-2 md:text-center">{blk.caption}</figcaption>}
      </figure>);
  }
  if (blk.type === "video") {
    const auto = blk.ratio === "auto";
    return (
      <figure className="m-0 mt-6 md:mt-10">
        <div className="-mx-[7vw] md:mx-0 rounded-none md:rounded-[3px] overflow-hidden"
             style={auto ? {} : { aspectRatio: (blk.ratio || "16/9").replace("/", " / ") }}>
          <video src={blk.src} autoPlay loop muted playsInline
                 className={"w-full " + (auto ? "h-auto block" : "h-full object-cover")}
                 style={{ margin: "0px", width: "100%" }} />
        </div>
        {blk.caption && <figcaption className="kr text-[12px] opacity-45 mt-2 md:text-center">{blk.caption}</figcaption>}
      </figure>);
  }
  if (blk.type === "images") {
    const cols = blk.cols || blk.src.length;
    return (
      <div className="mt-1 md:mt-1 -mx-[7vw] md:mx-0">
        <div className="grid gap-0.5 md:gap-1 items-start" style={{ gridTemplateColumns: "repeat(" + cols + ", 1fr)" }}>
          {blk.src.map((s, i) =>
          <div key={i} className="rounded-none md:rounded-[3px] overflow-hidden">
            {/\.(mp4|webm)$/i.test(s) ?
              <video src={s} autoPlay loop muted playsInline className="w-full h-auto block" style={{ margin: "0px", width: "100%" }} /> :
              <img src={s} className="w-full h-auto block" style={{ margin: "0px", width: "100%" }} />}
          </div>
          )}
        </div>
        {blk.caption && <figcaption className="kr text-[12px] opacity-45 mt-2 px-[7vw] md:px-0 md:text-center">{blk.caption}</figcaption>}
      </div>);
  }
  return null;
}

function ProjectDetail({ p, onClose, onOpen, goTo }) {
  const next = PROJECTS[(PROJECTS.findIndex((x) => x.id === p.id) + 1) % PROJECTS.length];

  // blocks가 있으면 그걸 쓰고, 없으면 기존 텍스트로 자동 구성(하위 호환)
  const blocks = p.blocks || [
  { type: "section", label: "Overview", body: p.context },
  { type: "section", label: "Strategy", body: p.strategy },
  { type: "section", label: "Outcome", body: p.outcome }];

  useEffect(() => {
    const ov = document.getElementById("detail-scroll");
    if (ov) ov.scrollTop = 0;
  }, [p.id]);
  return (
    <div id="detail-scroll" className="fixed inset-0 md:left-[300px] z-50 bg-paper overflow-y-auto">
      <MobileBar goTo={goTo} onClose={onClose} />
      <div className="detail-in px-[7vw] lg:px-10 pt-6 md:pt-10 pb-16 max-w-[100%]">
        <button onClick={onClose} className="hidden md:inline-flex mono text-[11px] uppercase tracking-[0.16em] ul-link items-center gap-2">
          <span className="text-base">←</span> Back to index
        </button>
        <h2 className="md:mt-5 text-[25px] lg:text-[40px] font-semibold tracking-[-0.03em] leading-[0.9]">
          <span className="kr">{p.title}</span>
        </h2>
        <div className="md:hidden mt-1 opacity-35 font-normal text-[14px]" style={{ color: "rgba(8, 6, 4, 0.35)" }}> {p.titleEn}</div>
        <div className="hidden md:block mono text-[20px] mt-1" style={{ color: "rgba(8, 6, 4, 0.35)" }}>{p.titleEn}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) =>
          <span key={t} className="hidden md:block pill px-3 py-1 text-[10.5px] mono uppercase tracking-wide">{t}</span>
          )}
        </div>
        <div className="mono text-[14px] opacity-50 mt-2 whitespace-pre-line" style={{ color: "rgba(8, 6, 4, 0.35)" }}>{p.role}</div>

        {(p.keyart || p.cover) &&
        <div className="mt-4 -mx-[7vw] md:mx-0 aspect-[16/9] rounded-none md:rounded-[3px] overflow-hidden">
            <img src={p.keyart || p.cover} className="w-full h-full object-cover" style={{ margin: "0px", width: "100%" }} />
          </div>
        }

        {blocks.map((blk, i) => <DetailBlock key={i} blk={blk} />)}

        <button onClick={() => onOpen(next)} className="group mt-16 w-full border-t border-line pt-10 flex items-end justify-between text-left">
          <div>
            <div className="mono text-[11px] uppercase tracking-wide opacity-45">Next project</div>
            <div className="kr text-xl lg:text-2xl font-semibold tracking-tight mt-2">{next.title} <span className="opacity-35 font-normal">— {next.titleEn}</span></div>
          </div>
          <span className="text-xl lg:text-2xl opacity-40 group-hover:translate-x-2 transition">→</span>
        </button>
      </div>
    </div>);

}
/* ---------------- Service ---------------- */
function Service({ onOpen }) {
  return (
    <Block id="service" index="03" label="Service" labelKr="서비스">
      <h2 className="text-[14vw] lg:text-[7vw] font-semibold tracking-[-0.03em] leading-[0.85] mb-14" style={{ fontWeight: "800", fontFamily: "Inter", fontSize: "70px" }}>What I do</h2>
      <div className="border-t border-line">
        {SERVICES.map((s) => {
          const rel = PROJECTS.find((p) => p.id === s.related);
          return (
            <button
              key={s.num}
              onClick={() => rel && onOpen(rel)}
              className="svc-row w-full border-b border-line text-left px-2 lg:px-6 py-8 lg:py-10 grid lg:grid-cols-[80px_300px_1fr_40px] items-center gap-4 lg:gap-8">
              
              <span className="mono text-xs opacity-45">{s.num}</span>
              <span className="text-3xl lg:text-5xl font-semibold tracking-tight">
                {s.name} <span className="kr text-xl lg:text-2xl opacity-45 font-normal">{s.nameKr}</span>
              </span>
              <span className="kr text-sm lg:text-[15px] leading-relaxed opacity-70 max-w-xl">{s.desc}</span>
              <span className="svc-arrow text-2xl lg:text-3xl justify-self-end">↗</span>
            </button>);

        })}
      </div>
    </Block>);

}

/* ---------------- Blog ---------------- */
function Blog({ onOpen }) {
  return (
    <Block id="blog" index="04" label="Blog" labelKr="저널">
      <div className="flex items-end justify-between gap-6 mb-14">
        <h2 className="text-[14vw] lg:text-[7vw] font-semibold tracking-[-0.03em] leading-[0.85]" style={{ fontFamily: "Inter", fontWeight: "800", fontSize: "70px" }}>Archive</h2>
        {/* <div className="kr mono text-xs opacity-45 pb-3">감각과 사유의 기록</div> */}
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-x-1 gap-y-9">
        {BLOG.map((b, i) =>
        <button key={i} onClick={() => onOpen(b)} className="group block text-left cursor-pointer">
            <Thumb color={b.color} img={b.thumb} label="" fig="" className="w-full aspect-[3/4] rounded-[3px]" />
            <h3 className="kr text-[13px] lg:text-base font-semibold tracking-tight mt-3"><span className="ul-link">{b.title}</span></h3>
            <div className="mono text-[11px] opacity-45 mt-1 flex items-center gap-2">
              <span>{b.date}</span>
              <span className="opacity-50">·</span>
              <span className="kr">{b.cat}</span>
            </div>
          </button>
        )}
      </div>
    </Block>);

}

/* ---------------- Blog detail (Naver-blog style) ---------------- */
function BlogDetail({ b, onClose, goTo }) {
  useEffect(() => {
    const ov = document.getElementById("post-scroll");
    if (ov) ov.scrollTop = 0;
  }, [b]);
  const body = b.body || [];
  return (
    <div id="post-scroll" className="fixed inset-0 md:left-[300px] z-50 bg-paper overflow-y-auto" style={{ fontFamily: "Inter" }}>
      <MobileBar goTo={goTo} onClose={onClose} />
      <div className="detail-in px-[7vw] lg:px-10 pt-6 md:pt-10 pb-24 max-w-[760px]">
        <button onClick={onClose} className="hidden md:inline-flex mono text-[13px] uppercase tracking-[0.16em] ul-link items-center gap-2">
          <span className="text-base">←</span> Back to blog
        </button>

        {/* header — kept small */}
        <div className="mt-4 md:mt-10">
          <div className="mono text-[11px] opacity-50 flex items-center gap-2.5">
            <span>{b.date}</span>
            <span className="pill px-2.5 py-0.5 kr text-[10px]">{b.cat}</span>
          </div>
          <h2 className="kr text-2xl lg:text-[28px] font-semibold tracking-tight mt-3 leading-snug">{b.title}</h2>
        </div>

        {/* horizontal line */}
        <div className="border-t border-line mt-6"></div>

        {/* body — photos & text stacked vertically */}
        <div className="mt-9 space-y-7">
          {body.map((blk, i) =>
          blk.type === "image" ?
          <figure key={i} className="m-0">
                <Thumb color={blk.color || b.color} img={blk.img} label={blk.caption || ""} fig="" className="-mx-[7vw] md:mx-0 aspect-[4/3] rounded-none md:rounded-[3px]" />
                {blk.caption && <figcaption className="kr text-[12px] opacity-45 mt-2 text-center">{blk.caption}</figcaption>}
              </figure> :

          <p key={i} className="kr text-[15px] lg:text-base leading-[1.9] opacity-85 whitespace-pre-line">{blk.text}</p>
          )}
          {body.length === 0 &&
          <p className="kr text-[15px] leading-[1.9] opacity-55">{b.excerpt}</p>
          }
        </div>
      </div>
    </div>);

}

/* ---------------- Contact ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Block id="contact" index="05" label="Contact" labelKr="문의">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16">
        <div>
          <h2 className="text-[12vw] lg:text-[6vw] font-semibold tracking-[-0.03em] leading-[0.9]" style={{ fontFamily: "Pretendard", fontWeight: "700", fontSize: "70px" }}>Say Hello.</h2>
          <p className="kr mt-6 text-L opacity-70">Please feel free to reach out for project inquiries or just to say hello. I’m always open to new stories and conversations.</p>
          <p className="kr mt-6 text-L opacity-70">프로젝트 문의든, 그냥 가벼운 인사든 무거운 인사든 헛소리든 옹알이든 욕이든 진짜진짜 편하게 연락해 주세요. 새로운 이야기와 대화는 언제든 환영합니다.</p>
          {sent ?
          <div className="mt-12 kr text-lg border border-line rounded-[3px] p-8 bg-paper-2">
              메시지가 전송되었습니다. 빠른 시일 내에 답신드리겠습니다. <span className="opacity-50">감사합니다.</span>
            </div> :

          <form className="mt-12 space-y-7 max-w-xl" action="https://formspree.io/f/mgobzbed" method="POST" onSubmit={(e) => { e.preventDefault(); fetch("https://formspree.io/f/mgobzbed", { method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" } }).then((r) => {if (r.ok) setSent(true);}); }}>
              <div className="grid sm:grid-cols-2 gap-7">
                <input name="name" className="field-input kr" placeholder="이름 / Name" required />
                <input name="email" className="field-input kr" type="email" placeholder="이메일 / Email" required />
              </div>
              <input name="subject" className="field-input kr" placeholder="제목 / Subject" />
              <textarea name="message" className="field-input kr resize-none" rows="4" placeholder="내용을 적어주세요 / Message" required></textarea>
              <button type="submit" className="inline-flex items-center gap-2 bg-ink text-paper text-sm tracking-wide rounded-full pl-6 pr-5 py-3 hover:opacity-90 transition">
                보내기 <span className="text-base leading-none">↗</span>
              </button>
            </form>
          }
        </div>
        <div className="lg:pt-4 space-y-10">
          {[
          { k: "Email", v: "fotodelay@gmail.com" },
          { k: "LinkedIn", v: "linkedin.com/in/jiyeonkim-anco", url: "https://linkedin.com/in/jiyeonkim-anco" },
          { k: "Location", v: "Seoul, Republic of Korea" },
          { k: "Availability", v: "Parenting & Designing" }].
          map((r) =>
          <div key={r.k} className="border-t border-line pt-4">
              <div className="mono text-[11px] uppercase tracking-widest opacity-45">{r.k}</div>
              <div className="kr text-lg mt-1.5">
                {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" className="ul-link">{r.v}</a> : r.v}
              </div>
            </div>
          )}
        </div>
      </div>
    </Block>);

}

/* ---------------- Footer ---------------- */
function Footer({ goTo }) {
  return (
    <footer className="px-[7vw] lg:px-10 pt-12 pb-10 border-t border-line">
      <AncoLogo className="w-full max-w-[1100px] text-ink opacity-95" />
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 mono text-[11px] uppercase tracking-wide opacity-50">
        <span>© 2026 anco. — Always a Young Stranger</span>
        <button onClick={() => goTo("about")} className="ul-link">Back to top ↑</button>
      </div>
    </footer>);

}

/* ---------------- App ---------------- */
function App() {
  const [active, setActive] = useState("about");
  const [project, setProject] = useState(null);
  const [post, setPost] = useState(null);
  const [filter, setFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {if (e.isIntersecting) setActive(e.target.id);});
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {const el = document.getElementById(n.id);if (el) obs.observe(el);});
    return () => obs.disconnect();
  }, []);

  // scroll reveal — 요소가 화면에 들어오면 슥! 등장
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SEL = "#work h2, #work .group, #about h1, #about .grid > div, #about p, #blog h2, #blog button, #contact h2, #contact p, #contact form, #contact .border-t, .detail-in > h2, .detail-in figure, .detail-in > div";
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    const scan = () => {
      document.querySelectorAll(SEL).forEach((el) => {
        if (!el.classList.contains("reveal")) { el.classList.add("reveal"); io.observe(el); }
      });
    };
    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = project || post ? "hidden" : "";
  }, [project, post]);

  const goTo = (id) => {
    if (project) setProject(null);
    if (post) setPost(null);
    setShowFilters(id === "work");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
    });
  };

  return (
    <>
      <Sidebar active={active} goTo={goTo} />
      <MobileHeader goTo={goTo} />
      <main className="md:ml-[300px] pt-0">
        <Work filter={filter} setFilter={setFilter} onOpen={setProject} showFilters={showFilters} />
        <About />
        {/* <Service onOpen={setProject} /> */}
        <Blog onOpen={setPost} />
        <Contact />
        <Footer goTo={goTo} />
      </main>
      {project && <ProjectDetail p={project} onClose={() => setProject(null)} onOpen={setProject} goTo={goTo} />}
      {post && <BlogDetail b={post} onClose={() => setPost(null)} goTo={goTo} />}
    </>);

}

/* ---- boot: load content from content/*.json, then render ---- */
async function boot() {
  const root = document.getElementById("root");
  try {
    const [projects, services, blog] = await Promise.all([
      fetch("content/projects.json").then((r) => r.json()),
      fetch("content/services.json").then((r) => r.json()),
      fetch("content/blog.json").then((r) => r.json())]
    );
    window.PROJECTS = projects;
    window.SERVICES = services;
    window.BLOG = blog;
    ReactDOM.createRoot(root).render(<App />);
  } catch (err) {
    console.error("content load failed:", err);
    root.innerHTML =
      '<div style="font-family:monospace;max-width:560px;margin:18vh auto;padding:0 24px;color:#17120d;line-height:1.7">' +
      '<b>콘텐츠를 불러오지 못했습니다.</b><br><br>' +
      'content/ 폴더의 JSON 파일을 읽지 못했습니다. 두 가지를 확인하세요:<br><br>' +
      '1. 이 페이지를 <b>로컬 서버(Live Server 등)</b>로 열었나요? 파일을 더블클릭(file://)하면 보안 정책상 JSON을 못 읽습니다.<br>' +
      '2. JSON 파일에 <b>문법 오류</b>(쉼표 빠짐, 따옴표 안 닫힘)가 없나요?<br><br>' +
      '<span style="opacity:.6">자세한 원인은 브라우저 개발자도구(F12) → Console 탭에서 확인할 수 있습니다.</span></div>';
  }
}

boot();