const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

/* =========================
   V3 — IMMERSIVE INTERACTIONS
========================= */

const safe=(fn)=>{try{fn()}catch(e){console.warn('Portfolio interaction:',e)}};

/* Progress */
const progress=$('.progress span');
function updateProgress(){if(!progress)return;const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(scrollY/h*100):0)+'%';}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

/* Menu */
const panel=$('.menu-panel');
if($('.menu-btn')&&panel) $('.menu-btn').onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false')};
if($('.close-menu')&&panel) $('.close-menu').onclick=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')};
$$('.menu-grid a').forEach(a=>a.onclick=()=>panel&&panel.classList.remove('open'));

/* Cursor */
const dot=$('.cursor-dot'),ring=$('.cursor-ring');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot)dot.style.transform=`translate(${mx}px,${my}px)`},{passive:true});
function cursorLoop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;if(ring)ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(cursorLoop)}
cursorLoop();

/* Hero parallax + text drift */
addEventListener('scroll',()=>{const p=$('.parallax');const c=$('.hero-content');if(p)p.style.transform=`scale(1.08) translateY(${scrollY*.08}px)`;if(c)c.style.transform=`translate3d(0,${Math.min(scrollY*.08,90)}px,0)`},{passive:true});

/* Mouse parallax for hero */
const hero=$('.hero');
if(hero){hero.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;const image=$('.hero-image');const flower=$('.hero-flower');if(image)image.style.transform=`scale(1.09) translate(${x*-14}px,${y*-10}px)`;if(flower)flower.style.margin=`${y*10}px ${x*10}px`},{passive:true});}

/* Principles */
const principleData={axis:['01','AXIS','以入口—中心—景观点形成清晰的视觉秩序。'],frame:['02','FRAME','建筑边界与绿篱共同构成连续的景观框景。'],reflection:['03','REFLECTION','水面作为柔性界面，连接休闲、桥与植物岛。'],garden:['04','GARDEN ROOM','将周边空间切分成可停留、可漫游的花园房间。']};
$$('.principle').forEach(btn=>btn.onclick=()=>{const d=principleData[btn.dataset.principle];if(!d)return;$$('.principle').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('.stage-number').textContent=d[0];$('.principle-stage h3').textContent=d[1];$('.principle-stage p').textContent=d[2];const stage=$('.principle-stage');stage.classList.remove('flash');void stage.offsetWidth;stage.classList.add('flash');});

/* Plan */
const planData={court:['CENTRAL COURT','主庭院 / 大尺度留白','几何骨架形成庭院的核心留白，让入口、花园和水院围绕中心建立秩序。'],water:['WATER GARDEN','水院 / 木桥 / 植物岛','曲水把动线向左展开，木桥与植物岛让水体同时成为边界与路径。'],formal:['FORMAL GARDEN','几何花园 / 喷泉','对称花园提供秩序性的对景，用重复、比例和修剪强化欧洲庭院语言。'],lawn:['LAWN ROOM','草坪 / 休憩 / 观景','草坪作为较开放的终点空间，形成从几何核心向自然边界的释放。']};
$$('.plan-hot').forEach(b=>b.onclick=()=>{const d=planData[b.dataset.plan];if(!d)return;$$('.plan-hot').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');const info=$('.planInfo');info.innerHTML=`<span>${d[0]}</span><strong>${d[1]}</strong><em style="margin-left:auto;color:#aab8a4;font-style:normal;font-size:12px">${d[2]}</em>`;info.classList.remove('update');void info.offsetWidth;info.classList.add('update');});

/* Journey */
const journeyData={arrive:['ARRIVE','硬质铺装收束视线，入口先建立清晰的方向感。'],discover:['DISCOVER','水面把动线向左展开，从硬质入口转入更自然的花园体验。'],pause:['PAUSE','桥与平台提供停留节点，让穿越被切成可感知的片段。'],release:['RELEASE','草坪与花园形成开敞终点，空间从围合走向松弛。'],'water-island':['WATER ISLAND','植物岛把水面从功能转化为景观核心。'],bridge:['BRIDGE WALK','木桥制造节奏，形成动态的穿越体验。'],fountain:['FORMAL FOUNTAIN','对称花园为自然水院提供秩序性的对景。']};
$$('.journey-hot').forEach(b=>b.onclick=()=>{const d=journeyData[b.dataset.journey];if(!d)return;$$('.journey-hot').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');$('.journeyCaption').innerHTML=`<b>${d[0]}</b> — ${d[1]}`;});

/* Nodes */
const nodeData={'water-island':['01 / WATER ISLAND','植物岛把水面从功能转化为景观核心。','水 / 植物 / 停留'],bridge:['02 / BRIDGE WALK','木桥制造节奏，形成动态的穿越体验。','木 / 水 / 动线'],fountain:['03 / FORMAL FOUNTAIN','对称花园为自然水院提供秩序性的对景。','几何 / 喷泉 / 对景']};
function openModal(t,e,x){const m=$('#modal');if(!m)return;$('#modalEyebrow').textContent=e;$('#modalTitle').textContent=t;$('#modalText').textContent=x;m.classList.add('open');m.setAttribute('aria-hidden','false');}
function closeModal(){const m=$('#modal');if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');}}
function openNode(k){const d=nodeData[k];if(d)openModal(d[0],d[2],d[1]);}
$$('[data-node]').forEach(b=>b.onclick=()=>openNode(b.dataset.node));

/* Analysis */
const analysisData={circulation:'CIRCULATION — 入口 → 中央庭院 → 水院 → 花园；让动线从入口收束，再被水面向左展开。',water:'WATER SYSTEM — 水体作为边界与路径的柔性界面，把木桥、平台和植物岛组织成连续体验。',planting:'PLANTING — 乔木背景 + 灌木层次 + 季相花境；用层次控制尺度，同时保持中央空间开敞。'};
$$('.analysis-card').forEach(b=>b.onclick=()=>{$$('.analysis-card').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('.analysis-detail').textContent=analysisData[b.dataset.analysis]||'';});

/* Materials */
const detailData={stone:['浅色石材','建立明亮、克制的硬质基底，让水与植物成为更柔软的视觉层。'],wood:['暖木色桥面','用温暖材质强调桥作为“穿越”的节点，让水面产生节奏。'],hedge:['深绿修剪绿篱','强化几何秩序，作为建筑边界与花园之间的连续框景。'],water:['柔和水面','作为柔性界面连接休闲、桥与植物岛，软化正式核心。']};
$$('[data-detail]').forEach(b=>b.onclick=()=>{const d=detailData[b.dataset.detail];if(d)$('#detailPop').innerHTML=`<b>${d[0]}</b><br>${d[1]}`;});

/* Perspective */
$$('.persp-btn').forEach(b=>b.onclick=()=>{$$('.persp-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');const img=$('#perspectiveImg');if(img){img.style.opacity='0';setTimeout(()=>{img.src=b.dataset.img;img.onload=()=>img.style.opacity='1';},150);}});

/* Sketch modal */
const modalData={massing:['01 / MASSING','边界先行，空间后生长','用连续的墙体、树阵和绿篱建立庭院的秩序感。'],atmosphere:['02 / ATMOSPHERE','让水成为第二条路径','桥、平台与植物岛围绕水面形成环形体验。']};
$$('[data-modal]').forEach(b=>b.onclick=()=>{const d=modalData[b.dataset.modal];if(d)openModal(d[1],d[0],d[2]);});
if($('.modal-close'))$('.modal-close').onclick=closeModal;if($('.modal-backdrop'))$('.modal-backdrop').onclick=closeModal;
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeImage();exitPresentation();}});

/* Lightbox */
function createLightbox(){if($('#imageLightbox'))return;const box=document.createElement('div');box.id='imageLightbox';box.innerHTML='<div class="lightbox-bg"></div><button class="lightbox-close" aria-label="关闭">×</button><img class="lightbox-image" src="" alt=""><div class="lightbox-caption"></div>';document.body.appendChild(box);}
createLightbox();
function openImage(img){const box=$('#imageLightbox'),big=$('.lightbox-image'),cap=$('.lightbox-caption');if(!box||!big)return;big.src=img.currentSrc||img.src;big.alt=img.alt||'';if(cap)cap.textContent=img.alt||'European Courtyard';box.classList.add('show');}
function closeImage(){const box=$('#imageLightbox');if(box)box.classList.remove('show');}
$$('.frame-card img,.plan-board img,.journey-map img,.nodes-image img,.detail-photo img,.perspective-main img').forEach(img=>img.addEventListener('click',()=>openImage(img)));
if($('.lightbox-bg'))$('.lightbox-bg').onclick=closeImage;if($('.lightbox-close'))$('.lightbox-close').onclick=closeImage;

/* Image tilt / depth */
$$('.frame-card,.plan-board,.journey-map,.nodes-image,.detail-photo,.perspective-main').forEach(card=>{card.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,img=card.querySelector('img');if(img)img.style.transform=`scale(1.025) translate(${x*-7}px,${y*-7}px)`},{passive:true});card.addEventListener('mouseleave',()=>{const img=card.querySelector('img');if(img)img.style.transform='scale(1) translate(0,0)';});});

/* Scroll reveal */
const reveal=document.querySelectorAll('.section-kicker,.intro-copy,.principles,.frame-card,.sketch-copy,.plan-board,.journey-map,.nodes-grid,.analysis-card,.detail-layout,.perspective-stage,.footer');
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v3-visible')}),{threshold:.1});
reveal.forEach(el=>{el.classList.add('v3-reveal');ro.observe(el)});

/* Section rail */
const sections=[...document.querySelectorAll('main section[id]')];
const rail=document.createElement('div');rail.className='v3-rail';sections.forEach(sec=>{const b=document.createElement('button');const label=(sec.id||'').toUpperCase();b.innerHTML=`<span>${label}</span>`;b.onclick=()=>sec.scrollIntoView({behavior:'smooth'});rail.appendChild(b);});document.body.appendChild(rail);
const railButtons=[...rail.children];
const sio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const i=sections.indexOf(e.target);railButtons.forEach((b,j)=>b.classList.toggle('active',i===j));}}),{threshold:.45});sections.forEach(s=>sio.observe(s));

/* Presentation Mode */
const presentationImages=['image10.png','image6.png','image1.jpeg','image5.png'];
const presentationLabels=['AERIAL / OVERVIEW','MASTERPLAN / SYSTEM','LANDSCAPE NODES','CONCEPT / PROCESS'];
let presentationIndex=0;
function buildPresentation(){if($('#presentationStage'))return;const stage=document.createElement('div');stage.id='presentationStage';stage.innerHTML=`<div class="presentation-bg"></div><button class="presentation-close" aria-label="退出展示">×</button><div class="presentation-overlay"><div><div class="presentation-kicker">EUROPEAN COURTYARD / PRESENTATION</div><div class="presentation-title">European<br><em>Courtyard</em></div></div><div class="presentation-copy"><b id="presentationLabel"></b><p id="presentationCopy">An interactive landscape study of water, stone, hedge and lawn.</p></div></div><div class="presentation-controls"><button id="prevSlide">← PREV</button><button id="nextSlide">NEXT →</button><button id="exitSlide">EXIT PRESENT</button></div>`;document.body.appendChild(stage);stage.querySelector('.presentation-close').onclick=exitPresentation;stage.querySelector('#exitSlide').onclick=exitPresentation;stage.querySelector('#prevSlide').onclick=()=>setPresentation(presentationIndex-1);stage.querySelector('#nextSlide').onclick=()=>setPresentation(presentationIndex+1);}
function setPresentation(i){presentationIndex=(i+presentationImages.length)%presentationImages.length;const bg=$('.presentation-bg'),label=$('#presentationLabel');if(bg)bg.style.backgroundImage=`url('${presentationImages[presentationIndex]}')`;if(label)label.textContent=presentationLabels[presentationIndex];}
function enterPresentation(){buildPresentation();document.body.classList.add('presentation-mode');setPresentation(0);}
function exitPresentation(){document.body.classList.remove('presentation-mode');}
if($('.present-btn'))$('.present-btn').onclick=enterPresentation;

/* keyboard presentation navigation */
addEventListener('keydown',e=>{if(!document.body.classList.contains('presentation-mode'))return;if(e.key==='ArrowRight')setPresentation(presentationIndex+1);if(e.key==='ArrowLeft')setPresentation(presentationIndex-1);});

/* Hover affordance */
$$('button,a').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));});

/* touch safety */
if(innerWidth<900)document.body.style.cursor='auto';
