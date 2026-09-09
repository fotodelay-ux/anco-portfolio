const { useState } = React;

const EN = {
  navWork: 'WORK', navAbout: 'ABOUT', navContact: 'CONTACT',
  heroName: 'Jiyeon Kim', heroRole: 'Visual Designer',
  heroStatement: 'I build visual systems that turn content and ideas into memorable experiences.',
  heroSubLine1: '10+ years in Content, Brand & Visual Design.',
  heroSubLine2: 'Currently exploring Product & Digital Experiences.',
  selectedWork: 'SELECTED WORK', viewAllWork: 'View all work \u2192',
  aboutHeading: 'I define the essence of content and brands in visual language, then extend that language across every platform and medium it needs to live in.',
  aboutBody1: "Over the past ten years I've worked across channel branding, content design and promotion \u2014 building visual systems for broadcast, OTT and digital platforms, and carrying them from a single key visual through motion, social and spatial environments.",
  aboutBody2: 'More recently, I designed and built damdam, an AI-powered parenting app, on my own \u2014 extending my practice into product design, UX/UI and prototyping.',
  experienceLabel: 'EXPERIENCE', present: 'Present',
  job1Company: 'Freelance', job1Role: 'Creative Director',
  job2Role: 'Manager, Digital Design Part', job3Role: 'Creative Designer',
  job4Role: 'Motion Graphic Designer', job5Role: 'Motion Graphic Designer',
  letsTalk: "Let's talk.",
  workTitle: 'Work', noResults: 'No projects match this combination yet.',
  backToWork: '\u2190 Back to Work', backToAllWork: 'Back to all work',
  workTypeLabels: { ALL: 'ALL', 'CHANNEL BRANDING': 'CHANNEL BRANDING', 'CONTENT DESIGN': 'CONTENT DESIGN', PROMOTION: 'PROMOTION', 'PRODUCT / DIGITAL': 'PRODUCT / DIGITAL', 'INTERNAL BRANDING': 'INTERNAL BRANDING' },
  outputLabels: { 'BRAND IDENTITY': 'BRAND IDENTITY', LOGO: 'LOGO', 'KEY VISUAL': 'KEY VISUAL', POSTER: 'POSTER', MOTION: 'MOTION', VIDEO: 'VIDEO', SOCIAL: 'SOCIAL', 'UI / UX': 'UI / UX', 'DESIGN SYSTEM': 'DESIGN SYSTEM', 'SPATIAL / OOH': 'SPATIAL / OOH' },
};

const KO_BODY = {
  heroStatement: '콘텐츠와 아이디어를 기억에 남는 경험으로 만드는 시각 시스템을 만듭니다.',
  heroSubLine1: '콘텐츠, 브랜드, 비주얼 디자인 분야에서 10년 이상 활동했습니다.',
  heroSubLine2: '현재는 프로덕트와 디지털 경험 영역으로 확장하고 있습니다.',
  aboutHeading: '콘텐츠와 브랜드의 본질을 시각 언어로 정의하고, 이를 필요한 모든 플랫폼과 매체로 확장합니다.',
  aboutBody1: '지난 10년간 채널 브랜딩, 콘텐츠 디자인, 프로모션 전반에서 일했습니다. 방송, OTT, 디지털 플랫폼을 위한 시각 시스템을 구축하고, 하나의 키비주얼을 모션, 소셜, 공간 환경까지 확장해왔습니다.',
  aboutBody2: '최근에는 AI 육아 앱 damdam을 직접 기획하고 만들며, 프로덕트 디자인과 UX/UI, 프로토타이핑까지 작업 영역을 넓히고 있습니다.',
};

const WORK_TYPES = ['ALL', 'CHANNEL BRANDING', 'CONTENT DESIGN', 'PROMOTION'];
const OUTPUT_TAGS = ['ALL', 'LOGO', 'POSTER', 'MOTION', 'UI / UX'];

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

function ProjectBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <section style={{ padding: '0 40px 160px', maxWidth: 1100, margin: '0 auto' }}>
      {blocks.map((b, i) => {
        if (b.type === 'section') {
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 60, marginBottom: 100 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{b.label}</div>
              <div style={{ fontSize: 18, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{b.body}</div>
            </div>
          );
        }
        if (b.type === 'images') {
          const cols = b.cols && b.cols > 1 ? b.cols : Math.min(b.src.length, 3) || 1;
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 24, marginBottom: 60 }}>
              {b.src.map((s, j) => (
                <div key={j} style={{ width: '100%', aspectRatio: b.ratio && b.ratio !== 'auto' ? b.ratio.replace('/', ' / ') : undefined }}>
                  <Media src={s} style={{ width: '100%', height: '100%', objectFit: b.fit || 'cover', borderRadius: 4 }} />
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

function ProjectListCard({ p, isExpanded, onToggle, onOpen, fullImage = false }) {
  const hasDesc = !!(p.descEn || p.descKo);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 26, fontWeight: 700 }}>{p.title}</div>
        {p.subtitleKo && <div style={{ fontSize: 16, color: '#999' }}>— {p.subtitleKo}</div>}
      </div>
      {(p.client || p.year) && <div style={{ fontSize: 13, color: '#999', marginTop: 6 }}>{p.client && `Client : ${p.client}`}{p.client && p.year ? ' · ' : ''}{p.year}</div>}
      {fullImage ? (
        <div style={{ marginTop: 24 }}>
          <div onClick={p.blocks ? onOpen : undefined} style={{ width: '100%', aspectRatio: '16/9', cursor: p.blocks ? 'pointer' : 'default' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
          <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[p.workType, ...p.outputs].map((tag) => (<div key={tag} style={{ fontSize: 12, padding: '7px 15px', borderRadius: 100, border: '1px solid #E5E3DE', color: '#666' }}>{tag}</div>))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 48, marginTop: 24, alignItems: 'start' }}>
          <div>
            <div onClick={p.blocks ? onOpen : undefined} style={{ width: '100%', aspectRatio: '3/2', cursor: p.blocks ? 'pointer' : 'default' }}><Ph id={p.img} style={{ width: '100%', height: '100%' }} /></div>
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[p.workType, ...p.outputs].map((tag) => (<div key={tag} style={{ fontSize: 12, padding: '7px 15px', borderRadius: 100, border: '1px solid #E5E3DE', color: '#666' }}>{tag}</div>))}
            </div>
          </div>
          {hasDesc && (
            <div>
              {p.descEn && <div style={{ fontSize: 15, lineHeight: 1.6, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{p.descEn}</div>}
              {p.descKo && <div style={{ fontSize: 15, lineHeight: 1.6, marginTop: 20, overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>{p.descKo}</div>}
              <div onClick={onToggle} style={{ marginTop: 16, fontSize: 13, color: '#999', cursor: 'pointer' }}>{isExpanded ? 'See Less' : 'See More'} →</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [view, setView] = useState('home');
  const [projectId, setProjectId] = useState(null);
  const [workType, setWorkType] = useState('ALL');
  const [outputTag, setOutputTag] = useState('ALL');
  const [lang, setLang] = useState('en');
  const [expanded, setExpanded] = useState({});

  const t = lang === 'ko' ? { ...EN, ...KO_BODY } : EN;
  const goHome = () => { setView('home'); window.scrollTo(0, 0); };
  const goWork = () => { setView('work'); window.scrollTo(0, 0); };
  const goAbout = () => { setView('home'); setTimeout(() => { window.location.hash = 'about'; }, 0); };
  const goContact = () => { setView('home'); setTimeout(() => { window.location.hash = 'contact'; }, 0); };
  const openProject = (id) => () => { setProjectId(id); setView('project'); window.scrollTo(0, 0); };

  const activeProject = PROJECTS.find((p) => p.id === projectId);

  const filtered = PROJECTS.filter((p) =>
    (workType === 'ALL' || p.workType === workType) &&
    (outputTag === 'ALL' || p.outputs.includes(outputTag))
  );

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(247,246,242,0.86)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px', borderBottom: '1px solid #E5E3DE' }}>
          <div onClick={goHome} style={{ fontSize: 20, fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.04em',textDecoration: 'underline' }}>Jiyeon Kim</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div onClick={goWork} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', paddingBottom: 2, borderBottom: `1px solid ${view === 'work' ? '#111111' : 'transparent'}` }}>{t.navWork}</div>
            <div onClick={goAbout} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer' }}>{t.navAbout}</div>
            <div onClick={goContact} style={{ fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer' }}>{t.navContact}</div>
            <div style={{ width: 1, height: 14, background: '#E5E3DE' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <a href="https://www.behance.net/fotodelay" target="_blank" rel="noreferrer"><img src="assets/behance-icon.png" alt="Behance" style={{ width: 20, height: 20 }} /></a>
              <a href="https://www.linkedin.com/in/jiyeonkim-anco" target="_blank" rel="noreferrer"><img src="assets/linkedin-icon.png" alt="LinkedIn" style={{ width: 26, height: 26 }} /></a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 40px' }}>
          <div onClick={() => setLang((l) => l === 'en' ? 'ko' : 'en')} style={{ fontSize: 12, cursor: 'pointer', display: 'flex', gap: 6 }}>
            <span style={{ color: lang === 'en' ? '#111111' : '#999999', fontWeight: lang === 'en' ? 700 : 400 }}>EN</span>
            <span style={{ color: '#E5E3DE' }}>/</span>
            <span style={{ color: lang === 'ko' ? '#111111' : '#999999', fontWeight: lang === 'ko' ? 700 : 400 }}>KO</span>
          </div>
        </div>
      </div>

      {view === 'home' && (
        <div>
          <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 40px 0', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ fontSize: 'clamp(56px,9.5vw,148px)', fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.03em' }}>{t.heroName}</div>
            <div style={{ marginTop: 28, fontSize: 'clamp(20px,3vw,34px)', color: '#666666' }}>{t.heroRole}</div>
            <div style={{ marginTop: 56, maxWidth: 640, fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.5 }}>{t.heroStatement}</div>
            <div style={{ marginTop: 24, fontSize: 15, lineHeight: 1.7, color: '#666666', maxWidth: 520 }}>{t.heroSubLine1}<br/>{t.heroSubLine2}</div>
          </section>

          <section style={{ padding: '140px 40px 100px', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 90, borderBottom: '1px solid #E5E3DE', paddingBottom: 24 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.selectedWork}</div>
              <div onClick={goWork} style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>{t.viewAllWork}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
              {PROJECTS.slice(0, 3).map((p) => (
                <ProjectListCard
                  key={p.id}
                  p={p}
                  isExpanded={!!expanded[p.id]}
                  onToggle={() => setExpanded((s) => ({ ...s, [p.id]: !s[p.id] }))}
                  onOpen={p.blocks ? openProject(p.id) : undefined}
                  fullImage
                />
              ))}
            </div>
          </section>

          <section id="about" style={{ padding: '100px 40px 140px', maxWidth: 1500, margin: '0 auto', borderTop: '1px solid #E5E3DE' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 60, marginTop: 90 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.navAbout}</div>
              <div style={{ maxWidth: 680 }}>
                <div style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 500, lineHeight: 1.55 }}>{t.aboutHeading}</div>
                <div style={{ marginTop: 40, fontSize: 16, lineHeight: 1.85, color: '#666666' }}>{t.aboutBody1}<br/><br/>{t.aboutBody2}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 60, marginTop: 90 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666' }}>{t.experienceLabel}</div>
              <div>
                {[['2025\u2014Present', t.job1Company, t.job1Role], ['2020\u20142023', 'SLL (JTBC Studios)', t.job2Role], ['2016\u20142020', 'A+E Networks Korea', t.job3Role], ['2014\u20142015', 'Style&', t.job4Role], ['2014', 'Imagebakery', t.job5Role]].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 24, padding: '26px 0', borderTop: '1px solid #E5E3DE', borderBottom: i === 4 ? '1px solid #E5E3DE' : 'none' }}>
                    <div style={{ fontSize: 15, color: '#666666', flex: '0 0 140px' }}>{row[0]}</div>
                    <div style={{ flex: 1, fontSize: 18, fontWeight: 500 }}>{row[1]}</div>
                    <div style={{ fontSize: 15, color: '#666666', textAlign: 'right' }}>{row[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" style={{ padding: '100px 40px 160px', maxWidth: 1500, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#666666', marginBottom: 30 }}>{t.navContact}</div>
            <div style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 700 }}>{t.letsTalk}</div>
            <div style={{ marginTop: 40, display: 'flex', gap: 32, justifyContent: 'center' }}>
              <a href="https://www.behance.net/fotodelay" target="_blank" rel="noreferrer" style={{ width: 52, height: 52, border: '1px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="assets/behance-icon.png" style={{ width: 24, height: 24 }} /></a>
              <a href="https://www.linkedin.com/in/jiyeonkim-anco" target="_blank" rel="noreferrer" style={{ width: 52, height: 52, border: '1px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="assets/linkedin-icon.png" style={{ width: 28, height: 28 }} /></a>
            </div>
          </section>
        </div>
      )}

      {view === 'work' && (
        <div style={{ padding: '140px 40px 160px', maxWidth: 1500, margin: '0 auto' }}>
          <div style={{ fontSize: 'clamp(48px,8vw,96px)', fontWeight: 700, marginBottom: 70 }}>{t.workTitle}</div>
          <div style={{ marginBottom: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {WORK_TYPES.map((wt) => (
              <div key={wt} onClick={() => setWorkType(wt)} style={{ fontSize: 13, padding: '9px 18px', borderRadius: 100, border: `1px solid ${workType === wt ? '#111' : '#E5E3DE'}`, background: workType === wt ? '#111' : 'transparent', color: workType === wt ? '#fff' : '#111', cursor: 'pointer' }}>{wt}</div>
            ))}
          </div>
          <div style={{ marginBottom: 80, display: 'flex', flexWrap: 'wrap', gap: 10, paddingBottom: 40, borderBottom: '1px solid #E5E3DE' }}>
            {OUTPUT_TAGS.map((tag) => (
              <div key={tag} onClick={() => setOutputTag(tag)} style={{ fontSize: 12, padding: '7px 15px', borderRadius: 100, border: `1px solid ${outputTag === tag ? '#111' : '#E5E3DE'}`, background: outputTag === tag ? '#111' : 'transparent', color: outputTag === tag ? '#fff' : '#666', cursor: 'pointer' }}>{tag}</div>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ padding: '100px 0', textAlign: 'center', color: '#666' }}>{t.noResults}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
              {filtered.map((p) => (
                <ProjectListCard
                  key={p.id}
                  p={p}
                  isExpanded={!!expanded[p.id]}
                  onToggle={() => setExpanded((s) => ({ ...s, [p.id]: !s[p.id] }))}
                  onOpen={p.blocks ? openProject(p.id) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'project' && activeProject && (
        <div>
          <div style={{ padding: '140px 40px 0', maxWidth: 1500, margin: '0 auto' }}>
            <div onClick={goWork} style={{ fontSize: 13, cursor: 'pointer', color: '#666', marginBottom: 40 }}>{t.backToWork}</div>
          </div>
          <section style={{ maxWidth: 1500, margin: '0 auto', padding: '0 40px 40px' }}>
            <div style={{ fontSize: 'clamp(48px,9vw,120px)', fontWeight: 700, lineHeight: 0.98 }}>{activeProject.title}</div>
            {activeProject.subtitleKo && <div style={{ marginTop: 20, fontSize: 20, color: '#666' }}>{activeProject.subtitleKo}</div>}
            <div style={{ marginTop: 28, display: 'flex', gap: 32, fontSize: 14, color: '#666', flexWrap: 'wrap' }}>
              {activeProject.year && <div>{activeProject.year}</div>}
              {activeProject.client && <div>{activeProject.client}</div>}
              <div>{t.workTypeLabels[activeProject.workType]}</div>
            </div>
          </section>
          <section style={{ padding: '0 40px', maxWidth: 1500, margin: '0 auto' }}>
            <div style={{ width: '100%', aspectRatio: '16/9' }}><Ph id={activeProject.hero || activeProject.img} style={{ width: '100%', height: '100%' }} /></div>
          </section>
          {(activeProject.descEn || activeProject.descKo) && (
            <section style={{ padding: '100px 40px 0', maxWidth: 1100, margin: '0 auto' }}>
              {activeProject.descEn && <div style={{ fontSize: 22, lineHeight: 1.7, marginBottom: 24 }}>{activeProject.descEn}</div>}
              {activeProject.descKo && <div style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>{activeProject.descKo}</div>}
            </section>
          )}
          <div style={{ paddingTop: 100 }}><ProjectBlocks blocks={activeProject.blocks} /></div>
          <div style={{ padding: '60px 40px 140px', maxWidth: 1500, margin: '0 auto', borderTop: '1px solid #E5E3DE', textAlign: 'center' }}>
            <div onClick={goWork} style={{ fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}>{t.backToAllWork}</div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
