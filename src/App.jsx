import {useState,useEffect,useRef,useCallback} from 'react'
import {motion,AnimatePresence,useScroll,useSpring,useInView,animate,useMotionValue,useTransform} from 'framer-motion'
import {projects,cats,experience,skills,certs,links,about} from './data.js'

const Logo=({n,s})=><span className="lg"><img src={`https://cdn.simpleicons.org/${s}/ffffff`} alt="" loading="lazy" onError={e=>e.currentTarget.style.display='none'}/>{n}</span>
const Cover=({p})=><div className="cover" style={{background:`radial-gradient(120% 120% at 100% 0,${p.c[1]}33,transparent 55%),${p.c[0]}`,color:p.c[1]}}>
  {p.img?<img src={p.img} alt={p.name}/>:<><span className="cname">{p.name}</span><span className="ph">placeholder visual</span></>}</div>
const Ext=({href,children})=>href?<a className="btn ghost" href={href} target="_blank" rel="noreferrer">{children}</a>:null
const Ast=({className})=><svg className={'ast '+className} viewBox="0 0 24 24" aria-hidden><path d="M12 1v22M2 6l20 12M22 6L2 18" stroke="currentColor" strokeWidth="3.4" fill="none"/></svg>

function Count({to}){const r=useRef(),v=useInView(r,{once:true}),[n,setN]=useState(0)
  useEffect(()=>{if(v){const c=animate(0,to,{duration:1.4,onUpdate:x=>setN(Math.round(x))});return()=>c.stop()}},[v,to]);return <span ref={r}>{n}</span>}
function Type({words}){const [i,setI]=useState(0),[t,setT]=useState('')
  useEffect(()=>{const w=words[i%words.length];let k=0,d=false
    const id=setInterval(()=>{if(!d){k++;setT(w.slice(0,k));if(k===w.length){d=true;k=w.length+14}}else{k--;if(k<=w.length)setT(w.slice(0,Math.max(k,0)));if(k<=0){clearInterval(id);setI(x=>x+1)}}},65)
    return()=>clearInterval(id)},[i,words]);return <span className="type">{t}<i/></span>}
function Clock(){const f=()=>new Date().toLocaleTimeString('en-GB',{timeZone:'Africa/Addis_Ababa',hour:'2-digit',minute:'2-digit'}),[t,setT]=useState(f())
  useEffect(()=>{const id=setInterval(()=>setT(f()),15000);return()=>clearInterval(id)},[]);return <span>ADD {t}</span>}

function Deck({items}){const mx=useMotionValue(0),my=useMotionValue(0)
  const rx=useSpring(useTransform(my,[-.5,.5],[16,-16]),{stiffness:110,damping:16}),ry=useSpring(useTransform(mx,[-.5,.5],[-24,24]),{stiffness:110,damping:16})
  const mv=e=>{const b=e.currentTarget.getBoundingClientRect();mx.set((e.clientX-b.left)/b.width-.5);my.set((e.clientY-b.top)/b.height-.5)}
  return <div className="deck" onPointerMove={mv} onPointerLeave={()=>{mx.set(0);my.set(0)}} aria-hidden>
    <motion.div className="stack" style={{rotateX:rx,rotateY:ry}}>{items.map((p,i)=><div key={p.id} className="dc" style={{transform:`translateZ(${i*26}px) translate(${i*-16}px,${i*-16}px)`}}><Cover p={p}/></div>)}</motion.div></div>}

const asks=[['Show me the AI work','ai','Gebere and Keya Health: a farming assistant and a health recommender.'],['Any Web3?','web3','The Battle Arena: real-time Battleship with wallet sign-in.'],['How do you handle operations?','ops','Five concept systems in Airtable, Notion and Google Workspace.'],['Apps with their own look','build','Seven products, each with its own brand and design.']]
function Prompt({onPick}){const [a,setA]=useState(null),[busy,setB]=useState(false)
  const ask=x=>{setA(null);setB(true);setTimeout(()=>{setB(false);setA(x);setTimeout(()=>onPick(x[1]),1300)},800)}
  return <div className="prompt"><div className="pbar"><Ast className="sp"/>{busy?<span className="dots"><i/><i/><i/></span>:<span>{a?a[0]:'Ask the portfolio'}</span>}</div>
    <div className="ans" aria-live="polite">{a&&<motion.p key={a[0]} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{a[2]}</motion.p>}</div>
    <div className="asks">{asks.map(x=><button key={x[0]} onClick={()=>ask(x)}>{x[0]}</button>)}</div></div>}

function Modal({p,onClose}){
  useEffect(()=>{const k=e=>e.key==='Escape'&&onClose();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[onClose])
  return <motion.div className="veil" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
    <motion.div className="sheet" role="dialog" aria-modal="true" aria-label={p.name} initial={{y:60,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}} transition={{type:'spring',damping:26,stiffness:260}} onClick={e=>e.stopPropagation()}>
      <Cover p={p}/><div className="sbody"><button className="x" onClick={onClose}>Close</button>
        <h3>{p.name}</h3><p className="meta">{p.role}, {p.year}{p.status&&<b className="pill">{p.status}</b>}</p>
        <p>{p.blurb}</p><ul>{p.points.map(t=><li key={t}>{t}</li>)}</ul>
        <p className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</p>
        <div className="row"><Ext href={p.live}>View live</Ext><Ext href={p.repo}>View code</Ext></div></div></motion.div></motion.div>}

function Loader({onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2300);return()=>clearTimeout(t)},[onDone])
  return <motion.div className="loader" exit={{y:'-100%'}} transition={{duration:.85,ease:[.76,0,.24,1]}}>
    <div className="guides rl" aria-hidden>{Array.from({length:12},(_,i)=><motion.i key={i} initial={{scaleY:0}} animate={{scaleY:1}} transition={{duration:.85,delay:.15+i*.07,ease:[.76,0,.24,1]}} style={{transformOrigin:i%2?'bottom':'top'}}/>)}</div>
    <motion.div className="lmark" aria-label="ET" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.8,duration:.6}}>ET<Ast className="la"/></motion.div>
  </motion.div>}

const col=c=>({'--c':c})
export default function App(){
  const [theme,setTheme]=useState('dark'),[f,setF]=useState('all'),[open,setOpen]=useState(null),[hov,setHov]=useState(null),[copied,setCopied]=useState(false),[guides,setGuides]=useState(false)
  const [phase,setPhase]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'done':'loading')
  const done=useCallback(()=>setPhase('done'),[])
  const [menu,setMenu]=useState(false)
  const pre=phase==='done'?'':' pre'
  useEffect(()=>{document.body.style.overflow=phase!=='done'||open||menu?'hidden':''},[phase,open,menu])
  const {scrollYProgress}=useScroll(),bar=useSpring(scrollYProgress,{stiffness:120,damping:24})
  useEffect(()=>{document.documentElement.dataset.theme=theme},[theme])
  useEffect(()=>{const m=e=>{const s=document.documentElement.style;s.setProperty('--mx',e.clientX+'px');s.setProperty('--my',e.clientY+'px')};const k=e=>{if(e.key==='g'&&!/input|textarea/i.test(e.target.tagName))setGuides(v=>!v)};addEventListener('pointermove',m);addEventListener('keydown',k);return()=>{removeEventListener('pointermove',m);removeEventListener('keydown',k)}},[])
  const list=projects.filter(p=>f==='all'||p.cats.includes(f))
  const pick=k=>{setF(k);document.getElementById('work').scrollIntoView({behavior:'smooth'})}
  const copy=async()=>{try{await navigator.clipboard.writeText(links.email);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{location.href='mailto:'+links.email}}
  const loop=[...skills,...skills]
  return <>
    <AnimatePresence>{phase==='loading'&&<Loader onDone={done}/>}</AnimatePresence>
    <motion.div className="prog" style={{scaleX:bar}}/>
    {guides&&<div className="guides" aria-hidden>{Array.from({length:12},(_,i)=><i key={i}/>)}</div>}
    <header className={"nav g"+pre}><a href="#top" className="logo" style={col('1 / 3')} aria-label="Eyoab Tessera">ET<Ast className="lo"/></a>
      <span className="mono hide" style={col('4 / 7')}><Clock/> / Addis Ababa</span>
      <nav style={col('7 / 13')}><a href="#work">Work</a><a href="#about">About</a><a href="#path">Path</a><a href="#contact">Contact</a>
        <button className="gbtn" onClick={()=>setGuides(v=>!v)} aria-pressed={guides}>Grid</button>
        <button onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'Light':'Dark'}</button><button className="mbtn" onClick={()=>setMenu(true)}>Menu</button></nav></header>
    <AnimatePresence>{menu&&<motion.div className="mmenu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="x" onClick={()=>setMenu(false)}>Close</button>{['work','about','path','contact'].map((k,i)=><a key={k} href={'#'+k} onClick={()=>setMenu(false)}><span className="mono">0{i+2}</span>{k}</a>)}</motion.div>}</AnimatePresence>
    <main id="top" className={pre}>
      <section className="hero g">
        <div style={col('1 / 13')}><motion.h1 initial={{opacity:0,y:40}} animate={phase==='done'?{opacity:1,y:0}:{opacity:0,y:40}} transition={{duration:.8}}>Eyoab<br/>Tessera<Ast className="h1a"/></motion.h1></div>
        <div className="side" style={col('1 / 6')}>
          <p className="big">I build <Type words={['AI assistants','full-stack apps','Web3 games','ops systems']}/></p>
          <p className="muted">Full-stack and AI developer in Addis Ababa, <svg className="circ" viewBox="0 0 120 40" aria-hidden><motion.path d="M60 3C20 1 3 14 8 26s45 13 70 8 38-14 28-26S58 -2 40 5" fill="none" stroke="var(--acc)" strokeWidth="2.5" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.4,delay:.8}}/></svg><span className="cw">building both sides</span> of a product.</p></div>
        <div style={col('1 / 6')} className="pw"><Prompt onPick={pick}/></div>
        <div className="deckw" style={col('7 / 13')}><Deck items={projects.slice(0,6)}/></div>
      </section>
      <div className="marq" aria-label="Toolkit"><div className="track">{loop.map(([n,s],i)=><Logo key={n+i} n={n} s={s}/>)}</div></div>

      <section id="work" className="sec work" style={{background:hov?hov.c[0]:'transparent',color:hov?hov.c[1]:'var(--ink)'}}>
        <div className="g head"><h2 style={col('3 / 13')}>Selected work</h2></div>
        <div className="chips g"><div style={col('3 / 13')}>{cats.map(([k,l])=><button key={k} className={f===k?'on':''} onClick={()=>setF(k)}>{l}</button>)}</div></div>
        <ul className="idx" onMouseLeave={()=>setHov(null)}>{list.map((p,i)=><li key={p.id} onMouseEnter={()=>setHov(p)} onFocus={()=>setHov(p)}>
          <button className="g" onClick={()=>setOpen(p)}><span className="mono" style={col('1 / 2')}>{String(i+1).padStart(2,'0')}</span><b style={col('2 / 8')}>{p.name}</b><em style={col('8 / 11')}>{p.cats.join(' / ')}</em><span className="mono yr" style={col('11 / 13')}>{p.year} →</span></button></li>)}</ul>
        {hov&&<div className="peek" aria-hidden><Cover p={hov}/></div>}
      </section>

      <section id="about" className="sec g">
        <div className="photo" style={col('3 / 7')}><div className="pic">{about.img?<img src={about.img} alt="Eyoab Tessera"/>:<span>ET<small>photo placeholder</small></span>}</div></div>
        <div style={col('8 / 13')}>{about.text.map((t,i)=><p key={t} className={i?'ab':'ab lead'}>{t}</p>)}
          <div className="stats"><div><b><Count to={projects.length}/></b>projects</div><div><b><Count to={projects.filter(p=>p.cats.includes('build')).length}/></b>full apps</div><div><b><Count to={certs.length}/></b>certificates</div></div></div></section>

      <section id="path" className="sec g">
        <ol className="tl" style={col('3 / 8')}>{experience.map(([t,o,d,x])=><li key={t}><span className="mono">{d}</span><b>{t}</b><span className="muted">{o}</span><p>{x}</p></li>)}</ol>
        <div style={col('9 / 13')}><p className="mono">Toolkit</p><div className="logos">{skills.map(([n,s])=><Logo key={n} n={n} s={s}/>)}</div>
        <p className="mono sp2">Certifications</p><ul className="plain">{certs.map(c=><li key={c}>{c}</li>)}</ul></div></section>

      <section id="contact" className="sec cta g">
        <div style={col('3 / 13')}><h2 className="huge">Let’s build<br/>something.</h2>
        <div className="row"><button className="btn" onClick={copy}>{copied?'Copied':'Copy email'}</button>
          <a className="btn ghost" href={'mailto:'+links.email}>Send an email</a>
          <a className="btn ghost" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn ghost" href={links.github}>GitHub</a><a className="btn ghost" href={links.cv}>Download CV</a></div></div></section>
    </main>
    <footer className="mono">© 2026 Eyoab Efrem Tessera / Addis Ababa, Ethiopia</footer>
    <AnimatePresence>{open&&<Modal p={open} onClose={()=>setOpen(null)}/>}</AnimatePresence></>}
