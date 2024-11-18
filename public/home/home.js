export function generateHomePage() {
    $.ajax({
        url: 'http://localhost:8080/getStocks',
        method: 'GET',
        success: function (stocks) {
            const itemsContainer = $('<div>', {
                id: 'itemsContainer',
                class: 'itemsContainer'
            });

            const col = $('<div>', { class: 'column' });
            const row = $('<div>', { class: 'row' });

            const homeTitle = $('<h4>', {
                class: 'homepage',
                text: 'Total stock for each type of shoe:' 
            });

            col.append(homeTitle, row);
            itemsContainer.append(col);

            if (stocks.length == 0 || !stocks) {
                const noStocksTitle = $('<p>', {
                    class: 'shoeHSmall',
                    text: "0 stock, shoes not found"
                });
                itemsContainer.append(noStocksTitle);
            } else {
                stocks.forEach(stock => {
                    const shoeDiv = $('<div>', { class: 'shoe' });
    
                    const stockTitle = $('<p>', {
                        class: 'stockTitle',
                        text: stock.shoeType
                    });
    
                    const totalStock = $('<p>', {
                        class: 'stockP',
                        text: `Total stock: ${stock.totalStock}`
                    });
    
                    const shoes = $('<p>', {
                        class: 'stockP',
                        text: `Shoes in stock: ${stock.shoes}`
                    });
                    
                    shoeDiv.append(stockTitle, totalStock, shoes);
                    row.append(shoeDiv);
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