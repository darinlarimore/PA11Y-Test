// CSS and SASS files
import Promise from 'promise-polyfill';
import './index.scss';


// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

// if ( document.location.pathname == '/Experience/Chefs/' ) {
//   System.import('./components/load-more');
// }

if ( document.location.pathname == '/Experience/Chefs/' ) {
  System.import('./components/featured-chefs');
}

if ( document.location.pathname == '/Experience/' ) {
  System.import('./components/light-box');
}

System.import('./components/scroll-top');
