const v=document.getElementById("media-input"),i=document.getElementById("media-display"),l=document.getElementById("safe-overlay"),r=document.getElementById("opacity-slider"),m=document.getElementById("opacity-val"),s=document.getElementById("toggle-mask"),c=document.getElementById("mask-overlay"),n=document.getElementById("toggle-grid"),a=document.getElementById("grid-overlay"),y=document.getElementById("reset-preview"),u=document.querySelectorAll(".platform-btn"),h=document.getElementById("platform-banner"),g=document.getElementById("status-time");let o="tiktok";function b(){const t=new Date;g&&(g.textContent=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}setInterval(b,1e3);b();const w={tiktok:`
            <div class="absolute top-4 left-0 w-full flex justify-between px-6 items-center">
                <iconify-icon icon="mdi:live-tv" class="text-2xl text-white"></iconify-icon>
                <div class="flex gap-4 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                    <span>Siguiendo</span>
                    <span class="text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-[2px] after:bg-white">Para ti</span>
                </div>
                <iconify-icon icon="mdi:magnify" class="text-2xl text-white"></iconify-icon>
            </div>
            
            <div class="absolute right-3 bottom-24 flex flex-col gap-5 items-center">
                <div class="w-11 h-11 rounded-full border-2 border-white relative bg-zinc-800 shadow-lg">
                    <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-rose-500 rounded-full w-4 h-4 flex items-center justify-center text-[12px] font-bold text-white shadow-md">+</div>
                </div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:heart-fill" class="text-4xl text-white"></iconify-icon><span class="text-[10px] text-white font-bold drop-shadow-md">1.2M</span></div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:chat-circle-dots-fill" class="text-4xl text-white"></iconify-icon><span class="text-[10px] text-white font-bold drop-shadow-md">4,890</span></div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:bookmark-simple-fill" class="text-4xl text-white"></iconify-icon><span class="text-[10px] text-white font-bold drop-shadow-md">250K</span></div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:share-fat-fill" class="text-4xl text-white"></iconify-icon><span class="text-[10px] text-white font-bold drop-shadow-md">45.2K</span></div>
                <div class="w-10 h-10 rounded-full bg-zinc-900 mt-2 border-8 border-zinc-800 border-t-zinc-700 animate-[spin_3s_linear_infinite] shadow-lg"></div>
            </div>
            
            <div class="absolute left-4 bottom-14 right-16 space-y-2.5">
                <div class="font-bold text-white text-[15px] flex items-center gap-1.5">jjlmoya <iconify-icon icon="mdi:check-decagram" class="text-blue-400 text-xs"></iconify-icon></div>
                <div class="text-white/95 text-[13px] leading-tight line-clamp-2 pr-4">Diseño de interfaces reales para creadores de contenido que buscan la perfección visual. #uxdesign #socialmedia #creators</div>
                <div class="flex items-center gap-2 text-white/90 text-[11px] px-3 py-1 bg-black/30 rounded-full backdrop-blur-md w-fit border border-white/10">
                    <iconify-icon icon="mdi:music" class="animate-pulse"></iconify-icon>
                    <span>jjlmoya - Sonido Original - jjlmoya</span>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full h-[52px] bg-black border-t border-white/5 flex items-center justify-around px-2 pb-1 text-white/60">
                <div class="flex flex-col items-center gap-0.5 text-white active:scale-90 transition-transform"><iconify-icon icon="ph:house-fill" class="text-2xl"></iconify-icon><span class="text-[8px] font-bold">Inicio</span></div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:users" class="text-2xl"></iconify-icon><span class="text-[8px] font-bold">Amigos</span></div>
                <div class="w-11 h-7 bg-white rounded-lg flex items-center justify-center relative"><div class="absolute -left-1 w-full h-full bg-[#00f2ea] rounded-lg -z-10"></div><div class="absolute -right-1 w-full h-full bg-rose-500 rounded-lg -z-10"></div><iconify-icon icon="mdi:plus" class="text-black text-2xl"></iconify-icon></div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:chat-dots" class="text-2xl"></iconify-icon><span class="text-[8px] font-bold">Bandeja de entrada</span></div>
                <div class="flex flex-col items-center gap-0.5"><iconify-icon icon="ph:user" class="text-2xl"></iconify-icon><span class="text-[8px] font-bold">Perfil</span></div>
            </div>
        `,reels:`
            <div class="absolute top-8 left-6 text-white text-2xl font-bold flex items-center gap-1">Reels <iconify-icon icon="mdi:chevron-down"></iconify-icon></div>
            <div class="absolute top-8 right-6 text-white text-2xl transition-transform hover:scale-110"><iconify-icon icon="mdi:camera-outline"></iconify-icon></div>
            
            <div class="absolute right-4 bottom-14 flex flex-col gap-6 items-center">
                <div class="flex flex-col items-center gap-1"><iconify-icon icon="ph:heart" class="text-3xl text-white"></iconify-icon><span class="text-[10px] text-white font-medium">102K</span></div>
                <div class="flex flex-col items-center gap-1"><iconify-icon icon="ph:chat-circle" class="text-3xl text-white"></iconify-icon><span class="text-[10px] text-white font-medium">1,245</span></div>
                <div class="flex flex-col items-center gap-1"><iconify-icon icon="ph:paper-plane-tilt" class="text-3xl text-white"></iconify-icon></div>
                <iconify-icon icon="ph:dots-three-vertical-bold" class="text-2xl text-white"></iconify-icon>
                <div class="w-7 h-7 rounded border-2 border-white overflow-hidden"><div class="w-full h-full bg-slate-800"></div></div>
            </div>

            <div class="absolute left-4 bottom-6 right-16 space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 p-[2px] shadow-lg shadow-rose-500/20"><div class="w-full h-full rounded-full bg-black"></div></div>
                    <span class="font-bold text-white text-[13px] tracking-tight">jjlmoya</span>
                    <button class="px-3 py-1 border-2 border-white/50 rounded-lg text-[11px] font-bold text-white bg-white/5 backdrop-blur-sm active:scale-95 transition-all">Seguir</button>
                </div>
                <div class="text-white text-[13px] leading-tight line-clamp-1 opacity-95">Esta interfaz de Instagram es idéntica a la real. ¿A que sí? 🔥 #reels #ux #simulador</div>
                <div class="flex items-center gap-2 text-white/90 text-[10px] font-medium max-w-[150px] truncate">
                    <iconify-icon icon="mdi:music-note"></iconify-icon>
                    <span>Música Tendencia - Original Audio</span>
                </div>
            </div>
            
            <div class="absolute bottom-0 left-0 w-full h-[52px] bg-black border-t border-white/5 flex items-center justify-around text-white">
                 <iconify-icon icon="ph:house-fill" class="text-2xl opacity-40"></iconify-icon>
                 <iconify-icon icon="ph:magnifying-glass-bold" class="text-2xl opacity-40"></iconify-icon>
                 <iconify-icon icon="ph:plus-square-bold" class="text-2xl opacity-40"></iconify-icon>
                 <iconify-icon icon="ph:video-bold" class="text-3xl"></iconify-icon>
                 <iconify-icon icon="ph:user-circle-bold" class="text-2xl opacity-40"></iconify-icon>
            </div>
        `,shorts:`
             <div class="absolute top-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-full px-4 justify-between">
                <iconify-icon icon="mdi:arrow-left" class="text-3xl text-white"></iconify-icon>
                <div class="flex gap-6 items-center">
                    <iconify-icon icon="mdi:magnify" class="text-3xl text-white"></iconify-icon>
                    <iconify-icon icon="mdi:dots-vertical" class="text-3xl text-white"></iconify-icon>
                </div>
            </div>

            <div class="absolute right-2 bottom-20 flex flex-col gap-6 items-center group">
                <div class="flex flex-col items-center"><div class="p-3 bg-white/10 rounded-full backdrop-blur-sm active:bg-white/20 transition-all"><iconify-icon icon="ph:thumbs-up-fill" class="text-3xl text-white"></iconify-icon></div><span class="text-[10px] text-white font-bold mt-1 shadow-md">1.2M</span></div>
                <div class="flex flex-col items-center"><div class="p-3 bg-white/10 rounded-full backdrop-blur-sm active:bg-white/20 transition-all"><iconify-icon icon="ph:thumbs-down-fill" class="text-3xl text-white"></iconify-icon></div><span class="text-[10px] text-white font-bold mt-1 shadow-md">No me gusta</span></div>
                <div class="flex flex-col items-center"><div class="p-3 bg-white/10 rounded-full backdrop-blur-sm active:bg-white/20 transition-all"><iconify-icon icon="ph:chat-text-fill" class="text-3xl text-white"></iconify-icon></div><span class="text-[10px] text-white font-bold mt-1 shadow-md">34K</span></div>
                <div class="flex flex-col items-center"><div class="p-3 bg-white/10 rounded-full backdrop-blur-sm active:bg-white/20 transition-all"><iconify-icon icon="ph:share-fat-fill" class="text-3xl text-white"></iconify-icon></div><span class="text-[10px] text-white font-bold mt-1 shadow-md">Compartir</span></div>
                <div class="flex flex-col items-center"><div class="p-3 bg-white/10 rounded-full backdrop-blur-sm active:bg-white/20 transition-all"><iconify-icon icon="ph:arrows-clockwise-bold" class="text-3xl text-white"></iconify-icon></div><span class="text-[10px] text-white font-bold mt-1 shadow-md">Remix</span></div>
                <div class="w-11 h-11 rounded-xl bg-slate-800 border-2 border-white/10 overflow-hidden shadow-lg shadow-black/40"></div>
            </div>

            <div class="absolute left-4 bottom-8 right-20 space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-rose-600 shadow-xl border border-white/20"></div>
                    <span class="text-white font-black text-sm drop-shadow-lg">@jjlmoya</span>
                    <button class="bg-white text-black px-4 py-1.5 rounded-full text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all">SUSCRIBIRSE</button>
                </div>
                <div class="text-white text-[15px] font-bold line-clamp-2 leading-tight drop-shadow-lg">¡Simulando interfaces reales para Shorts! #youtube #youtubeshorts #simulador</div>
                <div class="flex items-center gap-2">
                    <div class="bg-white/10 px-3 py-1 rounded flex items-center gap-2 backdrop-blur-sm"><iconify-icon icon="mdi:flash" class="text-white animate-bounce"></iconify-icon><span class="text-white text-[11px] font-bold">SHORT</span></div>
                </div>
            </div>
        `};function f(){l&&(l.innerHTML=w[o],l.style.opacity=(parseInt(r.value)/100).toString(),h&&(h.textContent=`Simulando ${o==="tiktok"?"TikTok":o==="reels"?"Instagram Reels":"YouTube Shorts"} 9:16`))}u.forEach(t=>{t.addEventListener("click",()=>{o=t.getAttribute("data-platform")||"tiktok",u.forEach(e=>{e.classList.remove("border-indigo-500","bg-indigo-500/10","ring-2","ring-indigo-500/20"),e.querySelector("iconify-icon")?.classList.remove("text-indigo-500")}),t.classList.add("border-indigo-500","bg-indigo-500/10","ring-2","ring-indigo-500/20"),t.querySelector("iconify-icon")?.classList.add("text-indigo-500"),f()})});v?.addEventListener("change",t=>{const e=t.target.files[0];if(!e||!i)return;const x=new FileReader;x.onload=p=>{e.type.startsWith("video/")?i.innerHTML=`<video src="${p.target.result}" autoplay loop muted class="w-full h-full object-cover"></video>`:i.innerHTML=`<img src="${p.target.result}" class="w-full h-full object-cover" />`},x.readAsDataURL(e)});r?.addEventListener("input",()=>{m&&(m.textContent=`${r.value}%`),f()});s?.addEventListener("change",()=>{c&&(c.classList.toggle("translate-y-0",s.checked),c.classList.toggle("translate-y-full",!s.checked))});n?.addEventListener("change",()=>{a&&(a.classList.toggle("opacity-100",n.checked),a.classList.toggle("opacity-0",!n.checked))});y?.addEventListener("click",()=>{i&&(i.innerHTML=`
                <div class="text-slate-800 dark:text-slate-200 text-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <iconify-icon icon="mdi:camera-plus-outline" class="text-7xl mb-4 block mx-auto"></iconify-icon>
                    <p class="text-[10px] font-black uppercase tracking-[0.3em]">Carga tu contenido</p>
                    <p class="text-[9px] mt-2 opacity-50 underline cursor-pointer hover:text-indigo-500" onclick="document.getElementById('media-input').click()">O usa un ejemplo</p>
                </div>`),v.value=""});const d=document.querySelector('[data-platform="tiktok"]');d&&(d.classList.add("border-indigo-500","bg-indigo-500/10","ring-2","ring-indigo-500/20"),d.querySelector("iconify-icon")?.classList.add("text-indigo-500"));f();
