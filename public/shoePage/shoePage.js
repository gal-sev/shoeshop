function createRow(titleText, innerText, className, idName) {
    const row = $('<div>', { class: 'row' });

    const title = $('<p>', {
        class: className,text: titleText
    });

    const inner = $('<p>', {
        class: className,
        id: idName,
        text: innerText
    });

    row.append(title, inner);
    return row;
}

export function generateShoePage(_id) {
    $.ajax({
        url: 'http://localhost:8080/getshoes/' + _id,
        method: 'GET',
        success: function (response) {
            const shoe = response[0];
            const itemsContainer = $('<div>', {
                id: 'itemsContainer',
                class: 'itemsContainer'
            });

            if (!shoe) {
                const shoeNotFound = $('<p>', {
                    class: 'shoeHSmall',
                    text: "Shoe not found"
                });
                itemsContainer.append(shoeNotFound);
            } else {
                const shoeImg = $('<img>', {
                    class: 'shoeImg',
                    src: shoe.imgsrc,
                    width: 400,
                    height: 400
                });
                const columnDiv = $('<div>', { class: 'column' });
                const shoeTitle = $('<h4>', {
                    class: 'shoeH',
                    text: shoe.name
                });
                
                // Using the createRow function above to generate each row
                const descriptionRow = createRow('description: ', shoe.description, 'shoeDescription', 'shoeDescription');
                const sizeRow = createRow('size: ', shoe.size, 'shoeSize', 'shoeSize');
                const brandRow = createRow('brand: ', shoe.brand, 'shoeBrand', 'shoeBrand');
                const typeRow = createRow('shoe type: ', shoe.shoeType, 'shoeType', 'shoeType');
                const lacesRow = createRow('laces: ', shoe.laces ? 'included' : 'not included', 'shoeLaces', 'shoeLaces');
                const stockRow = createRow('stock: ', shoe.stock, 'shoeStock', 'shoeStock');
                
                const priceContainer = $('<div>', { class: 'priceContainer' });
                const shoePrice = $('<p>', {
                    class: 'shoePrice',
                    text: shoe.price + "$"
                });
                priceContainer.append(shoePrice);
    
                const buttonsContainer = $('<div>', { class: 'buttonsContainer' });
                const icons = ['shopping-cart', 'edit', 'trash'];
                icons.forEach(icon => {
                    const iconImg = $('<img>', {
                        class: 'iconImg',
                        src: `./assets/${icon}.png`,
                        width: 32,
                        height: 32
                    });
                    switch (icon) {
                        case 'shopping-cart':
                            iconImg.on('click', function () {
                                // TODO: Implement shopping cart logic
                                alert("Added to shopping cart event (wip)");
                            });
                            break;
                        case 'edit':
                            iconImg.on('click', function () {
                                // TODO: Implement edit logic
                                alert("Edit event (wip)");
                            });
                            break;
                        case 'trash':
                            iconImg.on('click', function () {
                                $.ajax({
                                    url: 'http://localhost:8080/delete/',
                                    method: 'POST',
                                    contentType: 'application/json',
                                    data: JSON.stringify({ _id: _id }),
                                    success: function () {
                                        // Move back to collections page after deletion
                                        window.location.href = "./main.html?page=collections";
                                    },
                                    error: function (err) {
                                        console.error('Error deleting shoe:', err);
                                    }
                                });
                            });
                            break;
                        default:
                            break;
                    }
                    buttonsContainer.append(iconImg);
                });
                
                columnDiv.append(
                    shoeTitle,
                    shoeImg,
                    descriptionRow,
                    sizeRow,
                    brandRow,
                    typeRow,
                    lacesRow,
                    stockRow,
                    priceContainer,
                    buttonsContainer
                );
    
                itemsContainer.append(columnDiv);
            }

            const main = $('main');
            if (main) {
                main.empty();
                main.append(itemsContainer);
            }
        },
        error: function (err) {
            console.error('Error fetching shoe:', err);
        }
    });
}