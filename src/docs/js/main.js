console.log("Script cargado correctamente");document.addEventListener("DOMContentLoaded",function(){console.log("DOM completamente cargado y parseado");const l=document.querySelector(".js-search"),a=document.querySelector(".js-btn-search"),i=document.querySelector(".js-btn-reset"),d=document.querySelector(".js-eliminar-fav"),c=document.querySelector(".js-container-result"),r=document.querySelector(".js-container-selected-fav");if(console.log("Elementos en el DOM:"),console.log("Input:",l),console.log("Botón de búsqueda:",a),console.log("Botón de reset:",i),console.log("Botón eliminar favoritos:",d),console.log("Contenedor de resultados:",c),console.log("Contenedor de favoritos:",r),console.log(document.querySelector(".js-search")),console.log(document.querySelector(".js-btn-search")),console.log(document.querySelector(".js-btn-reset")),console.log(document.querySelector(".js-eliminar-fav")),console.log(document.querySelector(".js-container-result")),console.log(document.querySelector(".js-container-selected-fav")),!l||!a||!i||!d||!c||!r){console.error("Uno o más elementos del DOM no se encontraron. Verifica los nombres de clase en index.html.");return}let f="https://api.jikan.moe/v4/anime?q=",m=[],t=[];d.addEventListener("click",()=>{t=[],r.innerHTML="",localStorage.setItem("favAnimeServer",JSON.stringify(t))}),i.addEventListener("click",()=>{l.value="",r.innerHTML="",c.innerHTML=""}),console.log("Todos los elementos fueron encontrados correctamente."),a.addEventListener("click",e=>{e.preventDefault();const s=l.value.toLowerCase();fetch(f+s).then(o=>o.json()).then(o=>{m=o.data,c.innerHTML=m.map(n=>`<div>
                        <img class="js-anime" src="${n.images.jpg.image_url}" alt="${n.title}" id="${n.mal_id}" />
                        <p>${n.title}</p>
                    </div>`).join(""),S()})});function S(){document.querySelectorAll(".js-anime").forEach(e=>{e.addEventListener("click",s=>{const o=parseInt(s.target.id),n=m.find(g=>g.mal_id===o);t.some(g=>g.mal_id===o)||(t.push(n),u())})})}function u(){r.innerHTML=t.map(e=>`<div>
                <img src="${e.images.jpg.image_url}" alt="${e.title}" />
                <p>${e.title}</p>
                <button class="remove-fav" data-id="${e.mal_id}">X</button>
            </div>`).join(""),document.querySelectorAll(".remove-fav").forEach(e=>{e.addEventListener("click",s=>{const o=parseInt(s.target.dataset.id);t=t.filter(n=>n.mal_id!==o),u()})}),localStorage.setItem("favAnimeServer",JSON.stringify(t))}const v=localStorage.getItem("favAnimeServer");v&&(t=JSON.parse(v),u())});
//# sourceMappingURL=main.js.map
