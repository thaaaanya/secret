const panels=[...document.querySelectorAll('.panel')];
document.getElementById('date-choice').min=new Date().toISOString().split('T')[0];
const show=id=>{panels.forEach(p=>p.classList.remove('active'));document.getElementById(id)?.classList.add('active')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)show(b.dataset.go)});

const zone=document.getElementById('game-zone'),noBtn=document.getElementById('no-btn'),yesBtn=document.getElementById('yes-btn'),tease=document.getElementById('tease');
let escapes=0;
function escapeNo(){
  escapes++; const maxX=Math.max(0,zone.clientWidth-noBtn.offsetWidth-8),maxY=Math.max(0,zone.clientHeight-noBtn.offsetHeight-8);
  noBtn.style.left=`${Math.random()*maxX}px`;noBtn.style.top=`${Math.random()*maxY}px`;noBtn.style.position='absolute';
  yesBtn.style.setProperty('--grow',Math.min(1.55,1+escapes*.08));
  tease.textContent=['Uy, casi 😭','No te deja jiji','El sí se está poniendo celoso','Creo que el botón sabe algo 👀','Loveee, aceptá nomás 💜'][Math.min(escapes-1,4)];
}
noBtn.addEventListener('pointerenter',escapeNo);noBtn.addEventListener('pointerdown',e=>{e.preventDefault();escapeNo()});
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
