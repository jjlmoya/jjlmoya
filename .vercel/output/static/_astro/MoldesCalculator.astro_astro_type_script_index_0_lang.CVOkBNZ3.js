const s={original:{shape:"round",dim1:20,dim2:20},target:{shape:"round",dim1:20,dim2:20},ingredients:[{id:"1",name:"Harina",weight:0},{id:"2",name:"Azúcar",weight:0}],currentFactor:1},n={originalInputs:document.getElementById("original-inputs"),targetInputs:document.getElementById("target-inputs"),resultFactor:document.getElementById("result-factor"),resultText:document.getElementById("result-text"),shapeOriginal:document.getElementById("shape-original"),shapeTarget:document.getElementById("shape-target"),ingredientsList:document.getElementById("ingredients-list"),addIngredientBtn:document.getElementById("add-ingredient-btn")},h=(e,r,t)=>{const a="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide",i="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all";return r==="round"?`
                <div class="input-group">
                    <label class="${a}">Diámetro (cm)</label>
                    <input class="${i}" type="number" value="${t.dim1}" min="1" step="0.5" data-type="${e}" data-key="dim1">
                </div>
            `:r==="square"?`
                <div class="input-group">
                    <label class="${a}">Lado (cm)</label>
                    <input class="${i}" type="number" value="${t.dim1}" min="1" step="0.5" data-type="${e}" data-key="dim1">
                </div>
            `:`
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="${a}">Ancho (cm)</label>
                        <input class="${i}" type="number" value="${t.dim1}" min="1" step="0.5" data-type="${e}" data-key="dim1">
                    </div>
                    <div class="input-group">
                        <label class="${a}">Largo (cm)</label>
                        <input class="${i}" type="number" value="${t.dim2}" min="1" step="0.5" data-type="${e}" data-key="dim2">
                    </div>
                </div>
            `},m=e=>e.shape==="round"?Math.PI*Math.pow(e.dim1/2,2):e.shape==="square"?e.dim1*e.dim1:e.dim1*e.dim2,b=(e,r=5)=>{if(e.shape==="round"){const t=e.dim1/2*r;return`M 0,${-t} A ${t},${t} 0 1,1 0,${t} A ${t},${t} 0 1,1 0,${-t}`}else{const t=e.dim1*r,a=(e.shape==="square"?e.dim1:e.dim2)*r,i=-t/2,d=-a/2;return`M ${i},${d} h ${t} v ${a} h ${-t} Z`}},u=()=>{const e=m(s.original);let t=m(s.target)/e;t=Math.round(t*100)/100,n.resultFactor&&(n.resultFactor.textContent=`x${t.toFixed(2)}`),n.resultText&&(t===1?n.resultText.textContent="Los moldes son equivalentes. Usa las mismas cantidades.":t<1?n.resultText.innerHTML=`Tu molde es más pequeño. <br><span class="text-rose-400 font-bold">Reduce</span> los ingredientes multiplicándolos por <span class="font-bold text-white">${t}</span>.`:n.resultText.innerHTML=`Tu molde es más grande. <br><span class="text-emerald-400 font-bold">Aumenta</span> los ingredientes multiplicándolos por <span class="font-bold text-white">${t}</span>.`);const a=6;n.shapeOriginal&&n.shapeOriginal.setAttribute("d",b(s.original,a)),n.shapeTarget&&n.shapeTarget.setAttribute("d",b(s.target,a)),s.currentFactor=t,l()},l=()=>{n.ingredientsList&&(n.ingredientsList.innerHTML=s.ingredients.map(e=>{const r=Math.round(e.weight*s.currentFactor),t=e.weight>0;return`
                <div class="flex flex-col md:flex-row gap-4 items-start md:items-end p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl group relative border border-slate-100 dark:border-slate-700/50">
                    
                    <div class="w-full md:flex-1 space-y-1.5">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ingrediente</label>
                        <input 
                            type="text" 
                            value="${e.name}" 
                            class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-sm"
                            onchange="updateIngredient('${e.id}', 'name', this.value)"
                            placeholder="Ej. Harina"
                        >
                    </div>

                    <div class="w-full md:w-32 space-y-1.5">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Original</label>
                        <input 
                            type="number" 
                            value="${e.weight||""}" 
                            class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-sm"
                            onchange="updateIngredient('${e.id}', 'weight', parseFloat(this.value))"
                            placeholder="0"
                        >
                    </div>

                    <div class="w-full md:w-32 space-y-1.5">
                        <label class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Final</label>
                        <div class="w-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-lg px-3 py-2.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 h-[42px] flex items-center shadow-sm">
                            ${t?r:"-"}
                        </div>
                    </div>

                    <div class="absolute top-2 right-2 md:static md:h-[42px] md:flex md:items-center">
                        <button 
                            onclick="removeIngredient('${e.id}')"
                            class="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20"
                            title="Eliminar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            `}).join(""))};window.updateIngredient=(e,r,t)=>{const a=s.ingredients.find(i=>i.id===e);a&&(r==="weight"?a.weight=t||0:a.name=t,l())};window.removeIngredient=e=>{s.ingredients=s.ingredients.filter(r=>r.id!==e),l()};const x=()=>{document.querySelectorAll(".shape-btn").forEach(r=>{r.addEventListener("click",t=>{const a=t.currentTarget.dataset.target,i=t.currentTarget.dataset.shape;s[a].shape=i,i==="rectangular"&&s[a].dim2===s[a].dim1&&(s[a].dim2=s[a].dim1+5);const d=["bg-slate-900","dark:bg-white","text-white","dark:text-slate-900","border-transparent","shadow-md","transform","scale-105"],p=["border-slate-200","dark:border-slate-700","text-slate-500","dark:text-slate-400","hover:bg-slate-50","dark:hover:bg-slate-800","hover:border-slate-300","dark:hover:border-slate-600"];document.querySelectorAll(`.shape-btn[data-target="${a}"]`).forEach(c=>{c.classList.remove("active"),c.classList.remove(...d),c.classList.add(...p)});const o=t.currentTarget;o.classList.add("active"),o.classList.remove(...p),o.classList.add(...d),g(a),u()})});const e=r=>{const t=r.target,a=t.dataset.type,i=t.dataset.key;a&&i&&(s[a][i]=parseFloat(t.value)||0,u())};n.originalInputs?.addEventListener("input",e),n.targetInputs?.addEventListener("input",e),n.addIngredientBtn?.addEventListener("click",()=>{const r=Math.random().toString(36).slice(2,11);s.ingredients.push({id:r,name:"",weight:0}),l()})},g=e=>{const r=e==="original"?n.originalInputs:n.targetInputs;r&&(r.innerHTML=h(e,s[e].shape,s[e]))};g("original");g("target");x();u();
