import Isotope from 'isotope-layout';



let chefs = document.querySelectorAll('[data-chef-container]'),
  chefsFilter = document.querySelector('[data-chef-filter]'),
  restaurantFilter = document.querySelector('[data-restaurant-filter]'),
  chefNames = document.querySelectorAll('[data-chef]'),
  restaurantNames = document.querySelectorAll('[data-restaurant]'),
  grid = document.querySelector('[data-isotope]'),
  iso = new Isotope( grid, {
    itemSelector: '.featured-chefs__container',
    masonry: {
      columnWidth: '.featured-chefs__container',
      fitWidth: true
    },
    getSortData: {
      chef: '[data-chef]', // text from querySelector
      restaurant: function( itemElem ) {
        let restaurantNames = itemElem.getAttribute('data-restaurant')
        return restaurantNames.replace( /The /g, '');
      }
    }
  });

// reveal the gallery after content is loaded to prevent fouc
window.onload = function () {
  grid.classList.remove('hidden');
  iso.layout();
};

// convert nodelist to array
chefs = Array.prototype.slice.call(chefs, 0);
restaurantNames = Array.prototype.slice.call(restaurantNames, 0);

// on click filters
chefsFilter.addEventListener('click', filterByChef);
restaurantFilter.addEventListener('click', filterByRestaurant);

chefs.forEach(function (item) {
  item.addEventListener('click', clicked);
});

chefs.forEach(function (item) {
  item.addEventListener('mouseover', hoverOn);
  item.addEventListener('mouseout', hoverOff);
});

function clicked() {
  for (var i = 0; i < chefs.length; ++i) {
    let item = chefs[i];
    if (item !== this) {
      hide(item);
    } else {
      reveal(item);
    }
  }
}

function hide(others) {
  let description = others.querySelector('[data-chef-description]'),
  imageOverlay = others.querySelector('.featured-chefs__image__overlay'),
  chef = others,
  descriptionOverlay = others.querySelector('.featured-chefs__description__overlay');

  chef.classList.remove('featured-chefs__container--expanded');
  description.classList.add('featured-chefs__description--hidden');
  description.classList.remove('featured-chefs__description--bottom');
  description.classList.remove('featured-chefs__description--right');
  description.classList.remove('featured-chefs__description--left');
  imageOverlay.classList.remove('featured-chefs__image__overlay--hover');
  descriptionOverlay.classList.remove('featured-chefs__description__overlay--hover-right');
  descriptionOverlay.classList.remove('featured-chefs__description__overlay--hover-left');
  iso.layout();
}

function reveal(item) {
  let description = item.querySelector('[data-chef-description]'),
    imageOverlay = item.querySelector('.featured-chefs__image__overlay'),
    descriptionOverlay = item.querySelector('.featured-chefs__description__overlay'),
    chef = item,
    position = imageOverlay.getBoundingClientRect(),
    windowWidth = document.body.clientWidth,
    boxFromLeft = (windowWidth - position.left - position.width);

  if ( windowWidth < 721) {
    chef.classList.toggle('featured-chefs__container--expanded');
    description.classList.toggle('featured-chefs__description--bottom');
  } else {
    if ( boxFromLeft < 350) {
      description.classList.toggle('featured-chefs__description--right');
      descriptionOverlay.classList.toggle('featured-chefs__description__overlay--hover-left');
    } else {
      description.classList.toggle('featured-chefs__description--left');
      descriptionOverlay.classList.toggle('featured-chefs__description__overlay--hover-right');
    }
  }
  iso.layout();
  description.classList.toggle('featured-chefs__description--hidden');
  imageOverlay.classList.add('featured-chefs__image__overlay--hover');
}

function filterByChef() {
  iso.arrange({ sortBy: 'chef' });
  this.classList.add('btn-active');
  restaurantFilter.classList.remove('btn-active');
  closeAll();
}

function filterByRestaurant() {
  iso.arrange({ sortBy: 'restaurant' });
  this.classList.add('btn-active');
  chefsFilter.classList.remove('btn-active');
  closeAll();
}

function closeAll() {
  chefs.forEach(function (item) {
    hide(item);
  });
}

function hoverOn() {
  let imageOverlay = this.querySelector('.featured-chefs__image__overlay');
  imageOverlay.classList.add('featured-chefs__image__overlay--hover');
}

function hoverOff() {
  let imageOverlay = this.querySelector('.featured-chefs__image__overlay'),
    descriptionBottom = this.querySelector('.featured-chefs__description--bottom'),
    descriptionRight = this.querySelector('.featured-chefs__description--right'),
    descriptionLeft = this.querySelector('.featured-chefs__description--left');

  if (descriptionRight || descriptionLeft || descriptionBottom) {
  } else {
    imageOverlay.classList.remove('featured-chefs__image__overlay--hover');
  }
}

// closes and reconfigures layout on resize
window.addEventListener('resize', function(event){
  iso.layout();
  closeAll();
});
