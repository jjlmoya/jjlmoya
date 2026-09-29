import{B as u,T}from"./textiles.WjrBOZpa.js";let n=[...u];const r=["flame","odor","residue","smoke"],p=document.getElementById("question-view"),g=document.getElementById("result-view"),l=document.getElementById("question-title"),c=document.getElementById("options-grid"),f=document.getElementById("step-indicator"),x=document.getElementById("progress-bar"),a=document.getElementById("reset-btn"),h=document.getElementById("result-name"),m=document.getElementById("result-icon-container"),k=document.getElementById("result-desc"),B={flame:"¿Comportamiento ante la llama?",odor:"¿Olor característico?",residue:"¿Residuo final?",smoke:"¿Tipo de humo?"};function w(){n=[...u],a&&a.classList.add("hidden"),g&&g.classList.add("hidden"),p&&p.classList.remove("hidden"),I(),b(0)}function S(){if(n.length===u.length)return r[0];for(let e=0;e<r.length;e++){const t=r[e];if(new Set(n.map(i=>i[t])).size>1)return t}return null}function I(){if(n.length===1){y(n[0]);return}const e=S();if(!e){y(n[0]);return}l&&(l.style.opacity="0",setTimeout(()=>{l.textContent=B[e],l.style.opacity="1"},300));const t=r.indexOf(e);f&&(f.textContent=`PASO ${t+1}`),c&&(c.innerHTML="",[...new Set(n.map(d=>d[e]))].forEach((d,L)=>{const o=document.createElement("button");o.className="group relative w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 overflow-hidden flex items-center md:items-start gap-4 active:scale-[0.98] transform cursor-pointer",o.style.animation=`fade-in-up 0.5s ease-out forwards ${L*.1}s`,o.style.opacity="0",o.innerHTML=`
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                    <div class="mt-0.5 w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-indigo-500 flex items-center justify-center shrink-0 transition-colors bg-white dark:bg-slate-800">
                        <div class="w-3 h-3 rounded-full bg-indigo-500 opacity-0 transition-opacity duration-200 check-dot"></div>
                    </div>
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-900 dark:group-hover:text-white leading-snug transition-colors pointer-events-none text-left flex-1">${d}</span>
                `,o.onclick=()=>{c.querySelectorAll(".check-dot").forEach(E=>E.classList.remove("opacity-100"));const v=o.querySelector(".check-dot");v&&v.classList.add("opacity-100"),setTimeout(()=>q(e,d),250)},c.appendChild(o)})),n.length<u.length?a?.classList.remove("hidden"):a?.classList.add("hidden");const s=r.indexOf(e);b(s/r.length*100)}function q(e,t){n=n.filter(s=>s[e]===t),I()}function y(e){const t=T[e.fiberId];if(!t)return;p?.classList.add("hidden"),g?.classList.remove("hidden"),a?.classList.remove("hidden"),b(100),f.textContent="ANÁLISIS COMPLETADO",h&&(h.textContent=t.name),k&&(k.innerHTML=`
                <div class="flex flex-col gap-6 text-left">
                    <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-b border-slate-200 dark:border-slate-700 pb-4">
                        Muestra identificada positivamente como <strong class="text-indigo-600 dark:text-indigo-400">${t.name}</strong>.
                    </p>
                    
                    <div class="space-y-4">
                        <div class="relative pl-4 border-l-2 border-orange-400">
                            <span class="block text-[10px] uppercase font-black text-slate-400 mb-1 tracking-wider">Comportamiento Llama</span>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug block">${e.flame}</span>
                        </div>
                        
                        <div class="relative pl-4 border-l-2 border-indigo-400">
                            <span class="block text-[10px] uppercase font-black text-slate-400 mb-1 tracking-wider">Rastro Olfativo</span>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug block">${e.odor}</span>
                        </div>
                         <div class="relative pl-4 border-l-2 border-slate-400">
                            <span class="block text-[10px] uppercase font-black text-slate-400 mb-1 tracking-wider">Residuo</span>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug block">${e.residue}</span>
                        </div>
                    </div>
                </div>
            `);const s=document.getElementById(`icon-cache-${e.fiberId}`);if(s&&m){m.innerHTML=s.innerHTML;const i=m.querySelector("svg");i&&(i.style.width="1em",i.style.height="1em")}}function b(e){x&&(x.style.width=`${e}%`)}a?.addEventListener("click",w);setTimeout(w,100);
