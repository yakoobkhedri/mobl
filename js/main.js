$(function () {
  "use strict";
  $(window).on("scroll load", function () {
    if ($(window).scrollTop() > 120) {
      $("#navbar").css("background-color", "black");
    } else {
      $("#navbar").css("background-color", "rgba(0 , 0 , 0 , 0)");
    }
  });
  // dropdown menu

  let productLink = document.getElementById("productLink");
  let header2 = document.querySelector(".header2");

  productLink.addEventListener("mouseenter", function () {
    header2.style.backgroundColor = "black";
  });
  productLink.addEventListener("mouseleave", function () {
    header2.style.backgroundColor = "rgba(255, 255, 255, 0)";
  });
  //   show Consultants
  let showConsultants = Array.from(
    document.getElementsByClassName("showConsultants")
  );

  showConsultants.forEach((item) => {
    item.addEventListener("click", function () {
      item.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle(
        "active"
      );
      item.querySelector("svg").classList.toggle("active");
    });
  });

  // Main navigation & mega menu
  // ----------------------------------------------------------------

  // Global menu variables

  var objSearch = $(".search-wrapper"),
    objLogin = $(".login-wrapper"),
    objCart = $(".cart-wrapper"),
    objMenu = $(".floating-menu"),
    objMenuLink = $(".floating-menu a"),
    $search = $(".open-search"),
    $login = $(".open-login"),
    $cart = $(".open-cart"),
    $menu = $(".open-menu"),
    $openDropdown = $(".open-dropdown"),
    $close = $(".close-menu"),
    $settingsItem = $(".nav-settings .nav-settings-list li");
  // Open/close login

  $login.on("click", function () {
    toggleOpen($(this));
    objLogin.toggleClass("open");
    closeSearch();
    closeCart();
  });

  // Open/close search bar

  $search.on("click", function () {
    toggleOpen($(this));
    objSearch.toggleClass("open");
    objSearch.find("input").focus();
    closeLogin();
    closeCart();
  });

  // Open/close cart

  $cart.on("click", function () {
    toggleOpen($(this));
    objCart.toggleClass("open");
    closeLogin();
    closeSearch();
  });

  // Settings language & currency dropdown

  $settingsItem.on("click", function () {
    var $value = $(this).closest(".nav-settings").find(".nav-settings-value");
    $value.text($(this).text());
  });

  // Mobile menu open/close

  $menu.on("click", function () {
    objMenu.addClass("expanded");
    closeSearch();
    closeLogin();
    closeCart();
  });

  // Floating menu hyperlink
  if ($("nav").hasClass("navbar-single-page")) {
    objMenuLink.on("click", function () {
      objMenu.removeClass("expanded");
    });
  }

  // Open dropdown/megamenu

  $openDropdown.on("click", function (e) {
    e.preventDefault();

    var liParent = $(this).parent().parent(),
      liDropdown = liParent.find(".navbar-dropdown");

    liParent.toggleClass("expanded");

    if (liParent.hasClass("expanded")) {
      liDropdown.slideDown();
    } else {
      liDropdown.slideUp();
    }
  });

  // Close menu (mobile)

  $close.on("click", function () {
    $("nav").find(".expanded").removeClass("expanded");
    $("nav").find(".navbar-dropdown").slideUp();
  });

  // Global functions

  function toggleOpen(el) {
    $(el).toggleClass("open");
  }

  function closeSearch() {
    objSearch.removeClass("open");
    $search.removeClass("open");
  }
  function closeLogin() {
    objLogin.removeClass("open");
    $login.removeClass("open");
  }
  function closeCart() {
    objCart.removeClass("open");
    $cart.removeClass("open");
  }

  // Sticky header
  // ----------------------------------------------------------------

  var navbarFixed = $("nav.navbar-fixed");

  // When reload page - check if page has offset
  if ($(document).scrollTop() > 94) {
    navbarFixed.addClass("navbar-sticked");
  }
  // Add sticky menu on scroll
  $(document).on("bind ready scroll", function () {
    var docScroll = $(document).scrollTop();
    if (docScroll >= 10) {
      navbarFixed.addClass("navbar-sticked");
    } else {
      navbarFixed.removeClass("navbar-sticked");
    }
  });

  // Tooltip
  // ----------------------------------------------------------------

  // $('[data-toggle="tooltip"]').tooltip();

  // Main popup
  // ----------------------------------------------------------------

  $(".mfp-open").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "hidden",
    closeBtnInside: true,
    preloader: true,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
    callbacks: {
      open: function () {
        // wait on popup initalization
        // then load owl-carousel
        $(".popup-main .owl-carousel").hide();
        setTimeout(function () {
          $(".popup-main .owl-carousel").show();
        }, 50);
      },
    },
  });

  // Main popup gallery
  // ----------------------------------------------------------------

  $(".open-popup-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
  });

  // Frontpage slider
  // ----------------------------------------------------------------

  var arrowIcons = [
    '<span class="icon icon-chevron-left"></span>',
    '<span class="icon icon-chevron-right"></span>',
  ];

  $.each($(".owl-slider"), function (i, n) {
    var $n = $(n);

    $n.owlCarousel({
      autoplay: $n.data("autoplay"),
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      items: 1,
      loop: true,
      // spacing
      margin: 10,
      stagePadding: 0,
      // navigation
      nav: true,
      dots: false,
      navText: arrowIcons,
      // animation effects
      smartSpeed: 950,
      onTranslated: startAnimation,
      onTranslate: resetAnimation,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
    });

    resetAnimation(); // reset effects all on initalization
    startAnimation(); // start animation on first slide

    function startAnimation(event) {
      // find active slide
      var activeItem = $(n).find(".owl-item.active"),
        timeDelay = 100;

      $.each(activeItem.find(".animated"), function (j, m) {
        // catch active slide
        var item = $(m);
        item.css("animation-delay", timeDelay + "ms");
        timeDelay = timeDelay + 180;
        // add animation
        item.removeClass("fadeOut");
        item.addClass(item.data("start"));
      });
    }

    function resetAnimation(event) {
      // catch all slides
      var items = $(n).find(".owl-item");
      // for each add animation end
      $.each(items.find(".animated"), function (j, m) {
        var item = $(m);
        item.removeClass(item.data("start"));
        item.addClass("fadeOut");
      });
    }
    var navHeight = $("nav").height();

    if ($(n).hasClass("owl-slider-fullscreen")) {
      $(".header-content .item").height($(window).height() - navHeight);
    }
  });

  $.each($(".owl-icons"), function (i, n) {
    $(n).owlCarousel({
      items: 6,
      loop: true,
      // spacing
      margin: 0,
      stagePadding: 0,
      // navigation
      nav: true,
      dots: false,
      navText: arrowIcons,
      // animation effects
      smartSpeed: 950,
      responsive: {
        0: {
          items: $(n).data("icons-sm"),
          nav: true,
        },
        600: {
          items: $(n).data("icons-md"),
          nav: false,
        },
        1000: {
          items: $(n).data("icons-lg"),
          nav: true,
          loop: false,
        },
      },
    });
  });

  $.each($(".owl-product-gallery"), function (i, n) {
    $(n).owlCarousel({
      items: 1,
      loop: true,
      // spacing
      margin: 0,
      stagePadding: 0,
      // navigation
      nav: true,
      dots: false,
      navText: arrowIcons,
      // animation effects
      smartSpeed: 950,
    });
  });

  // Scroll to top
  // ----------------------------------------------------------------

  var $wrapper = $(".wrapper");
  $wrapper.append(
    $("<div class='scroll-top'><i class='icon icon-chevron-up'></i></div>")
  );

  var $scrollbtn = $(".scroll-top");

  $(document).on("ready scroll", function () {
    var docScrollTop = $(document).scrollTop(),
      docScrollBottom =
        $(window).scrollTop() + $(window).height() === $(document).height();

    if (docScrollTop >= 150) {
      $scrollbtn.addClass("visible");
    } else {
      $scrollbtn.removeClass("visible");
    }
    if (docScrollBottom) {
      $scrollbtn.addClass("active");
    } else {
      $scrollbtn.removeClass("active");
    }
  });

  $scrollbtn.on("click", function () {
    $("html,body").animate(
      {
        scrollTop: $("body").offset().top,
      },
      1000
    );
    return false;
  });

  // Product color var
  // ----------------------------------------------------------------

  $.each($(".product-colors"), function (i, n) {
    var $btn = $(".color-btn");
    $btn.on("click", function () {
      $(this).parent().find($btn).removeClass("checked");
      $(this).addClass("checked");
    });
  });

  // Tabsy images
  // ----------------------------------------------------------------

  var tabsyImg = $(".tabsy .tabsy-images > div"),
    tabsyLink = $(".tabsy .tabsy-links figure");

  // apply images to parent background
  tabsyImg.each(function (i, n) {
    $(n).css("background-image", "url(" + $(n).find("img").attr("src") + ")");
  });

  tabsyLink.on("mouseenter", function () {
    var self = $(this),
      tabID = self.attr("data-image");
    tabsyLink.removeClass("current");
    tabsyImg.removeClass("current");
    self.addClass("current");
    self
      .closest(".tabsy")
      .find("#" + tabID)
      .addClass("current");
  });

  // Add to favorites list / product list
  // ----------------------------------------------------------------

  $(".add-favorite").on("click", function () {
    $(this).toggleClass("added");
  });

  $(".info-box-addto").on("click", function () {
    $(this).toggleClass("added");
  });

  // Filters toggle functions
  // ----------------------------------------------------------------

  // Check if some filter boxes has class active
  // then show hidden filters
  $(".filters .filter-box").each(function () {
    if ($(this).hasClass("active")) {
      $(this).find(".filter-content").show();
    }
  });

  // Toggle filter function
  $(".filters .title").on("click", function (e) {
    var $this = $(this),
      $parent = $this.parent();
    $parent.toggleClass("active");

    if ($parent.hasClass("active")) {
      $parent.find(".filter-content").slideDown(300);
    } else {
      $parent.find(".filter-content").slideUp(200);
    }
  });

  // Update filter results - close dropdown filters
  // ----------------------------------------------------------------

  $(".filters .filter-update").on("click", function (e) {
    $(this)
      .closest(".filter-box")
      .removeClass("active")
      .find(".filter-content")
      .slideUp(200);
  });

  // Show hide filters (only for mobile)
  // ----------------------------------------------------------------

  $(".toggle-filters-mobile").on("click", function () {
    $(".filters").addClass("active");
  });
  $(".toggle-filters-close").on("click", function () {
    $(".filters").removeClass("active");
    $("html,body").animate(
      {
        scrollTop: $("body").offset().top,
      },
      800
    );
    return false;
  });

  // Strecher accordion
  // ----------------------------------------------------------------

  var $strecherItem = $(".stretcher-item");
  $strecherItem.on({
    mouseenter: function (e) {
      $(this).addClass("active");
      $(this).siblings().addClass("inactive");
    },
    mouseleave: function (e) {
      $(this).removeClass("active");
      $(this).siblings().removeClass("inactive");
    },
  });

  // Blog image caption
  // ----------------------------------------------------------------

  var $blogImage = $(".blog-post-text img");
  $blogImage.each(function () {
    var $this = $(this);
    $this.wrap('<span class="blog-image"></span>');
    if ($this.attr("alt")) {
      var caption = this.alt;
      var link = $this.attr("data");
      $this.after('<span class="caption">' + caption + "</span>");
    }
  });

  // Coupon code
  // ----------------------------------------------------------------

  $(".form-coupon").hide();
  $("#couponCodeID").on("click", function () {
    if ($(this).is(":checked")) {
      $(".form-coupon").fadeIn();
    } else {
      $(".form-coupon").fadeOut();
    }
  });

  // Checkout login / register
  // ----------------------------------------------------------------

  var loginWrapper = $(".login-wrapper"),
    loginBtn = loginWrapper.find(".btn-login"),
    regBtn = loginWrapper.find(".btn-register"),
    signUp = loginWrapper.find(".login-block-signup"),
    signIn = loginWrapper.find(".login-block-signin");

  loginBtn.on("click", function () {
    signIn.slideDown();
    signUp.slideUp();
  });

  regBtn.on("click", function () {
    signIn.slideUp();
    signUp.slideDown();
  });

  // Range slider
  // ----------------------------------------------------------------

  $("#range-price-slider").ionRangeSlider({
    type: "double",
    min: 0,
    max: 2000,
    //grid: true,
    from: 500,
    to: 1500,
    prefix: "$",
    //force_edges: true
  });

  // Team members hover effect
  // ----------------------------------------------------------------

  var $member = $(".team article");
  $member.on({
    mouseenter: function (e) {
      $member.addClass("inactive");
      $(this).addClass("active");
    },
    mouseleave: function (e) {
      $member.removeClass("inactive");
      $(this).removeClass("active");
    },
  });

  // Single page navigation (scroll to)
  // ----------------------------------------------------------------

  if ($("nav").hasClass("navbar-single-page")) {
    var $singleHyperlink = $(".navigation-main a");

    $singleHyperlink.on("click", function () {
      $singleHyperlink.removeClass("current");

      $(this).addClass("current");

      $("html, body").animate(
        {
          scrollTop:
            $($(this).attr("href")).offset().top -
            $(".navigation-main").height(),
        },
        500
      );
      return false;
    });

    // Magnific popup scroll to content
    // ----------------------------------------------------------------

    $(".mfp-open-scrollto").on("click", function () {
      $("html,body").animate(
        {
          scrollTop: $(".mfp-content").offset().top - 200,
        },
        300
      );
      return false;
    });
  }

  // Easy pie chart
  // ----------------------------------------------------------------

  // $('.chart').easyPieChart({
  //     easing: 'easeOutBounce',
  //     onStep: function (from, to, percent) {
  //         $(this.el).find('.percent').text(Math.round(percent));
  //     },
  //     barColor: '#ffdc11',
  //     trackColor: '#dddddd',
  //     lineCap: 'square',
  //     lineWidth: 4,
  //     scaleLength: 0,
  //     size: 80
  // });

  // Hover3d
  // ----------------------------------------------------------------

  if ($(window).width() > 1200) {
    $("[data-3d]").tilt({
      glare: true,
      maxTilt: 3,
      maxGlare: 1,
    });
  }

  // Set Big Text
  // ----------------------------------------------------------------

  $(".big-text").bigtext();
});

$(window).on("load", function () {
  // Set timeout for page loader

  setTimeout(function () {
    $(".page-loader").addClass("loaded");
  }, 1000);

  // Adjust height of tabsy gallery

  if ($(window).width() > 992) {
    $(window).on("resize", function () {
      //adjustTabsyHeight();
    });

    //adjustTabsyHeight();

    // Height function

    //function adjustTabsyHeight() {
    //    var navheight = $('nav').height(),
    //        icoheight = $('.owl-icons-wrapper').height();

    //    // Set tabsy height
    //    $('.tabsy-wrapper-intro .tabsy figure').css("height", $(window).height() - navheight - icoheight);

    //}
  }
});
// swiper
var Consultants = new Swiper(".Consultants", {
  loop: true,
  spaceBetween: 40,
  slidesPerView: 1,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    },
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var suggestion = new Swiper(".suggestion", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1.3,
  breakpoints: {
    768: {
      slidesPerView: 2.3,
    },
    992: {
      slidesPerView: 3.3,
    },
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var suggestModal = new Swiper(".suggestModal", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiper = new Swiper(".smallImgs", {
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".gallery", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
var vertical = new Swiper(".vertical", {
  direction: "vertical",
  loop: true,
  spaceBetween: 0,
  slidesPerView: 1,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//
let products = {
  clothes: {
    index: 0,
    price: [10000, 20000, 30000, 40000, 50000],
  },
  mechanism: { isSelected: false, price: 10000 },
  nightstand: { isSelected: false, price: 10000 },
  trawers: {
    index: 0,
    price: [10000, 20000, 30000, 40000, 50000],
  },
  badSize: {
    index: 0,
    price: [10000, 20000, 30000, 40000],
  },
  rockType: {
    index: 0,
    price: [10000, 20000],
  },
  baseType: {
    index: 0,
    price: [10000, 20000],
  },
};

const openDropdown = Array.from(
  document.getElementsByClassName("openDropdown")
);
const dropdownItem = Array.from(
  document.querySelectorAll(".dropdownMenu >div")
);
const productPcs = document.querySelector(".productPcs");
let pricesArr = [];
const collectPrcies = () => {
  const priceInput = document.getElementById("price");
  let result = 0;
  for (const key in products) {
    if (key !== "mechanism" && key !== "nightstand")
      result += products[key].price[products[key].index];
    if (products[key].isSelected) {
      result += products[key].price;
    }
  }
  productPcs.value
    ? (priceInput.value = result * Number(productPcs.value))
    : (priceInput.value = result);
};
const collectCondetions = (item, index, child) => {
  for (const key in products) {
    if (
      item.children[2].classList.contains(key) &&
      key !== "mechanism" &&
      key !== "nightstand"
    ) {
      products[key].index = index;
    }
  }
  if (item.children[2].classList.contains("nightstand")) {
    if (child.classList.contains("without"))
      products.nightstand.isSelected = false;
    else products.nightstand.isSelected = true;
  } else if (item.children[2].classList.contains("mechanism")) {
    if (child.classList.contains("without"))
      products.mechanism.isSelected = false;
    else products.mechanism.isSelected = true;
  }
};
collectPrcies();
openDropdown.forEach((item) => {
  [...item.children[2].children].forEach((child, index) => {
    child.addEventListener("click", () => {
      collectCondetions(item, index, child);
      collectPrcies();
    });
  });
  item.addEventListener("click", function () {
    item.querySelector(".dropdownMenu").classList.toggle("active");
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".openDropdown")) {
        item.querySelector(".dropdownMenu").classList.remove("active");
      }
    });
  });
});
productPcs.addEventListener("keyup", (e) => {
  if (/\d+/.test(productPcs.value) && !/^0/.test(productPcs.value)) {
    collectPrcies(true);
  }
});

dropdownItem.forEach((item) => {
  item.addEventListener("click", function () {
    let itemText = item.querySelector("p").textContent;
    let itemImg = item.querySelector("img").src;
    item.parentElement.parentElement.querySelector(".name").textContent =
      itemText;
    item.parentElement.parentElement.querySelector(".img").src = itemImg;
  });
});

$(".modal#suggestionModal").on("shown.bs.modal", function () {
  window.dispatchEvent(new Event("resize"));
});

// hotspot
$("#theElement-0").hotspot({
  data: [
    {
      x: 32.975781250000004,
      y: 30.447309176672384,
      img: `<div><img src="assets/images/motto-kose-koltuk-6.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 76.57578125,
      y: 37.15056818181818,
      img: `<div><img src="assets/images/news-yan-sehpa-4.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 76.57578125,
      y: 55.15056818181818,
      img: `<div><img src="assets/images/vega-berjer-13.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 70.57578125,
      y: 64.15056818181818,
      img: `<div><img src="assets/images/carya-c-sehpa-5.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 46.57578125,
      y: 62.15056818181818,
      img: `<div><img src="assets/images/black-orta-sehpa-4.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
  ],
  interactivity: "hover",
});
$("#theElement-1").hotspot({
  data: [
    {
      x: 42.975781250000004,
      y: 30.447309176672384,
      img: `<div><img src="assets/images/kubik-kanepe-4.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 76.57578125,
      y: 30.15056818181818,
      img: `<div><img src="assets/images/news-yan-sehpa-4.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 76.57578125,
      y: 55.15056818181818,
      img: `<div><img src="assets/images/lins-berjer-62.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 67.57578125,
      y: 80.15056818181818,
      img: `<div><img src="assets/images/hermes-yan-sehpa-32.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 49.57578125,
      y: 58.15056818181818,
      img: `<div><img src="assets/images/news-orta-sehpa-6.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
    {
      x: 33.57578125,
      y: 45.15056818181818,
      img: `<div><img src="assets/images/vinca-c-sehpa-3.jpg"></div>`,
      Title: "بوفه",
      Message: "این متن تستی است.",
    },
  ],
  interactivity: "hover",
});
