export async function generateHomePage() {
  const itemsContainer = document.createElement('div');
  itemsContainer.id = 'itemsContainer';
  itemsContainer.classList.add('itemsContainer');

  const homeTitle = document.createElement('h4');
  homeTitle.classList.add('Homepage');
  homeTitle.innerText = "Homepage here..";

  //TODO: insert some image / video
  //TODO: insert statistics?...

  itemsContainer.appendChild(homeTitle);
  
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
    main.appendChild(itemsContainer);
  }
}
  


