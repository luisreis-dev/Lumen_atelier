
// NAVEGAÇÃO

const hamburger = document.querySelector("#hamburger");
const navList = document.querySelector("#nav-list");
const navLinks = navList.querySelectorAll("a");

function toggleMenu() {
    const isOpen = navList.classList.toggle("active");

    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
}

function closeMenu() {
    navList.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Abrir menu");
}

hamburger.addEventListener("click", toggleMenu);

// Fecha ao selecionar um link
navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Fecha ao pressionar Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Fecha ao voltar para o desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});



// SESSÃO AVALIAÇÕES

const reviewsTrack = document.querySelector(".reviews-track");
const reviewsCards = document.querySelectorAll(".review-card");
const reviewsPrev = document.querySelector(".reviews-prev");
const reviewsNext = document.querySelector(".reviews-next");
const reviewsPagination = document.querySelector(".reviews-pagination");
const reviewsViewport = document.querySelector(".reviews-viewport");

if (
    reviewsTrack &&
    reviewsCards.length &&
    reviewsPrev &&
    reviewsNext &&
    reviewsPagination &&
    reviewsViewport
) {
    let currentReview = 0;
    let maxReview = 0;

    function getVisibleReviews() {
        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;
    }

    function createPagination() {
        reviewsPagination.innerHTML = "";

        for (let i = 0; i <= maxReview; i++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("reviews-dot");
            dot.setAttribute("aria-label", `Ir para avaliação ${i + 1}`);

            dot.addEventListener("click", () => {
                currentReview = i;
                updateReviews();
            });

            reviewsPagination.appendChild(dot);
        }
    }

    function updateReviews() {
        const visibleReviews = getVisibleReviews();
        const gap = parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
        const cardWidth = reviewsCards[0].getBoundingClientRect().width;

        maxReview = Math.max(0, reviewsCards.length - visibleReviews);
        currentReview = Math.min(currentReview, maxReview);

        reviewsTrack.style.transform =
            `translateX(-${currentReview * (cardWidth + gap)}px)`;

        reviewsPrev.disabled = currentReview === 0;
        reviewsNext.disabled = currentReview === maxReview;

        const dots = reviewsPagination.querySelectorAll(".reviews-dot");

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentReview);
            dot.setAttribute("aria-current", index === currentReview ? "true" : "false");
        });
    }

    function refreshReviews() {
        const previousMax = maxReview;

        maxReview = Math.max(0, reviewsCards.length - getVisibleReviews());
        currentReview = Math.min(currentReview, maxReview);

        if (previousMax !== maxReview || reviewsPagination.children.length !== maxReview + 1) {
            createPagination();
        }

        updateReviews();
    }

    reviewsPrev.addEventListener("click", () => {
        if (currentReview > 0) {
            currentReview--;
            updateReviews();
        }
    });

    reviewsNext.addEventListener("click", () => {
        if (currentReview < maxReview) {
            currentReview++;
            updateReviews();
        }
    });

    window.addEventListener("resize", refreshReviews);

    refreshReviews();
}


// SESSÃO PORTIFÓLIO

const portfolioTrack = document.querySelector(".portfolio-track");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const portfolioPrev = document.querySelector(".portfolio-prev");
const portfolioNext = document.querySelector(".portfolio-next");
const portfolioPagination = document.querySelector(".portfolio-pagination");

if (
    portfolioTrack &&
    portfolioCards.length &&
    portfolioPrev &&
    portfolioNext &&
    portfolioPagination
) {
    let currentPortfolioIndex = 0;
    let maxPortfolioIndex = 0;

    function getPortfolioVisibleCards() {
        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;
    }

    function createPortfolioDots() {
        portfolioPagination.innerHTML = "";

        for (let i = 0; i <= maxPortfolioIndex; i++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("portfolio-dot");
            dot.setAttribute("aria-label", `Ver conjunto de fotos ${i + 1}`);

            dot.addEventListener("click", () => {
                currentPortfolioIndex = i;
                updatePortfolioCarousel();
            });

            portfolioPagination.appendChild(dot);
        }
    }

    function updatePortfolioCarousel() {
        const gap = parseFloat(
            getComputedStyle(portfolioTrack).gap
        ) || 0;

        const cardWidth = portfolioCards[0].getBoundingClientRect().width;

        maxPortfolioIndex = Math.max(
            0,
            portfolioCards.length - getPortfolioVisibleCards()
        );

        currentPortfolioIndex = Math.min(
            currentPortfolioIndex,
            maxPortfolioIndex
        );

        portfolioTrack.style.transform =
            `translateX(-${currentPortfolioIndex * (cardWidth + gap)}px)`;

        portfolioPrev.disabled = currentPortfolioIndex === 0;
        portfolioNext.disabled = currentPortfolioIndex === maxPortfolioIndex;

        const dots = portfolioPagination.querySelectorAll(".portfolio-dot");

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentPortfolioIndex);
            dot.setAttribute(
                "aria-current",
                index === currentPortfolioIndex ? "true" : "false"
            );
        });
    }

    function refreshPortfolioCarousel() {
        const previousMax = maxPortfolioIndex;

        maxPortfolioIndex = Math.max(
            0,
            portfolioCards.length - getPortfolioVisibleCards()
        );

        currentPortfolioIndex = Math.min(
            currentPortfolioIndex,
            maxPortfolioIndex
        );

        if (
            previousMax !== maxPortfolioIndex ||
            portfolioPagination.children.length !== maxPortfolioIndex + 1
        ) {
            createPortfolioDots();
        }

        updatePortfolioCarousel();
    }

    portfolioPrev.addEventListener("click", () => {
        if (currentPortfolioIndex > 0) {
            currentPortfolioIndex--;
            updatePortfolioCarousel();
        }
    });

    portfolioNext.addEventListener("click", () => {
        if (currentPortfolioIndex < maxPortfolioIndex) {
            currentPortfolioIndex++;
            updatePortfolioCarousel();
        }
    });

    window.addEventListener("resize", refreshPortfolioCarousel);

    refreshPortfolioCarousel();
}
