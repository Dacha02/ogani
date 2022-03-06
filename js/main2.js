var nizProizvodi = [];
//Window on load
$(window).load(function () {
  function ajaxBekKol(nazivfajla, rezultat) {
    $.ajax({
      url: "./data/" + nazivfajla,
      method: "get",
      dataType: "json",
      success: function (data) {
        rezultat(data);
      },
      error: function (xhr, error, status) {
        console.log(xhr);
        console.log(error);
        console.log(status);
      },
    });
  }

  //Uzimanje url adrese
  let url = $(location).attr("pathname");
  url = url.substr(url.lastIndexOf("/"), url.length);

  ajaxBekKol("menu.json", function (rezultat) {
    if (url === "/index.html" || url === "/") {
      ispisMenija(rezultat, 1);
    } else if (url === "/shop-grid.html") {
      ispisMenija(rezultat, 2);
    } else if (url === "/contact.html") {
      ispisMenija(rezultat, 3);
    } else if (
      url === "/shop-details.html" ||
      url === "/shoping-cart.html" ||
      url === "/checkout.html"
    ) {
      ispisMenija(rezultat, 2);
    }
  });

  function ispisMenija(niz, index) {
    let html = `<ul>`;
    niz.forEach((element) => {
      if (element.id === index) {
        html += `<li class="active"><a href="${element.src}">${element.name}</a></li>`;
      } else {
        html += `<li><a href="${element.src}">${element.name}</a></li>`;
      }
    });
    html += `</ul>`;
    $(".header__menu").html(html);
    $(".humberger__menu__nav").html(html);
    $(".footerMenu").html(html);

    $(".mobile-menu").slicknav({
      prependTo: "#mobile-menu-wrap",
      allowParentLinks: true,
    });
  }

  //Funkcija za setovanje pozadinske slike
  function setujPozadinu() {
    $(".set-bg").each(function () {
      var bg = $(this).data("setbg");
      $(this).css("background-image", "url(" + bg + ")");
      /* $(this).css("background-size", "contain");
            $(this).css("background-repeat", "no-repeat"); */
      $(this).css("background-position", "center");
    });
  }

  //Funkcija za slider carousel
  function initializeCarousel() {
    $(".categories__slider").trigger("destroy.owl.carousel"); //these 3 lines kill the owl, and returns the markup to the initial state
    $(".categories__slider").find(".owl-stage-outer").children().unwrap();
    $(".categories__slider").removeClass(
      "owl-center owl-loaded owl-text-select-on"
    );
    /*-----------------------
            Categories Slider
        ------------------------*/

    $(".categories__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 4,
      dots: false,
      nav: true,
      navText: [
        "<span class='fa fa-angle-left'><span/>",
        "<span class='fa fa-angle-right'><span/>",
      ],
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },

        480: {
          items: 2,
        },

        768: {
          items: 3,
        },

        992: {
          items: 4,
        },
      },
    }); //re-initialise the owl
  }

  function initialzeProductDiscountSlider() {
    $(".product__discount__slider").trigger("destroy.owl.carousel"); //these 3 lines kill the owl, and returns the markup to the initial state
    $(".product__discount__slider")
      .find(".owl-stage-outer")
      .children()
      .unwrap();
    $(".product__discount__slider").removeClass(
      "owl-center owl-loaded owl-text-select-on"
    );
    /*-----------------------------
            Product Discount Slider
        -------------------------------*/

    $(".product__discount__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 3,
      dots: true,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
      responsive: {
        320: {
          items: 1,
        },

        480: {
          items: 2,
        },

        768: {
          items: 2,
        },

        992: {
          items: 3,
        },
      },
    });
  }

  function initializeLatestProductSlider() {
    $(".latest-product__slider").trigger("destroy.owl.carousel"); //these 3 lines kill the owl, and returns the markup to the initial state
    $(".latest-product__slider").find(".owl-stage-outer").children().unwrap();
    $(".latest-product__slider").removeClass(
      "owl-center owl-loaded owl-text-select-on"
    );
    /*--------------------------
            Latest Product Slider
        ----------------------------*/
    $(".latest-product__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      navText: [
        "<span class='fa fa-angle-left'><span/>",
        "<span class='fa fa-angle-right'><span/>",
      ],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
    });
  }

  function initializePriceSlider() {
    /*-----------------------
            Price Range Slider
        ------------------------ */
    var rangeSlider = $(".price-range"),
      minamount = $("#minamount"),
      maxamount = $("#maxamount"),
      minPrice = rangeSlider.data("min"),
      maxPrice = rangeSlider.data("max");
    rangeSlider.slider({
      range: true,
      min: minPrice,
      max: maxPrice,
      values: [minPrice, maxPrice],
      slide: function (event, ui) {
        minamount.val(ui.values[0] + " RSD");
        maxamount.val(ui.values[1] + " RSD");
        maxValue = ui.values[1];
      },
    });
    minamount.val(rangeSlider.slider("values", 0) + " RSD");
    maxamount.val(rangeSlider.slider("values", 1) + " RSD");
  }

  initializePriceSlider();

  /*--------------------------
          Select
      ----------------------------*/
  $("select").niceSelect();

  function intializeProductSlider() {
    $(".product__details__pic__slider").trigger("destroy.owl.carousel"); //these 3 lines kill the owl, and returns the markup to the initial state
    $(".product__details__pic__slider")
      .find(".owl-stage-outer")
      .children()
      .unwrap();
    $(".product__details__pic__slider").removeClass(
      "owl-center owl-loaded owl-text-select-on"
    );
    /*---------------------------------
            Product Details Pic Slider
        ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
      loop: true,
      margin: 20,
      items: 4,
      dots: true,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
    });

    $(".product__details__pic__slider img").on("click", function () {
      var imgurl = $(this).data("imgbigurl");
      var bigImg = $(".product__details__pic__item--large").attr("src");
      if (imgurl != bigImg) {
        $(".product__details__pic__item--large").attr({
          src: imgurl,
        });
      }
    });
  }

  function counter() {
    /*-------------------
          Quantity change
        --------------------- */
    var proQty = $(".pro-qty");
    proQty.prepend('<span class="dec qtybtn plus">-</span>');
    proQty.append('<span class="inc qtybtn plus">+</span>');
    proQty.on("click", ".qtybtn", function () {
      var $button = $(this);
      var oldValue = $button.parent().find("input").val();
      if ($button.hasClass("inc")) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      $button.parent().find("input").val(newVal);
    });
  }

  function textZaProdukt(element, naziv, lg, md, sm) {
    return ` <div class="col-lg-${lg} col-md-${md} col-sm-${sm} proba" id="pr${element.id}">
              <div class="${naziv}__item">
                <div class="${naziv}__item__pic set-bg bg-size-contain" data-setbg="${element.img[0].src}">
                  <ul class="${naziv}__item__pic__hover">
                  <!--
                    <li><a href="javascript:void(0);"><i class="fa fa-heart"></i></a></li>
                    <li><a href="javascript:void(0);"><i class="fa fa-retweet"></i></a></li>-->
                    <li><a href="javascript:void(0);" onclick="dodajProizvodKorpa(${element.id}); ukupnaCenaProizvoda(); modal('Proizvod je dodat u korpu','Proverite proizvode u korpi klikom na ikonicu korpa');"><i class="fa fa-shopping-cart"></i></a></li>
                  </ul>
                </div>
                <a href="shop-details.html?id=${element.id}&categoryId=${element.categoryId}">
                  <div class="${naziv}__item__text">
                    <h6>${element.title}</h6>
                    <h5>${element.price.newPrice} RSD</h5> 
                  </div>
                </a>
              </div>
            </div>`;
  }

  //Funkcija za ispis produkta
  function ispisProdukta(niz, naziv, lg, md, sm) {
    let text = "";
    if (url === "/shop-grid.html") {
      niz = filtriranjeKategorija(niz);
      niz = sort(niz);
      niz = filtriranjePoCenovnomRangu(niz);
      niz = filtriranjeBoja(niz);
      niz = filtriranjeVelicina(niz);
      niz = pretraga(niz);
      $("#kolicinaProizvoda").html(niz.length);
      if (niz == "") {
        console.log("alo");
        text = `<div class="nemogucFilter">
                    <h1>Nije moguće pronaći proizvode po zadatom kriterijumu.</h1>
                    <div id="ponistiFiltere" class="visible">
                    <label class="kursor" for="all">Poništi sve filtere</label>
                    </div>
                </div>`;
        $("#" + naziv + "Proizvodi").html(text);
      }
    }

    if (url === "/index.html" || url === "/") {
      for (let i = 0; i < 8; i++) {
        text += textZaProdukt(niz[i], naziv, lg, md, sm);
      }
    } else {
      niz.forEach((element) => {
        text += textZaProdukt(element, naziv, lg, md, sm);
      });
    }

    $("#" + naziv + "Proizvodi").html(text);
    setujPozadinu();
  }

  function ispisKategorjaMeni(niz) {
    let html = "";
    niz.forEach((element) => {
      html += `<li><a href="shop-grid.html?catId=${element.id}">${element.title}</a></li>`;
    });

    $("#kategorijeMeni").html(html);
  }
  setujPozadinu();
  var pomId;
  //STRANICA INDEX---------------------------------------------------------------
  if (url === "/index.html" || url === "/") {
    //Ispis produkta na index stranici
    ajaxBekKol("products.json", function (rezultat) {
      ispisProdukta(rezultat, "featured", 3, 4, 6);
      nizProizvodi = [...rezultat];
      ukupnaCenaProizvoda();
    });

    //Slider sa kategorijama na index stranici
    ajaxBekKol("categories.json", function (rezultat) {
      ispisKategorijaSlider(rezultat);
      ispisKategorjaMeni(rezultat);
    });

    function ispisKategorijaSlider(niz) {
      let text = "";
      for (let position in niz) {
        text += `<div class="col-lg-3">
                            <div class="categories__item set-bg" data-setbg="${niz[position].img.src}">
                              <h5><a href="shop-grid.html?catId=${niz[position].id}">${niz[position].title}</a></h5>
                            </div>
                         </div>`;
      }
      $(".categories__slider").html(text);

      setujPozadinu();

      initializeCarousel();
    }
  } else if (url === "/shop-grid.html") {
    //STRANICA SHOP-------------------------------------------------------------------------
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    /* console.log(params.catId); */
    let kategorije = [];
    ajaxBekKol("categories.json", function (rezultat) {
      ispsSidebarKategorija(rezultat);
      localStorage.removeItem("nizKategorija");
      ispisKategorjaMeni(rezultat);
      kategorije = [...rezultat];
    });

    ajaxBekKol("color.json", function (rezultat) {
      ispisSidebarBoje(rezultat);
    });

    ajaxBekKol("size.json", function (rezultat) {
      ispisSidebarVelicina(rezultat);
    });

    function pozivanjeAjaxaZaProdukte() {
      ajaxBekKol("products.json", function (rezultat) {
        ispisProdukta(rezultat, "product", 4, 6, 6);
      });
    }

    ajaxBekKol("products.json", function (rezultat) {
      ispisSnizenihProizvoda(rezultat);
      pozivanjeAjaxaZaProdukte();
      ispisNajsvezijihProizvoda(rezultat);
      nizProizvodi = [...rezultat];
      ukupnaCenaProizvoda();
      //ispisProdukta(rezultat, "product", 4, 6, 6);
    });

    //Ispis katefgorija
    function ispsSidebarKategorija(niz) {
      html = "<ul>";
      niz.forEach((el) => {
        if (el.id == params.catId) {
          html += `<li>
                    <input
                        class="mr-2 mb-2 kategorije"
                        type="checkbox"
                        checked
                        name="${el.id}"
                        value="${el.id}"
                    />${el.title}
                </li>`;
        } else {
          html += `<li>
                    <input
                        class="mr-2 mb-2 kategorije"
                        type="checkbox"
                        name="${el.id}"
                        value="${el.id}"
                    />${el.title}
                </li>`;
        }
      });
      html += "</ul>";

      $("#sidebarCategory").html(html);

      $(".kategorije").on("change", pozivanjeAjaxaZaProdukte);

      proveraCekiranih(".kategorije");
    }

    //Filtriraj po kategorijama
    function filtriranjeKategorija(niz) {
      let nizSelektovanih = [];
      for (let i = 0; i < $(".kategorije:checked").length; i++) {
        //console.log($(".pisac:checked")[i].value);
        nizSelektovanih.push(parseInt($(".kategorije:checked")[i].value));
      }

      if (nizSelektovanih != 0) {
        return niz.filter((x) => nizSelektovanih.includes(x.categoryId));
      } else {
        return niz;
      }
    }

    //Ispis boja
    function ispisSidebarBoje(niz) {
      html = "";
      niz.forEach((el) => {
        html += `<div class="sidebar__item__color sidebar__item__color--${el.code}">
                        <label for="color${el.id}">
                        ${el.name}
                        <input type="radio" class="radioBoja" id="color${el.id}" value="${el.id}" name="color" />
                        </label>
                    </div>`;
      });

      $("#sidebarColor").html(html);

      $(".radioBoja").change(pozivanjeAjaxaZaProdukte);

      proveraCekiranih(".radioBoja");
    }

    //Ispis velicina
    function ispisSidebarVelicina(niz) {
      html = "";
      niz.forEach((el) => {
        html += `<div class="sidebar__item__size">
                    <label for="size${el.id}">
                    ${el.title}
                    <input type="radio" class="radioVelicina" id="size${el.id}" value="${el.id}" name="size" />
                    </label>
                </div>`;
      });
      $("#sidebarSize").html(html);

      $(".radioVelicina").change(pozivanjeAjaxaZaProdukte);

      proveraCekiranih(".radioVelicina");
    }

    //Sortitanje
    $("#sort").change(pozivanjeAjaxaZaProdukte);

    function sort(niz) {
      let tipSortiranja = document.getElementById("sort").value;
      if (tipSortiranja == "nazivRastuce") {
        return niz.sort((el1, el2) => {
          if (el1.title < el2.title) {
            return -1;
          }
          if (el1.title > el2.title) {
            return 1;
          }
          return 0;
        });
      } else if (tipSortiranja == "nazivOpadajuce") {
        return niz.sort((el1, el2) => {
          if (el1.title < el2.title) {
            return 1;
          }
          if (el1.title > el2.title) {
            return -1;
          }
          return 0;
        });
      } else if (tipSortiranja == "cenaRastuce") {
        return niz.sort((el1, el2) => {
          if (el1.price.newPrice < el2.price.newPrice) {
            return -1;
          }
          if (el1.price.newPrice > el2.price.newPrice) {
            return 1;
          }
          return 0;
        });
      } else if (tipSortiranja == "cenaOpadajuce") {
        return niz.sort((el1, el2) => {
          if (el1.price.newPrice < el2.price.newPrice) {
            return 1;
          }
          if (el1.price.newPrice > el2.price.newPrice) {
            return -1;
          }
          return 0;
        });
      } else if (tipSortiranja == "datumRastuce") {
        return niz.sort((el1, el2) => {
          let a = new Date(el1.dateTime);
          let b = new Date(el2.dateTime);
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
      } else if (tipSortiranja == "datumOpadajuce") {
        return niz.sort((el1, el2) => {
          let a = new Date(el1.dateTime);
          let b = new Date(el2.dateTime);
          if (a < b) {
            return 1;
          }
          if (a > b) {
            return -1;
          }
          return 0;
        });
      } else {
        return niz;
      }
    }

    //Filtriranje po cenovnom rangu
    $("#linija").on("mousemove", () => {
      pozivanjeAjaxaZaProdukte();
    });
    $("#linija").on("mousedown", () => {
      vidljivPonistiFiltere();
    });

    function filtriranjePoCenovnomRangu(niz) {
      let min = $("#minamount").val();
      min = min.substr(0, min.length - 3);
      let max = $("#maxamount").val();
      max = max.substr(0, max.length - 3);
      return niz.filter((el) => {
        if (el.price.newPrice > min && el.price.newPrice < max) {
          return el;
        }
      });
    }

    //Ispis najsvezijih proizvoda
    function ispisNajsvezijihProizvoda(niz) {
      niz.sort((el1, el2) => {
        let a = new Date(el1.dateTime);
        let b = new Date(el2.dateTime);
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        return 0;
      });
      let html = `<div class="latest-prdouct__slider__item">`;
      for (let i = 0; i < 3; i++) {
        //console.log(niz[i]);
        html += `<a href="shop-details.html?id=${niz[i].id}&categoryId=${niz[i].categoryId}" class="latest-product__item">
                  <div class="latest-product__item__pic">
                    <img src="${niz[i].img[0].src}" alt="${niz[i].img[0].alt}" />
                  </div>
                  <div class="latest-product__item__text">
                    <h6>${niz[i].title}</h6>
                    <span>${niz[i].price.newPrice}</span>
                  </div>
                </a>`;
      }
      html += `</div>`;
      html += `<div class="latest-prdouct__slider__item">`;
      for (let i = 3; i < 6; i++) {
        //console.log(niz[i]);
        html += `<a href="shop-details.html?id=${niz[i].id}&categoryId=${niz[i].categoryId}" class="latest-product__item">
                  <div class="latest-product__item__pic">
                    <img src="${niz[i].img[0].src}" alt="${niz[i].img[0].alt}" />
                  </div>
                  <div class="latest-product__item__text">
                    <h6>${niz[i].title}</h6>
                    <span>${niz[i].price.newPrice}</span>
                  </div>
                </a>`;
      }
      html += `</div>`;

      $("#najsvezije1").html(html);

      initializeLatestProductSlider();
    }

    //Filtriranje boja
    function filtriranjeBoja(niz) {
      const radioButtons = document.querySelectorAll('input[name="color"]');
      let selectedSize = [];
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedSize.push(radioButton.value);
        }
      }
      if (selectedSize != 0) {
        return niz.filter((x) => selectedSize == x.colorId);
      } else {
        return niz;
      }
    }

    //Filtriranje velicina
    function filtriranjeVelicina(niz) {
      const radioButtons = document.querySelectorAll('input[name="size"]');
      let selectedSize = [];
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedSize.push(radioButton.value);
        }
      }
      if (selectedSize != 0) {
        return niz.filter((x) => selectedSize == x.sizeId);
      } else {
        return niz;
      }
    }

    //Ispis sizenih proizvoda
    function ispisSnizenihProizvoda(niz) {
      html = "";
      for (let i = 0; i <= 3; i++) {
        html += `<div class="col-lg-4">
                  <div class="product__discount__item">
                    <div
                      class="product__discount__item__pic set-bg bg-size-contain"
                      data-setbg="${niz[i].img[0].src}"
                    >
                      <div class="product__discount__percent">-${racunanjeProcenta(
                        niz[i].price.oldPrice,
                        niz[i].price.newPrice
                      )}%</div>
                      <ul class="product__item__pic__hover">
                        <li>
                          <a href="javascript:void(0);" onclick="dodajProizvodKorpa(${
                            niz[i].id
                          }); ukupnaCenaProizvoda(); modal('Proizvod je dodat u korpu','Proverite proizvode u korpi klikom na ikonicu korpa');"><i class="fa fa-shopping-cart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="product__discount__item__text">
                      <span>${ispisKategorije(niz[i].categoryId)}</span>
                      <h5><a href="shop-details.html?id=${
                        niz[i].id
                      }&categoryId=${niz[i].categoryId}">${
          niz[i].title
        }</a></h5>
                      <div class="product__item__price">
                        ${niz[i].price.newPrice} <span>${
          niz[i].price.oldPrice
        }</span>
                      </div>
                    </div>
                  </div>
                </div>`;
      }

      $("#snizenoSlider").html(html);
      setujPozadinu();
      initialzeProductDiscountSlider();
    }

    //Racunja procenta popusta
    function racunanjeProcenta(staraCena, novaCena) {
      let procenat;
      procenat = Math.ceil(((staraCena - novaCena) / staraCena) * 100);
      return procenat.toString();
    }

    //Ispis kategorija za funkciju ispis proizvoda
    function ispisKategorije(id) {
      let html = "";
      for (let i in kategorije) {
        if (kategorije[i].id == id) {
          html += kategorije[i].title;
        }
      }
      return html;
    }

    $("#poljeZaPretragu").on("keyup", pozivanjeAjaxaZaProdukte);
    $("#btnPretraga").on("click", (e) => {
      e.preventDefault();
      pozivanjeAjaxaZaProdukte();
    });

    //Filtriranje po nazivu i po kategoriji proizvoda
    function pretraga(niz) {
      let uneseniText = $("#poljeZaPretragu").val();
      let pretragenNiz = niz.filter((x) => {
        if (
          x.title.toLowerCase().indexOf(uneseniText.trim().toLowerCase()) !=
            -1 ||
          ispisKategorije(x.categoryId)
            .toLowerCase()
            .indexOf(uneseniText.trim().toLowerCase()) != -1
        ) {
          return x;
        }
      });
      return pretragenNiz;
    }
  } else if (url === "/shop-details.html") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlSearchParams.entries());
    pomId = params.id;
    console.log(params);
    if (Object.keys(params).length === 0) {
      params = {
        id: 1,
        categoryId: 2,
      };
    }

    ajaxBekKol("products.json", function (rezultat) {
      prikaziProizvod(rezultat);
      prikazRijeltovanih(rezultat);
      nizProizvodi = [...rezultat];
      ukupnaCenaProizvoda();
    });

    function prikaziProizvod(niz) {
      let html = "";
      let breadcrumb = "";

      niz.forEach((el) => {
        if (el.id == params.id) {
          html += `<div class="row">
                    <div class="col-lg-6 col-md-6">
                      <div class="product__details__pic">
                        <div class="product__details__pic__item">
                          <img
                            class="product__details__pic__item--large"
                            src="${el.img[1].src}"
                            alt="${el.img[1].alt}"
                          />
                        </div>
                        <div class="product__details__pic__slider owl-carousel">
                          <img
                            data-imgbigurl="${el.img[2].src}"
                            src="${el.img[2].src}"
                            alt="${el.img[2].alt}"
                          />
                          <img
                          data-imgbigurl="${el.img[3].src}"
                          src="${el.img[3].src}"
                          alt="${el.img[3].alt}"
                          />
                          <img
                          data-imgbigurl="${el.img[1].src}"
                          src="${el.img[1].src}"
                          alt="${el.img[1].alt}"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                      <div class="product__details__text">
                        <h3>${el.title}</h3>
                        <div class="product__details__rating">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-half-o"></i>
                          <span>(18 reviews)</span>
                        </div>
                        <div class="product__details__price">${
                          el.price.newPrice
                        }RSD</div>
                        <p>
                          ${el.shortDescription}
                        </p>
                        ${dodajUkorpuAkoJeNaStanju(el.status, el.id)}
                        <ul>
                          <li><b>Dostupnost</b> <span>${dostupnost(
                            el.status
                          )}</span></li>
                          <li>
                            <b>Dostava</b>
                            <span>Brza dostava<samp> Besplatno preuzimanje</samp></span>
                          </li>
                          <li><b>Težina</b> <span>${el.weight}kg</span></li>
                          <li>
                            <b>Zapratite</b>
                            <div class="share">
                              <a href="#"><i class="fa fa-facebook"></i></a>
                              <a href="#"><i class="fa fa-twitter"></i></a>
                              <a href="#"><i class="fa fa-instagram"></i></a>
                              <a href="#"><i class="fa fa-pinterest"></i></a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="product__details__tab">
                        <ul class="nav nav-tabs" role="tablist">
                          <li class="nav-item">
                            <a
                              class="nav-link active"
                              data-toggle="tab"
                              href="#tabs-1"
                              role="tab"
                              aria-selected="true"
                              >Deskripcija</a
                            >
                          </li>
                          
                        </ul>
                        <div class="tab-content">
                          <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="product__details__tab__desc">
                              <h6>Informacije o proizvodu</h6>
                              <p>${el.longDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;

          breadcrumb += `<h2>${el.title}</h2>
                          <div class="breadcrumb__option">
                                <a href="./index.html">Početna</a>
                                <a href="./shop-grid.html">Shop</a>
                                <span>Proizvod</span>
                              </div>`;
        }
      });
      $("#jedanProizvod").html(html);
      $(".breadcrumb__text").html(breadcrumb);
      intializeProductSlider();
      counter();
    }
    function dodajUkorpuAkoJeNaStanju(pom, id) {
      let html = "";
      if (pom == true) {
        return (html += `<div class="product__details__quantity">
        <div class="quantity">
          <div class="pro-qty">
            <input id="poljeZaKolicinu" type="text" value="1" />
          </div>
        </div>
      </div>
      <a href="#" class="primary-btn" onclick="dugmeDodajUKorpu(${id}); modal('Proizvod je dodat u korpu','Proverite proizvode u korpi klikom na ikonicu korpa');">DODAJ U KORPU</a>`);
      } else {
        return (html += "");
      }
    }

    function dostupnost(bool) {
      if (bool) {
        return "Na stanju";
      } else {
        return "Nije na stanju";
      }
    }

    function prikazRijeltovanih(niz) {
      html = "";

      let filterNiz = niz.filter((el) => {
        if (el.categoryId == params.categoryId && el.id != params.id) {
          return true;
        }
      });
      if (filterNiz.length > 4) {
        for (let i = 0; i <= 3; i++) {
          html += textZaProdukt(filterNiz[i], "product", 3, 4, 6);
        }
      } else {
        filterNiz.forEach((el) => {
          html += textZaProdukt(el, "product", 3, 4, 6);
        });
      }

      $("#rilejtovani").html(html);
      setujPozadinu();
    }
  } else if (url === "/shoping-cart.html") {
    ajaxBekKol("products.json", function (rezultat) {
      proizvodi = [...rezultat];
      nizProizvodi = [...rezultat];
      ukupnaCenaProizvoda();
      ispisKorpa();
      $("#btnOsveziKorpu").click(() => {
        ispisKorpa();
        ukupnaCenaProizvoda();
      });
      $("#btnNastaviDalje").click(() => {
        ispisKorpa();
        ukupnaCenaProizvoda();
      });
    });
    ajaxBekKol("categories.json", function (rezultat) {
      ispisKategorjaMeni(rezultat);
      kategorije = [...rezultat];
    });
    setujPozadinu();
    /* FUnkcija za dinamicko ispisivanje korpe */
    function ispisKorpa() {
      let text = ``;
      let subTotalText = ``;
      let subTotal = 0;
      let kolicinaSubtotal = 0;
      let proizvodiKorpa = uzmiItemIzLocalStorage("proizvodiKorpa");
      if (proizvodiKorpa == null || proizvodiKorpa.length == 0) {
        let html = `<div class="praznaKorpa">
                        <img  src="img/cart/slikaKorpe.png" alt="slikaKorpe" />
                        <h3 class="mb-5">Vaša korpa je prazna</h3>
                    </div>`;
        $("#sadrzajKorpe").html(html);
        $("#btnNastaviDalje").attr("href", "#");
      } else if (proizvodiKorpa != null) {
        for (pk of proizvodiKorpa) {
          for (p of proizvodi) {
            if (pk.id == p.id) {
              text += ispisiUnutarKorpe(p, pk.kolicina);
              subTotal += p.price.newPrice * pk.kolicina;
              kolicinaSubtotal += pk.kolicina;
            }
          }
        }
        $("#sadrzajKorpe").html(text);
      }

      subTotalText += ispisSubTotalKorpe(subTotal, kolicinaSubtotal);

      $("#subTotalKorpa").html(subTotalText);

      function ispisiUnutarKorpe(obj, kolicina) {
        let html = ``;
        html += `
          <div id="divJedanRedKorpa${
            obj.id
          }" class="glavniDiv d-flex flex-column justify-content-between align-items-center flex-md-row">
                <div>
                  <img class="mb-2 malaSlika" src="${obj.img[0].src}" alt="${
          obj.img[0].naziv
        }" />
                </div>
                <div class="fix-duzina-naziv"><h5 class="mb-2">${
                  obj.title
                }</h5></div>
                <div id="cenaJednogKomada${obj.id}" class="shopingcartprice">${
          obj.price.newPrice
        }</div>
                <div class="shopingcartquantity" class="mb-2">
                  <div class="counterDiv" class="mb-2">
                    <button onclick="smanji(${obj.id})" id="dugmeMinus${
          obj.id
        }" class="btnMinuIPlus">-</button>
                    <input
                      id="text${obj.id}"
                      class="counterInput"
                      type="text"
                      name=""
                      disabled
                      value="${kolicina}"
                    />
                    <button onclick="povecaj(${obj.id})" id="dugmePlus${
          obj.id
        }" class="btnMinuIPlus">+</button>
                  </div>
                </div>
                <div><p class="shopingcarttotal m-0 width-100"  id="ukupnaCena${
                  obj.id
                }">${izracunajCenu(obj.price.newPrice, kolicina)}</p></div>
                <div class="shopingcartitem__close mb-2">
                  <span onclick="izbaciIzKorpe(${
                    obj.id
                  })" class="icon_close dugmeIzbrisi"></span>
                </div>
              </div>
          `;
        return html;
      }
    }
    function ispisSubTotalKorpe(cena, kolicina) {
      let html = "";
      html += `<li>Broj proizvoda <span>${kolicina}</span></li>
                 <li>Ukupno <span>${parseFloat(cena).toFixed(
                   2
                 )} RSD</span></li>`;
      return html;
    }
    function izracunajCenu(cena, kolicina) {
      let html = ``;
      return (html += parseFloat(cena * kolicina).toFixed(2));
    }
  } else if (url === "/checkout.html") {
    ajaxBekKol("products.json", function (rezultat) {
      nizProizvodi = [...rezultat];
      ispisUnutarPlacanjeProizvode(rezultat);
      ukupnaCenaProizvoda();
    });

    ajaxBekKol("categories.json", function (rezultat) {
      ispisKategorjaMeni(rezultat);
      kategorije = [...rezultat];
    });
    setujPozadinu();
    /* Funkcija za slanje porudzbine */
    function posaljiPorudzbinu() {
      let ime = $("#imePrezime").val();
      proveriImePrezime(ime)
        ? $("#greskaIme").hide()
        : ispisiGresku("imePrezime");

      let email = $("#email").val();
      proveraEmail(email) ? $("#greskaEmail").hide() : ispisiGresku("email");

      let adresa = $("#adresa").val();
      proveraAdrese(adresa)
        ? $("#greskaAdresa").hide()
        : ispisiGresku("adresa");

      let grad = $("#grad").val();
      proveraGrad(grad) ? $("#greskaGrad").hide() : ispisiGresku("grad");

      let pBroj = $("#postanskiBroj").val();
      proveraPostanskiBroj(pBroj)
        ? $("#greskaPostanskiBroj").hide()
        : ispisiGresku("postanskiBroj");

      let tel = $("#telefon").val();
      proveraTelefon(tel)
        ? $("#greskaTelefon").hide()
        : ispisiGresku("telefon");

      if (
        proveriImePrezime(ime) &&
        proveraEmail(email) &&
        proveraAdrese(adresa) &&
        proveraGrad(grad) &&
        proveraPostanskiBroj(pBroj) &&
        proveraTelefon(tel)
      ) {
        $("#imePrezime").val("");
        $("#email").val("");
        $("#adresa").val("");
        $("#grad").val("");
        $("#postanskiBroj").val("");
        $("#telefon").val("");
      }
    }
    /* Funkcija za ispis gresaka */
    function ispisiGresku(imePolja) {
      //let el = $(`#${imePolja}`);
      if (imePolja == "imePrezime")
        ispisGreskeIspodInputa(
          "greskaIme",
          "Prva slova velika, maks. 3 reči, samo slova!"
        ) /* console.log("Prva slova velika, najviše 3 reči!") */;
      if (imePolja == "email")
        ispisGreskeIspodInputa("greskaEmail", "Email nije u ispravnom formatu");
      if (imePolja == "adresa")
        ispisGreskeIspodInputa("greskaAdresa", "Niste uneli ispravnu adresu");
      if (imePolja == "grad")
        ispisGreskeIspodInputa(
          "greskaGrad",
          "Prva slova velika, najviše 3 reči"
        );
      if (imePolja == "postanskiBroj")
        ispisGreskeIspodInputa(
          "greskaPostanskiBroj",
          "Samo brojevi, od 4 do 6 cifara"
        );
      if (imePolja == "telefon")
        ispisGreskeIspodInputa(
          "greskaTelefon",
          "Telefon mora početi sa '06', od 7 do 9 cifara"
        );
    }
    /* Ispis greske ispod inputa */
    function ispisGreskeIspodInputa(id, greska) {
      $(`#${id}`).html(greska);
      $(`#${id}`).show();
    }
    /* Funkcija za ispitivanje unosa imena i prezimena */
    function proveriImePrezime(imePrezime) {
      let uzorakEmail =
        /^[A-ZČĆŠĐŽ][a-zčćšđž]{1,15}\s[A-ZČĆŠĐŽ][a-zčćšđž]{1,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{1,15})?$/;
      if (uzorakEmail.test(imePrezime)) return true;
      else return false;
    }
    /* Funkcija za ispitivanje unosa adrese */
    function proveraAdrese(adresa) {
      let uzorakAdresa =
        /^[A-ZČĆŠĐŽ][a-zčćšđž]{1,15}(\s[1-9](?:[A-ZČĆŠĐŽ]|[a-zčćšđž]))?(\s[A-ZČĆŠĐŽ][a-zčćšđž]{1,15})?(?:\s[0-9]{0,3}|\s[1-9](?:[A-ZČĆŠĐŽ]|[a-zčćšđž]))?$/;
      if (uzorakAdresa.test(adresa)) return true;
      else return false;
    }
    /* Funkcija za ispitivanje unosa grada */
    function proveraGrad(grad) {
      let uzorakGrad =
        /^[A-ZČĆŠĐŽ][a-zčćšđž]{1,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{1,15})?(\s[A-ZČĆŠĐŽ][a-zčćšđž]{1,15})?$/;
      if (uzorakGrad.test(grad)) return true;
      else return false;
    }
    function proveraPostanskiBroj(broj) {
      let uzorakBroj = /^[0-9]{3,6}\s*$/;
      if (uzorakBroj.test(broj)) return true;
      else return false;
    }
    function proveraTelefon(broj) {
      let uzorakBroj = /^06[0-9]{6,9}$/;
      if (uzorakBroj.test(broj)) return true;
      else return false;
    }

    $("#btnSlanjePorudzbine").on("click", (e) => {
      e.preventDefault();
      posaljiPorudzbinu();
    });

    function ispisUnutarPlacanjeProizvode(nizProizvodi) {
      let proizvodiKorpa = uzmiItemIzLocalStorage("proizvodiKorpa");
      let html = ``;
      let suma = 0;
      for (pk of proizvodiKorpa) {
        for (p of nizProizvodi) {
          if (pk.id == p.id) {
            suma += pk.kolicina * p.price.newPrice;
            html += `<li>${pk.kolicina + "x " + p.title}<span>${parseFloat(
              pk.kolicina * p.price.newPrice
            ).toFixed(2)}</span></li>`;
          }
        }
      }
      suma = parseFloat(suma).toFixed(2);
      if (suma > 3000) $("#besplatno").html("0.0 RSD");
      else $("#besplatno").html("500 RSD");
      $("#porudzbina-stavke").html(html);
      $("#ukupno").html(suma + " RSD");
    }
    $("input[type=radio][name=placanje]").change(function () {
      console.log(this.value);
      if (this.value == "pouzece") {
        $("#pouzeceKom").removeClass("visible");
        $("#pouzeceKom").addClass("invisible");
      } else if (this.value == "tekuciRacun") {
        $("#pouzeceKom").removeClass("invisible");
        $("#pouzeceKom").addClass("visible");
      }
    });

    setujPozadinu();
  } else if (url === "/contact.html") {
    ajaxBekKol("products.json", function (rezultat) {
      nizProizvodi = [...rezultat];
      ukupnaCenaProizvoda();
    });

    //Slider sa kategorijama na index stranici
    ajaxBekKol("categories.json", function (rezultat) {
      ispisKategorjaMeni(rezultat);
    });
  }
  //Kraj ifova---------
  ispisBrojaStavkiKorpe();

  $("#dugmeZaDodavanjeViseStavki").on("click", () => {
    dugmeDodajUKorpu(pomId);
  });

  //Funkcije za div ponistavanje filtera
  function vidljivPonistiFiltere() {
    $("#ponistiFiltere").removeClass("invisible");
    $("#ponistiFiltere").addClass("visible");
  }
  function nevidljivPonistiFiltere() {
    $("#ponistiFiltere").removeClass("visible");
    $("#ponistiFiltere").addClass("invisible");
  }
  //Funkcija za proveru cekiranih elemenata i restarovanje polja
  function proveraCekiranih(name) {
    //Funkcija za pro
    $(name).change(() => {
      if ($(name).is(":checked")) {
        vidljivPonistiFiltere();
      } else {
        nevidljivPonistiFiltere();
      }
    });

    $("input[name=ALL]").change(function () {
      if ($("input[name=ALL]").is(":checked")) {
        pozivanjeAjaxaZaProdukte();
        nevidljivPonistiFiltere();
        $("input[name=ALL]").prop("checked", false);
      }
      $(name).prop("checked", false);
      $("#minamount").val(100 + " RSD");
      $("#maxamount").val(1000 + " RSD");
      initializePriceSlider();
      $("#poljeZaPretragu").val("");
      $("input[name=ALL]").prop("checked");
    });
  }
});

var brStavki;
function dodajItemULocalStorage(ime, podatak) {
  localStorage.setItem(ime, JSON.stringify(podatak));
}

function uzmiItemIzLocalStorage(ime) {
  return JSON.parse(localStorage.getItem(ime));
}

function ispisBrojaStavkiKorpe() {
  let brojPodataka = uzmiItemIzLocalStorage("proizvodiKorpa");
  if (brojPodataka == null) {
    $("#korpicaBroj").addClass("invisible");
    $("#korpicaBroj2").addClass("invisible");
  } else {
    $("#korpicaBroj").removeClass("invisible");
    $("#korpicaBroj2").removeClass("invisible");
    $("#korpicaBroj").addClass("visible");
    $("#korpicaBroj2").addClass("visible");

    $("#korpicaBroj").html(brojPodataka.length);
    $("#korpicaBroj2").html(brojPodataka.length);
  }
}

let proizvodiUnutarKorpe = [];
function dodajProizvodKorpa(id, brojStavki) {
  if (brojStavki == undefined) brojStavki = 1;

  if (!localStorage.getItem("proizvodiKorpa")) {
    dodajPrviProizvod(id);
  } else {
    let korpa = uzmiItemIzLocalStorage("proizvodiKorpa");
    let xd = korpa.find((x) => x.id == id);
    if (!xd) {
      dodajNoviProizvod(id);
    } else {
      uvecajKolicinu(id);
    }
  }
  ispisBrojaStavkiKorpe();

  /* Funkcija koja dodaje prvi proizvod u korpu koja je prazna */
  function dodajPrviProizvod(idProduct) {
    let zaKorpu = {
      id: idProduct,
      kolicina: brojStavki,
    };
    proizvodiUnutarKorpe.push(zaKorpu);
    dodajItemULocalStorage("proizvodiKorpa", proizvodiUnutarKorpe);
  }

  /* Funkcija za dodavanje proizvoda u korpu koji trenutno nije u korpi */
  function dodajNoviProizvod(idProduct) {
    let zaKorpu = {
      id: idProduct,
      kolicina: brojStavki,
    };
    let korpa = uzmiItemIzLocalStorage("proizvodiKorpa");
    korpa.push(zaKorpu);
    dodajItemULocalStorage("proizvodiKorpa", korpa);
  }

  /* Funkcija za povecavanje kolicine proizvoda koji je vec u korpi */
  function uvecajKolicinu(idProduct) {
    let korpa = uzmiItemIzLocalStorage("proizvodiKorpa");
    let xd = korpa.find((x) => x.id == idProduct);
    korpa.filter((x) => x.id != idProduct);
    xd.kolicina += parseInt(brojStavki);
    dodajItemULocalStorage("proizvodiKorpa", korpa);
  }
}

/* Funkcija za dodoavanje vise elemenata u korpu sa stranice shop-details.html */

function dugmeDodajUKorpu(id) {
  brStavki = parseInt($("#poljeZaKolicinu").val());
  dodajProizvodKorpa(id, brStavki);
}
//Funkcija za ispis ukupne sume proizvoda
function ukupnaCenaProizvoda() {
  let korpa = uzmiItemIzLocalStorage("proizvodiKorpa");
  let ukupno = 0;
  /* console.log(nizProizvodi); */
  if (korpa != null) {
    for (k of korpa) {
      for (p of nizProizvodi) {
        if (k.id == p.id) {
          ukupno += k.kolicina * p.price.newPrice;
        }
      }
    }
    $(".ukupnaCena").html(parseFloat(ukupno).toFixed(2) + " RSD");
  } else {
    $(".ukupnaCena").html(parseFloat(ukupno).toFixed(2) + " RSD");
  }
}

/* Povecaj broj kolicine */
function povecaj(id) {
  let broj = parseInt($(`#text${id}`).val());
  broj += 1;
  $(`#text${id}`).val(broj);
  let cena = parseFloat($(`#cenaJednogKomada${id}`).html());
  let suma = cena * broj;
  $(`#ukupnaCena${id}`).html(parseFloat(suma).toFixed(2));
  //console.log(broj, cena, suma);
}
/* Smanji broj kolicine */
function smanji(id) {
  let broj = parseInt($(`#text${id}`).val());
  if (broj != 1) {
    broj -= 1;
    $(`#text${id}`).val(broj);
    let cena = parseFloat($(`#cenaJednogKomada${id}`).html()).toFixed(2);
    let suma = cena * broj;
    $(`#ukupnaCena${id}`).html(parseFloat(suma).toFixed(2));
    //console.log(broj, cena, suma);
  }
}

/* Funkcija za ispis broja stavki korpe i ukupnog iznosa racuna korpe */
function izdracunajPodatkeRacuna() {
  let korpa = uzmiItemIzLocalStorage("proizvodiKorpa");
  let divovi = $(".glavniDiv .shopingcarttotal");
  let suma = 0;
  for (let i = 0; i < divovi.length; i++) {
    suma += parseInt(divovi[i].textContent);
  }
  $("#ukupanBrojProizvoda").html(korpa.length);
  $("#ukupnaCenaRacuna").html(suma);
}
/* Osvezavanje cele korpe */
function osveziKorpu() {
  let inputi = $(".counterInput");
  console.log(inputi);
  let objekti = [];
  for (let i = 0; i < inputi.length; i++) {
    objekti.push({
      id: parseInt(inputi[i].id.substr(4, inputi[i].id.length)),
      kolicina: parseInt(inputi[i].value),
    });
    //console.log(inputi[i].id.substr(4, inputi[i].id.length), inputi[i].value);
  }
  dodajItemULocalStorage("proizvodiKorpa", objekti);
  izdracunajPodatkeRacuna();
}
/* Funkcija za izbacivanje proizvoda iz korpe */
function izbaciIzKorpe(id) {
  let obrisi = $(`#divJedanRedKorpa${id}`);
  obrisi.remove();
  osveziKorpu();
  ispisBrojaStavkiKorpe();
}

/* Funkcije za modal */
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

/* Funkcija za disableovanje skrola */
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}
/* Funkcija za enableovanje skrola */
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}
/* Pravljenje modala */

function modal(naslovModala, tekst) {
  disableScroll();
  let glavniDiv = document.createElement("div");
  let centralniDiv = document.createElement("div");
  let naslov = document.createElement("h1");
  let p = document.createElement("p");

  naslov.innerHTML = naslovModala;

  p.innerHTML = tekst;

  glavniDiv.classList.add("glavniDivModal");
  centralniDiv.classList.add("centralniDivModal");
  naslov.classList.add("naslovModal");

  centralniDiv.appendChild(naslov);
  centralniDiv.appendChild(p);
  glavniDiv.appendChild(centralniDiv);
  document.body.appendChild(glavniDiv);
  /* $(".glavniDivModal").on("click", function () {
    glavniDiv.classList.add("d-none");
    document.body.removeChild(glavniDiv);
    enableScroll();
  }); */
  setTimeout(() => {
    glavniDiv.classList.add("d-none");
    document.body.removeChild(glavniDiv);
    enableScroll();
  }, 1800);
}
/* Funkcija za ispitivanje unosa emaila */
function proveraEmail(email) {
  let uzorakEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (uzorakEmail.test(email)) return true;
  else return false;
}

$("#newsletter").on("click", (e) => {
  e.preventDefault();
  let value = $("#inputNewsletter").val();
  console.log(value);
  if (proveraEmail(value) == true && value != "") {
    modal("Obaveštenje", "Uspesno ste se prijavili na newsletter!");
    $("#inputNewsletter").val("");
  } else {
    modal("Obaveštenje", "E-mail nije u ispravnom formatu");
  }
});
