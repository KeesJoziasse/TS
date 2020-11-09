let myName = "Kees";
let myAge = 23;
const productPrices = [2.10, 4.99, 5.60, 0.40, 5.44, 7.33, 2.33, 2.49, 2.10];
function calculateTotal() {
    const productSum = productPrices.reduce(function (a, b) {
        return a + b;
    }, 0);
    console.log(productSum);
}
calculateTotal();
//# sourceMappingURL=app.js.map