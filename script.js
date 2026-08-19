let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }

    cart.forEach(function(item, index) {

        total += item.price * item.quantity;
        itemCount += item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-name">

                    <strong>${item.name}</strong>

                    <span>
                        ₹${item.price} / kg
                    </span>

                </div>

                <div class="cart-actions">

                    <button
                        type="button"
                        onclick="decreaseItem(${index})">
                        −
                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="increaseItem(${index})">
                        +
                    </button>

                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        `;

    });

    if (cartCount) {
        cartCount.textContent = itemCount;
    }

    if (cartTotal) {
        cartTotal.textContent = "Total: ₹" + total;
    }
    const floatingCart =
    document.getElementById("floating-cart");

const floatingCartCount =
    document.getElementById("floating-cart-count");

const floatingCartTotal =
    document.getElementById("floating-cart-total");


if (floatingCart) {

    if (cart.length > 0) {

        floatingCart.classList.add("show");

        floatingCartCount.textContent =
            itemCount + (itemCount === 1 ? " item" : " items");

        floatingCartTotal.textContent =
            "₹" + total;

    } else {

        floatingCart.classList.remove("show");

    }

}
}


function increaseItem(index) {

    cart[index].quantity++;

    updateCart();

}


function decreaseItem(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


function openCart() {

    const cartModal =
        document.getElementById("cart-modal");

    if (cartModal) {

        cartModal.style.display = "flex";

    }

    updateCart();

}


function closeCart() {

    const cartModal =
        document.getElementById("cart-modal");

    if (cartModal) {

        cartModal.style.display = "none";

    }

}


document.addEventListener("DOMContentLoaded", function() {

    updateCart();

});function placeOrder(event) {
    

   event.preventDefault();

    if (cart.length === 0) {
        alert("Please add a product to your cart first.");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

     let message = "🍗 *ROYAL CHICKEN - NEW ORDER*\n\n";

    message += "👤 Customer: " + name + "%0A";
    message += "📞 Phone: " + phone + "%0A";
    message += "📍 Address: " + address + "%0A%0A";
    const paymentMethod =
    document.querySelector('input[name="payment"]:checked').value;

    message += "*ORDER DETAILS:*%0A";

    let total = 0;

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " kg = ₹" +
            itemTotal +
            "%0A";

    });

   message += "\n\n💰 *TOTAL: ₹" + total + "*";
message += "\n💳 Payment: " + paymentMethod + "\n\n";

    const whatsappNumber = "918200348170";

    const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);


    // THANK YOU MESSAGE
    document.getElementById("cart-items").innerHTML = `
    <div class="thank-you-box">

        <div class="thank-you-icon">🎉</div>

        <h2>THANK YOU FOR YOUR ORDER!</h2>

        <p class="success-message">
            Your order has been received successfully.
        </p>

        <p class="delivery-message">
            Your order will be delivered fresh to your doorstep
            within a maximum of 30 to 45 minutes.
        </p>

        <div class="royal-name">
            🍗 Royal Chicken
        </div>

    </div>
`;

    document.getElementById("cart-total").textContent = "";


    // OPEN WHATSAPP
    window.open(whatsappURL, "_blank");

}
function showUPI() {

    document.getElementById("upi-payment").style.display = "block";

}


function hideUPI() {

    document.getElementById("upi-payment").style.display = "none";

}function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add a product to your cart first.");
        return;
    }

    const name =
        document.getElementById("customer-name").value;

    const phone =
        document.getElementById("customer-phone").value;

    const address =
        document.getElementById("customer-address").value;


    // PAYMENT METHOD
    const paymentSelected =
        document.querySelector('input[name="payment"]:checked');

    if (!paymentSelected) {
        alert("Please select a payment method.");
        return;
    }

    const paymentMethod =
        paymentSelected.value;


    // WHATSAPP MESSAGE
    let message =
        "🍗 *ROYAL CHICKEN - NEW ORDER*\n\n";

    message +=
        "👤 Customer: " + name + "\n";

    message +=
        "📞 Phone: " + phone + "\n";

    message +=
        "📍 Address: " + address + "\n\n";


    message +=
        "*ORDER DETAILS:*\n";


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " kg = ₹" +
            itemTotal +
            "\n";

    });


    message +=
        "\n💰 *TOTAL: ₹" +
        total +
        "*\n";

    message +=
        "💳 Payment: " +
        paymentMethod +
        "\n\n";

    message +=
        "🚚 Delivery: Within 30 to 45 minutes";


    // ROYAL CHICKEN WHATSAPP NUMBER
    const whatsappNumber =
        "918200348170";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    // THANK YOU MESSAGE
    document.getElementById("cart-items").innerHTML = `

        <div class="thank-you-box">

            <div class="thank-you-icon">
                🎉
            </div>

            <h2>
                THANK YOU FOR YOUR ORDER!
            </h2>

            <p class="success-message">
                Your order has been received successfully.
            </p>

            <p class="delivery-message">
                Your order will be delivered fresh to your doorstep
                within a maximum of 30 to 45 minutes.
            </p>

            <div class="royal-name">
                🍗 Royal Chicken
            </div>

        </div>

    `;


    document.getElementById("cart-total").textContent = "";


    // OPEN WHATSAPP
    window.open(
        whatsappURL,
        "_blank"
    );

}/* ================= CUSTOMER REVIEW ================= */

let selectedRating = 0;

function selectRating(rating) {

    selectedRating = rating;

    const stars = document.querySelectorAll(".rating button");

    stars.forEach(function(star, index) {

        if (index < rating) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }

    });

    document.getElementById("rating-text").textContent =
        rating + " / 5 Stars";
}


function submitReview() {

    const name =
        document.getElementById("review-name").value.trim();

    const review =
        document.getElementById("review-message").value.trim();

    if (selectedRating === 0) {
        alert("Please select a rating.");
        return;
    }

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (review === "") {
        alert("Please write your review.");
        return;
    }

    const whatsappNumber = "918200348170";

    const message =
        "🍗 *ROYAL CHICKEN - CUSTOMER REVIEW*%0A%0A" +
        "👤 Name: " + name + "%0A" +
        "⭐ Rating: " + selectedRating + "/5%0A" +
        "💬 Review: " + review;

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    document.getElementById("review-success").textContent =
        "Thank you for your review! ❤️";

    window.open(whatsappURL, "_blank");
}