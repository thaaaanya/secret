const panels=[...document.querySelectorAll('.panel')];
document.getElementById('date-choice').min=new Date().toISOString().split('T')[0];
const show=id=>{panels.forEach(p=>p.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelector('.question-rain')?.classList.toggle('hidden',id!=='intro')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)show(b.dataset.go)});

const zone=document.getElementById('game-zone'),noBtn=document.getElementById('no-btn'),yesBtn=document.getElementById('yes-btn'),tease=document.getElementById('tease');
let escapes=0;
function escapeNo(){
  escapes++; const maxX=Math.max(0,zone.clientWidth-noBtn.offsetWidth-8),maxY=Math.max(0,zone.clientHeight-noBtn.offsetHeight-8);
  noBtn.style.position='absolute';noBtn.style.transform=`scale(${Math.max(.32,1-escapes*.13)})`;
  if(escapes>=4){noBtn.style.left=`${yesBtn.offsetLeft+yesBtn.offsetWidth*.42}px`;noBtn.style.top=`${yesBtn.offsetTop+yesBtn.offsetHeight*.16}px`;noBtn.style.zIndex='1'}
  else{noBtn.style.left=`${Math.random()*maxX}px`;noBtn.style.top=`${Math.random()*maxY}px`}
  yesBtn.style.setProperty('--grow',Math.min(1.55,1+escapes*.08));
  tease.textContent=['Uy, casi 😭','Se está haciendo chiquito jiji','El sí se está poniendo celoso','Ahora se escondió detrás del sí 👀','Loveee, aceptá nomás 💜'][Math.min(escapes-1,4)];
}
noBtn.addEventListener('pointerenter',escapeNo);noBtn.addEventListener('pointerdown',e=>{e.preventDefault();escapeNo()});
yesBtn.addEventListener('click',()=>{show('celebrate');startFireworks(6500)});
document.addEventListener('pointermove',e=>{
  if(!document.getElementById('question').classList.contains('active'))return;
  const r=yesBtn.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy);
  if(d<220){yesBtn.style.setProperty('--mx',`${dx*.09}px`);yesBtn.style.setProperty('--my',`${dy*.09}px`)}else{yesBtn.style.setProperty('--mx','0px');yesBtn.style.setProperty('--my','0px')}
});

function sendResponse(response,date,time){
  document.getElementById('response-value').value=response;document.getElementById('date-value').value=date;document.getElementById('time-value').value=time;
  document.getElementById('response-form').submit();show('sent');
}
document.getElementById('send-choice').addEventListener('click',()=>{const d=document.getElementById('date-choice').value,t=document.getElementById('time-choice').value;if(!d||!t){alert('Elegí una fecha y una hora primero 💜');return}document.getElementById('sent-title').textContent='Perfecto, tenemos una cita';document.getElementById('sent-copy').textContent='Thanya ya recibió tu respuesta 💌';sendResponse('Sí, acepta la cita',d,t)});

const canvas=document.getElementById('fireworks'),ctx=canvas.getContext('2d');let fireworksRunning=false;
function startFireworks(duration){
  if(fireworksRunning)return;fireworksRunning=true;canvas.classList.add('show');
  const colors=['#b58bd0','#7b3f91','#f7c5ff','#ffffff','#d8a9ff'];let particles=[];
  const resize=()=>{canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};resize();
  const burst=()=>{const x=Math.random()*innerWidth,y=60+Math.random()*innerHeight*.65;for(let i=0;i<45;i++){const a=Math.random()*Math.PI*2,s=1.5+Math.random()*5;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,color:colors[Math.floor(Math.random()*colors.length)]})}};
  const timer=setInterval(burst,380);setTimeout(()=>clearInterval(timer),duration);burst();const end=performance.now()+duration;
  function frame(now){ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.99;p.life-=.012;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;if(now<end||particles.length)requestAnimationFrame(frame);else{clearInterval(timer);canvas.classList.remove('show');fireworksRunning=false}}requestAnimationFrame(frame);
}
