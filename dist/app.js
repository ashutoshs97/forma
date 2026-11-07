const campaigns=[
  {
    "title": "The quiet ritual",
    "category": "Beauty",
    "product": "Skincare / Everyday rituals",
    "image": "ritual",
    "description": "Soft window light, honest skin texture, and a familiar morning ritual. A skincare concept grounded in the everyday."
  },
  {
    "title": "Off the clock",
    "category": "Fashion",
    "product": "Eyewear / City moments",
    "image": "eyewear",
    "description": "A coffee break, a passing smile, a favorite pair of sunglasses. An eyewear story with a relaxed, lived-in perspective."
  },
  {
    "title": "Close to home",
    "category": "Lifestyle",
    "product": "Fragrance / Natural light",
    "image": "fragrance",
    "description": "A quiet fragrance portrait in a sunlit apartment. Crisp linen and understated glass keep the product in focus."
  },
  {
    "title": "Everyday gold",
    "category": "Fashion",
    "product": "Jewelry / Personal details",
    "image": "jewelry",
    "description": "Simple gold pieces worn with ease. An intimate portrait celebrating texture, expression, and jewelry that feels personal."
  },
  {
    "title": "On your way",
    "category": "Fashion",
    "product": "Leather goods / Street editorial",
    "image": "bag",
    "description": "A leather shoulder bag, a familiar street, and the pace of an ordinary morning. A campaign concept in motion."
  },
  {
    "title": "At your own pace",
    "category": "Fashion",
    "product": "Footwear / Daily essentials",
    "image": "sneakers",
    "description": "Everyday sneakers in their natural setting. An unhurried moment on the steps, with practical details and easy styling."
  },
  {
    "title": "Slow mornings",
    "category": "Lifestyle",
    "product": "Coffee & ceramics / At home",
    "image": "coffee",
    "description": "Morning coffee at the kitchen table. A lifestyle concept centered on warm ceramic, natural light, and a moment to yourself."
  },
  {
    "title": "A little space",
    "category": "Lifestyle",
    "product": "Audio / Everyday listening",
    "image": "headphones",
    "description": "A pause in the park, a favorite track, a little distance from the noise. An understated personal audio campaign."
  },
  {
    "title": "Out in the open",
    "category": "Beauty",
    "product": "Suncare / Coastal mornings",
    "image": "suncare",
    "description": "An easy morning by the water. A suncare concept with everyday gestures, coastal light, and an uncomplicated approach to skin protection."
  },
  {
    "title": "A touch of rose",
    "category": "Beauty",
    "product": "Lip color / Getting ready",
    "image": "lipcolor",
    "description": "A familiar moment at the dressing table. A subtle color story built around a simple lipstick, soft light, and personal expression."
  },
  {
    "title": "Time, well spent",
    "category": "Fashion",
    "product": "Watches / Daily companions",
    "image": "timepiece",
    "description": "A newspaper, a cafe table, and a watch that goes everywhere. An understated timepiece concept set in the rhythm of an ordinary day."
  },
  {
    "title": "After the last lap",
    "category": "Lifestyle",
    "product": "Hydration / Movement & recovery",
    "image": "hydration",
    "description": "The quiet pause after a run. A reusable bottle campaign centered on movement, recovery, and the small habits that keep us going."
  }
];
const gallery=document.querySelector('#gallery'),dialog=document.querySelector('#campaign-dialog');let selected=0,lastFocus;
function render(filter='all'){gallery.replaceChildren();campaigns.forEach((c,i)=>{if(filter!=='all'&&filter!==c.category)return;const card=document.createElement('button');card.className='campaign';card.setAttribute('aria-label',`View ${c.title} campaign`);card.innerHTML=`<div class="art"><div class="art-image" role="img" aria-label="${c.product}, AI-generated model campaign" style="background-image:url(assets/${c.image}.png)"></div><span class="view" aria-hidden="true">↗</span></div><div class="campaign-meta"><div><h3>${c.title}</h3><p>${c.product}</p></div><span>${String(i+1).padStart(2,'0')} / CONCEPT</span></div>`;card.onclick=()=>{selected=i;updateDialog();openDialog(dialog)};gallery.append(card)})}
function updateDialog(){const c=campaigns[selected];document.querySelector('#dialog-title').textContent=c.title;document.querySelector('#dialog-description').textContent=c.description;const art=document.querySelector('.dialog-art');art.style.backgroundImage=`url(assets/${c.image}.png)`;art.setAttribute('aria-label',c.product+' AI-generated portrait')}
function openDialog(el){lastFocus=document.activeElement;el.showModal();document.body.classList.add('modal-open')}
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').onclick=()=>d.close();d.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastFocus?.focus()});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)});
document.querySelector('#previous').onclick=()=>{selected=(selected+campaigns.length-1)%campaigns.length;updateDialog()};document.querySelector('#next').onclick=()=>{selected=(selected+1)%campaigns.length;updateDialog()};
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')document.querySelector('#previous').click();if(e.key==='ArrowRight')document.querySelector('#next').click()});
document.querySelector('#brief-button').onclick=()=>openDialog(document.querySelector('#brief-dialog'));
document.querySelector('#brief-form').onsubmit=e=>{e.preventDefault();const data=new FormData(e.target);const text=`CAMPAIGN PROJECT BRIEF\n\nName: ${data.get('name')}\nBrand / product: ${data.get('brand')}\n\nCreative idea\n${data.get('idea')}\n`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const link=document.createElement('a');link.href=url;link.download='campaign-project-brief.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('.form-status').textContent='Your brief is ready. Save it and share it with the creator.'};document.querySelector('.section-heading h2 span').textContent='('+String(campaigns.length).padStart(2,'0')+')';document.querySelector('[data-filter="all"] sup').textContent=String(campaigns.length).padStart(2,'0');render();
