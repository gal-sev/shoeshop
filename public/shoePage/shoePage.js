window.addEventListener('load', function() {
    generateShoes();
});

async function generateShoes() {
    let res = await axios.get('http://localhost:8080/getshoes');
    const shoes = res.data;
    const itemsContainer = document.getElementById('itemsContainer');

}


