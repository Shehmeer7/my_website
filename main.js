// Main JS: products rendering, modal, side drawer, scroll offset and reveal animations (slide-up)
document.addEventListener('DOMContentLoaded', function(){
// ------ PRODUCTS DATA ------
const books = [
  { id: 1, title: "Functional Training", price: 20, image: "images/1.jpg" },
  { id: 2, title: "Functional Biology", price: 25, image: "images/2.jpg" },
  { id: 3, title: "The bike guy", price: 15, image: "images/3.jpg" },
  { id: 4, title: "Win-Win strategy", price: 18, image: "images/4.jpg" },
  { id: 5, title: "Computer whiz", price: 22, image: "images/5.jpg" },
  { id: 6, title: "Item Book", price: 30, image: "images/6.jpg" },
  { id: 7, title: "Show case", price: 14, image: "images/7.jpg" },
  { id: 8, title: "Power less", price: 12, image: "images/8.jpg" }
];

const productList = document.getElementById("productList");
const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");

// ------ RENDER PRODUCTS ------
function renderProducts(data) {
  productList.innerHTML = "";
  data.forEach(book => {
    const product = document.createElement("div");
    product.classList.add("product-item");
    product.innerHTML = `
      <img src="${book.image}" data-id="${book.id}" class="product-img">
      <h3>${book.title}</h3>
      <p>$${book.price}</p>
    `;
    productList.appendChild(product);
  });
  attachModalEvents();
}
renderProducts(books);

// ------ SEARCH FILTER ------
searchBox.addEventListener("keyup", () => {
  const keyword = searchBox.value.toLowerCase();
  const filtered = books.filter(b => b.title.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

// ------ SORT FUNCTION ------
sortSelect.addEventListener("change", () => {
  const sorted = [...books];
  if (sortSelect.value === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderProducts(sorted);
});

// ------ MODAL FUNCTIONALITY ------
const modal = document.getElementById("bookModal");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.querySelector(".close-modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");

function attachModalEvents() {
  const productImages = document.querySelectorAll(".product-img");
  productImages.forEach(img => {
    img.addEventListener("click", () => {
      const id = img.getAttribute("data-id");
      const book = books.find(b => b.id == id);
      modalImage.src = book.image;
      modalTitle.textContent = book.title;
      modalPrice.textContent = "$" + book.price;
      modal.classList.add("active");
      overlay.classList.add("active");
    });
  });
}

// ------ CLOSE MODAL ------
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
  /* ---------- Side Drawer (mobile) ---------- */
  menuToggle.addEventListener('click', function(){
    const open = sideDrawer.classList.toggle('open');
    drawerOverlay.classList.toggle('visible', open);
    sideDrawer.setAttribute('aria-hidden', !open);
    this.setAttribute('aria-expanded', open);
  });
  closeDrawer.addEventListener('click', function(){
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('visible');
    sideDrawer.setAttribute('aria-hidden','true');
    menuToggle.setAttribute('aria-expanded','false');
  });
  drawerOverlay.addEventListener('click', function(){
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('visible');
    sideDrawer.setAttribute('aria-hidden','true');
    menuToggle.setAttribute('aria-expanded','false');
  });
  const USERID = {
    name: null,
    identity: null,
    image: null,
    message: null,
    date: null
}

const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");
const userName = document.querySelector(".user");
const notify = document.querySelector(".notifyinput");

    userComment.addEventListener("input", e => {
        if(!userComment.value) {
            publishBtn.setAttribute("disabled", "disabled");
            publishBtn.classList.remove("abled")
        }else {
            publishBtn.removeAttribute("disabled");
            publishBtn.classList.add("abled")
        }
    })

    function addPost() {
        if(!userComment.value) return;
        USERID.name = userName.value;
        if(USERID.name === "Anonymous") {
            USERID.identity = false;
            USERID.image = "anonymous.png"
        }else {
            USERID.identity = true;
            USERID.image = "user.png"
        }

        USERID.message = userComment.value;
        USERID.date = new Date().toLocaleString();
        let published = 
        `<div class="parents">
            <img src="${USERID.image}">
            <div>
                <h1>${USERID.name}</h1>
                <p>${USERID.message}</p>
                <div class="engagements"><img src="like.png" id="like"><img src="share.png" alt=""></div>
                <span class="date">${USERID.date}</span>
            </div>    
        </div>`

        comments.innerHTML += published;
        userComment.value = "";
        publishBtn.classList.remove("abled")

        let commentsNum = document.querySelectorAll(".parents").length;
        document.getElementById("comment").textContent = commentsNum;

    }

    publishBtn.addEventListener("click", addPost);
  // close drawer when link clicked
  document.querySelectorAll('.drawer-link').forEach(l=>{
    l.addEventListener('click', ()=>{
      sideDrawer.classList.remove('open');
      drawerOverlay.classList.remove('visible');
      sideDrawer.setAttribute('aria-hidden','true');
      menuToggle.setAttribute('aria-expanded','false');
    });
  });

  /* ---------- Anchor scroll offset for fixed header ---------- */
  const header = document.querySelector('.navbar');
  const headerHeight = header ? header.offsetHeight : 84;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href.length===1) return;
      const target = document.querySelector(href);
      if(!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Reveal on scroll (slide-up) ---------- */
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  /* ---------- Scroll spy (active nav) ---------- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  window.addEventListener('scroll', function(){
    const pos = window.scrollY + headerHeight + 20;
    for(let i=sections.length-1;i>=0;i--){
      if(sections[i].offsetTop <= pos){
        document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
        const a = document.querySelector('.nav-link[href="#'+sections[i].id+'"]');
        if(a) a.classList.add('active');
        break;
      }
    }
  });
});
