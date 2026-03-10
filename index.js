/* empty css                      */import{a as l}from"./assets/vendor-CzLJ9sAC.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const d="https://your-energy.b.goit.study/api",f=document.querySelector("#exercises-container"),y=document.querySelector("#category-label"),x=document.querySelector("#exercises-breadcrumb-separator"),b=document.querySelector("#search-form"),k=document.querySelector(".filter-list"),w=document.querySelector("#exercises-back-btn"),v=document.querySelector("#pagination-container"),M=document.querySelector(".footer-form");let m="Muscles",h="",S=1;async function T(){try{const e=await l.get(`${d}/quote`),{quote:a,author:t}=e.data,s=document.querySelector("#quote-text"),r=document.querySelector("#quote-author");s&&r&&(s.textContent=a,r.textContent=t)}catch(e){console.error("Помилка завантаження цитати:",e)}}async function g(e="Muscles",a=1){try{m=e,S=a,y.textContent="",y.classList.add("is-hidden"),x.classList.add("is-hidden"),b.classList.add("is-hidden");const t=await l.get(`${d}/filters`,{params:{filter:e,page:a,limit:12}});C(t.data.results),E(t.data.totalPages,a,"filters"),document.querySelectorAll(".filter-btn").forEach(s=>{s.classList.toggle("active",s.dataset.filter===e)})}catch(t){console.error("Помилка завантаження фільтрів:",t)}}function C(e){f.innerHTML=e.map(({filter:a,name:t,imgURL:s})=>`
    <li class="filter-card" data-name="${t}" data-filter="${a}" style="background-image: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url('${s}')">
      <div class="filter-card-content">
        <p class="filter-card-name">${t}</p>
        <p class="filter-card-type">${a}</p>
      </div>
    </li>
  `).join("")}async function $(e,a,t=1,s=""){try{h=a,S=t;const r=e.toLowerCase().replace(" ",""),o={[r==="bodyparts"?"bodypart":r.slice(0,-1)]:a,page:t,limit:10};s&&(o.keyword=s);const i=await l.get(`${d}/exercises`,{params:o});y.textContent=a,y.classList.remove("is-hidden"),x.classList.remove("is-hidden"),b.classList.remove("is-hidden"),P(i.data.results),E(i.data.totalPages,t,"exercises")}catch(r){console.error("Помилка завантаження вправ:",r)}}function P(e){if(e.length===0){f.innerHTML='<p class="no-results">Sorry, no exercises found for your request.</p>';return}f.innerHTML=e.map(({rating:a,name:t,burnedCalories:s,bodyPart:r,target:n,_id:o})=>`
    <li class="exercise-item">
      <div class="exercise-card-top">
        <span class="workout-label">WORKOUT</span>
        <span class="rating">${a.toFixed(1)} ⭐</span>
        <button class="start-btn" data-id="${o}">Start →</button>
      </div>
      <h3 class="exercise-name">${t}</h3>
      <div class="exercise-info">
        <p><span>Burned:</span> ${s} / 3 m</p>
        <p><span>Part:</span> ${r}</p>
        <p><span>Target:</span> ${n}</p>
      </div>
    </li>
  `).join("")}function E(e,a,t){if(e<=1){v.innerHTML="";return}let s="";for(let r=1;r<=e;r++)s+=`<button class="pagination-btn ${r===Number(a)?"active":""}" data-page="${r}" data-type="${t}">${r}</button>`;v.innerHTML=s}async function A(e,a,t,s){try{await l.patch(`${d}/exercises/${e}/rating`,{rate:Number(a),email:t,review:s}),alert("Rating submitted successfully!")}catch(r){const n=r.response?.status;alert(n===409?"You have already rated this exercise.":"Error submitting rating.")}}async function F(e){try{const t=(await l.get(`${d}/exercises/${e}`)).data,s=`
      <div class="modal-overlay is-open" id="modal-overlay">
        <div class="modal-content">
          <button class="modal-close-btn" id="modal-close">✖</button>
          <img src="${t.gifUrl}" alt="${t.name}" class="modal-image">
          <div class="modal-details">
            <h2 class="exercise-name">${t.name}</h2>
            <p class="rating">${t.rating.toFixed(1)} ⭐</p>
            <hr>
            <div class="exercise-info">
              <p><span>Target:</span> ${t.target}</p>
              <p><span>Body Part:</span> ${t.bodyPart}</p>
              <p><span>Equipment:</span> ${t.equipment}</p>
              <p><span>Calories:</span> ${t.burnedCalories} / ${t.time} min</p>
            </div>
            <p class="exercise-description">${t.description}</p>
            <div class="modal-btns">
                <button class="add-fav-btn">Add to favorites ❤️</button>
                <button class="rating-btn">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",s);const r=document.querySelector("#modal-overlay");document.querySelector(".rating-btn").onclick=()=>{const i=`
        <div class="rating-overlay" id="rating-overlay">
          <div class="rating-modal">
            <h3>Rating</h3>
            <p class="rating-value">0.0</p>
            <div class="stars-container">
              ${[1,2,3,4,5].map(c=>`<span class="star" data-value="${c}">☆</span>`).join("")}
            </div>
            <form id="rating-form">
              <input type="email" name="email" placeholder="Email" required />
              <textarea name="comment" placeholder="Your comment" required></textarea>
              <button type="submit" class="submit-rating">Send</button>
              <button type="button" class="close-rating">Cancel</button>
            </form>
          </div>
        </div>
      `;document.body.insertAdjacentHTML("beforeend",i);const p=document.querySelector("#rating-overlay"),L=p.querySelectorAll(".star");let u=0;L.forEach(c=>{c.onclick=()=>{u=c.dataset.value,p.querySelector(".rating-value").textContent=`${u}.0`,L.forEach(q=>q.textContent=q.dataset.value<=u?"★":"☆")}}),document.querySelector("#rating-form").onsubmit=async c=>{if(c.preventDefault(),u===0)return alert("Please select a star rating!");await A(e,u,c.target.email.value,c.target.comment.value),p.remove()},document.querySelector(".close-rating").onclick=()=>p.remove()};const n=()=>{r.remove(),document.removeEventListener("keydown",o)},o=i=>{i.key==="Escape"&&n()};document.querySelector("#modal-close").onclick=n,r.onclick=i=>{i.target===r&&n()},document.addEventListener("keydown",o)}catch(a){console.error(a)}}M?.addEventListener("submit",async e=>{e.preventDefault();const a=e.target.elements[0].value.trim();try{await l.post(`${d}/subscription`,{email:a}),alert("Thank you for subscribing!"),e.target.reset()}catch(t){alert(t.response?.status===409?"Already subscribed.":"Error. Try again.")}});k?.addEventListener("click",e=>{e.target.classList.contains("filter-btn")&&g(e.target.dataset.filter)});w?.addEventListener("click",()=>g(m));f?.addEventListener("click",e=>{const a=e.target.closest(".filter-card");if(a)return $(a.dataset.filter,a.dataset.name);const t=e.target.closest(".start-btn");t&&F(t.dataset.id)});v?.addEventListener("click",e=>{if(!e.target.classList.contains("pagination-btn"))return;const a=e.target.dataset.page;e.target.dataset.type==="filters"?g(m,a):$(m,h,a)});b?.addEventListener("submit",e=>{e.preventDefault(),$(m,h,1,document.querySelector("#search-input").value.trim())});T();g();
//# sourceMappingURL=index.js.map
