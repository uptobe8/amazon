
(function(){
  const menuBtn=document.querySelector('[data-menu]');
  const mobile=document.querySelector('[data-mobile-menu]');
  if(menuBtn&&mobile){menuBtn.addEventListener('click',()=>mobile.classList.toggle('open'))}
  const catBtn=document.querySelector('[data-cat-menu]');
  if(catBtn){catBtn.addEventListener('click',()=>catBtn.parentElement.classList.toggle('open'))}
  document.querySelectorAll('[data-filter]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const filter=btn.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.product-card').forEach(card=>{
        const show=filter==='all'||card.dataset.category===filter;
        card.classList.toggle('hidden',!show);
      });
    });
  });
  const sorter=document.querySelector('[data-sort]');
  if(sorter){sorter.addEventListener('change',()=>{
    const grid=document.querySelector('.product-grid'); if(!grid) return;
    const cards=[...grid.querySelectorAll('.product-card')];
    const val=sorter.value;
    cards.sort((a,b)=>{
      if(val==='score') return Number(b.dataset.score||0)-Number(a.dataset.score||0);
      if(val==='name') return (a.dataset.name||'').localeCompare(b.dataset.name||'');
      return 0;
    }).forEach(c=>grid.appendChild(c));
  })}
  const search=new URLSearchParams(location.search);
  const q=(search.get('q')||'').toLowerCase().trim();
  const cat=(search.get('cat')||'').trim();
  const searchTitle=document.querySelector('[data-search-title]');
  if(searchTitle){searchTitle.textContent=q?`Resultados para “${q}”`:'Resultados de búsqueda'}
  if(q||cat){document.querySelectorAll('.product-card').forEach(card=>{
    const name=card.dataset.name||''; const c=card.dataset.category||'';
    const show=(!q||name.includes(q))&&(!cat||c===cat);
    card.classList.toggle('hidden',!show);
  })}
  document.querySelectorAll('form[data-fake-form]').forEach(form=>{
    form.addEventListener('submit',e=>{e.preventDefault(); form.innerHTML='<div class="notice">Formulario enviado en modo demo local. Conecta aquí tu CRM, email o endpoint real.</div>';});
  });
})();
