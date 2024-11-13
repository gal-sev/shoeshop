window.addEventListener('load', function() {
    generateShoes();
});

async function generateShoes() {
    let res = await axios.get('http://localhost:8080/getshoes');
    const shoes = res.data;
    const itemsContainer = document.getElementById('itemsContainer');

    shoes.forEach(shoe => {
    const shoeDiv = document.createElement('div');
    shoeDiv.classList.add('shoe');

    const shoeImg = document.createElement('img');
    shoeImg.classList.add('shoeImg');
    shoeImg.src = shoe.imgsrc;
    shoeImg.width = 200;
    shoeImg.height = 200;

    const shoeTitle = document.createElement('p');
    shoeTitle.classList.add('shoeH');
    shoeTitle.textContent = shoe.name;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('priceContainer');

    const shoePrice = document.createElement('p');
    shoePrice.classList.add('shoePrice');
    shoePrice.textContent = `${shoe.price}$`;

    const cartImg = document.createElement('img');
    cartImg.classList.add('cartImg');
    cartImg.src = '../assets/shopping-cart.png';
    cartImg.width = 32;
    cartImg.height = 32;

    priceContainer.appendChild(shoePrice);
    priceContainer.appendChild(cartImg);
    shoeDiv.appendChild(shoeImg);
    shoeDiv.appendChild(shoeTitle);
    shoeDiv.appendChild(priceContainer);
    itemsContainer.appendChild(shoeDiv);
    });
}


