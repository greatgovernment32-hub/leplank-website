(function(){
  const root=document.querySelector('[data-gallery-category]');
  if(!root) return;
  const category=root.dataset.galleryCategory;
  const files=category==='all'?['kitchens','closets','timber','bathrooms','offices']:[category];
  const container=document.querySelector('.gallery');
  if(!container) return;
  container.innerHTML='<p class="gallery-loading">Loading projects…</p>';
  Promise.all(files.map(f=>fetch('content/'+f+'.json').then(r=>{if(!r.ok) throw new Error('Could not load '+f); return r.json();})))
    .then(data=>{
      container.innerHTML='';
      data.forEach((page,i)=>{
        (page.projects||[]).forEach((project)=>{
          const fig=document.createElement('figure');
          const img=document.createElement('img');
          img.src=project.image; img.alt=(project.caption||page.title)+' — Le Plank'; img.loading='lazy';
          const cap=document.createElement('figcaption'); cap.textContent=project.caption||page.title;
          fig.append(img,cap); container.appendChild(fig);
        });
      });
      if(!container.children.length) container.innerHTML='<p>No projects have been added yet.</p>';
    })
    .catch(err=>{console.error(err); container.innerHTML='<p>Projects could not be loaded. Please refresh the page.</p>';});
})();
