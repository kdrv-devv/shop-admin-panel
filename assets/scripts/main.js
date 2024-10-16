document.addEventListener("DOMContentLoaded", function () {
  let hide = document.querySelector(".hide");
  let hideButton = document.querySelector(".category");
  
  hideButton.addEventListener("click", function () {
    hide.classList.toggle("top");
  });
  // FINISH HIDE - OUTPUT



  // START FETCH
  let allCard = document.querySelector(".all-card");
  let adminTodo = document.querySelector(".todo-output");
  console.log(adminTodo);

  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      showData(data); 
    })
    .catch((err) => {
      console.log("Xato:", err);
    });

  function showData(data) {
    data.forEach((element) => {
      allCard.innerHTML += `
          <div class="card">
            <div class="card-top">
              <div class="aksiya">
                <p>Супер цена</p>
              </div>
              <button id="like-card"><i class="fa-regular fa-heart"></i></button>
              <img src="${element.img}" alt="img">
            </div>
            <div class="card-bottom">
              <h5 class="h55">${element.title} JBL Tune 720BT черный</h5>
              <div class="stars-father">
                <div class="star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p>1 отзывов</p>
              </div>
              <h6>${element.price + 700} сум</h6>
              <h3>${element.price} сум</h3>
              <button class="month">${Math.round(
                element.price / 12
              )} сум x 12 мес</button>
              <div class="buy-btns">
                <button id="sel">Купить в один клик</button>
                <button id="cart"><i class="fa-solid fa-cart-shopping"></i></button>
              </div>
            </div>
          </div>
        `;
    });
  }
});
// finish



// start todo output
document.addEventListener("DOMContentLoaded", function () {
  let adminTodo = document.querySelector(".todo-output");

  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      showTodo(data);
    })
    .catch((err) => {
      console.log("Xato:", err);
    });

  function showTodo(val) {
    adminTodo.innerHTML = "";

    val.forEach((element) => {
        
      adminTodo.innerHTML += `
                <tr>
                    <th scope="row">${element.id}</th>
                    <td><img src="${element.img}" alt="Product Image" style="width: 50px; height: auto;"></td>
                    <td>${element.title}</td>
                    <td>${element.price} сум</td>
                    <td class = "functions">
                        <button class="delete-btn" data-id="${element.id}"><i class="fa-solid fa-trash"></i></button> 
                        <button class="edit-btn" data-id="${element.id}"><i class="fa-solid fa-pen"></i></button>
                    </td>
                </tr>
            `;
    });
  }
});
// finish todo output



// admin panel form input start 
let form = document.querySelector(".input-items");
let productName = document.querySelector("#product-name")
let productPrice = document.querySelector("#product-price")


form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const fileInput = form.querySelector("#file-upload");
  const file = fileInput.files[0];  
  
  if (file) {

    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
      const reader = new FileReader();
    let baseImg = ""
      reader.onload = function(e) {

        baseImg = e.target.result
        
        fetch("http://localhost:3000/products",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                id:Date.now(),
                title:productName.value,
                price:productPrice.value,
                category:"hechnima",
                img: baseImg


            })

        })
        .then((data)=>console.log(data))
        .catch((err)=> console.log("Error",err))

        
      };
      reader.readAsDataURL(file)
      
    } else {
      console.log("Fayl turi rasm emas.");
    }
  } else {
    console.log("Hech qanday fayl yuklanmagan.");
  }
});

// admin panel form input finish 


adminTodo.addEventListener("click", function(e) {
    console.log(e.target.closest(".delete-btn"));
    
    if (e.target.closest(".delete-btn")) {
      const productId = e.target.closest(".delete-btn").getAttribute("data-id");
      deleteProduct(productId);
    }
  });


function deleteProduct(productId) {
    console.log(productId);
    
  fetch(`http://localhost:3000/products/${productId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Xato: Ma\'lumot o\'chirishda xatolik yuz berdi');
      }
      return response.json();
    })
    .then(() => {
      console.log('Ma\'lumot o\'chirildi');
      adminTodo.innerHTML = "";
      fetchProducts();
    })
    .catch(error => {
      console.error('Xato:', error);
    });
}

function fetchProducts() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        showTodo(data);
      })
      .catch((err) => {
        console.log("Xato:", err);
      });
}
// delete finish 

