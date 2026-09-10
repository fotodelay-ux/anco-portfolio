const { useState, useEffect, useRef } = React;

const EN = {
  navWork: 'WORK', navAbout: 'ABOUT', navContact: 'CONTACT',
  heroName: 'Jiyeon Kim', heroRole: 'Visual Designer',
  heroStatement: 'I build visual systems that turn content and ideas into memorable experiences.',
  heroSubLine1: '10+ years in Content, Brand &amp; Visual Design.',
  heroSubLine2: 'Currently exploring Product &amp; Digital Experiences.',
  selectedWork: 'SELECTED WORK', viewAllWork: 'View all work →',
  aboutHeading: 'I define the essence of content and brands in visual language, then extend that language across every platform and medium it needs to live in.',
  aboutBody1: "Over the past ten years I've worked across channel branding, content design and promotion — building visual systems for broadcast, OTT and digital platforms, and carrying them from a single key visual through motion, social and spatial environments.",
  aboutBody2: 'More recently, I designed and built damdam, an AI-powered parenting app, on my own — extending my practice into product design, UX/UI and prototyping.',
  experienceLabel: 'EXPERIENCE', present: 'Present',
  job1Company: 'Freelance', job1Role: 'Creative Director',
  job2Role: 'Manager, Digital Design Part', job3Role: 'Creative Designer',
  job4Role: 'Motion Graphic Designer', job5Role: 'Motion Graphic Designer',
  letsTalk: "Let's talk.",
  contactSend: 'Send', contactName: 'Your name', contactMessage: 'Message', contactAttach: 'Attach file', contactSent: 'Thanks — your email app should be opening now.',
  workTitle: 'Work', noResults: 'No projects match this combination yet.',
  backToWork: '← Back to Work', backToAllWork: 'Back to all work',
  filterFor: 'for', filterScope: 'scope',
  seeMore: 'See More', seeLess: 'See Less',
  workTypeLabels: { ALL: 'ALL', 'CHANNEL BRANDING': 'CHANNEL BRANDING', 'CONTENT DESIGN': 'CONTENT DESIGN', PROMOTION: 'PROMOTION', 'PRODUCT / DIGITAL': 'PRODUCT / DIGITAL', 'INTERNAL BRANDING': 'INTERNAL BRANDING' },
  outputLabels: { 'BRAND IDENTITY': 'BRAND IDENTITY', LOGO: 'LOGO', 'KEY VISUAL': 'KEY VISUAL', POSTER: 'POSTER', MOTION: 'MOTION', VIDEO: 'VIDEO', SOCIAL: 'SOCIAL', 'UI / UX': 'UI / UX', 'DESIGN SYSTEM': 'DESIGN SYSTEM', 'SPATIAL / OOH': 'SPATIAL / OOH' },
};

// KO mode keeps everything in English except the actual body prose
// (hero statement/sub-lines and the About paragraphs) — nav, labels,
// buttons, experience roles etc. stay English in both languages.
const KO = {
  ...EN,
  heroStatement: 'AI가 뭐든 만드는 시대에, 사람이 필요한 것을 만드는 디자이너',
  heroSubLine1: '콘텐츠, 브랜드, 비주얼 디자인 분야에서 10년 이상 활동했습니다.',
  heroSubLine2: '현재는 프로덕트와 디지털 경험 영역으로 확장하고 있습니다.',
  aboutHeading: '콘텐츠와 브랜드의 본질을 시각 언어로 정의하고, 이를 필요한 모든 플랫폼과 매체로 확장합니다.',
  aboutBody1: '지난 10년간 채널 브랜딩, 콘텐츠 디자인, 프로모션 전반에서 일했습니다. 방송, OTT, 디지털 플랫폼을 위한 시각 시스템을 구축하고, 하나의 키비주얼을 모션, 소셜, 공간 환경까지 확장해왔습니다.',
  aboutBody2: '최근에는 AI 육아 앱 damdam을 직접 기획하고 만들며, 프로덕트 디자인과 UX/UI, 프로토타이핑까지 작업 영역을 넓히고 있습니다.',
};

const WORK_TYPES = ['ALL', 'CHANNEL BRANDING', 'CONTENT DESIGN', 'PROMOTION'];
const OUTPUT_TAGS = ['ALL', 'LOGO', 'POSTER', 'MOTION', 'UI / UX'];
const RADIUS = 20; // home page's scrolling project thumbnails
const RADIUS_SM = 10; // every other thumbnail (Work list/grids, detail page)

// linearly blend two [r,g,b] colors by t (0..1) into an rgb() string —
// used to fade the project detail page to black continuously as you scroll,
// instead of snapping to a flat color at a fixed point (which reads as a hard edge)
function mixColor(a, b, t) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
const LIGHT_BG = [247, 246, 242], DARK_BG = [11, 11, 11];
const LIGHT_TEXT = [17, 17, 17], DARK_TEXT = [242, 242, 242];
const LIGHT_GRAY = [102, 102, 102], DARK_GRAY = [170, 170, 170];
const LIGHT_BORDER = [229, 227, 222], DARK_BORDER = [51, 51, 51];

function isVideo(src) { return /\.mp4($|\?)/i.test(src); }

function Media({ src, style, muted = true }) {
  if (!src) return <div className="ph" style={style} />;
  if (isVideo(src)) {
    return <video src={src} style={{ ...style, objectFit: 'cover', background: '#E5E3DE' }} autoPlay loop muted={muted} playsInline />;
  }
  return <img className="ph" src={src} style={style} onError={(e) => { e.target.style.background = '#E5E3DE'; e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; }} />;
}

function Ph({ id, style }) {
  return <Media src={id} style={style} />;
}

// pick the right-language field, falling back to whichever exists
function pick(p, base, lang) {
  const en = p[base + 'En'];
  const ko = p[base + 'Ko'];
  if (lang === 'en') return en || ko || '';
  return ko || en || '';
}

function ProjectBlocks({ blocks, isPoster, labelColor }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <section className="section-body" style={{ padding: '0 40px 160px', maxWidth: 1500, margin: '0 auto' }}>
      {blocks.map((b, i) => {
        if (b.type === 'section') {
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 60, marginBottom: 100, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: labelColor || '#666666' }}>{b.label}</div>
              <div style={{ fontSize: 15.3, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{b.body}</div>
            </div>
          );
        }
        if (b.type === 'images') {
          const cols = b.cols && b.cols > 1 ? b.cols : Math.min(b.src.length, 3) || 1;
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 24, marginBottom: 60 }}>
              {b.src.map((s, j) => (
                <div key={j} style={{ width: '100%', aspectRatio: b.ratio && b.ratio !== 'auto' ? b.ratio.replace('/', ' / ') : undefined }}>
                  <Media src={s} style={{ width: '100%', height: '100%', objectFit: b.fit || 'cover', borderRadius: isPoster ? 0 : RADIUS_SM }} />
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </section>
  );
}

// default "list" card — 16:9 thumbnail + description on the right; whole card is clickable
function ProjectListCard({ p, isExpanded, onToggle, onOpen, fullImage, lang, t }) {
  const desc = pick(p, 'desc', lang);
  const hasDesc = !!desc;
  const clickable = !!p.blocks;
  const openProps = clickable ? { onClick: onOpen, style: { cursor: 'pointer' } } : {};
  return (
    <div>
      <div {...openProps} style={{ ...openProps.style, display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 38, fontWeight: 700 }}>{p.title}</div>
        {p.subtitleKo && <div style={{ fontSize: 16, color: '#999' }}>— {p.subtitleKo}</div>}
      </div>
      {(p.client || p.year) && <div style={{ fontSize: 13, color: '#999', marginTop: 6 }}>{p.client && `Client : ${p.client}`}{p.client && p.year ? ' · ' : ''}{p.year}</div>}
      {fullImage ? (
        <div style={{ marginTop: 24 }}>
          <div onClick={onOpen} style={{ width: '100%', aspectRatio: '16/9', cursor: clickable ? 'pointer' : 'default', borderRadius: RADIUS, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
          <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[p.workType, ...p.outputs].map((tag) => (<div key={tag} className="tag-pill">{tag}</div>))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 48, marginTop: 24, alignItems: 'start' }}>
          <div>
            <div onClick={onOpen} style={{ width: '100%', aspectRatio: '16/9', cursor: clickable ? 'pointer' : 'default', borderRadius: RADIUS_SM, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[p.workType, ...p.outputs].map((tag) => (<div key={tag} className="tag-pill">{tag}</div>))}
            </div>
          </div>
          {hasDesc && (
            <div {...openProps}>
              <div style={{ fontSize: 15, lineHeight: 1.6, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{desc}</div>
              <div
                onClick={(e) => { e.stopPropagation(); clickable ? onOpen() : onToggle(); }}
                className="hover-dim"
                style={{ marginTop: 16, fontSize: 13, color: '#999', cursor: 'pointer' }}
              >
                {clickable ? t.seeMore : (isExpanded ? t.seeLess : t.seeMore)} →
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// "card3" — 3-col grid, thumbnail + title + 3-line description + see more (whole card clickable)
function ProjectCard3({ p, onOpen, lang, t }) {
  const desc = pick(p, 'desc', lang);
  const clickable = !!p.blocks;
  return (
    <div onClick={onOpen} style={{ cursor: clickable ? 'pointer' : 'default' }}>
      <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: RADIUS_SM, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
      <div style={{ marginTop: 18, fontSize: 20, fontWeight: 700 }}>{p.title}</div>
      {desc && <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.6, color: '#666', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{desc}</div>}
      {clickable && <div className="hover-dim" style={{ marginTop: 12, fontSize: 12, color: '#999' }}>{t.seeMore} →</div>}
    </div>
  );
}

// "tile" — image + caption below only (used for LOGO / MOTION, 3-col; POSTER, 4-col with no radius)
function ProjectTile({ p, onOpen, isPoster }) {
  const clickable = !!p.blocks;
  return (
    <div onClick={onOpen} style={{ cursor: clickable ? 'pointer' : 'default' }}>
      <div style={{ width: '100%', aspectRatio: isPoster ? '3/4' : '1/1', borderRadius: isPoster ? 0 : RADIUS_SM, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
      <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700 }}>{p.title}</div>
    </div>
  );
}

function FilterRow({ label, items, active, onPick, onReset, labels }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
      <span className="filter-row-label">{label}</span>
      {items.filter((i) => i !== 'ALL').map((item) => (
        <div
          key={item}
          onClick={() => onPick(active === item ? 'ALL' : item)}
          className={'tag-pill tag-pill-click' + (active === item ? ' active-pill' : '')}
          style={{
            cursor: 'pointer',
            border: `1px solid ${active === item ? '#111' : '#E5E3DE'}`,
            background: active === item ? '#111' : 'transparent',
            color: active === item ? '#fff' : '#666',
          }}
        >
          {labels ? labels[item] : item}
        </div>
      ))}
      <div
        onClick={onReset}
        className={'tag-pill tag-pill-click' + (active === 'ALL' ? ' active-pill' : '')}
        style={{
          cursor: 'pointer',
          border: `1px solid ${active === 'ALL' ? '#111' : '#E5E3DE'}`,
          background: active === 'ALL' ? '#111' : 'transparent',
          color: active === 'ALL' ? '#fff' : '#666',
        }}
      >
        ALL
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState('home');
  const [projectId, setProjectId] = useState(null);
  const [workType, setWorkType] = useState('ALL');
  const [outputTag, setOutputTag] = useState('ALL');
  const [lang, setLang] = useState('ko');
  const [expanded, setExpanded] = useState({});
  const [contactName, setContactName] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactFile, setContactFile] = useState(null);
  const [contactSent, setContactSent] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  // header: slides away on scroll down, slides back in on scroll up — every page
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) { setHeaderHidden(false); lastScrollY.current = y; return; }
      if (y > lastScrollY.current + 4) setHeaderHidden(true);
      else if (y < lastScrollY.current - 4) setHeaderHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // project detail page: the background continuously blends to black
  // starting the instant you scroll down at all (not waiting for the
  // content to near the viewport), and reverses the same way scrolling
  // back up — driven directly by scroll position, so there's no seam
  const [darkProgress, setDarkProgress] = useState(0);
  useEffect(() => {
    if (view !== 'project') { setDarkProgress(0); return undefined; }
    const FADE_DISTANCE = 600; // px of scrolling over which it fades to full black
    const onScroll = () => {
      setDarkProgress(Math.min(1, Math.max(0, window.scrollY / FADE_DISTANCE)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [view, projectId]);

  const t = lang === 'ko' ? KO : EN;
  const goHome = () => { setView('home'); window.scrollTo(0, 0); };
  const goWork = () => { setView('work'); window.scrollTo(0, 0); };
  const scrollToId = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const goAbout = () => { setView('home'); setTimeout(() => scrollToId('about'), 60); };
  const goContact = () => { setView('home'); setTimeout(() => scrollToId('contact'), 60); };
  // "for" (work type) and "scope" (output tag) rows are mutually exclusive —
  // picking one clears whatever was selected in the other row.
  const pickWorkType = (wt) => { setWorkType(wt); if (wt !== 'ALL') setOutputTag('ALL'); };
  const pickOutputTag = (tag) => { setOutputTag(tag); if (tag !== 'ALL') setWorkType('ALL'); };
  const resetFilters = () => { setWorkType('ALL'); setOutputTag('ALL'); };
  const openProject = (id) => () => { setProjectId(id); setView('project'); window.scrollTo(0, 0); };

  const activeProject = PROJECTS.find((p) => p.id === projectId);

  const filtered = PROJECTS.filter((p) =>
    (workType === 'ALL' || p.workType === workType) &&
    (outputTag === 'ALL' || p.outputs.includes(outputTag))
  );

  // which grid layout to use — a WORK TYPE selection (for) always wins with the
  // 3-col title+desc+see-more layout; otherwise the scope tag decides.
  let gridMode = 'list';
  if (workType !== 'ALL') gridMode = 'card3';
  else if (outputTag === 'POSTER') gridMode = 'poster4';
  else if (outputTag === 'LOGO' || outputTag === 'MOTION') gridMode = 'tile3';
  else if (outputTag === 'UI / UX') gridMode = 'card3';

  const submitContact = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${contactName || 'someone'}`);
    const body = encodeURIComponent(`${contactMsg}\n\n— ${contactName}${contactFile ? `\n(attachment "${contactFile}" could not be auto-attached — please attach it manually)` : ''}`);
    window.location.href = `mailto:fotodelay@gmail.com?subject=${subject}&body=${body}`;
    setContactSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(247,246,242,0.86)',
          backdropFilter: 'blur(10px)',
          transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div onClick={goHome} style={{ fontSize: 20, fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.04em'}}>Jiyeon Kim</div>
            <div className="lang-toggle" onClick={() => setLang((l) => l === 'en' ? 'ko' : 'en')}>
              <span className={'lang-opt' + (lang === 'ko' ? ' active' : '')}>KO</span>
              <span className={'lang-opt' + (lang === 'en' ? ' active' : '')}>EN</span>
            </div>
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div className="nav-item hover-dim" onClick={goWork} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', paddingBottom: 2, color: '#666666', borderBottom: `1px solid ${view === 'work' ? '#111111' : 'transparent'}` }}>{t.navWork}</div>
            <div className="nav-item hover-dim" onClick={goAbout} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', color: '#666666' }}>{t.navAbout}</div>
            <div className="nav-item hover-dim" onClick={goContact} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', color: '#666666' }}>{t.navContact}</div>
            <div className="nav-social" style={{ width: 1, height: 14, background: '#E5E3DE' }} />
            <div className="nav-social" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <a href="https://www.behance.net/fotodelay" target="_blank" rel="noreferrer"><img src="assets/behance-icon.png" alt="Behance" style={{ width: 22, height: 22 }} /></a>
              <a href="https://www.linkedin.com/in/jiyeonkim-anco" target="_blank" rel="noreferrer"><img src="assets/linkedin-icon.png" alt="LinkedIn" style={{ width: 34, height: 34 }} /></a>
            </div>
          </div>
        </div>
      </div>

      {view === 'home' && (
        <div key="home" className="stagger">
          <section className="hero-wrap" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 40px 0', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(80px,6.46vw,120px)', fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.03em' }}>{t.heroName}</div>
            <div style={{ marginTop: 28, fontSize: 'clamp(12px,3vw,24px)', color: '#666666' }}>{t.heroRole}</div>
            <div style={{ marginTop: 56, maxWidth: 640, fontSize: 'clamp(18px,2.4vw,24px)', lineHeight: 1.5 }}>{t.heroStatement}</div>
            <div style={{ marginTop: 24, fontSize: 15, lineHeight: 1.7, color: '#666666', maxWidth: 520 }}>{t.heroSubLine1}<br/>{t.heroSubLine2}</div>
          </section>

          <section style={{ padding: '140px 40px 100px', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 90, borderBottom: '1px solid #E5E3DE', paddingBottom: 24 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.selectedWork}</div>
              <div onClick={goWork} style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>{t.viewAllWork}</div>
            </div>
            <div className="stagger home-work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', columnGap: 60, rowGap: 90 }}>
              {PROJECTS.slice(0, 3).map((p) => (
                <ProjectListCard
                  key={p.id}
                  p={p}
                  lang={lang}
                  t={t}
                  isExpanded={!!expanded[p.id]}
                  onToggle={() => setExpanded((s) => ({ ...s, [p.id]: !s[p.id] }))}
                  onOpen={p.blocks ? openProject(p.id) : undefined}
                  fullImage
                />
              ))}
            </div>
          </section>

          <section id="about" style={{ padding: '100px 40px 140px', maxWidth: 1500, margin: '0 auto', borderTop: '1px solid #E5E3DE' }}>
            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 60, marginTop: 90 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.navAbout}</div>
              <div style={{ maxWidth: 680 }}>
                <div style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 500, lineHeight: 1.55 }}>{t.aboutHeading}</div>
                <div style={{ marginTop: 40, fontSize: 16, lineHeight: 1.85, color: '#666666' }}>{t.aboutBody1}<br/><br/>{t.aboutBody2}</div>
              </div>
            </div>
            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 60, marginTop: 90 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.experienceLabel}</div>
              <div>
                {[['2025—Present', t.job1Company, t.job1Role], ['2020—2023', 'SLL (JTBC Studios)', t.job2Role], ['2016—2020', 'A+E Networks Korea', t.job3Role], ['2014—2015', 'Style&', t.job4Role], ['2014', 'Imagebakery', t.job5Role]].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 24, padding: '26px 0', borderTop: '1px solid #E5E3DE', borderBottom: i === 4 ? '1px solid #E5E3DE' : 'none' }}>
                    <div style={{ fontSize: 15, color: '#666666', flex: '0 0 140px' }}>{row[0]}</div>
                    <div style={{ flex: 1, fontSize: 18, fontWeight: 500 }}>{row[1]}</div>
                    <div style={{ fontSize: 15, color: '#666666', textAlign: 'right' }}>{row[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" style={{ padding: '100px 40px 160px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666', marginBottom: 30 }}>{t.navContact}</div>
            <div style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 700 }}>{t.letsTalk}</div>
            <div style={{ marginTop: 28, fontSize: 15, color: '#666666' }}>+82 10 3179 7998 · fotodelay@gmail.com</div>
            <div style={{ marginTop: 40, display: 'flex', gap: 32, justifyContent: 'center' }}>
              <a href="https://www.behance.net/fotodelay" target="_blank" rel="noreferrer" style={{ width: 52, height: 52, border: '1px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="assets/behance-icon.png" style={{ width: 24, height: 24 }} /></a>
              <a href="https://www.linkedin.com/in/jiyeonkim-anco" target="_blank" rel="noreferrer" style={{ width: 52, height: 52, border: '1px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="assets/linkedin-icon.png" style={{ width: 28, height: 28 }} /></a>
            </div>
            <form className="contact-form" onSubmit={submitContact} style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
              <input type="text" required placeholder={t.contactName} value={contactName} onChange={(e) => setContactName(e.target.value)} />
              <textarea required placeholder={t.contactMessage} rows={5} value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} />
              <input type="file" onChange={(e) => setContactFile(e.target.files && e.target.files[0] ? e.target.files[0].name : null)} />
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <button type="submit">{t.contactSend}</button>
              </div>
              {contactSent && <div style={{ textAlign: 'center', fontSize: 13, color: '#666' }}>{t.contactSent}</div>}
            </form>
          </section>
        </div>
      )}

      {view === 'work' && (
        <div key="work" className="stagger" style={{ padding: '140px 40px 160px', maxWidth: 1500, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, marginBottom: 80, paddingBottom: 40, borderBottom: '1px solid #E5E3DE', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 'clamp(48px,8vw,96px)', fontWeight: 700 }}>{t.workTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              <FilterRow label={t.filterFor} items={WORK_TYPES} active={workType} onPick={pickWorkType} onReset={resetFilters} labels={t.workTypeLabels} />
              <FilterRow label={t.filterScope} items={OUTPUT_TAGS} active={outputTag} onPick={pickOutputTag} onReset={resetFilters} labels={t.outputLabels} />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div style={{ padding: '100px 0', textAlign: 'center', color: '#666' }}>{t.noResults}</div>
          ) : gridMode === 'list' ? (
            <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
              {filtered.map((p) => (
                <ProjectListCard
                  key={p.id}
                  p={p}
                  lang={lang}
                  t={t}
                  isExpanded={!!expanded[p.id]}
                  onToggle={() => setExpanded((s) => ({ ...s, [p.id]: !s[p.id] }))}
                  onOpen={p.blocks ? openProject(p.id) : undefined}
                />
              ))}
            </div>
          ) : gridMode === 'card3' ? (
            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '60px 10px' }}>
              {filtered.map((p) => (
                <ProjectCard3 key={p.id} p={p} lang={lang} t={t} onOpen={p.blocks ? openProject(p.id) : undefined} />
              ))}
            </div>
          ) : gridMode === 'tile3' ? (
            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '40px 10px' }}>
              {filtered.map((p) => (
                <ProjectTile key={p.id} p={p} onOpen={p.blocks ? openProject(p.id) : undefined} />
              ))}
            </div>
          ) : (
            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '40px 10px' }}>
              {filtered.map((p) => (
                <ProjectTile key={p.id} p={p} isPoster onOpen={p.blocks ? openProject(p.id) : undefined} />
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'project' && activeProject && (
        <div key={'project-' + activeProject.id} className="stagger">
          <div style={{ padding: '140px 40px 0', maxWidth: 1500, margin: '0 auto' }}>
            <div onClick={goWork} className="hover-dim" style={{ fontSize: 13, cursor: 'pointer', color: '#666', marginBottom: 40 }}>{t.backToWork}</div>
          </div>
          <section style={{ maxWidth: 1500, margin: '0 auto', padding: '0 40px 40px' }}>
            <div style={{ fontSize: 'clamp(48px,9vw,50px)', fontWeight: 700, lineHeight: 0.98 }}>{activeProject.title}</div>
            {activeProject.subtitleKo && <div style={{ marginTop: 20, fontSize: 20, color: '#666' }}>{activeProject.subtitleKo}</div>}
            <div style={{ marginTop: 28, display: 'flex', gap: 32, fontSize: 14, color: '#666', flexWrap: 'wrap' }}>
              {activeProject.year && <div>{activeProject.year}</div>}
              {activeProject.client && <div>{activeProject.client}</div>}
              <div>{t.workTypeLabels[activeProject.workType]}</div>
            </div>
          </section>
          <section style={{ padding: '0 40px', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: RADIUS_SM, overflow: 'hidden' }}><Ph id={activeProject.hero || activeProject.img} style={{ width: '100%', height: '100%' }} /></div>
          </section>
          <div
            style={{
              background: mixColor(LIGHT_BG, DARK_BG, darkProgress),
              color: mixColor(LIGHT_TEXT, DARK_TEXT, darkProgress),
            }}
          >
            {(activeProject.descEn || activeProject.descKo) && (
              <section style={{ padding: '100px 40px 0', maxWidth: 1100, margin: '0 auto' }}>
                {activeProject.descKo && <div className="detail-body-ko" style={{ fontSize: 18.7, lineHeight: 1.7, marginBottom: 24 }}>{activeProject.descKo}</div>}
                {activeProject.descEn && <div className="detail-body-en" style={{ fontSize: 13.6, lineHeight: 1.8, color: mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress) }}>{activeProject.descEn}</div>}
              </section>
            )}
            <div style={{ paddingTop: 100 }}><ProjectBlocks blocks={activeProject.blocks} isPoster={false} labelColor={mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress)} /></div>
            <div style={{ padding: '60px 40px 140px', maxWidth: 1500, margin: '0 auto', borderTop: `1px solid ${mixColor(LIGHT_BORDER, DARK_BORDER, darkProgress)}`, textAlign: 'center' }}>
              <div onClick={goWork} style={{ fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}>{t.backToAllWork}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
