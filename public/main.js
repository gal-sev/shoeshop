import { generateShoes } from "./collections/collections.js";
import { generateShoePage } from "./shoePage/shoePage.js";
import { generateHomePage } from "./home/home.js";

window.addEventListener('load', function() {
  const searchString = window.location.search;
  const urlParams = new URLSearchParams(searchString);
  const _id = urlParams.get('_id');
  const page = urlParams.get('page');

  switch (page) {
    case 'collections':
      generateShoes();
      break;
    case 'shoePage':
      generateShoePage(_id);
      break;
    default:
      generateHomePage();
      break;
  }
});