const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// Progress
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;$('.progress span').style.width=(scrollY/h*100)+'%';});

// Menu
const panel=$('.menu-panel'); $('.menu-btn').onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false')}; $('.close-menu').onclick=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')}; $$('.menu-grid a').forEach(a=>a.onclick=()=>panel.classList.remove('open'));

// Custom cursor
const dot=$('.cursor-dot'), ring=$('.cursor-ring'); let mx=0,my=0,rx=0,ry=0; addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`}); function cursorLoop(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(cursorLoop)} cursorLoop();

// Parallax hero
addEventListener('scroll',()=>{const p=$('.parallax'); if(p){p.style.transform=`scale(1.08) translateY(${scrollY*.08}px)`}});

// Principle interaction
const principleData={axis:['01','AXIS','以入口—中心—景观点形成清晰的视觉秩序。'],frame:['02','FRAME','建筑边界与绿篱共同构成连续的景观框景。'],reflection:['03','REFLECTION','水面作为柔性界面，连接休闲、桥与植物岛。'],garden:['04','GARDEN ROOM','将周边空间切分成可停留、可漫游的花园房间。']};
$$('.principle').forEach(btn=>btn.onclick=()=>{ $$('.principle').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const d=principleData[btn.dataset.principle];$('.stage-number').textContent=d[0];$('.principle-stage h3').textContent=d[1];$('.principle-stage p').textContent=d[2]; });

// Plan hotspots
const planData={court:['CENTRAL COURT','主庭院 / 大尺度留白','几何骨架形成庭院的核心留白，让入口、花园和水院围绕中心建立秩序。'],water:['WATER GARDEN','水院 / 木桥 / 植物岛','曲水把动线向左展开，木桥与植物岛让水体同时成为边界与路径。'],formal:['FORMAL GARDEN','几何花园 / 喷泉','对称花园提供秩序性的对景，用重复、比例和修剪强化欧洲庭院语言。'],lawn:['LAWN ROOM','草坪 / 休憩 / 观景','草坪作为较开放的终点空间，形成从几何核心向自然边界的释放。']};
$$('.plan-hot').forEach(b=>b.onclick=()=>{const d=planData[b.dataset.plan];$('.planInfo').innerHTML=`<span>${d[0]}</span><strong>${d[1]}</strong><em style="margin-left:auto;color:#aab8a4;font-style:normal;font-size:12px">${d[2]}</em>`});

// Journey hotspots
const journeyData={arrive:['ARRIVE','硬质铺装收束视线，入口先建立清晰的方向感。'],discover:['DISCOVER','水面把动线向左展开，从硬质入口转入更自然的花园体验。'],pause:['PAUSE','桥与平台提供停留节点，让穿越被切成可感知的片段。'],release:['RELEASE','草坪与花园形成开敞终点，空间从围合走向松弛。'],'water-island':['WATER ISLAND','植物岛把水面从功能转化为景观核心。'],bridge:['BRIDGE WALK','木桥制造节奏，形成动态的穿越体验。'],fountain:['FORMAL FOUNTAIN','对称花园为自然水院提供秩序性的对景。']};
$$('.journey-hot').forEach(b=>b.onclick=()=>{const d=journeyData[b.dataset.journey];$('.journeyCaption').innerHTML=`<b>${d[0]}</b> — ${d[1]}`});

// Nodes: click list and image hotspots
const nodeData={
 'water-island':['01 / WATER ISLAND','植物岛把水面从功能转化为景观核心。','水 / 植物 / 停留'],
 bridge:['02 / BRIDGE WALK','木桥制造节奏，形成动态的穿越体验。','木 / 水 / 动线'],
 fountain:['03 / FORMAL FOUNTAIN','对称花园为自然水院提供秩序性的对景。','几何 / 喷泉 / 对景']};
function openNode(k){const d=nodeData[k]; openModal(d[0],d[2],d[1])}
$$('[data-node]').forEach(b=>b.onclick=()=>openNode(b.dataset.node));

// Analysis
const analysisData={circulation:'CIRCULATION — 入口 → 中央庭院 → 水院 → 花园；让动线从入口收束，再被水面向左展开。',water:'WATER SYSTEM — 水体作为边界与路径的柔性界面，把木桥、平台和植物岛组织成连续体验。',planting:'PLANTING — 乔木背景 + 灌木层次 + 季相花境；用层次控制尺度，同时保持中央空间开敞。'};
$$('.analysis-card').forEach(b=>b.onclick=()=>{$$('.analysis-card').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('.analysis-detail').textContent=analysisData[b.dataset.analysis]});

// Material detail
const detailData={stone:['浅色石材','建立明亮、克制的硬质基底，让水与植物成为更柔软的视觉层。'],wood:['暖木色桥面','用温暖材质强调桥作为“穿越”的节点，让水面产生节奏。'],hedge:['深绿修剪绿篱','强化几何秩序，作为建筑边界与花园之间的连续框景。'],water:['柔和水面','作为柔性界面连接休闲、桥与植物岛，软化正式核心。']};
$$('[data-detail]').forEach(b=>b.onclick=()=>{const d=detailData[b.dataset.detail];$('.detail-pop').innerHTML=`<b>${d[0]}</b><br>${d[1]}`});

// Perspective switch
$$('.persp-btn').forEach(b=>b.onclick=()=>{$$('.persp-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#perspectiveImg').src=b.dataset.img});

// Sketch modals
const modalData={massing:['01 / MASSING','边界先行，空间后生长','用连续的墙体、树阵和绿篱建立庭院的秩序感。'],atmosphere:['02 / ATMOSPHERE','让水成为第二条路径','桥、平台与植物岛围绕水面形成环形体验。']};
function openModal(t,e,x){$('#modalEyebrow').textContent=e;$('#modalTitle').textContent=t;$('#modalText').textContent=x;$('#modal').classList.add('open');$('#modal').setAttribute('aria-hidden','false')}
$$('[data-modal]').forEach(b=>b.onclick=()=>{const d=modalData[b.dataset.modal];openModal(d[1],d[0],d[2])});
function closeModal(){$('#modal').classList.remove('open');$('#modal').setAttribute('aria-hidden','true')} $('.modal-close').onclick=closeModal;$('.modal-backdrop').onclick=closeModal;addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Hover affordance for clickable items
$$('button,a').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'))});
