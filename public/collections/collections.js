export function generateShoes() {
    $.ajax({
        url: 'http://localhost:8080/getshoes/all',
        method: 'GET',
        success: function (shoes) {
            const itemsContainer = $('<div>', {
                id: 'itemsContainer',
                class: 'itemsContainer'
            });

            if (shoes.length == 0 || !shoes) {
                const noShoesTitle = $('<p>', {
                    class: 'shoeHSmall',
                    text: "Shoes not found"
                });
                itemsContainer.append(noShoesTitle);
            } else {
                shoes.forEach(shoe => {
                    const gotoShoeAn = $('<a>', {
                        class: 'gotoShoeAn',
                        href: `./main.html?page=shoePage&_id=${shoe._id}`
                    });
    
                    const shoeDiv = $('<div>', { class: 'shoe' });
    
                    const shoeImg = $('<img>', {
                        class: 'shoeImg',
                        src: shoe.imgsrc,
                        width: 200,
                        height: 200
                    });
    
                    const shoeTitle = $('<p>', {
                        class: 'shoeHSmall',
                        text: shoe.name
                    });
    
                    const priceContainer = $('<div>', { class: 'priceContainer' });
    
                    const shoePrice = $('<p>', {
                        class: 'shoePrice',
                        text: `${shoe.price}$`
                    });
    
                    const cartImg = $('<img>', {
                        class: 'iconImg',
                        src: './assets/shopping-cart.png',
                        width: 32,
                        height: 32
                    });
    
                    priceContainer.append(shoePrice, cartImg);
                    shoeDiv.append(shoeImg, shoeTitle, priceContainer);
                    gotoShoeAn.append(shoeDiv);
                    itemsContainer.append(gotoShoeAn);
                });
            }

            const main = $('main');
            if (main) {
                main.empty();
                main.append(itemsContainer);
            }
        },
        error: function (err) {
            console.error('Error fetching shoes:', err);
        }
    });
}