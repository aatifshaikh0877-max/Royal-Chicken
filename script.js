/* =====================================================
   ROYAL CHICKEN - COMPLETE SCRIPT.JS
   Firebase + Cart + Orders + My Orders
   View Order + Cancel Order + Reorder
   Search + Payment
===================================================== */


/* =====================================================
   FIREBASE
===================================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    getDoc,
    updateDoc,
    doc
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


/* =====================================================
   CART
===================================================== */

let cart = [];


/* =====================================================
   ADD TO CART
===================================================== */

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

            name:
                name,

            price:
                price,

            quantity:
                1

        });

    }


    updateCart();
}


/* =====================================================
   UPDATE CART
===================================================== */

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
            '<p class="empty-cart">Your cart is empty.</p>';

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


    /* =========================
       TOTAL
       DELIVERY NOT INCLUDED
    ========================= */

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


/* =====================================================
   INCREASE ITEM
===================================================== */

function increaseItem(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    updateCart();
}


/* =====================================================
   DECREASE ITEM
===================================================== */

function decreaseItem(index) {

    if (!cart[index]) {
        return;
    }


    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(
            index,
            1
        );

    }


    updateCart();
}


/* =====================================================
   REMOVE ITEM
===================================================== */

function removeItem(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    updateCart();
}


/* =====================================================
   OPEN CART
===================================================== */

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


/* =====================================================
   CLOSE CART
===================================================== */

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


/* =====================================================
   SEARCH PRODUCTS
===================================================== */

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


/* =====================================================
   PLACE ORDER
===================================================== */

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
       VALIDATE DETAILS
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
       CREATE ORDER ITEMS
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
       SAVE CUSTOMER PHONE
       FOR MY ORDERS
    ========================= */

    localStorage.setItem(
        "royalChickenPhone",
        phone
    );


    /* =========================
       ORDER DATA
    ========================= */

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


    /* =========================
       SAVE TO FIREBASE
    ========================= */

    try {

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
           CLEAR CART
        ========================= */

        cart = [];


        updateCart();


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


/* =====================================================
   UPI PAYMENT
===================================================== */

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


/* =====================================================
   MY ORDERS
===================================================== */

async function openMyOrders() {

    const modal =
        document.getElementById(
            "orders-modal"
        );


    const content =
        document.getElementById(
            "my-orders-content"
        );


    if (!modal || !content) {

        console.error(
            "My Orders modal/content not found."
        );

        return;
    }


    /* =========================
       OPEN MODAL
    ========================= */

    modal.classList.add(
        "show"
    );


    content.innerHTML = `

        <div class="orders-loading">

            <div style="font-size:40px;">
                ⏳
            </div>

            <p>
                Loading your orders...
            </p>

        </div>

    `;


    /* =========================
       GET CUSTOMER PHONE
    ========================= */

    let phone =
        localStorage.getItem(
            "royalChickenPhone"
        );


    /* =========================
       ASK PHONE FIRST TIME
    ========================= */

    if (!phone) {

        phone = prompt(
            "Enter the phone number used while placing your order:"
        );


        if (!phone) {

            content.innerHTML = `

                <div class="no-orders">

                    <div class="no-orders-icon">
                        📱
                    </div>

                    <h3>
                        Phone Number Required
                    </h3>

                    <p>
                        Please enter the phone number
                        used for your order.
                    </p>

                </div>

            `;

            return;
        }


        phone =
            phone.trim();


        localStorage.setItem(
            "royalChickenPhone",
            phone
        );

    }


    /* =========================
       FIREBASE QUERY
    ========================= */

    try {

        const ordersQuery =
            query(
                collection(
                    db,
                    "orders"
                ),
                where(
                    "phone",
                    "==",
                    phone
                )
            );


        const snapshot =
            await getDocs(
                ordersQuery
            );


        /* =========================
           NO ORDERS
        ========================= */

        if (snapshot.empty) {

            content.innerHTML = `

                <div class="no-orders">

                    <div class="no-orders-icon">
                        📦
                    </div>

                    <h3>
                        No Orders Found
                    </h3>

                    <p>
                        No orders were found
                        for this phone number.
                    </p>

                </div>

            `;

            return;
        }


        /* =========================
           CREATE ORDERS ARRAY
        ========================= */

        let orders = [];


        snapshot.forEach(
            function(orderDoc) {

                orders.push({

                    id:
                        orderDoc.id,

                    ...orderDoc.data()

                });

            }
        );


        /* =========================
           NEWEST FIRST
        ========================= */

        orders.sort(
            function(a, b) {

                const aTime =
                    a.createdAt?.seconds || 0;

                const bTime =
                    b.createdAt?.seconds || 0;

                return bTime - aTime;

            }
        );


        /* =========================
           CREATE ORDER CARDS
        ========================= */

        let html = "";


        orders.forEach(
            function(order) {

                const status =
                    order.status ||
                    "Pending";


                const statusClass =
                    getStatusClass(
                        status
                    );


                const orderDate =
                    formatOrderDate(
                        order.createdAt
                    );


                const totalItems =
                    getTotalItems(
                        order.items
                    );


                html += `

                    <div class="order-card">

                        <div class="order-card-top">

                            <div>

                                <span class="order-label">
                                    ORDER
                                </span>

                                <strong>
                                    #${order.orderNumber || "N/A"}
                                </strong>

                            </div>


                            <span
                                class="order-status ${statusClass}"
                            >
                                ${status}
                            </span>

                        </div>


                        <div class="order-card-info">

                            <div>

                                <span>
                                    DATE
                                </span>

                                <strong>
                                    ${orderDate}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    ITEMS
                                </span>

                                <strong>
                                    ${totalItems} item(s)
                                </strong>

                            </div>


                            <div>

                                <span>
                                    TOTAL
                                </span>

                                <strong>
                                    ₹${order.total || 0}
                                </strong>

                            </div>

                        </div>


                        <div class="order-card-buttons">

                            <button
                                type="button"
                                onclick="viewOrder('${order.id}')"
                            >
                                👀 View Order
                            </button>


                            ${
                                status === "Pending"
                                ?
                                `
                                <button
                                    type="button"
                                    class="cancel-order-btn"
                                    onclick="cancelOrder('${order.id}')"
                                >
                                    ❌ Cancel Order
                                </button>
                                `
                                :
                                ""
                            }


                            <button
                                type="button"
                                class="reorder-btn"
                                onclick="reorderItems('${order.id}')"
                            >
                                🔄 Reorder
                            </button>

                        </div>

                    </div>

                `;

            }
        );


        content.innerHTML =
            html;


    } catch (error) {

        console.error(
            "MY ORDERS ERROR:",
            error
        );


        content.innerHTML = `

            <div class="no-orders">

                <div class="no-orders-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Orders
                </h3>

                <p>
                    Please try again.
                </p>

            </div>

        `;

    }

}


/* =====================================================
   CLOSE MY ORDERS
===================================================== */

function closeMyOrders() {

    const modal =
        document.getElementById(
            "orders-modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =====================================================
   VIEW ORDER
===================================================== */

async function viewOrder(orderId) {

    try {

        const orderRef =
            doc(
                db,
                "orders",
                orderId
            );


        const orderSnap =
            await getDoc(
                orderRef
            );


        if (!orderSnap.exists()) {

            alert(
                "Order not found."
            );

            return;
        }


        const order =
            orderSnap.data();


        let orderedProducts =
            "";


        (order.items || []).forEach(
            function(item) {

                orderedProducts += `

                    <div class="view-order-item">

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <span>
                                ${item.quantity} kg × ₹${item.price}
                            </span>

                        </div>


                        <strong>
                            ₹${item.itemTotal}
                        </strong>

                    </div>

                `;

            }
        );


        const content =
            document.getElementById(
                "my-orders-content"
            );


        if (!content) {
            return;
        }


        content.innerHTML = `

            <div class="view-order-page">

                <button
                    type="button"
                    class="back-orders-btn"
                    onclick="openMyOrders()"
                >
                    ← Back to My Orders
                </button>


                <div class="view-order-header">

                    <div>

                        <span>
                            ORDER NUMBER
                        </span>

                        <h3>
                            #${order.orderNumber || "N/A"}
                        </h3>

                    </div>


                    <span
                        class="order-status ${getStatusClass(order.status || "Pending")}"
                    >
                        ${order.status || "Pending"}
                    </span>

                </div>


                <div class="view-order-section">

                    <h3>
                        🛒 Ordered Items
                    </h3>


                    <div class="view-order-items">

                        ${orderedProducts}

                    </div>

                </div>


                <div class="view-order-section">

                    <h3>
                        💰 Payment Details
                    </h3>


                    <div class="view-order-detail">

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            ${order.paymentMethod || "N/A"}
                        </strong>

                    </div>


                    <div class="view-order-detail total-detail">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹${order.total || 0}
                        </strong>

                    </div>

                </div>


                <div class="view-order-section">

                    <h3>
                        📍 Delivery Details
                    </h3>


                    <div class="view-order-detail">

                        <span>
                            Customer
                        </span>

                        <strong>
                            ${order.customerName || "N/A"}
                        </strong>

                    </div>


                    <div class="view-order-detail">

                        <span>
                            Phone
                        </span>

                        <strong>
                            ${order.phone || "N/A"}
                        </strong>

                    </div>


                    <div class="view-order-detail address-detail">

                        <span>
                            Address
                        </span>

                        <strong>
                            ${order.address || "N/A"}
                        </strong>

                    </div>

                </div>


                <div class="view-order-footer">

                    🍗 Royal Chicken

                </div>

            </div>

        `;


    } catch (error) {

        console.error(
            "VIEW ORDER ERROR:",
            error
        );


        alert(
            "Order details load nahi ho paye. Please try again."
        );

    }

}


/* =====================================================
   CANCEL ORDER
===================================================== */

async function cancelOrder(orderId) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmCancel) {
        return;
    }


    try {

        const orderRef =
            doc(
                db,
                "orders",
                orderId
            );


        const orderSnap =
            await getDoc(
                orderRef
            );


        if (!orderSnap.exists()) {

            alert(
                "Order not found."
            );

            return;
        }


        const order =
            orderSnap.data();


        /* =========================
           ONLY PENDING CAN CANCEL
        ========================= */

        if (
            order.status !==
            "Pending"
        ) {

            alert(
                "This order can no longer be cancelled."
            );

            return;
        }


        /* =========================
           UPDATE STATUS
        ========================= */

        await updateDoc(
            orderRef,
            {

                status:
                    "Cancelled",

                cancelledAt:
                    serverTimestamp()

            }
        );


        alert(
            "Your order has been cancelled successfully."
        );


        /* =========================
           REFRESH MY ORDERS
        ========================= */

        await openMyOrders();


    } catch (error) {

        console.error(
            "CANCEL ORDER ERROR:",
            error
        );


        alert(
            "Order cancel nahi ho paya. Please try again."
        );

    }

}


/* =====================================================
   REORDER
===================================================== */

async function reorderItems(orderId) {

    try {

        const orderRef =
            doc(
                db,
                "orders",
                orderId
            );


        const orderSnap =
            await getDoc(
                orderRef
            );


        if (!orderSnap.exists()) {

            alert(
                "Order not found."
            );

            return;
        }


        const order =
            orderSnap.data();


        /* =========================
           ADD OLD ITEMS TO CART
        ========================= */

        (order.items || []).forEach(
            function(item) {

                const existingItem =
                    cart.find(
                        cartItem =>
                            cartItem.name ===
                            item.name
                    );


                if (existingItem) {

                    existingItem.quantity +=
                        item.quantity;

                } else {

                    cart.push({

                        name:
                            item.name,

                        price:
                            item.price,

                        quantity:
                            item.quantity

                    });

                }

            }
        );


        /* =========================
           UPDATE CART
        ========================= */

        updateCart();


        /* =========================
           CLOSE MY ORDERS
        ========================= */

        closeMyOrders();


        /* =========================
           OPEN CART
        ========================= */

        openCart();


    } catch (error) {

        console.error(
            "REORDER ERROR:",
            error
        );


        alert(
            "Reorder nahi ho paya. Please try again."
        );

    }

}


/* =====================================================
   STATUS CLASS
===================================================== */

function getStatusClass(status) {

    const cleanStatus =
        String(status)
            .toLowerCase()
            .trim();


    if (
        cleanStatus ===
        "pending"
    ) {

        return "pending";

    }


    if (
        cleanStatus ===
        "preparing"
    ) {

        return "preparing";

    }


    if (
        cleanStatus ===
        "out for delivery"
    ) {

        return "out-for-delivery";

    }


    if (
        cleanStatus ===
        "delivered"
    ) {

        return "delivered";

    }


    if (
        cleanStatus ===
        "cancelled"
    ) {

        return "cancelled";

    }


    return "pending";
}


/* =====================================================
   FORMAT ORDER DATE
===================================================== */

function formatOrderDate(timestamp) {

    if (
        !timestamp ||
        !timestamp.seconds
    ) {

        return "Date unavailable";

    }


    const date =
        new Date(
            timestamp.seconds * 1000
        );


    return date.toLocaleDateString(
        "en-IN",
        {

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"

        }
    );

}


/* =====================================================
   GET TOTAL ITEMS
===================================================== */

function getTotalItems(items) {

    if (
        !Array.isArray(items)
    ) {

        return 0;

    }


    return items.reduce(
        function(total, item) {

            return total +
                Number(
                    item.quantity || 0
                );

        },
        0
    );

}


/* =====================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
===================================================== */

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


window.openMyOrders =
    openMyOrders;


window.closeMyOrders =
    closeMyOrders;


window.viewOrder =
    viewOrder;


window.cancelOrder =
    cancelOrder;


window.reorderItems =
    reorderItems;


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);