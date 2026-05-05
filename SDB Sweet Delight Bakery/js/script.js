/* ================= CART SYSTEM ================= */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= ADD TO CART ================= */
function addToCart(name, price, image, btn) {

    let cart = getCart();

    let finalImage = image || "images/default.png";

    cart.push({
        name,
        price,
        image: finalImage
    });

    saveCart(cart);

    updateCartCount();
    displayCart();

    showPopup(name, finalImage, "added");

    let imgElement = btn?.closest(".card")?.querySelector("img");

    if (imgElement) {
        flyToCart(imgElement);
    }

    if (btn) {
        btn.innerText = "Added ✔";
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = "Add to Cart";
            btn.disabled = false;
        }, 900);
    }
}

/* ================= REMOVE ================= */
function removeItem(index) {

    let cart = getCart();
    if (!cart[index]) return;

    let removedItem = cart[index];

    cart.splice(index, 1);
    saveCart(cart);

    displayCart();
    updateCartCount();

    showPopup(removedItem.name, removedItem.image, "removed");
}

/* ================= CLEAR ================= */
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
    updateCartCount();
}

/* ================= DISPLAY CART ================= */
function displayCart() {

    let cart = getCart();
    let cartItems = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    if (!cartItems || !totalBox) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<tr><td colspan="3">Your cart is empty 😢</td></tr>`;
        totalBox.innerText = 0;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    totalBox.innerText = total;
}

/* ================= COUNT ================= */
function updateCartCount() {
    let el = document.getElementById("cart-count");
    if (el) el.innerText = getCart().length;
}

/* ================= CHECKOUT ================= */
function goToCheckout() {
    if (getCart().length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

/* ================= POPUP ================= */
function showPopup(name, image, type) {

    let popup = document.getElementById("cart-popup");
    let img = document.getElementById("popup-img");
    let text = document.getElementById("popup-text");

    if (!popup || !img || !text) return;

    img.src = image || "images/default.png";

    img.onerror = () => img.src = "images/default.png";

    text.innerText =
        type === "added"
            ? `${name} added to cart ✔️`
            : `${name} removed from cart ❌`;

    if (typeof gsap !== "undefined") {
        gsap.fromTo(popup,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 }
        );

        setTimeout(() => {
            gsap.to(popup, { y: 30, opacity: 0, duration: 0.4 });
        }, 1800);
    } else {
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 1800);
    }
}

/* ================= GSAP FLY ANIMATION ================= */
function flyToCart(imgElement) {

    const cartIcon = document.getElementById("cartIcon");

    if (!imgElement || !cartIcon || typeof gsap === "undefined") return;

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = imgElement.cloneNode(true);

    document.body.appendChild(clone);

    Object.assign(clone.style, {
        position: "fixed",
        left: imgRect.left + "px",
        top: imgRect.top + "px",
        width: imgRect.width + "px",
        height: imgRect.height + "px",
        zIndex: 9999,
        pointerEvents: "none",
        borderRadius: "12px"
    });

    const midX = (imgRect.left + cartRect.left) / 2;
    const midY = imgRect.top - 150;

    gsap.to(clone, {
        duration: 1,
        ease: "power2.inOut",
        motionPath: {
            path: [
                { x: 0, y: 0 },
                { x: midX - imgRect.left, y: midY - imgRect.top },
                { x: cartRect.left - imgRect.left, y: cartRect.top - imgRect.top }
            ]
        },
        scale: 0.2,
        opacity: 0.3,
        onComplete: () => {
            clone.remove();

            gsap.fromTo(cartIcon,
                { scale: 1 },
                { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1 }
            );
        }
    });
}

/* ================= 3D TILT (APPLE STYLE) ================= */
function initTilt() {

    document.querySelectorAll(".card").forEach(card => {

        let bounds;

        function rotate(e) {
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                duration: 0.4,
                rotateX,
                rotateY,
                scale: 1.05,
                ease: "power2.out"
            });
        }

        card.addEventListener("mouseenter", () => {
            bounds = card.getBoundingClientRect();
        });

        card.addEventListener("mousemove", rotate);

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                duration: 0.6,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: "power3.out"
            });
        });
    });
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
    initTilt();
});

function goHome() {
    document.body.style.opacity = "0.5";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 300);
}
