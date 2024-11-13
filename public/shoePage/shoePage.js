window.addEventListener('load', function() {
    const searchString = window.location.search;
    const urlParams = new URLSearchParams(searchString);
    const _id = urlParams.get('_id');
    generateShoePage(_id);
});

function createRow(titleText, innerText, className, idName) {
    const row = document.createElement('div');
    row.classList.add('row');

    const title = document.createElement('p');
    title.classList.add(className);
    title.textContent = titleText;

    const inner = document.createElement('p');
    inner.classList.add(className);
    inner.id = idName;
    inner.textContent = innerText;

    row.appendChild(title);
    row.appendChild(inner);
    return row;
  }

async function generateShoePage(_id) {
    let res = await axios.get('http://localhost:8080/getshoes/' + _id); 
    //TODO: add the body with the id to this one
    const shoe = res.data[0];

    const itemsContainer = document.createElement('div');
    itemsContainer.id = 'itemsContainer';
    itemsContainer.classList.add('itemsContainer');
  
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
  
    const shoeImg = document.createElement('img');
    shoeImg.classList.add('shoeImg');
    shoeImg.src = shoe.imgsrc;
    shoeImg.width = 400;
    shoeImg.height = 400;
  
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
  
    const shoeTitle = document.createElement('h4');
    shoeTitle.classList.add('shoeH');
    shoeTitle.textContent = shoe.name;
  
    const descriptionRow = createRow('description: ', shoe.description, 'shoeDescription', 'shoeDescription');
    const sizeRow = createRow('size: ', shoe.size, 'shoeSize', 'shoeSize');
    const brandRow = createRow('brand: ', shoe.brand, 'shoeBrand', 'shoeBrand');
    const typeRow = createRow('shoe type: ', shoe.shoeType, 'shoeType', 'shoeType');
    const lacesRow = createRow('laces: ', shoe.laces ? 'included' : 'not included', 'shoeLaces', 'shoeLaces');
    const stockRow = createRow('stock: ', shoe.stock, 'shoeStock', 'shoeStock');
  
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('priceContainer');
  
    const shoePrice = document.createElement('p');
    shoePrice.classList.add('shoePrice');
    shoePrice.textContent = shoe.price + "$";
    priceContainer.appendChild(shoePrice);
  
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');
  
    const icons = ['shopping-cart', 'edit', 'trash'];
    icons.forEach(icon => {
      const iconImg = document.createElement('img');
      iconImg.classList.add('iconImg');
      iconImg.src = `../assets/${icon}.png`;
      iconImg.width = 32;
      iconImg.height = 32;
      buttonsContainer.appendChild(iconImg);
    });

    columnDiv.appendChild(shoeTitle);
    columnDiv.appendChild(descriptionRow);
    columnDiv.appendChild(sizeRow);
    columnDiv.appendChild(brandRow);
    columnDiv.appendChild(typeRow);
    columnDiv.appendChild(lacesRow);
    columnDiv.appendChild(stockRow);
    columnDiv.appendChild(priceContainer);
    columnDiv.appendChild(buttonsContainer);
    rowDiv.appendChild(shoeImg);
    rowDiv.appendChild(columnDiv);
    itemsContainer.appendChild(rowDiv);
    document.body.appendChild(itemsContainer);
  }
  


