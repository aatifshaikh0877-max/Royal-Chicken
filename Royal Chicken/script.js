/* =====================================================
   ROYAL CHICKEN - SCRIPT.JS
   Firebase + Cart + Orders + Search + Payment
   DELIVERY CHARGE: NOT ADDED TO CART TOTAL
===================================================== */


/* =========================
   FIREBASE
========================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey:
        "AIzaSyB8sETr78mZtqlL__3DMz96AYffpSQaFqM",

    authDomain:
        "royal-chicken-72041.firebaseapp.com",

    projectId:
        "royal-chicken-72041",

    storageBucket:
        "royal-chicken-72041.firebasestorage.app",

    messagingSenderId:
        "714795473212",

    appId:
        "1:714795473212:web:43398c557fa5db62ede639",

    measurementId:
        "G-SQ1EV5E1VZ"
};


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


/* =========================
   CART
========================= */

let cart = [];


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingItem =
        cart.find(
            item =>
                item.name === name
        );

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


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    let subtotal = 0;

    let itemCount = 0;


    /* =========================
       EMPTY CART
    ========================= */

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    /* =========================
       CART ITEMS
    ========================= */

    cart.forEach(
        function(item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            subtotal +=
                itemTotal;


            itemCount +=
                item.quantity;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <div class="cart-item-name">

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            ₹${item.price} / kg
                        </span>

                    </div>


                    <div class="cart-actions">

                        <button
                            type="button"
                            onclick="decreaseItem(${index})"
                        >
                            −
                        </button>


                        <span class="quantity">
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            onclick="increaseItem(${index})"
                        >
                            +
                        </button>


                        <button
                            type="button"
                            class="remove-btn"
                            onclick="removeItem(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;
        }
    );


    /* =========================
       CART COUNT
    ========================= */

    if (cartCount) {

        cartCount.textContent =
            itemCount;

    }


    /* =================================================
       IMPORTANT:
       NO DELIVERY CHARGE IS ADDED HERE
       TOTAL = SUBTOTAL
    ================================================= */

    if (cartTotal) {

    if (cart.length > 0) {

        cartTotal.innerHTML = `

            <div class="cart-total-row">

                <span>
                    Total
                </span>

                <strong>
                    ₹${subtotal}
                </strong>

            </div>

        `;

    } else {

        cartTotal.innerHTML = "";

    }

}
    /* =========================
       FLOATING CART
    ========================= */

    const floatingCart =
        document.getElementById(
            "floating-cart"
        );

    const floatingCartCount =
        document.getElementById(
            "floating-cart-count"
        );

    const floatingCartTotal =
        document.getElementById(
            "floating-cart-total"
        );


    if (floatingCart) {

        if (cart.length > 0) {

            floatingCart.classList.add(
                "show"
            );


            if (floatingCartCount) {

                floatingCartCount.textContent =
                    itemCount +
                    (
                        itemCount === 1
                            ? " item"
                            : " items"
                    );

            }


            if (floatingCartTotal) {

                floatingCartTotal.textContent =
                    "₹" + subtotal;

            }

        } else {

            floatingCart.classList.remove(
                "show"
            );

        }

    }

}


/* =========================
   INCREASE ITEM
========================= */

function increaseItem(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    updateCart();
}


/* =========================
   DECREASE ITEM
========================= */

function decreaseItem(index) {

    if (!cart[index]) {
        return;
    }


    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();
}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    updateCart();
}


/* =========================
   OPEN CART
========================= */

function openCart() {

    const cartModal =
        document.getElementById(
            "cart-modal"
        );


    if (cartModal) {

        cartModal.style.display =
            "flex";

    }


    updateCart();
}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    const cartModal =
        document.getElementById(
            "cart-modal"
        );


    if (cartModal) {

        cartModal.style.display =
            "none";

    }

}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "product-search"
        );


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(
        function(product) {

            const productName =
                product.querySelector(
                    "h3"
                );


            if (!productName) {
                return;
            }


            const name =
                productName.textContent
                    .toLowerCase();


            if (
                name.includes(
                    searchText
                )
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}


/* =========================
   PLACE ORDER
========================= */

async function placeOrder(event) {

    event.preventDefault();


    /* =========================
       CHECK CART
    ========================= */

    if (cart.length === 0) {

        alert(
            "Please add a product to your cart first."
        );

        return;
    }


    /* =========================
       CUSTOMER DETAILS
    ========================= */

    const name =
        document
            .getElementById(
                "customer-name"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "customer-phone"
            )
            .value
            .trim();


    const address =
        document
            .getElementById(
                "customer-address"
            )
            .value
            .trim();


    /* =========================
       CHECK DETAILS
    ========================= */

    if (
        !name ||
        !phone ||
        !address
    ) {

        alert(
            "Please fill all customer details."
        );

        return;
    }


    /* =========================
       PAYMENT
    ========================= */

    const paymentSelected =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!paymentSelected) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    const paymentMethod =
        paymentSelected.value;


    /* =================================================
       ORDER TOTAL
       DELIVERY CHARGE IS NOT INCLUDED
    ================================================= */

    let total = 0;


    const orderItems =
        cart.map(
            function(item) {

                const itemTotal =
                    item.price *
                    item.quantity;


                total +=
                    itemTotal;


                return {

                    name:
                        item.name,

                    price:
                        item.price,

                    quantity:
                        item.quantity,

                    itemTotal:
                        itemTotal

                };

            }
        );


    /* =========================
       ORDER NUMBER
    ========================= */

    const orderNumber =
        "RC" +
        Date.now()
            .toString()
            .slice(-6);


    /* =========================
       SAVE ORDER TO FIREBASE
    ========================= */

    try {

        const orderData = {

            orderNumber:
                orderNumber,

            customerName:
                name,

            phone:
                phone,

            address:
                address,

            paymentMethod:
                paymentMethod,

            items:
                orderItems,

            total:
                total,

            status:
                "Pending",

            createdAt:
                serverTimestamp()

        };


        await addDoc(
            collection(
                db,
                "orders"
            ),
            orderData
        );


        /* =========================
           SUCCESS MESSAGE
        ========================= */

        const cartItems =
            document.getElementById(
                "cart-items"
            );


        if (cartItems) {

            let orderedProducts =
                "";


            orderItems.forEach(
                function(item) {

                    orderedProducts += `

                        <div class="ordered-product">

                            <div class="ordered-product-info">

                                <strong>
                                    ${item.name}
                                </strong>

                                <span>
                                    ${item.quantity} kg × ₹${item.price}
                                </span>

                            </div>


                            <strong
                                class="ordered-product-price"
                            >
                                ₹${item.itemTotal}
                            </strong>

                        </div>

                    `;

                }
            );


            cartItems.innerHTML = `

                <div class="thank-you-box">

                    <div class="thank-you-icon">
                        ✓
                    </div>


                    <h2>
                        Order Placed Successfully!
                    </h2>


                    <p class="success-message">
                        Thank you, ${name}!
                    </p>


                    <div class="order-number-box">

                        <span>
                            Order Number
                        </span>

                        <strong>
                            ${orderNumber}
                        </strong>

                    </div>


                    <div class="order-section">

                        <h3>
                            Order Summary
                        </h3>


                        ${orderedProducts}


                        <div class="order-total">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹${total}
                            </strong>

                        </div>

                    </div>


                    <div class="customer-details">

                        <div class="detail-row">

                            <span>
                                Payment
                            </span>

                            <strong>
                                ${paymentMethod}
                            </strong>

                        </div>


                        <div class="detail-row">

                            <span>
                                Phone
                            </span>

                            <strong>
                                ${phone}
                            </strong>

                        </div>


                        <div class="detail-row address-row">

                            <span>
                                Delivery Address
                            </span>

                            <strong>
                                ${address}
                            </strong>

                        </div>

                    </div>


                    <div class="delivery-message">

                        <strong>
                            Your order has been received!
                        </strong>


                        <p>
                            We will prepare your order fresh
                            and deliver it to your doorstep.
                        </p>


                        <p>
                            Delivery charge: ₹15 per km.
                        </p>

                    </div>


                    <div class="royal-name">
                        🍗 Royal Chicken
                    </div>

                </div>

            `;

        }


        /* =========================
           CLEAR CART TOTAL
        ========================= */

        const cartTotal =
            document.getElementById(
                "cart-total"
            );


        if (cartTotal) {

            cartTotal.innerHTML = "";

        }


        /* =========================
           CLEAR CART
        ========================= */

        cart = [];


        /* =========================
           CART COUNT
        ========================= */

        const cartCount =
            document.getElementById(
                "cart-count"
            );


        if (cartCount) {

            cartCount.textContent =
                "0";

        }


        /* =========================
           HIDE FLOATING CART
        ========================= */

        const floatingCart =
            document.getElementById(
                "floating-cart"
            );


        if (floatingCart) {

            floatingCart.classList.remove(
                "show"
            );

        }


    } catch (error) {

        console.error(
            "Firebase order error:",
            error
        );


        alert(
            "Order place nahi ho paya. Please try again."
        );

    }

}


/* =========================
   UPI PAYMENT
========================= */

function showUPI() {

    const upi =
        document.getElementById(
            "upi-payment"
        );


    if (upi) {

        upi.style.display =
            "block";

    }

}


function hideUPI() {

    const upi =
        document.getElementById(
            "upi-payment"
        );


    if (upi) {

        upi.style.display =
            "none";

    }

}


/* =========================
   MAKE FUNCTIONS AVAILABLE
   TO HTML
========================= */

window.addToCart =
    addToCart;

window.increaseItem =
    increaseItem;

window.decreaseItem =
    decreaseItem;

window.removeItem =
    removeItem;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.searchProducts =
    searchProducts;

window.placeOrder =
    placeOrder;

window.showUPI =
    showUPI;

window.hideUPI =
    hideUPI;


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);