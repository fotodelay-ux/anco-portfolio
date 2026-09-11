const { useState, useEffect, useRef } = React;

const EN = {
  navWork: 'WORK', navAbout: 'ABOUT', navContact: 'CONTACT',
  heroName: 'AI가 뭐든 만드는 시대,\n사람이 필요한 디자인을\n하고 있어요.', heroRole: ' ',
  heroStatement: 'I build visual systems that turn content and ideas into memorable experiences.',
  heroSubLine1: '10+ years in Content, Brand &amp; Visual Design.',
  heroSubLine2: 'Currently exploring Product &amp; Digital Experiences.',
  heroCta: 'View My Work',
  selectedWork: 'SELECTED WORK', viewAllWork: 'View all work →',
  aboutHeading: 'I define the essence of content and brands in visual language, then extend that language across every platform and medium it needs to live in.',
  aboutBody1: "Over the past ten years I've worked across channel branding, content design and promotion — building visual systems for broadcast, OTT and digital platforms, and carrying them from a single key visual through motion, social and spatial environments.",
  aboutBody2: 'More recently, I designed and built damdam, an AI-powered parenting app, on my own — extending my practice into product design, UX/UI and prototyping.',
  experienceLabel: 'EXPERIENCE', present: 'Present',
  job1Company: 'Freelance Designer', job1Role: 'Creative Director',
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
  heroStatement: '김지연 / Visual Designer',
  heroSubLine1: '콘텐츠, 브랜드, 비주얼 디자인 분야에서 9년간 디자이너로 활동했고,',
  heroSubLine2: '현재는 프로덕트와 디지털 경험 영역으로 확장하고 있습니다.',
  heroCta: '작업 보러가기',
  aboutHeading: '김지연 / Brand & Visual Designer',
  aboutBody1: '콘텐츠와 브랜드의 본질을 이해하고, 이를 사람들에게 잘 전달되는 시각 언어로 만드는 디자이너입니다. 채널과 프로그램의 성격을 시각적으로 정의하는 브랜딩부터, 콘텐츠의 콘셉트를 로고·포스터·영상으로 구체화하는 작업까지 폭넓게 경험해왔습니다.',
  aboutBody2: '하나의 아이디어가 다양한 플랫폼과 매체에서 자연스럽게 이어지도록 디자인하는 데 관심이 많습니다. 실제로 콘텐츠 IP의 온·오프라인 브랜딩과 디자인 시스템을 구축하고, 프로그램의 프로모션 영상부터 오리지널 콘텐츠의 비주얼 아이덴티티까지 직접 기획하고 제작하며 콘텐츠가 사람들에게 기억되는 방식을 고민해왔습니다.',
  aboutBody3: '최근에는 AI 기반 육아일기 앱 ‘담담’을 직접 기획하고 UX/UI 디자인과 프로토타입 개발까지 진행했습니다. 새로운 아이디어를 빠르게 시각화하고 직접 구현해보는 과정을 통해, 콘텐츠와 브랜드를 넘어 사용자 경험까지 디자인의 영역을 넓혀가고 있습니다.',
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
            <div key={i} className="pb-section-block" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 60, marginBottom: 100, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
              <div className="pb-section-label" style={{ fontSize: 16, letterSpacing: '0.1em', color: labelColor || '#232323', transition: 'color 0.8s ease', fontFamily: "'Geomanist', 'Pretendard', sans-serif" }}>{b.label}</div>
              <div className="pb-section-body" style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{b.body}</div>
            </div>
          );
        }
        if (b.type === 'images') {
          const cols = b.cols ? b.cols : Math.min(b.src.length, 3) || 1;
          return (
            <div key={i} className="pb-images-block" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 0, marginBottom: 70 }}>
              {b.src.map((s, j) => (
                <div key={j} style={{ width: '100%', aspectRatio: b.ratio && b.ratio !== 'auto' ? b.ratio.replace('/', ' / ') : undefined }}>
                  <Media src={s} style={{ width: '100%', height: '100%', objectFit: b.fit || 'cover'}} />
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

// default "list" card — 16:9 thumbnail + description on the right; whole card is clickable.
// Sizing/spacing for THIS component on mobile all lives in ONE place:
// site.css → @media (max-width: 768px) → the "project cards" section
// (every .proj-* selector). Nothing about mobile spacing is set here in
// the JSX — this file only controls structure and desktop/web values.
function ProjectListCard({ p, isExpanded, onToggle, onOpen, fullImage, descBelow, responsive, lang, t }) {
  const desc = pick(p, 'desc', lang);
  const hasDesc = !!desc;
  const clickable = !!p.blocks;
  const openProps = clickable ? { onClick: onOpen, style: { cursor: 'pointer' } } : {};
  return (
    <div>
      <div {...openProps} className="proj-title-row" style={{ ...openProps.style, display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div className="proj-title" style={{ fontSize: 34, fontWeight: 700 }}>{p.title}</div>
        {p.subtitleKo && <div className="proj-subtitle" style={{ fontSize: 20, color: '#999' }}> {p.subtitleKo}</div>}
      </div>
      {(p.client || p.year) && <div className="proj-meta" style={{ fontSize: 13, color: '#999', marginTop: 6 }}>{p.client && `Client : ${p.client}`}{p.client && p.year ? ' · ' : ''}{p.year}</div>}
      {responsive ? (
        <>
          {/* mobile only (≤768px): 1-column, thumbnail + tags then description below */}
          <div className="proj-mobile-layout" style={{ marginTop: 24 }}>
            <div onClick={onOpen} className="proj-thumb" style={{ width: '100%', aspectRatio: '16/9', cursor: clickable ? 'pointer' : 'default', borderRadius: RADIUS, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
            <div className="proj-tags-row" style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[p.workType, ...p.outputs].map((tag) => (<div key={tag} className="tag-pill">{tag}</div>))}
            </div>
            {hasDesc && (
              <div {...openProps} className="proj-desc-below">
                <div className="body-text proj-desc" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.6, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{desc}</div>
                <div
                  onClick={(e) => { e.stopPropagation(); clickable ? onOpen() : onToggle(); }}
                  className="hover-dim proj-seemore"
                  style={{ marginTop: 16, fontSize: 13, color: '#999', cursor: 'pointer' }}
                >
                  {clickable ? t.seeMore : (isExpanded ? t.seeLess : t.seeMore)} →
                </div>
              </div>
            )}
          </div>
          {/* web (&gt;768px): original 2-column, thumbnail+tags left, description right */}
          <div className="proj-desktop-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 48, marginTop: 24, alignItems: 'start' }}>
            <div>
              <div onClick={onOpen} style={{ width: '100%', aspectRatio: '16/9', cursor: clickable ? 'pointer' : 'default', borderRadius: RADIUS_SM, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
              <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[p.workType, ...p.outputs].map((tag) => (<div key={tag} className="tag-pill">{tag}</div>))}
              </div>
            </div>
            {hasDesc && (
              <div {...openProps}>
                <div className="body-text proj-desc" style={{ fontSize: 15, lineHeight: 1.6, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{desc}</div>
                <div
                  onClick={(e) => { e.stopPropagation(); clickable ? onOpen() : onToggle(); }}
                  className="hover-dim proj-seemore"
                  style={{ marginTop: 16, fontSize: 13, color: '#999', cursor: 'pointer' }}
                >
                  {clickable ? t.seeMore : (isExpanded ? t.seeLess : t.seeMore)} →
                </div>
              </div>
            )}
          </div>
        </>
      ) : fullImage ? (
        <div className="proj-home-thumb-wrap" style={{ marginTop: 24 }}>
          <div onClick={onOpen} className="proj-thumb" style={{ width: '100%', aspectRatio: '16/9', cursor: clickable ? 'pointer' : 'default', borderRadius: RADIUS, overflow: 'hidden' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
          <div className="proj-tags-row" style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[p.workType, ...p.outputs].map((tag) => (<div key={tag} className="tag-pill">{tag}</div>))}
          </div>
          {descBelow && hasDesc && (
            <div {...openProps} className="proj-desc-below">
              <div className="body-text proj-desc" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.6, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{desc}</div>
              <div
                onClick={(e) => { e.stopPropagation(); clickable ? onOpen() : onToggle(); }}
                className="hover-dim proj-seemore"
                style={{ marginTop: 16, fontSize: 13, color: '#999', cursor: 'pointer' }}
              >
                {clickable ? t.seeMore : (isExpanded ? t.seeLess : t.seeMore)} →
              </div>
            </div>
          )}
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
              <div className="body-text proj-desc" style={{ fontSize: 15, lineHeight: 1.6, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{desc}</div>
              <div
                onClick={(e) => { e.stopPropagation(); clickable ? onOpen() : onToggle(); }}
                className="hover-dim proj-seemore"
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
      <div className="grid-card-title" style={{ marginTop: 18, fontSize: 20, fontWeight: 700 }}>{p.title}</div>
      {desc && <div className="body-text grid-card-desc" style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.6, color: '#666', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{desc}</div>}
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
      <div className="grid-card-title" style={{ marginTop: 14, fontSize: 14, fontWeight: 700 }}>{p.title}</div>
    </div>
  );
}

function FilterRow({ label, items, active, onPick, onReset, labels }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
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
  const [showFloatHeader, setShowFloatHeader] = useState(false);
  const [typedHero, setTypedHero] = useState('');
  const [growDots, setGrowDots] = useState(0);

  // top-left logo: "...is growing" dots cycle 0→3 forever
  useEffect(() => {
    const id = setInterval(() => setGrowDots((d) => (d + 1) % 4), 450);
    return () => clearInterval(id);
  }, []);

  // header: single threshold shared with the floating pill — past it, the
  // pill shows and the top bar stays hidden no matter which way you scroll;
  // back under it (i.e. scrolled back up near the top), the pill hides and
  // the top bar reappears. No more "any little scroll-up reveals the bar".
  //
  // Exception — project detail page, web only: the top bar never shows at
  // all; the pill is the only nav, visible by default at the top of the
  // page, hiding when you scroll down and reappearing when you scroll up
  // (mobile keeps the normal single-threshold behavior above).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      if (view === 'project' && !isMobile) {
        setHeaderHidden(true);
        if (y < 80) { setShowFloatHeader(true); lastScrollY.current = y; return; }
        if (y > lastScrollY.current + 4) setShowFloatHeader(false);
        else if (y < lastScrollY.current - 4) setShowFloatHeader(true);
        lastScrollY.current = y;
        return;
      }
      const past = y > 400;
      setShowFloatHeader(past);
      setHeaderHidden(past);
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [view]);

  // hero headline: types itself out character by character, pauses, then
  // clears and retypes — loops forever. Restarts if the headline text
  // changes (e.g. language switch).
  useEffect(() => {
    let active = true;
    let timeoutId;
    const text = (lang === 'ko' ? KO : EN).heroName;
    const runLoop = () => {
      let i = 0;
      setTypedHero('');
      const tick = () => {
        if (!active) return;
        if (i <= text.length) {
          setTypedHero(text.slice(0, i));
          i++;
          timeoutId = setTimeout(tick, 95);
        } else {
          timeoutId = setTimeout(() => { if (active) runLoop(); }, 1800);
        }
      };
      tick();
    };
    runLoop();
    return () => { active = false; clearTimeout(timeoutId); };
  }, [lang]);

  // project detail page background: normally stays light (darkProgress 0).
  // Projects flagged with darkBg: true fade smoothly to black on entry —
  // not scroll-triggered, just a one-time transition right after the page
  // mounts (CSS transition on the elements below does the actual animating,
  // this just flips the target value from 0 to 1 a tick after mount so the
  // transition has something to animate from/to).
  const [darkProgress, setDarkProgress] = useState(0);
  useEffect(() => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (view !== 'project' || !proj || !proj.darkBg) { setDarkProgress(0); return undefined; }
    setDarkProgress(0);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDarkProgress(1)));
    return () => cancelAnimationFrame(id);
  }, [view, projectId]);

  const t = lang === 'ko' ? KO : EN;
  const goHome = () => { setView('home'); window.scrollTo(0, 0); };
  const goWork = () => { setView('work'); window.scrollTo(0, 0); };
  const scrollToId = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const goAbout = () => { setView('about'); window.scrollTo(0, 0); };
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
          borderBottom: '1px solid #E5E3DE',
          transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}
      >
        <div className="top-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px' }}>
          <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div onClick={goHome} className="site-logo" style={{ fontFamily: "'Geomanist', sans-serif", fontSize: 20, fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.02em'}}>Jiyeon Kim is growing<span style={{ display: 'inline-block', width: 18, textAlign: 'left' }}>{'.'.repeat(growDots)}</span></div>
            <div className="lang-toggle header-lang-toggle" onClick={() => setLang((l) => l === 'en' ? 'ko' : 'en')}>
              <span className={'lang-opt' + (lang === 'ko' ? ' active' : '')}>KO</span>
              <span className={'lang-opt' + (lang === 'en' ? ' active' : '')}>EN</span>
            </div>
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div className="nav-item" onClick={goWork} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', paddingBottom: 2, color: '#111111', borderBottom: `1px solid ${view === 'work' ? '#111111' : 'transparent'}` }}>{t.navWork}</div>
            <div className="nav-item" onClick={goAbout} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', paddingBottom: 2, color: '#111111', borderBottom: `1px solid ${view === 'about' ? '#111111' : 'transparent'}` }}>{t.navAbout}</div>
            <div className="nav-item" onClick={goContact} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', color: '#111111' }}>{t.navContact}</div>
            <div className="nav-social" style={{ width: 1, height: 14, background: '#E5E3DE' }} />
            <div className="nav-social" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <a href="https://www.behance.net/fotodelay" target="_blank" rel="noreferrer"><img src="assets/behance-icon.png" alt="Behance" style={{ width: 22, height: 22 }} /></a>
              <a href="https://www.linkedin.com/in/jiyeonkim-anco" target="_blank" rel="noreferrer"><img src="assets/linkedin-icon.png" alt="LinkedIn" style={{ width: 34, height: 34 }} /></a>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: '#ffffff',
          borderRadius: 999,
          padding: '8px 8px 8px 18px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          transform: showFloatHeader ? 'translate(-50%, 0)' : 'translate(-50%, -140%)',
          opacity: showFloatHeader ? 1 : 0,
          transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
          pointerEvents: showFloatHeader ? 'auto' : 'none',
        }}
      >
        <div onClick={goHome} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <img src="site-img/2026 Profile black_noback.png" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
          <div style={{ fontFamily: "'Geomanist', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Jiyeon kim</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="nav-item" onClick={goWork} style={{ fontSize: 13, cursor: 'pointer', color: '#333333', whiteSpace: 'nowrap' }}>{t.navWork}</div>
          <div className="nav-item" onClick={goAbout} style={{ fontSize: 13, cursor: 'pointer', color: '#333333', whiteSpace: 'nowrap' }}>{t.navAbout}</div>
        </div>
        <div onClick={goContact} style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#ffffff', background: '#111111', borderRadius: 999, padding: '9px 18px', whiteSpace: 'nowrap' }}>{t.letsTalk}</div>
      </div>

      {view === 'home' && (
        <div key="home" className="stagger">
          <section className="hero-wrap" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0px 40px 0', maxWidth: 1500, margin: '0 auto' }}>
            <div className="hero-headline" style={{ position: 'relative', fontSize: 'clamp(40px,6.46vw,60px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              <div style={{ visibility: 'hidden', whiteSpace: 'pre-line' }}>{t.heroName}</div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, whiteSpace: 'pre-line' }}>{typedHero}<span className="type-cursor">|</span></div>
            </div>
            <div className="hero-role" style={{ marginTop: 28, fontSize: 'clamp(10px,3vw,18px)', color: '#666666' }}>{t.heroRole}</div>
            <div className="body-text hero-statement" style={{ marginTop: 40, maxWidth: 640, fontSize: 'clamp(22px,2.4vw,28px)',fontWeight: 600, lineHeight: 1.5 }}>{t.heroStatement}</div>
            <div className="body-text hero-subline" style={{ marginTop: 24, fontSize: 16, lineHeight: 1.7, color: '#666666', maxWidth: 520,  }}>{t.heroSubLine1}<br/>{t.heroSubLine2}</div>
            <div className="lang-toggle" style={{ marginTop: 40, width: 'fit-content' }}>
              <span onClick={goWork} className="lang-opt active" style={{ fontSize: 14, padding: '13px 26px', whiteSpace: 'nowrap' }}>{t.heroCta} →</span>
            </div>
          </section>

          <section className="selected-work-section" style={{ padding: '140px 40px 100px', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 90, borderBottom: '1px solid #E5E3DE', paddingBottom: 24 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.selectedWork}</div>
              <div onClick={goWork} style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>{t.viewAllWork}</div>
            </div>
            <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
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

          <section id="contact" className="contact-section" style={{ padding: '100px 40px 160px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
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

      {view === 'about' && (
        <div key="about" className="stagger about-view" style={{ padding: '140px 40px 160px', maxWidth: 1500, margin: '0 auto' }}>
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 0, marginTop: 90 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.navAbout}</div>
              <img src="site-img/2026 Profile black_noback.png" style={{ width: '70%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 20, marginTop: 15, display: 'block' }} />
            </div>
            <div style={{ maxWidth: 680, paddingLeft: 0 }}>
              <div className="body-text" style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 600, marginTop: 38, lineHeight: 1.55 }}>{t.aboutHeading}</div>
              <div className="body-text" style={{ marginTop: 40, fontSize: 14, lineHeight: 1.85, color: '#666666' }}>{t.aboutBody1}<br/><br/>{t.aboutBody2}<br/><br/>{t.aboutBody3}</div>
            </div>
          </div>
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 0, marginTop: 90 }}>
            <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.experienceLabel}</div>
            <div>
              {[['2025.04 — Present', t.job1Company, t.job1Role], ['2020.06 — 2023.10', 'SLL (JTBC Studios)', t.job2Role], ['2016.03 — 2020.06', 'A+E Networks Korea', t.job3Role], ['2014.11 — 2015.11', 'Style&', t.job4Role], ['2014.05 — 2014.10', 'Imagebakery', t.job5Role]].map((row, i) => (
                <div key={i} className="job-row" style={{ display: 'flex', justifyContent: 'space-between', gap: 80, padding: '26px 0', borderTop: '1px solid #E5E3DE', borderBottom: i === 4 ? '1px solid #E5E3DE' : 'none' }}>
                  <div className="job-date" style={{ fontSize: 13, color: '#666666', flex: '0 0 140px' }}>{row[0]}</div>
                  <div className="job-company" style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{row[1]}</div>
                  <div className="job-role" style={{ fontSize: 13, color: '#666666', textAlign: 'right' }}>{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'work' && (
        <div key="work" className="stagger work-view" style={{ padding: '140px 40px 160px', maxWidth: 1500, margin: '0 auto' }}>
          <div className="work-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, marginBottom: 80, paddingBottom: 40, borderBottom: '1px solid #E5E3DE', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 'clamp(40px,8vw,70px)', fontWeight: 700 }}>{t.workTitle}</div>
            <div className="work-filter-col" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
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
                  responsive
                />
              ))}
            </div>
          ) : gridMode === 'card3' ? (
            <div className="stagger work-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '60px 10px' }}>
              {filtered.map((p) => (
                <ProjectCard3 key={p.id} p={p} lang={lang} t={t} onOpen={p.blocks ? openProject(p.id) : undefined} />
              ))}
            </div>
          ) : gridMode === 'tile3' ? (
            <div className="stagger work-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '40px 10px' }}>
              {filtered.map((p) => (
                <ProjectTile key={p.id} p={p} onOpen={p.blocks ? openProject(p.id) : undefined} />
              ))}
            </div>
          ) : (
            <div className="stagger work-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '40px 10px' }}>
              {filtered.map((p) => (
                <ProjectTile key={p.id} p={p} isPoster onOpen={p.blocks ? openProject(p.id) : undefined} />
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'project' && activeProject && (
        <div
          key={'project-' + activeProject.id}
          className="stagger"
          style={{
            background: mixColor(LIGHT_BG, DARK_BG, darkProgress),
            color: mixColor(LIGHT_TEXT, DARK_TEXT, darkProgress),
            transition: 'background 0.8s ease, color 0.8s ease',
          }}
        >
          <div className="detail-top-pad" style={{ padding: '140px 40px 0', maxWidth: 1500, margin: '0 auto' }}>
            <div onClick={goWork} className="hover-dim" style={{ fontSize: 13, cursor: 'pointer', color: mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress), marginBottom: 40, transition: 'color 0.8s ease' }}>{t.backToWork}</div>
          </div>
          <section className="detail-title-section" style={{ maxWidth: 1500, margin: '0 auto', padding: '0 40px 40px' }}>
            <div style={{ fontSize: 'clamp(30px,9vw,42px)', fontWeight: 800, lineHeight: 0.98 }}>{activeProject.title}</div>
            {activeProject.subtitleKo && <div style={{ marginTop: 14, fontSize: 20, color: mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress), transition: 'color 0.8s ease' }}>{activeProject.subtitleKo}</div>}
            <div style={{ marginTop: 28, display: 'flex', gap: 32, fontSize: 14, color: mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress), flexWrap: 'wrap', transition: 'color 0.8s ease' }}>
              {activeProject.year && <div>{activeProject.year}</div>}
              {activeProject.client && <div>{activeProject.client}</div>}
              <div>{t.workTypeLabels[activeProject.workType]}</div>
            </div>
          </section>
          <section className="detail-hero-section" style={{ padding: '0 40px', maxWidth: 1500, margin: '0 auto' }}>
            {activeProject.heroImages && activeProject.heroImages.length > 1 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                {activeProject.heroImages.map((src, i) => (
                  <div key={i} style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}><Ph id={src} style={{ width: '100%', height: '100%' }} /></div>
                ))}
              </div>
            ) : (
              <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}><Ph id={activeProject.hero || activeProject.img} style={{ width: '100%', height: '100%' }} /></div>
            )}
          </section>
          <div>
            {(activeProject.descEn || activeProject.descKo) && (
              <section className="detail-desc-section" style={{ padding: '100px 40px 0', maxWidth: 1100, margin: '0 auto' }}>
                {activeProject.descKo && <div className="detail-body-ko" style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{activeProject.descKo}</div>}
                {activeProject.descEn && <div className="detail-body-en" style={{ fontSize: 14, lineHeight: 1.7, color: mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress), transition: 'color 0.8s ease' }}>{activeProject.descEn}</div>}
              </section>
            )}
            <div style={{ paddingTop: 100 }}><ProjectBlocks blocks={activeProject.blocks} isPoster={false} labelColor={mixColor(LIGHT_GRAY, DARK_GRAY, darkProgress)} /></div>
            <div className="detail-footer-section" style={{ padding: '60px 40px 140px', maxWidth: 1500, margin: '0 auto', borderTop: `1px solid ${mixColor(LIGHT_BORDER, DARK_BORDER, darkProgress)}`, textAlign: 'center', transition: 'border-color 0.8s ease' }}>
              <div onClick={goWork} style={{ fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}>{t.backToAllWork}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
