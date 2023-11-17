const obse = new IntersectionObserver((enti) => {
  enti.forEach((enty) => {
    if (enty.isIntersecting) {
      enty.target.classList.add('show')
    } else {
      enty.target.classList.remove('show')
    }
  })
})


const contentText = document.querySelectorAll('.content-right')
contentText.forEach((e) => { obse.observe(e) })
const contentImg = document.querySelectorAll('.content-left')
contentImg.forEach((e) => { obse.observe(e) })







window.addEventListener('scroll', function () {
  var parallax3 = document.getElementById('navbarhead');
  let scrolled = this.window.scrollY;
  parallax3.style.top = - scrolled * 2 + 'px';

});


var favoriteButtons = document.querySelectorAll('.favorite-button');

favoriteButtons.forEach(function (button) {
  var productId = button.dataset.productId; // Lấy giá trị của thuộc tính data-product-id

  // Kiểm tra trạng thái yêu thích từ LocalStorage
  var isFavorite = localStorage.getItem(productId) === 'true';

  updateFavoriteButton(button, isFavorite);

  button.addEventListener('click', function () {
    isFavorite = !isFavorite;
    updateFavoriteButton(button, isFavorite);
    localStorage.setItem(productId, isFavorite);
  });
});

function updateFavoriteButton(button, isFavorite) {
  if (isFavorite) {
    button.innerHTML = "<i class='bx bxs-heart  fs-2'></i>";

  } else {
    button.innerHTML = "<i class='bx bx-heart  fs-2'></i>";

  }
}





var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "application/json",
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if (this.value != "") {
      const result = data.filter(n => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}
