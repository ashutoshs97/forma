const productItems=window.productCampaigns;
const productTypes=['All products','Sarees','Purses','Crop tops','Tops','Bottoms','Kurtas','Beauty','Eyewear','Jewelry','Footwear','Fragrance','Watches','Audio','Home & drinkware'];
let chosenProduct='All products',chosenGender='All',visibleProducts=[],detailIndex=0,returnFocus;
const productGrid=document.querySelector('#product-gallery'),productDialog=document.querySelector('#product-dialog');
function matchesAudience(item){return chosenGender==='All'||item.gender===chosenGender}
function readProductQuery(){const query=new URLSearchParams(location.search);chosenProduct=productTypes.includes(query.get('product'))?query.get('product'):'All products';chosenGender=['All','Women','Men','Unisex'].includes(query.get('gender'))?query.get('gender'):'All'}
function saveProductQuery(){const query=new URLSearchParams();if(chosenProduct!=='All products')query.set('product',chosenProduct);if(chosenGender!=='All')query.set('gender',chosenGender);try{history.replaceState(null,'',location.pathname+(query.size?'?'+query:'')+location.hash)}catch{}}
function renderProducts(){
 visibleProducts=productItems.filter(item=>matchesAudience(item)&&(chosenProduct==='All products'||item.type===chosenProduct));
 const filterBox=document.querySelector('#product-filters');filterBox.replaceChildren();
 for(const type of productTypes){const count=productItems.filter(item=>matchesAudience(item)&&(type==='All products'||item.type===type)).length;const button=document.createElement('button');button.className='product-type'+(type===chosenProduct?' active':'');button.setAttribute('aria-pressed',String(type===chosenProduct));button.innerHTML=`${type}<span>${String(count).padStart(2,'0')}</span>`;button.onclick=()=>{chosenProduct=type;renderProducts();filterBox.querySelector('.active')?.focus();saveProductQuery()};filterBox.append(button)}
 document.querySelectorAll('[data-gender]').forEach(button=>{button.classList.toggle('active',button.dataset.gender===chosenGender);button.setAttribute('aria-pressed',String(button.dataset.gender===chosenGender))});
 document.querySelector('#collection-title').textContent=chosenProduct;
 document.querySelector('#result-status').textContent=`${visibleProducts.length} ${visibleProducts.length===1?'image':'images'}${chosenGender==='All'?' · All audiences':' · '+chosenGender}`;
 document.querySelector('#empty-state').hidden=visibleProducts.length>0;
 productGrid.replaceChildren();
 for(const [index,item] of visibleProducts.entries()){const card=document.createElement('button');card.className='product-card';card.setAttribute('aria-label',`View ${item.title}, ${item.type}, ${item.gender}`);card.innerHTML=`<div class="photo"><img src="assets/${item.image}.png" alt="${item.product}, ${item.gender.toLowerCase()} campaign concept" loading="lazy" decoding="async"><span class="view" aria-hidden="true">↗</span></div><h3>${item.title}</h3><div class="product-meta"><span>${item.type}</span><span>${item.gender}</span></div>`;card.onclick=()=>{returnFocus=card;detailIndex=index;updateProductDetail();productDialog.showModal();document.body.classList.add('modal-open')};productGrid.append(card)}
}
function updateProductDetail(){const item=visibleProducts[detailIndex];document.querySelector('#product-title').textContent=item.title;document.querySelector('#detail-category').textContent=item.type.toUpperCase()+' / '+item.gender.toUpperCase();document.querySelector('#detail-description').textContent=item.description;const image=document.querySelector('#detail-image');image.src='assets/'+item.image+'.png';image.alt=item.product+' — AI-generated campaign concept';document.querySelector('#detail-counter').textContent=`${detailIndex+1} / ${visibleProducts.length}`;document.querySelector('#product-previous').disabled=visibleProducts.length<2;document.querySelector('#product-next').disabled=visibleProducts.length<2}
function moveProductDetail(amount){if(!visibleProducts.length)return;detailIndex=(detailIndex+amount+visibleProducts.length)%visibleProducts.length;updateProductDetail()}
function resetProducts(){chosenProduct='All products';chosenGender='All';renderProducts();saveProductQuery()}
document.querySelectorAll('[data-gender]').forEach(button=>button.onclick=()=>{chosenGender=button.dataset.gender;renderProducts();saveProductQuery()});
document.querySelector('#reset-filters').onclick=resetProducts;document.querySelector('#show-all').onclick=resetProducts;
document.querySelector('#product-previous').onclick=()=>moveProductDetail(-1);document.querySelector('#product-next').onclick=()=>moveProductDetail(1);
productDialog.querySelector('.close').onclick=()=>productDialog.close();
productDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus()});
productDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')moveProductDetail(-1);if(event.key==='ArrowRight')moveProductDetail(1)});
productDialog.addEventListener('click',event=>{if(event.target===productDialog){const bounds=productDialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)productDialog.close()}});
addEventListener('popstate',()=>{readProductQuery();renderProducts()});readProductQuery();renderProducts();
