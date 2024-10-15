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