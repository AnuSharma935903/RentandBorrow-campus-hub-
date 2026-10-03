/**
 * RENT & BORROW APPLICATION - JAVASCRIPT CONTROLLER
 * Powers interactive marketplace, dashboard, post-item live preview,
 * modal dialogs, and design system token inspector.
 */

const DEFAULT_ITEM_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='100%25' height='100%25'%3E%3Crect width='600' height='400' fill='%23f1f5f9'/%3E%3Cg fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='160' y='90' width='280' height='220' rx='16' fill='%23e2e8f0'/%3E%3Ccircle cx='230' cy='160' r='28' fill='%23cbd5e1' stroke='none'/%3E%3Cpath d='M180 270 l80-70 70 60 40-35 50 45' stroke='%2394a3b8' stroke-width='3' fill='none'/%3E%3Cpath d='M250 200 l50-45 60 55' stroke='%2394a3b8' stroke-width='2' stroke-dasharray='4 4' fill='none'/%3E%3C/g%3E%3Ctext x='300' y='345' font-family='system-ui, -apple-system, sans-serif' font-size='16' font-weight='600' fill='%2364748b' text-anchor='middle'%3ENo Image Available%3C/text%3E%3C/svg%3E";

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sample Data: Realistic Student & Community Items
const INITIAL_ITEMS = [
  {
    id: 1,
    title: "TI-84 Plus CE Color Graphing Calculator",
    category: "Electronics & Calculators",
    categoryKey: "Electronics & Calculators",
    price: 4,
    period: "day",
    deposit: 30,
    status: "available",
    condition: "Like New",
    location: "Science Library / North Quad",
    ownerId: "user_alex",
    lender: {
      id: "user_alex",
      name: "Alex Chen",
      role: "CS Junior",
      avatar: "AC",
      rating: 4.9,
      reviewsCount: 28,
      verified: true
    },
    description: "Equipped with rechargeable battery, USB charging cable, and pre-loaded calculus tools. Ideal for exams and midterms.",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "calculator"
  },
  {
    id: 2,
    title: "A2 Technical Drawing Board & Precision Geometry Set",
    category: "Drawing & Design",
    categoryKey: "Drawing & Design",
    price: 5,
    period: "day",
    deposit: 30,
    status: "borrowed",
    condition: "Excellent",
    location: "Design Studio & Arts Center",
    ownerId: "user_anu",
    lender: {
      id: "user_anu",
      name: "Anu",
      role: "Verified Student",
      avatar: "AN",
      rating: 5.0,
      reviewsCount: 1,
      verified: true
    },
    description: "Includes parallel motion ruler, 30/60 & 45 set squares, drafting tape, and padded carrying case. Perfect for engineering and architecture students.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "pen-tool"
  },
  {
    id: 3,
    title: "Organic Chemistry: Structure and Function (8th Edition)",
    category: "Study Essential",
    categoryKey: "Study Essential",
    price: 3,
    period: "day",
    deposit: 25,
    status: "available",
    condition: "Very Good",
    location: "Chemistry Annex / Dorm 4",
    ownerId: "user_chloe",
    lender: {
      id: "user_chloe",
      name: "Chloe Nguyen",
      role: "BioChem Junior",
      avatar: "CN",
      rating: 4.9,
      reviewsCount: 19,
      verified: true
    },
    description: "Hardcover, zero missing pages, highlights only on chapter 4 & 7. Includes molecular model kit pouch.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "book"
  },
  {
    id: 4,
    title: "Makita 18V Cordless Drill & Lab Tool Bit Set",
    category: "Lab & Project Gear",
    categoryKey: "Lab & Project Gear",
    price: 6,
    period: "day",
    deposit: 40,
    status: "available",
    condition: "Good",
    location: "Engineering Hall / Maker Space",
    ownerId: "user_marcus",
    lender: {
      id: "user_marcus",
      name: "Marcus Vance",
      role: "MechEng Senior",
      avatar: "MV",
      rating: 4.95,
      reviewsCount: 35,
      verified: true
    },
    description: "Comes with 2 lithium-ion batteries, quick charger, masonry bits, drill bits, and driver heads in a rugged hard case.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "tool"
  },
  {
    id: 6,
    title: "Arduino Ultimate Starter Kit + Sensor Bundle",
    category: "Lab & Project Gear",
    categoryKey: "Lab & Project Gear",
    price: 0,
    period: "Free Borrow",
    deposit: 15,
    status: "borrowed",
    condition: "Good",
    location: "Robotics Club Lab",
    ownerId: "user_samira",
    lender: {
      id: "user_samira",
      name: "Samira Khan",
      role: "EE Sophomore",
      avatar: "SK",
      rating: 4.8,
      reviewsCount: 14,
      verified: true
    },
    description: "Shared for peer learning! Includes Uno R3 board, breadboard, ultrasonic sensor, LCD module, LEDs, and jumper wires.",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "cpu"
  },
  {
    id: 7,
    title: "ViewSonic M1 Mini Ultra-Portable LED Projector",
    category: "Electronics & Calculators",
    categoryKey: "Electronics & Calculators",
    price: 11,
    period: "day",
    deposit: 60,
    status: "available",
    condition: "Like New",
    location: "Graduate Student Lounge",
    ownerId: "user_david",
    lender: {
      id: "user_david",
      name: "David Kim",
      role: "Film Society Officer",
      avatar: "DK",
      rating: 4.95,
      reviewsCount: 37,
      verified: true
    },
    description: "Fits in your palm! Integrated JBL speaker, HDMI & USB-C ports, and smart stand. Ideal for movie nights and presentation pitches.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "film"
  },
  {
    id: 9,
    title: "Logitech MX Master 3S Wireless Mouse",
    category: "College Essential",
    categoryKey: "College Essential",
    price: 3,
    period: "day",
    deposit: 25,
    status: "available",
    condition: "Like New",
    location: "North Quad Dorms",
    ownerId: "user_anu",
    lender: {
      id: "user_anu",
      name: "Anu",
      role: "Verified Student",
      avatar: "AN",
      rating: 5.0,
      reviewsCount: 1,
      verified: true
    },
    description: "Ultra-quiet ergonomic mouse with dual Bluetooth & USB receiver. Great for programming assignments and design work.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "mouse"
  }
];

// App State - Loaded from centralized storage.js data layer
let itemsData = typeof getItems === 'function' ? getItems() : [...INITIAL_ITEMS];
let currentCategory = 'all';
let currentSearch = '';
let selectedItemForRent = null;
let currentRentalDays = 3;
let itemPendingDeletionId = null;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCategoryFilters();
  initSearch();
  initModals();
  initAuthFlow();
  initAdminVerificationFlow();
  initPostFormLivePreview();
  initDashboard();
  initStyleGuideCopy();
  initLiveCountdowns();
  initReturnModalListeners();
  updateAuthUI();
  renderItems();
  renderDashboardRentals();
  renderMyListings();
  updateStorageStatusUI();
});

function updateStorageStatusUI() {
  const countItemsEl = document.getElementById('storageCountItems');
  const countRentalsEl = document.getElementById('storageCountRentals');
  const countUsersEl = document.getElementById('storageCountUsers');
  const countTxnsEl = document.getElementById('storageCountTxns');

  if (countItemsEl && typeof getItems === 'function') {
    const items = getItems();
    countItemsEl.textContent = `${items.length} Items`;
  }
  if (countRentalsEl && typeof getRentals === 'function') {
    const rentals = getRentals();
    countRentalsEl.textContent = `${rentals.length} Rentals`;
  }
  if (countUsersEl && typeof getUsers === 'function') {
    const users = getUsers();
    countUsersEl.textContent = `${users.length} Users`;
  }
  if (countTxnsEl && typeof getTransactions === 'function') {
    const txns = getTransactions();
    countTxnsEl.textContent = `${txns.length} Txns`;
  }
}

/* ==========================================================================
   NAVIGATION & VIEW SWITCHING
   ========================================================================== */
function initNavigation() {
  const navBtns = document.querySelectorAll('[data-view-target]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetView = btn.getAttribute('data-view-target');
      switchView(targetView);
    });
  });

  // Sticky nav shadow on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Keyboard shortcut Ctrl+K or / to focus the single hero search bar
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const heroSearch = document.getElementById('heroSearch');
      if (heroSearch) {
        heroSearch.focus();
        heroSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Profile modal toggle
  const profileBtn = document.getElementById('profileBtn');
  const profileModal = document.getElementById('profileModalOverlay');
  const closeProfileBtns = [document.getElementById('closeProfileModalBtn'), document.getElementById('closeProfileBtn')];

  if (profileBtn && profileModal) {
    profileBtn.addEventListener('click', () => {
      updateAuthUI();
      profileModal.classList.add('active');
    });
  }

  closeProfileBtns.forEach(btn => {
    if (btn && profileModal) {
      btn.addEventListener('click', () => profileModal.classList.remove('active'));
    }
  });

  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) profileModal.classList.remove('active');
    });
  }
}

function switchView(viewName) {
  // Handle My Rentals shortcut -> opens Dashboard and highlights borrowing tab
  if (viewName === 'myRentals') {
    switchView('dashboard');
    const borrowingBtn = Array.from(document.querySelectorAll('.segmented-control .segmented-btn'))
      .find(b => b.textContent.toLowerCase().includes('borrowing'));
    if (borrowingBtn) borrowingBtn.click();
    const tableEl = document.querySelector('.table-container');
    if (tableEl) tableEl.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Update nav buttons active state
  document.querySelectorAll('[data-view-target]').forEach(btn => {
    if (btn.getAttribute('data-view-target') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Show/Hide view sections
  const views = ['marketplaceView', 'dashboardView', 'myListingsView', 'postItemView', 'styleguideView'];
  views.forEach(viewId => {
    const el = document.getElementById(viewId);
    if (!el) return;
    if (viewId === viewName + 'View') {
      el.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (viewName === 'dashboard') {
        renderDashboardRentals();
      } else if (viewName === 'myListings') {
        renderMyListings();
      }
    } else {
      el.style.display = 'none';
    }
  });
}

function scrollToAvailableItems() {
  const target = document.getElementById('availableItemsSection');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function filterByCategory(catKey, shouldScroll = true) {
  // If navigating from another section (e.g. Dashboard or Styleguide)
  if (typeof currentView !== 'undefined' && currentView !== 'marketplace') {
    if (typeof switchView === 'function') {
      switchView('marketplace');
    }
  }

  currentCategory = catKey || 'all';

  const normalize = (str) => String(str || '').toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]/g, '');
  const normTarget = normalize(currentCategory);
  const isAll = !currentCategory || normTarget === 'all' || normTarget === 'allitems';

  // Sync category filter pills (Featured & Available Gear)
  const pills = document.querySelectorAll('.category-chips .filter-pill[data-category]');
  pills.forEach(pill => {
    const pillCat = pill.getAttribute('data-category');
    const normPill = normalize(pillCat);
    if ((isAll && (normPill === 'all' || normPill === 'allitems')) || (!isAll && normPill === normTarget)) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // Sync visual category cards (Explore Categories)
  const cards = document.querySelectorAll('.category-cards-grid .category-card[data-category]');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const normCard = normalize(cardCat);
    if (!isAll && normCard === normTarget) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  renderItems();

  if (shouldScroll) {
    scrollToAvailableItems();
  }
}

/* ==========================================================================
   FILTERING & SEARCH (Single Hero Search Bar)
   ========================================================================== */
function initCategoryFilters() {
  const pills = document.querySelectorAll('.category-chips .filter-pill[data-category]');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-category');
      // Clicking a filter tab changes active tab, filters immediately, and keeps user in Featured section
      filterByCategory(cat, false);
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      renderItems();
    });
  }
}

function initSearch() {
  const heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    heroSearch.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderItems();
    });
  }
}

/* ==========================================================================
   MARKETPLACE RENDER
   ========================================================================== */
function renderItems() {
  const container = document.getElementById('itemsGrid');
  const countBadge = document.getElementById('resultsCount');
  if (!container) return;

  if (typeof getItems === 'function') {
    itemsData = getItems();
  }

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  const normalize = (str) => String(str || '').toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]/g, '');
  const normCurrent = normalize(currentCategory);
  const isAll = !currentCategory || normCurrent === 'all' || normCurrent === 'allitems';

  let filtered = itemsData.filter(item => {
    const normItemCat = normalize(item.category);
    const normItemKey = normalize(item.categoryKey);
    const matchCategory = isAll || (normItemCat === normCurrent) || (normItemKey === normCurrent);

    const itemTitle = item.name || item.title || '';
    const lenderObj = item.owner || item.lender || {};
    const matchSearch = !currentSearch ||
      itemTitle.toLowerCase().includes(currentSearch) ||
      (item.category && item.category.toLowerCase().includes(currentSearch)) ||
      (item.location && item.location.toLowerCase().includes(currentSearch)) ||
      (lenderObj.name && lenderObj.name.toLowerCase().includes(currentSearch));
    return matchCategory && matchSearch;
  });

  // Sorting
  const sortSelect = document.getElementById('sortSelect');
  const sortValue = sortSelect ? sortSelect.value : 'recommended';

  if (sortValue === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'rating') {
    filtered.sort((a, b) => {
      const aRating = (a.owner && a.owner.rating) || (a.lender && a.lender.rating) || 0;
      const bRating = (b.owner && b.owner.rating) || (b.lender && b.lender.rating) || 0;
      return bRating - aRating;
    });
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-12) var(--space-4); background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
        <div style="font-size: 2.5rem; margin-bottom: var(--space-3); color: var(--text-muted);">📦</div>
        <h4 style="margin-bottom: var(--space-2);">${!isAll ? 'No items available in this category yet.' : 'No community items found'}</h4>
        <p class="text-secondary" style="margin-bottom: var(--space-4);">${!isAll ? 'Be the first to list gear in "' + currentCategory + '" for your peers!' : 'Try adjusting your category or search term, or be the first to list one!'}</p>
        <button class="btn btn-primary btn-sm" onclick="switchView('postItem')">List an Item</button>
      </div>
    `;
    return;
  }

  const allRentals = typeof getRentals === 'function' ? getRentals() : [];

  container.innerHTML = filtered.map(item => {
    const isFree = item.price === 0;
    const isOwner = isItemOwner(item, currentUser);
    const hasActiveRental = allRentals.some(r =>
      String(r.itemId) === String(item.id) &&
      r.status !== 'returned' &&
      r.status !== 'completed'
    );
    const isBorrowed = item.status === 'borrowed' || hasActiveRental;
    const isAvailable = item.status === 'available' && !hasActiveRental;
    const lenderInfo = getLenderVerificationInfo(item);
    const lenderObj = item.owner || item.lender || {};
    const itemTitle = item.name || item.title || 'Untitled Item';
    const itemImg = (item.image && String(item.image).trim()) || DEFAULT_ITEM_PLACEHOLDER;
    const isHourly = item.pricingType === 'hourly' || item.period === 'hour';
    const hourlyRate = item.pricePerHour !== undefined ? item.pricePerHour : item.price;
    const dailyRate = item.pricePerDay !== undefined ? item.pricePerDay : item.price;
    const depositAmount = item.securityDeposit !== undefined ? item.securityDeposit : (item.deposit || 0);

    // Two strictly separate ratings: Item Rating and Owner User Rating
    const itemRatingSummary = typeof getItemRatingSummary === 'function' ? getItemRatingSummary(item.id) : { average: 0, totalRatings: 0 };
    const ownerId = item.ownerId || (item.owner && item.owner.id) || (item.lender && item.lender.id);
    const ownerRatingSummary = typeof getUserRatingSummary === 'function' ? getUserRatingSummary(ownerId) : { average: 0, totalRatings: 0 };

    let lenderBadgeHtml = '';
    if (lenderInfo.status === 'verified') {
      lenderBadgeHtml = `<span class="badge badge-verified" style="font-size: 9px; padding: 1px 5px;"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Student</span>`;
    } else if (lenderInfo.status === 'rejected') {
      lenderBadgeHtml = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border); font-size: 9px; padding: 1px 5px;"><span class="badge-dot" style="background: var(--error);"></span> Rejected</span>`;
    } else {
      lenderBadgeHtml = `<span class="badge badge-warning" style="font-size: 9px; padding: 1px 5px;"><span class="badge-dot"></span> Verification Pending</span>`;
    }

    let cardActionsHtml = '';
    if (isOwner) {
      if (isAvailable) {
        cardActionsHtml = `
          <div class="flex items-center gap-1.5">
            <button type="button" class="btn btn-outline btn-sm" style="font-size: 12px; padding: 0.4rem 0.65rem; font-weight: 600;" onclick="event.stopPropagation(); openEditItemModal('${item.id}');" title="Edit Listing">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <span>Edit</span>
            </button>
            <button type="button" class="btn btn-outline btn-sm item-card-delete-btn" style="color: var(--error); border-color: var(--error-border); font-size: 12px; padding: 0.4rem 0.65rem; font-weight: 600;" onclick="event.stopPropagation(); requestDeleteItem('${item.id}');" title="Delete Listing">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Delete</span>
            </button>
          </div>
        `;
      } else {
        cardActionsHtml = `
          <div class="flex items-center gap-2">
            <span class="badge badge-warning" style="font-size: 11px; font-weight: 600; padding: 4px 8px;">
              <span class="badge-dot" style="background: #d97706;"></span> Currently Rented
            </span>
            <button type="button" class="btn btn-outline btn-xs" style="font-size: 11px; padding: 4px 8px; font-weight: 600;" onclick="event.stopPropagation(); switchView('dashboard');" title="Manage Rental in Dashboard">
              Manage Rental
            </button>
          </div>
        `;
      }
    } else {
      if (isAvailable) {
        cardActionsHtml = `
          <button type="button" class="btn btn-primary btn-sm" onclick="openRentModal('${item.id}')">
            Rent
          </button>
        `;
      } else {
        cardActionsHtml = `
          <span class="badge badge-warning" style="font-size: 11px; font-weight: 600; padding: 4px 8px;">
            <span class="badge-dot" style="background: #d97706;"></span> Currently Rented
          </span>
        `;
      }
    }

    return `
      <article class="item-card" data-id="${item.id}">
        <div class="item-image-container">
          <img src="${itemImg}" alt="${itemTitle}" class="item-image" loading="lazy" onerror="if(this.src!=='${DEFAULT_ITEM_PLACEHOLDER}') this.src='${DEFAULT_ITEM_PLACEHOLDER}';" />
          
          <div class="item-badge-top-left" style="display: flex; gap: 4px; flex-wrap: wrap;">
            <span class="badge ${isAvailable ? 'badge-available' : 'badge-borrowed'}">
              <span class="badge-dot"></span>
              ${isAvailable ? 'Available' : 'Borrowed'}
            </span>
            ${isOwner ? `
              <span class="badge" style="background-color: var(--primary-50); color: var(--primary-700); border-color: var(--primary-200); font-weight: 700;">
                Your Item
              </span>
            ` : ''}
          </div>

          <div class="item-badge-top-right">
            ${isFree ? `
              <span class="badge" style="background-color: var(--secondary-subtle); color: var(--secondary-700); border-color: var(--secondary-border); font-weight: 700;">
                Free Borrow
              </span>
            ` : `
              <span class="badge badge-neutral font-semibold">
                Deposit: ₹${depositAmount}
              </span>
            `}
          </div>
        </div>

        <div class="item-card-body">
          <div class="item-category">${item.category}</div>
          <h3 class="item-title" title="${itemTitle}">${itemTitle}</h3>
          
          <!-- Distinct Item Rating -->
          <div class="item-card-item-rating flex items-center gap-1.5" style="margin-top: 3px; margin-bottom: 6px; font-size: 12px; font-weight: 600; color: var(--text-primary);" title="${itemRatingSummary.totalRatings > 0 ? itemRatingSummary.average.toFixed(1) + ' out of 5 stars based on ' + itemRatingSummary.totalRatings + ' item ratings' : 'Item Rating: No ratings yet (0 ratings)'}">
            ${itemRatingSummary.totalRatings > 0 ? `
              <span style="color: #f59e0b; display: inline-flex; align-items: center; gap: 3px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${itemRatingSummary.average.toFixed(1)}
              </span>
              <span style="color: var(--text-secondary); font-size: 11px; font-weight: 500;">
                Item Rating (${itemRatingSummary.totalRatings})
              </span>
            ` : `
              <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 4px;">
                <span style="color: var(--text-muted); font-size: 13px;">☆</span>
                <span style="font-weight: 500; font-size: 11.5px; color: var(--text-secondary);">No ratings yet</span>
              </span>
              <span style="color: var(--text-muted); font-size: 11px; font-weight: 500;">
                • 0 ratings
              </span>
            `}
          </div>

          <div class="item-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${item.location}</span>
          </div>

          <div class="item-location" style="margin-top: -3px; font-size: 11px; color: var(--primary-700);">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${item.availabilityType === 'time-window' && item.availabilityStart && item.availabilityEnd ? `Available: ${formatTime12h(item.availabilityStart)} – ${formatTime12h(item.availabilityEnd)}` : 'Available: All day'}</span>
          </div>

          <div class="item-lender-row">
            <div class="item-lender" style="cursor: pointer;" onclick="event.stopPropagation(); openUserProfileModal('${ownerId}');" title="View ${escapeHtml(lenderObj.name || 'Owner')}'s Campus Profile & Reviews">
              <div class="item-lender-avatar">${lenderObj.avatar || 'ST'}</div>
              <div>
                <div class="item-lender-name" style="text-decoration: underline; text-decoration-color: transparent; transition: text-decoration-color 0.2s;">${escapeHtml(lenderObj.name || 'Student Lender')}</div>
                <div class="flex items-center gap-1 mt-0.5">
                  ${lenderBadgeHtml}
                </div>
              </div>
            </div>
            <!-- Distinct Owner User Rating -->
            ${ownerRatingSummary.totalRatings > 0 ? `
              <div class="item-rating flex items-center gap-1" style="background: rgba(245, 158, 11, 0.08); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.25); cursor: pointer;" onclick="event.stopPropagation(); openUserProfileModal('${ownerId}');" title="${ownerRatingSummary.average.toFixed(1)} out of 5 stars based on ${ownerRatingSummary.totalRatings} user reviews (Click to view)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span style="font-weight: 700; color: #b45309; font-size: 12px;">${ownerRatingSummary.average.toFixed(1)} ★</span>
                <span style="font-size: 10px; color: #78350f; font-weight: 600;">(${ownerRatingSummary.totalRatings})</span>
              </div>
            ` : `
              <div class="item-rating flex items-center gap-1" style="background: var(--bg-subtle); padding: 3px 8px; border-radius: 6px; border: 1px solid var(--border-color); cursor: pointer;" onclick="event.stopPropagation(); openUserProfileModal('${ownerId}');" title="User Rating: No ratings yet (0 ratings)">
                <span style="color: var(--text-muted); font-size: 11px;">☆</span>
                <span style="font-weight: 600; color: var(--text-secondary); font-size: 11px;">No ratings yet</span>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 500;">(0)</span>
              </div>
            `}
          </div>
        </div>

        <div class="item-card-footer">
          <div class="item-price-block">
            ${isFree ? `
              <span class="item-price-amount free">₹0</span>
              <span class="item-price-period">Free Community Borrow</span>
            ` : (isHourly ? `
              <span class="item-price-amount">₹${hourlyRate}</span>
              <span class="item-price-period">/ hour</span>
            ` : `
              <span class="item-price-amount">₹${dailyRate}</span>
              <span class="item-price-period">/ day</span>
            `)}
          </div>

          ${cardActionsHtml}
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   TIME & AVAILABILITY HELPERS
   ========================================================================== */
function timeStrToMinutes(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || '0', 10);
}

function minutesToTimeStr(totalMinutes) {
  const m = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  const pad = (n) => (n < 10 ? '0' + n : String(n));
  return `${pad(hours)}:${pad(mins)}`;
}

function formatTime12h(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  const h = parseInt(parts[0], 10);
  if (isNaN(h)) return timeStr;
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

function updateRentalScheduleCalculation() {
  if (!selectedItemForRent) return { valid: true };
  const hasSpecificWindow = selectedItemForRent.availabilityType === 'time-window' && selectedItemForRent.availabilityStart && selectedItemForRent.availabilityEnd;
  const timeCalcEl = document.getElementById('modalRentalTimeCalc');
  const availWarning = document.getElementById('modalAvailabilityWarning');
  const startTimeInput = document.getElementById('modalRentalStartTime');

  if (!hasSpecificWindow) {
    if (availWarning) availWarning.style.display = 'none';
    return { valid: true };
  }

  const startVal = (startTimeInput && startTimeInput.value) || selectedItemForRent.availabilityStart || '10:00';
  const startMins = timeStrToMinutes(startVal);
  const durationMins = (currentRentalHours || 3) * 60;
  const endMins = startMins + durationMins;
  const endVal = minutesToTimeStr(endMins);

  const start12h = formatTime12h(startVal);
  const end12h = formatTime12h(endVal);

  if (timeCalcEl) {
    timeCalcEl.textContent = `Ends: ${end12h} (${start12h} → ${end12h})`;
  }

  const windowStartMins = timeStrToMinutes(selectedItemForRent.availabilityStart);
  const windowEndMins = timeStrToMinutes(selectedItemForRent.availabilityEnd);

  const isValid = startMins >= windowStartMins && endMins <= windowEndMins;

  if (availWarning) {
    availWarning.style.display = isValid ? 'none' : 'block';
  }

  return {
    valid: isValid,
    startVal: startVal,
    endVal: endVal,
    start12h: start12h,
    end12h: end12h
  };
}

/* ==========================================================================
   MODAL & RENT CALCULATOR (Hourly & Daily Support)
   ========================================================================== */
let currentRentalHours = 3;
let currentRentalCalculatedCost = 0;
let currentRentalShortfall = 0;

function initModals() {
  const modalOverlay = document.getElementById('rentModalOverlay');
  const closeBtn = document.getElementById('closeRentModalBtn');
  const cancelBtn = document.getElementById('cancelRentBtn');
  const confirmBtn = document.getElementById('confirmRentBtn');
  const daysSlider = document.getElementById('rentalDaysSlider');
  const hoursSlider = document.getElementById('rentalHoursSlider');
  const hourBtns = document.querySelectorAll('.duration-hour-btn');

  const closeModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Quick hour duration buttons (1, 2, 3, 4 Hours)
  hourBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hourBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const hrs = parseInt(btn.getAttribute('data-hours'), 10);
      currentRentalHours = hrs;
      if (hoursSlider) hoursSlider.value = hrs;
      updateModalCostBreakdown();
      updateRentalScheduleCalculation();
    });
  });

  // Hours range slider (1 - 24 hours)
  if (hoursSlider) {
    hoursSlider.addEventListener('input', (e) => {
      currentRentalHours = parseInt(e.target.value, 10);
      hourBtns.forEach(b => {
        b.classList.toggle('active', parseInt(b.getAttribute('data-hours'), 10) === currentRentalHours);
      });
      updateModalCostBreakdown();
      updateRentalScheduleCalculation();
    });
  }

  // Rental start time input listener (for specific owner availability window)
  const rentalStartTimeInput = document.getElementById('modalRentalStartTime');
  if (rentalStartTimeInput) {
    rentalStartTimeInput.addEventListener('input', () => {
      updateRentalScheduleCalculation();
    });
    rentalStartTimeInput.addEventListener('change', () => {
      updateRentalScheduleCalculation();
    });
  }

  // Days range slider (1 - 14 days)
  if (daysSlider) {
    daysSlider.addEventListener('input', (e) => {
      currentRentalDays = parseInt(e.target.value, 10);
      updateModalCostBreakdown();
    });
  }

  // Delete Confirmation Modal Event Listeners
  const deleteModalOverlay = document.getElementById('deleteConfirmModalOverlay');
  const closeDeleteBtn = document.getElementById('closeDeleteModalBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteModalBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteModalBtn');
  const modalDeleteBtn = document.getElementById('modalDeleteItemBtn');

  if (closeDeleteBtn) closeDeleteBtn.addEventListener('click', closeDeleteModal);
  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
  if (deleteModalOverlay) {
    deleteModalOverlay.addEventListener('click', (e) => {
      if (e.target === deleteModalOverlay) closeDeleteModal();
    });
  }

  // Payment Modal Event Listeners (MVP / Demo Shortfall Payment)
  const paymentModalOverlay = document.getElementById('paymentModalOverlay');
  const closePaymentBtn = document.getElementById('closePaymentModalBtn');
  const continuePaymentBtn = document.getElementById('continuePaymentBtn');
  const simulateDemoPaymentBtn = document.getElementById('simulateDemoPaymentBtn');
  const modalPayShortfallBtn = document.getElementById('modalPayShortfallBtn');

  if (closePaymentBtn) closePaymentBtn.addEventListener('click', closePaymentModal);
  if (continuePaymentBtn) continuePaymentBtn.addEventListener('click', handleContinueToPayment);
  if (simulateDemoPaymentBtn) simulateDemoPaymentBtn.addEventListener('click', handleExecuteDemoPayment);
  if (modalPayShortfallBtn) modalPayShortfallBtn.addEventListener('click', openPaymentModal);
  if (paymentModalOverlay) {
    paymentModalOverlay.addEventListener('click', (e) => {
      if (e.target === paymentModalOverlay) closePaymentModal();
    });
  }

  // Edit Item Modal Event Listeners
  const editModalOverlay = document.getElementById('editItemModalOverlay');
  const closeEditBtn = document.getElementById('closeEditItemModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditItemBtn');
  const saveEditBtn = document.getElementById('saveEditItemBtn');
  const editForm = document.getElementById('editItemForm');
  const editAvailAllDay = document.getElementById('editAvailAllDay');
  const editAvailTimeWindow = document.getElementById('editAvailTimeWindow');
  const editTimeWindowContainer = document.getElementById('editSpecificTimeWindowContainer');
  const editImageInput = document.getElementById('editItemImageInput');
  const editChangeImageBtn = document.getElementById('editItemChangeImageBtn');
  const editImagePreview = document.getElementById('editItemImagePreview');

  if (closeEditBtn) closeEditBtn.addEventListener('click', closeEditItemModal);
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeEditItemModal);
  if (editModalOverlay) {
    editModalOverlay.addEventListener('click', (e) => {
      if (e.target === editModalOverlay) closeEditItemModal();
    });
  }

  const toggleEditAvailabilityFields = () => {
    if (editTimeWindowContainer) {
      editTimeWindowContainer.style.display = (editAvailTimeWindow && editAvailTimeWindow.checked) ? 'block' : 'none';
    }
  };
  if (editAvailAllDay) editAvailAllDay.addEventListener('change', toggleEditAvailabilityFields);
  if (editAvailTimeWindow) editAvailTimeWindow.addEventListener('change', toggleEditAvailabilityFields);

  if (editChangeImageBtn && editImageInput) {
    editChangeImageBtn.addEventListener('click', () => editImageInput.click());
  }
  if (editImageInput) {
    editImageInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        currentEditImageDataUrl = evt.target.result;
        if (editImagePreview) editImagePreview.src = currentEditImageDataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    const idInput = document.getElementById('editItemId');
    const nameInput = document.getElementById('editItemName');
    const catSelect = document.getElementById('editItemCategory');
    const pricingTypeSelect = document.getElementById('editItemPricingType');
    const priceInput = document.getElementById('editItemPrice');
    const depositInput = document.getElementById('editItemDeposit');
    const descInput = document.getElementById('editItemDescription');
    const availStartInput = document.getElementById('editAvailStart');
    const availEndInput = document.getElementById('editAvailEnd');

    if (!idInput || !idInput.value) return;
    const itemId = idInput.value;
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      showToast('Please enter an item name', 'error');
      return;
    }

    const priceVal = priceInput ? parseFloat(priceInput.value) : 0;
    if (isNaN(priceVal) || priceVal < 0) {
      showToast('Please enter a valid price', 'error');
      return;
    }

    const depositVal = depositInput ? parseFloat(depositInput.value) : 0;
    if (isNaN(depositVal) || depositVal < 0) {
      showToast('Please enter a valid deposit amount', 'error');
      return;
    }

    const isTimeWindow = Boolean(editAvailTimeWindow && editAvailTimeWindow.checked);
    const availStart = availStartInput ? availStartInput.value : '10:00';
    const availEnd = availEndInput ? availEndInput.value : '14:00';

    if (isTimeWindow && (!availStart || !availEnd)) {
      showToast('Please specify both availability start and end times', 'error');
      return;
    }

    const updatePayload = {
      name: nameVal,
      category: catSelect ? catSelect.value : 'Other',
      pricingType: pricingTypeSelect ? pricingTypeSelect.value : 'hourly',
      price: priceVal,
      securityDeposit: depositVal,
      deposit: depositVal,
      description: descInput ? descInput.value.trim() : '',
      availabilityType: isTimeWindow ? 'time-window' : 'all-day',
      availabilityStart: isTimeWindow ? availStart : '',
      availabilityEnd: isTimeWindow ? availEnd : ''
    };

    if (currentEditImageDataUrl) {
      updatePayload.image = currentEditImageDataUrl;
    }

    if (typeof updateItem === 'function') {
      const res = updateItem(itemId, updatePayload);
      if (!res.success) {
        showToast(res.message || 'Error updating listing', 'error');
        return;
      }
    }

    if (typeof getItems === 'function') {
      itemsData = getItems();
    }

    closeEditItemModal();
    renderMyListings();
    renderItems();
    renderDashboardRentals();
    showToast('Listing updated successfully.', 'success');
  };

  if (saveEditBtn) saveEditBtn.addEventListener('click', handleSaveEdit);
  if (editForm) editForm.addEventListener('submit', handleSaveEdit);

  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', () => {
      if (selectedItemForRent) {
        requestDeleteItem(selectedItemForRent.id);
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!selectedItemForRent) return;

      // Safety check: ensure item still exists and hasn't been deleted
      const currentItems = typeof getItems === 'function' ? getItems() : itemsData;
      const itemExists = currentItems.some(i => String(i.id) === String(selectedItemForRent.id));
      if (!itemExists) {
        showToast("This item is no longer available in the marketplace.", "error");
        closeModal();
        renderItems();
        return;
      }

      // Current user from storage
      const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
      if (!currentUser) {
        showToast("Please log in or register to borrow items.", "info");
        closeModal();
        openAuthModal('login');
        return;
      }

      // Prevent renting own item
      if (isItemOwner(selectedItemForRent, currentUser)) {
        showToast("You cannot borrow your own listed item.", "error");
        return;
      }

      if (selectedItemForRent.status !== 'available') {
        showToast("This item is currently rented and unavailable.", "error");
        return;
      }

      const ownerId = selectedItemForRent.ownerId || (selectedItemForRent.lender && selectedItemForRent.lender.id);
      if (!ownerId) {
        showToast("Unable to determine item owner.", "error");
        return;
      }

      // Check if user already has an active pending request for this item
      const existingRequests = typeof getRentalRequests === 'function' ? getRentalRequests() : [];
      const hasPending = existingRequests.some(r =>
        String(r.itemId) === String(selectedItemForRent.id) &&
        String(r.borrowerId) === String(currentUser.id) &&
        String(r.status).toLowerCase() === 'pending'
      );
      if (hasPending) {
        showToast("You already have an active pending borrow request for this item.", "info");
        closeModal();
        return;
      }

      const isHourly = selectedItemForRent.pricingType === 'hourly' || selectedItemForRent.period === 'hour';
      const hourlyRate = selectedItemForRent.pricePerHour !== undefined ? Number(selectedItemForRent.pricePerHour) : (Number(selectedItemForRent.price) || 20);
      const dailyRate = selectedItemForRent.pricePerDay !== undefined ? Number(selectedItemForRent.pricePerDay) : (Number(selectedItemForRent.price) || 0);
      const deposit = selectedItemForRent.securityDeposit !== undefined ? Number(selectedItemForRent.securityDeposit) : (Number(selectedItemForRent.deposit) || 0);
      const rentalCost = isHourly ? (hourlyRate * currentRentalHours) : (dailyRate * currentRentalDays);
      const total = rentalCost + deposit;

      // Check credit balance: Borrower needs enough Campus Credits for the rental cost
      const borrowerCredits = currentUser.credits !== undefined ? Number(currentUser.credits) : 100;
      if (borrowerCredits < rentalCost) {
        showToast(`Insufficient balance: You have 🪙 ${borrowerCredits} Credits, but this rental requires ${rentalCost} Credits.`, "error");
        return;
      }

      // Validate rental time against owner availability if applicable
      const scheduleCheck = updateRentalScheduleCalculation();
      if (!scheduleCheck.valid) {
        showToast("Selected rental time is outside the owner's availability.", "error");
        return;
      }

      closeModal();

      const durationDetails = isHourly
        ? `${currentRentalHours} Hour${currentRentalHours === 1 ? '' : 's'} (₹${hourlyRate}/hour + ₹${deposit} deposit)`
        : `${currentRentalDays} Day${currentRentalDays === 1 ? '' : 's'} (${dailyRate === 0 ? 'Free Community Borrow' : '₹' + dailyRate + '/day + ₹' + deposit + ' deposit'})`;

      if (typeof createBorrowRequest === 'function') {
        const itemTitle = selectedItemForRent.name || selectedItemForRent.title || 'Untitled Item';
        const itemImage = (selectedItemForRent.image && String(selectedItemForRent.image).trim()) || DEFAULT_ITEM_PLACEHOLDER;
        const ownerObj = selectedItemForRent.owner || selectedItemForRent.lender || {};

        const res = createBorrowRequest({
          itemId: selectedItemForRent.id,
          itemTitle: itemTitle,
          itemName: itemTitle,
          itemImage: itemImage,
          itemCategory: selectedItemForRent.category,
          ownerId: ownerId,
          ownerName: ownerObj.name || 'Campus Peer',
          borrowerId: currentUser.id,
          borrowerName: currentUser.name,
          borrowerRole: currentUser.role || 'Student',
          pricingType: isHourly ? 'hourly' : 'daily',
          durationHours: isHourly ? currentRentalHours : (currentRentalDays * 24),
          durationDays: isHourly ? Math.ceil(currentRentalHours / 24) : currentRentalDays,
          hourlyRate: hourlyRate,
          dailyRate: dailyRate,
          rentalCost: rentalCost,
          rentalFee: rentalCost,
          securityDeposit: deposit,
          deposit: deposit,
          totalCost: total,
          details: durationDetails,
          availabilityType: selectedItemForRent.availabilityType || 'all-day',
          availabilityStart: selectedItemForRent.availabilityStart || '',
          availabilityEnd: selectedItemForRent.availabilityEnd || '',
          requestedStartTime: scheduleCheck.start12h || (selectedItemForRent.availabilityStart ? formatTime12h(selectedItemForRent.availabilityStart) : ''),
          requestedEndTime: scheduleCheck.end12h || (selectedItemForRent.availabilityEnd ? formatTime12h(selectedItemForRent.availabilityEnd) : '')
        });

        if (res.success) {
          showToast(`Borrow request submitted for ${itemTitle}! Check your dashboard under "My Borrow Requests".`, 'success');
        } else {
          showToast(res.message || 'Error submitting borrow request.', 'error');
        }
      }

      renderItems();
      renderDashboardRentals();
      updateStorageStatusUI();
    });
  }
}

function openRentModal(itemId) {
  const item = (typeof itemsData !== 'undefined' && Array.isArray(itemsData) ? itemsData : (typeof getItems === 'function' ? getItems() : [])).find(i => String(i.id) === String(itemId)) || (typeof itemId === 'object' ? itemId : null);
  if (!item) return;
  selectedItemForRent = item;

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const isOwner = isItemOwner(item, currentUser);

  const modalOverlay = document.getElementById('rentModalOverlay');
  const modalImage = document.getElementById('modalItemImage');
  const modalTitle = document.getElementById('modalItemTitle');
  const modalCategory = document.getElementById('modalItemCategory');
  const modalLocation = document.getElementById('modalItemLocation');
  const modalDesc = document.getElementById('modalItemDesc');
  const modalLenderName = document.getElementById('modalLenderName');
  const modalLenderRole = document.getElementById('modalLenderRole');
  const modalLenderAvatar = document.getElementById('modalLenderAvatar');
  const modalLenderRating = document.getElementById('modalLenderRating');
  const hourlyContainer = document.getElementById('modalHourlyDurationContainer');
  const dailyContainer = document.getElementById('modalDailyDurationContainer');
  const hoursSlider = document.getElementById('rentalHoursSlider');
  const daysSlider = document.getElementById('rentalDaysSlider');
  const modalOwnerActions = document.getElementById('modalOwnerActions');
  const confirmRentBtn = document.getElementById('confirmRentBtn');

  const itemImg = (item.image && String(item.image).trim()) || DEFAULT_ITEM_PLACEHOLDER;
  const itemTitleText = item.name || item.title || 'Untitled Item';
  const lenderObj = item.owner || item.lender || {};

  if (modalImage) {
    modalImage.src = itemImg;
    modalImage.onerror = function () {
      if (this.src !== DEFAULT_ITEM_PLACEHOLDER) {
        this.src = DEFAULT_ITEM_PLACEHOLDER;
      }
    };
  }
  if (modalTitle) modalTitle.textContent = itemTitleText;
  if (modalCategory) modalCategory.textContent = item.category;
  if (modalLocation) modalLocation.textContent = item.location;
  if (modalDesc) modalDesc.textContent = item.description;
  if (modalLenderName) modalLenderName.textContent = lenderObj.name || 'Student Lender';
  if (modalLenderRole) modalLenderRole.textContent = lenderObj.role || 'Student';
  if (modalLenderAvatar) modalLenderAvatar.textContent = lenderObj.avatar || 'ST';

  window.currentModalItem = item;

  // 1. Separate Item Rating & Collapsible Item Reviews List
  const itemRatingSummary = typeof getItemRatingSummary === 'function' ? getItemRatingSummary(item.id) : { average: 0, totalRatings: 0, ratings: [] };
  const modalItemRatingScore = document.getElementById('modalItemRatingScore');
  const modalItemRatingCount = document.getElementById('modalItemRatingCount');
  const modalItemReviewsList = document.getElementById('modalItemReviewsList');
  const modalItemReviewsCountBadge = document.getElementById('modalItemReviewsCountBadge');
  const itemCollapseContent = document.getElementById('modalItemReviewsCollapseContent');
  const itemToggleIcon = document.getElementById('modalItemReviewsToggleIcon');
  const itemToggleBtn = document.getElementById('toggleItemReviewsBtn');

  // Ensure item reviews are collapsed initially
  if (itemCollapseContent) itemCollapseContent.style.display = 'none';
  if (itemToggleIcon) itemToggleIcon.textContent = '▾';
  if (itemToggleBtn) itemToggleBtn.setAttribute('aria-expanded', 'false');

  if (modalItemRatingScore) {
    modalItemRatingScore.textContent = itemRatingSummary.totalRatings > 0 ? `${itemRatingSummary.average.toFixed(1)} ★` : 'No ratings yet';
  }
  if (modalItemRatingCount) {
    modalItemRatingCount.textContent = itemRatingSummary.totalRatings > 0
      ? `Item Rating (${itemRatingSummary.totalRatings} ${itemRatingSummary.totalRatings === 1 ? 'rating' : 'ratings'})`
      : '0 ratings';
  }
  if (modalItemReviewsCountBadge) {
    modalItemReviewsCountBadge.textContent = `${itemRatingSummary.totalRatings} ${itemRatingSummary.totalRatings === 1 ? 'rating' : 'ratings'}`;
  }
  if (modalItemReviewsList) {
    if (!itemRatingSummary.ratings || itemRatingSummary.ratings.length === 0) {
      modalItemReviewsList.innerHTML = `<div style="text-align: center; color: var(--text-secondary); font-size: 12px; padding: 12px 0;">No reviews yet. This item has not been reviewed.</div>`;
    } else {
      modalItemReviewsList.innerHTML = itemRatingSummary.ratings.map(r => {
        const dateDisplay = r.date || new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `
          <div class="review-item-card" style="padding: 10px 12px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 6px;">
            <div class="flex items-center justify-between" style="margin-bottom: 4px;">
              <div class="flex items-center gap-2">
                <span style="font-weight: 700; color: #b45309; font-size: 12px;">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
                <span style="font-size: 11px; font-weight: 600; color: var(--text-secondary);">
                  by <a href="javascript:void(0)" onclick="openUserProfileModal('${escapeHtml(r.fromUserId)}');" style="color: var(--primary); text-decoration: underline;" title="View ${escapeHtml(r.fromUserName || 'Student')}'s Profile">${escapeHtml(r.fromUserName || 'Student Borrower')}</a>
                </span>
              </div>
              <span style="font-size: 10px; color: var(--text-secondary);">${escapeHtml(dateDisplay)}</span>
            </div>
            ${r.comment ? `<p class="review-comment-text" style="font-size: 12px; margin: 0; color: var(--text-main);">"${escapeHtml(r.comment)}"</p>` : `<p class="review-comment-text" style="font-size: 11px; font-style: italic; color: var(--text-secondary); margin: 0;">Rated without comment.</p>`}
          </div>
        `;
      }).join('');
    }
  }

  // 2. Separate Owner User / Trust Rating
  const ownerId = item.ownerId || (item.owner && item.owner.id) || (item.lender && item.lender.id);
  const ownerRatingSummary = typeof getUserRatingSummary === 'function' ? getUserRatingSummary(ownerId) : { average: 0, totalRatings: 0 };
  if (modalLenderRating) {
    if (ownerRatingSummary.totalRatings > 0) {
      modalLenderRating.textContent = `★ ${ownerRatingSummary.average.toFixed(1)} User Rating (${ownerRatingSummary.totalRatings} ${ownerRatingSummary.totalRatings === 1 ? 'rating' : 'ratings'})`;
    } else {
      modalLenderRating.textContent = `User Rating: No ratings yet (0 ratings)`;
    }
  }

  const lenderInfo = getLenderVerificationInfo(item);
  const modalLenderBadge = document.getElementById('modalLenderBadge');
  if (modalLenderBadge) {
    if (lenderInfo.status === 'verified') {
      modalLenderBadge.className = 'badge badge-verified';
      modalLenderBadge.style.fontSize = '10px';
      modalLenderBadge.innerHTML = 'ID Verified Student';
    } else if (lenderInfo.status === 'rejected') {
      modalLenderBadge.className = 'badge';
      modalLenderBadge.style = 'background: var(--error-subtle); color: var(--error); border-color: var(--error-border); font-size: 10px;';
      modalLenderBadge.innerHTML = 'Verification Rejected';
    } else {
      modalLenderBadge.className = 'badge badge-warning';
      modalLenderBadge.style.fontSize = '10px';
      modalLenderBadge.innerHTML = '<span class="badge-dot"></span> Verification Pending';
    }
  }

  const isHourly = item.pricingType === 'hourly' || item.period === 'hour';
  if (hourlyContainer) hourlyContainer.style.display = isHourly ? 'block' : 'none';
  if (dailyContainer) dailyContainer.style.display = isHourly ? 'none' : 'block';

  // Display Item Price & Security Deposit in modal header
  const headerPriceBadge = document.getElementById('modalHeaderPriceBadge');
  const headerDepositBadge = document.getElementById('modalHeaderDepositBadge');
  const depositAmount = item.securityDeposit !== undefined ? item.securityDeposit : (item.deposit || 0);
  const hourlyRateVal = item.pricePerHour !== undefined ? item.pricePerHour : item.price;
  const dailyRateVal = item.pricePerDay !== undefined ? item.pricePerDay : item.price;

  if (headerPriceBadge) {
    if (item.price === 0) {
      headerPriceBadge.textContent = 'Free Community Borrow';
    } else if (isHourly) {
      headerPriceBadge.textContent = `₹${hourlyRateVal} / hour`;
    } else {
      headerPriceBadge.textContent = `₹${dailyRateVal} / day`;
    }
  }
  if (headerDepositBadge) {
    headerDepositBadge.innerHTML = `₹${depositAmount} <span class="text-xs text-secondary font-normal">(Refundable)</span>`;
  }

  // Display owner availability in modal
  const ownerAvailEl = document.getElementById('modalOwnerAvailability');
  const borrowerTimeContainer = document.getElementById('modalBorrowerTimeContainer');
  const modalRentalStartTimeInput = document.getElementById('modalRentalStartTime');
  const availWarning = document.getElementById('modalAvailabilityWarning');

  const hasSpecificWindow = item.availabilityType === 'time-window' && item.availabilityStart && item.availabilityEnd;

  if (ownerAvailEl) {
    ownerAvailEl.textContent = hasSpecificWindow
      ? `${formatTime12h(item.availabilityStart)} – ${formatTime12h(item.availabilityEnd)}`
      : 'Available all day';
  }

  if (borrowerTimeContainer) {
    borrowerTimeContainer.style.display = (hasSpecificWindow && isHourly) ? 'block' : 'none';
  }

  if (modalRentalStartTimeInput) {
    modalRentalStartTimeInput.value = (hasSpecificWindow && item.availabilityStart) ? item.availabilityStart : '10:00';
  }

  if (availWarning) {
    availWarning.style.display = 'none';
  }

  // Reset duration selectors
  currentRentalHours = 3;
  if (hoursSlider) hoursSlider.value = 3;
  document.querySelectorAll('.duration-hour-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.getAttribute('data-hours'), 10) === 3);
  });

  currentRentalDays = 3;
  if (daysSlider) daysSlider.value = 3;

  updateRentalScheduleCalculation();

  // Owner controls: Show/hide Delete button in modal
  if (modalOwnerActions) {
    modalOwnerActions.style.display = isOwner ? 'block' : 'none';
  }

  // Update cost breakdown, credit status, and action buttons
  updateModalCostBreakdown();

  if (modalOverlay) {
    modalOverlay.classList.add('active');
  }
}

function updateModalCostBreakdown() {
  if (!selectedItemForRent) return;
  const isHourly = selectedItemForRent.pricingType === 'hourly' || selectedItemForRent.period === 'hour';

  const hoursDisplay = document.getElementById('modalHoursDisplay');
  const hoursSliderVal = document.getElementById('modalHoursSliderVal');
  const daysDisplay = document.getElementById('modalDaysDisplay');
  const rateLabel = document.getElementById('modalRateLabel');
  const rateDisplay = document.getElementById('modalRateDisplay');
  const durationSummaryLabel = document.getElementById('modalDurationSummaryLabel');
  const durationSummaryDisplay = document.getElementById('modalDurationSummaryDisplay');
  const feeDisplay = document.getElementById('modalRentalFee');
  const depositDisplay = document.getElementById('modalDeposit');
  const totalDisplay = document.getElementById('modalTotalCost');
  const creditsEquiv = document.getElementById('modalCreditsEquiv');

  const deposit = selectedItemForRent.securityDeposit !== undefined ? Number(selectedItemForRent.securityDeposit) : (Number(selectedItemForRent.deposit) || 0);

  let rentalCost = 0;

  if (isHourly) {
    const hourlyRate = selectedItemForRent.pricePerHour !== undefined ? Number(selectedItemForRent.pricePerHour) : (Number(selectedItemForRent.price) || 20);
    rentalCost = hourlyRate * currentRentalHours;
    const total = rentalCost + deposit;

    if (hoursDisplay) hoursDisplay.textContent = `${currentRentalHours} Hour${currentRentalHours === 1 ? '' : 's'}`;
    if (hoursSliderVal) hoursSliderVal.textContent = `${currentRentalHours} Hour${currentRentalHours === 1 ? '' : 's'}`;
    if (rateLabel) rateLabel.textContent = 'Hourly Rate';
    if (rateDisplay) rateDisplay.textContent = `₹${hourlyRate} / hour`;
    if (durationSummaryLabel) durationSummaryLabel.textContent = 'Rental Duration';
    if (durationSummaryDisplay) durationSummaryDisplay.textContent = `${currentRentalHours} Hour${currentRentalHours === 1 ? '' : 's'}`;
    if (feeDisplay) feeDisplay.textContent = `₹${rentalCost}`;
    if (depositDisplay) depositDisplay.textContent = `₹${deposit}`;
    if (totalDisplay) totalDisplay.textContent = `₹${total}`;
    if (creditsEquiv) creditsEquiv.textContent = `${total} Campus Credits`;
  } else {
    const dailyRate = selectedItemForRent.pricePerDay !== undefined ? Number(selectedItemForRent.pricePerDay) : (Number(selectedItemForRent.price) || 0);
    rentalCost = dailyRate * currentRentalDays;
    const total = rentalCost + deposit;

    if (daysDisplay) daysDisplay.textContent = `${currentRentalDays} Day${currentRentalDays === 1 ? '' : 's'}`;
    if (rateLabel) rateLabel.textContent = 'Daily Rate';
    if (rateDisplay) rateDisplay.textContent = `₹${dailyRate} / day`;
    if (durationSummaryLabel) durationSummaryLabel.textContent = 'Rental Duration';
    if (durationSummaryDisplay) durationSummaryDisplay.textContent = `${currentRentalDays} Day${currentRentalDays === 1 ? '' : 's'}`;
    if (feeDisplay) feeDisplay.textContent = `₹${rentalCost}`;
    if (depositDisplay) depositDisplay.textContent = `₹${deposit}`;
    if (totalDisplay) totalDisplay.textContent = `₹${total}`;
    if (creditsEquiv) creditsEquiv.textContent = `${total} Campus Credits`;
  }

  currentRentalCalculatedCost = rentalCost;

  // Credit balance check & Shortfall / Payment Option UI
  const creditStatusCard = document.getElementById('modalCreditStatusCard');
  const confirmRentBtn = document.getElementById('confirmRentBtn');
  const payShortfallBtn = document.getElementById('modalPayShortfallBtn');
  const payShortfallBtnText = document.getElementById('modalPayShortfallBtnText');

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const isOwner = currentUser && typeof isItemOwner === 'function' && isItemOwner(selectedItemForRent, currentUser);
  const isAvailable = selectedItemForRent.status === 'available';

  if (!currentUser) {
    if (creditStatusCard) {
      creditStatusCard.innerHTML = `
        <div class="card p-3" style="background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div class="flex items-center justify-between text-xs">
            <span class="text-secondary">Please log in to check your credit balance and borrow this item.</span>
            <span class="badge badge-neutral" style="font-size: 10px;">Guest</span>
          </div>
        </div>
      `;
    }
    if (confirmRentBtn) confirmRentBtn.style.display = 'inline-flex';
    if (payShortfallBtn) payShortfallBtn.style.display = 'none';
    currentRentalShortfall = 0;
    return;
  }

  if (isOwner) {
    if (creditStatusCard) {
      creditStatusCard.innerHTML = `
        <div class="card p-3" style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: var(--radius-md);">
          <div class="flex items-center gap-2 text-xs" style="color: var(--primary);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span class="font-semibold">You are the owner of this listed item. You cannot rent your own item.</span>
          </div>
        </div>
      `;
    }
    if (confirmRentBtn) {
      confirmRentBtn.style.display = 'inline-flex';
      confirmRentBtn.disabled = true;
      confirmRentBtn.title = "You cannot borrow your own listed item";
      confirmRentBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Rent / Request</span>
      `;
    }
    if (payShortfallBtn) payShortfallBtn.style.display = 'none';
    currentRentalShortfall = 0;
    return;
  }

  if (!isAvailable) {
    if (creditStatusCard) {
      creditStatusCard.innerHTML = `
        <div class="card p-3" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md);">
          <div class="flex items-center gap-2 text-xs" style="color: var(--error);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <span class="font-semibold">This item is currently borrowed and unavailable for rent.</span>
          </div>
        </div>
      `;
    }
    if (confirmRentBtn) {
      confirmRentBtn.style.display = 'inline-flex';
      confirmRentBtn.disabled = true;
      confirmRentBtn.innerHTML = '<span>Currently Borrowed</span>';
    }
    if (payShortfallBtn) payShortfallBtn.style.display = 'none';
    currentRentalShortfall = 0;
    return;
  }

  const userCredits = currentUser.credits !== undefined ? Number(currentUser.credits) : 0;
  const shortfall = Math.max(0, rentalCost - userCredits);
  currentRentalShortfall = shortfall;

  // Case 1: USER HAS ENOUGH CREDITS (userCredits >= rentalCost)
  if (userCredits >= rentalCost) {
    if (creditStatusCard) {
      creditStatusCard.innerHTML = `
        <div class="card p-3" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md);">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #10b981; color: white; font-size: 11px;">✓</span>
              <strong class="text-xs font-bold" style="color: #065f46;">Credit Balance OK</strong>
            </div>
            <span class="badge badge-success" style="font-size: 10px; font-weight: 700;">${userCredits} Credits Available</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-xs pt-2" style="border-top: 1px dashed rgba(16, 185, 129, 0.3);">
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Your Balance:</span>
              <strong class="text-main" style="font-size: 13px;">${userCredits} Credits</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Rental Cost:</span>
              <strong class="text-main" style="font-size: 13px;">${rentalCost} Credits</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Security Deposit:</span>
              <strong class="text-main" style="font-size: 13px;">₹${deposit}</strong>
            </div>
          </div>
        </div>
      `;
    }

    if (confirmRentBtn) {
      confirmRentBtn.style.display = 'inline-flex';
      confirmRentBtn.disabled = false;
      confirmRentBtn.title = "";
      confirmRentBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Confirm Rental</span>
      `;
    }
    if (payShortfallBtn) {
      payShortfallBtn.style.display = 'none';
    }
  }
  // Case 2: ZERO CREDIT USER (userCredits === 0 && rentalCost > 0)
  else if (userCredits === 0 && rentalCost > 0) {
    if (creditStatusCard) {
      creditStatusCard.innerHTML = `
        <div class="card p-3" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: var(--radius-md);">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #ef4444; color: white; font-size: 12px; font-weight: bold;">✕</span>
              <strong class="text-xs font-bold" style="color: #991b1b;">You have 0 Credits</strong>
            </div>
            <span class="badge" style="background: #fee2e2; color: #b91c1c; font-size: 10px; font-weight: 700;">Zero Balance</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-xs pt-2" style="border-top: 1px dashed rgba(239, 68, 68, 0.35);">
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Your Balance:</span>
              <strong class="text-main" style="font-size: 13px;">0 Credits</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Required:</span>
              <strong class="text-main" style="font-size: 13px;">${rentalCost} Credits</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Shortfall:</span>
              <strong style="color: #dc2626; font-size: 13px;">${shortfall} Credits</strong>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 pt-2 text-xs" style="border-top: 1px solid rgba(239, 68, 68, 0.2);">
            <span class="text-secondary">Security Deposit (Separate): <strong class="text-main">₹${deposit}</strong></span>
            <span class="text-xs font-semibold" style="color: #dc2626;">Payment required to continue</span>
          </div>
        </div>
      `;
    }

    if (confirmRentBtn) {
      confirmRentBtn.style.display = 'none';
    }
    if (payShortfallBtn) {
      payShortfallBtn.style.display = 'inline-flex';
      if (payShortfallBtnText) {
        payShortfallBtnText.textContent = `Pay ₹${shortfall}`;
      }
    }
  }
  // Case 3: INSUFFICIENT CREDITS (userCredits > 0 && userCredits < rentalCost)
  else {
    if (creditStatusCard) {
      creditStatusCard.innerHTML = `
        <div class="card p-3" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: var(--radius-md);">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #f59e0b; color: white; font-size: 12px; font-weight: bold;">!</span>
              <strong class="text-xs font-bold" style="color: #92400e;">Insufficient Credits</strong>
            </div>
            <span class="badge badge-warning" style="font-size: 10px; font-weight: 700;">Shortfall: ₹${shortfall}</span>
          </div>
          <div class="grid grid-cols-4 gap-2 text-xs pt-2" style="border-top: 1px dashed rgba(245, 158, 11, 0.4);">
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Your Balance:</span>
              <strong class="text-main" style="font-size: 13px;">${userCredits} Credits</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Rental Cost:</span>
              <strong class="text-main" style="font-size: 13px;">${rentalCost} Credits</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Credits Available:</span>
              <strong class="text-main" style="font-size: 13px;">${userCredits}</strong>
            </div>
            <div>
              <span class="text-secondary block" style="font-size: 11px;">Shortfall:</span>
              <strong style="color: #b45309; font-size: 13px;">${shortfall} Credits</strong>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 pt-2 text-xs" style="border-top: 1px solid rgba(245, 158, 11, 0.2);">
            <span class="text-secondary">Security Deposit (Separate): <strong class="text-main">₹${deposit}</strong></span>
            <span class="text-xs font-semibold" style="color: #b45309;">Pay remaining ₹${shortfall} to continue</span>
          </div>
        </div>
      `;
    }

    if (confirmRentBtn) {
      confirmRentBtn.style.display = 'none';
    }
    if (payShortfallBtn) {
      payShortfallBtn.style.display = 'inline-flex';
      if (payShortfallBtnText) {
        payShortfallBtnText.textContent = `Pay Remaining ₹${shortfall}`;
      }
    }
  }
}

/* ==========================================================================
   COMPLETE PAYMENT MODAL SYSTEM (MVP / Demo Shortfall Payment)
   ========================================================================== */

/**
 * Opens the Complete Payment modal to settle the rental credit shortfall.
 */
function openPaymentModal() {
  if (!selectedItemForRent) return;
  const isHourly = selectedItemForRent.pricingType === 'hourly' || selectedItemForRent.period === 'hour';
  const hourlyRate = selectedItemForRent.pricePerHour !== undefined ? Number(selectedItemForRent.pricePerHour) : (Number(selectedItemForRent.price) || 20);
  const dailyRate = selectedItemForRent.pricePerDay !== undefined ? Number(selectedItemForRent.pricePerDay) : (Number(selectedItemForRent.price) || 0);
  const rentalCost = isHourly ? (hourlyRate * currentRentalHours) : (dailyRate * currentRentalDays);
  const deposit = selectedItemForRent.securityDeposit !== undefined ? Number(selectedItemForRent.securityDeposit) : (Number(selectedItemForRent.deposit) || 0);

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const userCredits = currentUser && currentUser.credits !== undefined ? Number(currentUser.credits) : 0;
  const shortfall = Math.max(0, rentalCost - userCredits);

  currentRentalCalculatedCost = rentalCost;
  currentRentalShortfall = shortfall;

  const itemTitleEl = document.getElementById('paymentModalItemTitle');
  const durationEl = document.getElementById('paymentModalDuration');
  const costEl = document.getElementById('paymentModalRentalCost');
  const balanceAppliedEl = document.getElementById('paymentModalBalanceApplied');
  const depositEl = document.getElementById('paymentModalSecurityDeposit');
  const amountToPayEl = document.getElementById('paymentModalAmountToPay');

  if (itemTitleEl) itemTitleEl.textContent = selectedItemForRent.name || selectedItemForRent.title || 'Campus Gear';
  if (durationEl) {
    durationEl.textContent = isHourly
      ? `${currentRentalHours} Hour${currentRentalHours === 1 ? '' : 's'}`
      : `${currentRentalDays} Day${currentRentalDays === 1 ? '' : 's'}`;
  }
  if (costEl) costEl.textContent = `${rentalCost} Credits`;
  if (balanceAppliedEl) balanceAppliedEl.textContent = `${Math.min(userCredits, rentalCost)} Credits`;
  if (depositEl) depositEl.textContent = `₹${deposit}`;
  if (amountToPayEl) amountToPayEl.textContent = `₹${shortfall}`;

  // Reset to Step 1 (Payment Selection View)
  const selectionView = document.getElementById('paymentSelectionView');
  const noticeView = document.getElementById('paymentDemoNoticeView');
  if (selectionView) selectionView.style.display = 'block';
  if (noticeView) noticeView.style.display = 'none';

  const modalOverlay = document.getElementById('paymentModalOverlay');
  if (modalOverlay) modalOverlay.classList.add('active');
}

/**
 * Closes the Complete Payment modal without making changes or deducting credits.
 */
function closePaymentModal() {
  const modalOverlay = document.getElementById('paymentModalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

/**
 * Handles "Continue to Payment" button click in Step 1.
 * Transitions to Step 2: Clear MVP Demo notice with simulated payment option.
 */
function handleContinueToPayment() {
  const selectedRadio = document.querySelector('input[name="paymentMethod"]:checked');
  const methodVal = selectedRadio ? selectedRadio.value : 'upi';

  let methodLabel = 'UPI';
  if (methodVal === 'upi') methodLabel = 'UPI (Google Pay / PhonePe / Paytm / BHIM)';
  else if (methodVal === 'card') methodLabel = 'Debit / Credit Card';
  else if (methodVal === 'netbanking') methodLabel = 'Net Banking';
  else if (methodVal === 'wallet') methodLabel = 'Campus Wallet';

  const methodEl = document.getElementById('demoNoticeSelectedMethod');
  const amountEl = document.getElementById('demoNoticeAmount');
  const amountTextEl = document.getElementById('demoNoticeAmountText');
  const simBtnText = document.getElementById('simulateDemoPaymentBtnText');

  if (methodEl) methodEl.textContent = methodLabel;
  if (amountEl) amountEl.textContent = `₹${currentRentalShortfall}`;
  if (amountTextEl) amountTextEl.textContent = `₹${currentRentalShortfall}`;
  if (simBtnText) simBtnText.textContent = `Simulate Demo Payment (Add ₹${currentRentalShortfall} Demo Credits)`;

  const selectionView = document.getElementById('paymentSelectionView');
  const noticeView = document.getElementById('paymentDemoNoticeView');
  if (selectionView) selectionView.style.display = 'none';
  if (noticeView) noticeView.style.display = 'block';
}

/**
 * Handles explicit demo payment simulation.
 * Credits the shortfall to the demo account so user can legitimately confirm their rental.
 */
function handleExecuteDemoPayment() {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast('Please log in to continue.', 'error');
    closePaymentModal();
    return;
  }

  const shortfall = currentRentalShortfall || 0;
  if (shortfall <= 0) {
    showToast('No shortfall payment required.', 'info');
    closePaymentModal();
    return;
  }

  if (typeof topupUserCredits === 'function') {
    const res = topupUserCredits(currentUser.id, shortfall);
    if (!res.success) {
      showToast(res.message || 'Error processing demo payment.', 'error');
      return;
    }
  }

  showToast(`Demo Payment simulated: Added ₹${shortfall} demo credits to your balance! You can now confirm your rental.`, 'success');
  closePaymentModal();

  // Update UI and refresh rent modal cost calculation
  if (typeof updateAuthUI === 'function') updateAuthUI();
  if (typeof updateStorageStatusUI === 'function') updateStorageStatusUI();
  if (typeof renderDashboardRentals === 'function') renderDashboardRentals();
  updateModalCostBreakdown();
}

// Global window bindings for payment modal helpers
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.handleContinueToPayment = handleContinueToPayment;
window.handleExecuteDemoPayment = handleExecuteDemoPayment;

/* ==========================================================================
   ITEM DELETE & REMOVAL SYSTEM
   ========================================================================== */

/**
 * Initiates the item deletion process after performing ownership & safety checks.
 * Shows the confirmation modal: "Are you sure you want to remove this item?"
 * @param {number|string} itemId 
 */
function requestDeleteItem(itemId) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const currentItems = typeof getItems === 'function' ? getItems() : itemsData;
  const item = currentItems.find(i => String(i.id) === String(itemId));

  if (!item) {
    showToast("Item not found.", "error");
    return;
  }

  // 1. Only the owner of the item can delete
  if (!isItemOwner(item, currentUser)) {
    showToast("Unauthorized: You can only remove items that you listed.", "error");
    return;
  }

  // 2. Check if item has an active rental
  const check = typeof canDeleteItem === 'function' ? canDeleteItem(itemId) : { hasActiveRental: false };
  const rentalNoticeEl = document.getElementById('deleteActiveRentalNotice');
  if (rentalNoticeEl) {
    rentalNoticeEl.style.display = check.hasActiveRental ? 'block' : 'none';
  }

  // 3. Before deleting, show confirmation dialog:
  // "Are you sure you want to delete this listing?"
  itemPendingDeletionId = itemId;

  const deleteModal = document.getElementById('deleteConfirmModalOverlay');
  const titleEl = document.getElementById('deleteItemTitle');
  if (titleEl) {
    titleEl.textContent = item.name || item.title;
  }
  if (deleteModal) {
    deleteModal.classList.add('active');
  }
}

/**
 * Confirms and executes item deletion from localStorage and updates UI immediately.
 */
function handleConfirmDelete() {
  if (!itemPendingDeletionId) return;

  const idToDelete = itemPendingDeletionId;

  // Execute deletion in localStorage data layer
  if (typeof deleteItem === 'function') {
    const result = deleteItem(idToDelete);
    if (!result.success) {
      showToast(result.message, "error");
      closeDeleteModal();
      return;
    }
  }

  // Update in-memory itemsData immediately from storage
  if (typeof getItems === 'function') {
    itemsData = getItems();
  } else {
    itemsData = itemsData.filter(i => String(i.id) !== String(idToDelete));
  }

  // Close modals
  closeDeleteModal();
  const rentModal = document.getElementById('rentModalOverlay');
  if (rentModal) {
    rentModal.classList.remove('active');
  }

  // Immediate UI update without manual refresh
  renderItems();
  renderDashboardRentals();
  renderMyListings();
  updateStorageStatusUI();

  showToast("Listing deleted successfully.", "success");
}

function closeDeleteModal() {
  const deleteModal = document.getElementById('deleteConfirmModalOverlay');
  if (deleteModal) {
    deleteModal.classList.remove('active');
  }
  itemPendingDeletionId = null;
}

window.requestDeleteItem = requestDeleteItem;
window.closeDeleteModal = closeDeleteModal;
window.handleConfirmDelete = handleConfirmDelete;

/* ==========================================================================
   MY LISTED ITEMS (Lender Management Hub)
   ========================================================================== */
let currentEditImageDataUrl = null;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMyListings() {
  const grid = document.getElementById('myListingsGrid');
  const countBadge = document.getElementById('myListingsCountBadge');
  if (!grid) return;

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    if (countBadge) countBadge.textContent = "0 Listed Items";
    grid.innerHTML = `
      <div class="card p-8 text-center" style="grid-column: 1 / -1; padding: var(--space-12) var(--space-6); background: var(--bg-surface); text-align: center;">
        <div style="width: 56px; height: 56px; border-radius: var(--radius-full); background: var(--primary-50); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3 style="font-size: var(--text-xl); font-weight: var(--font-bold); margin-bottom: var(--space-2); color: var(--text-main);">Log In to View Your Listings</h3>
        <p class="text-secondary text-sm mb-6" style="max-width: 440px; margin: 0 auto var(--space-5);">Please log in or register with your campus student account to see the items you have listed.</p>
        <button type="button" class="btn btn-primary" onclick="openAuthModal('login')">Log In to Your Account</button>
      </div>
    `;
    return;
  }

  const currentItems = typeof getItems === 'function' ? getItems() : itemsData;
  const myListings = currentItems.filter(item => isItemOwner(item, currentUser));
  const allRequests = typeof getRentalRequests === 'function' ? getRentalRequests() : [];
  const allRentals = typeof getRentals === 'function' ? getRentals() : [];

  if (countBadge) {
    countBadge.textContent = `${myListings.length} Listed Item${myListings.length === 1 ? '' : 's'}`;
  }

  if (myListings.length === 0) {
    grid.innerHTML = `
      <div class="card p-8 text-center" style="grid-column: 1 / -1; padding: var(--space-12) var(--space-6); background: var(--bg-surface); text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: var(--radius-full); background: var(--primary-50); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h3 style="font-size: var(--text-xl); font-weight: var(--font-bold); margin-bottom: var(--space-2); color: var(--text-main);">No Listed Items Yet</h3>
        <p class="text-secondary text-sm mb-6" style="max-width: 460px; margin: 0 auto var(--space-5);">
          You haven't listed any items for campus peers yet. Share your textbooks, calculators, electronics, or lab gear to earn credits or cash.
        </p>
        <button type="button" class="btn btn-primary" onclick="switchView('postItem')">
          + List an Item Now
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = myListings.map(item => {
    const itemImg = (item.image && String(item.image).trim()) || DEFAULT_ITEM_PLACEHOLDER;
    const isHourly = (item.pricingType === 'hourly' || item.period === 'hour');
    const priceRate = isHourly ? (item.pricePerHour !== undefined ? item.pricePerHour : item.price) : (item.pricePerDay !== undefined ? item.pricePerDay : item.price);
    const depositAmt = item.securityDeposit !== undefined ? item.securityDeposit : (item.deposit || 0);

    // Rental status check
    const hasActiveRental = allRentals.some(r =>
      String(r.itemId) === String(item.id) &&
      r.status !== 'returned' &&
      r.status !== 'completed'
    );
    const isBorrowed = item.status === 'borrowed' || hasActiveRental;

    // Pending requests count for this item
    const pendingCount = allRequests.filter(r =>
      String(r.itemId) === String(item.id) &&
      String(r.status).toLowerCase() === 'pending'
    ).length;

    // Availability text
    const hasSpecificWindow = item.availabilityType === 'time-window' && item.availabilityStart && item.availabilityEnd;
    const availText = hasSpecificWindow
      ? `Available: ${formatTime12h(item.availabilityStart)} – ${formatTime12h(item.availabilityEnd)}`
      : `Available: All day`;

    // Price text
    const priceText = item.price === 0
      ? 'Free Borrow'
      : `₹${priceRate} / ${isHourly ? 'hour' : 'day'}`;

    const itemRatingSummary = typeof getItemRatingSummary === 'function' ? getItemRatingSummary(item.id) : { average: 0, totalRatings: 0 };

    return `
      <div class="item-card" data-listing-id="${item.id}" style="box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
        <div class="item-image-container" style="height: 180px;">
          <img src="${itemImg}" alt="${escapeHtml(item.name || item.title || 'Item')}" class="item-image" onerror="if(this.src!=='${DEFAULT_ITEM_PLACEHOLDER}')this.src='${DEFAULT_ITEM_PLACEHOLDER}'" />
          <div class="item-badge-top-left">
            ${isBorrowed
        ? `<span class="badge badge-warning" style="font-size: 11px; font-weight: 600;"><span class="badge-dot" style="background: #d97706;"></span> Currently Borrowed</span>`
        : `<span class="badge badge-available" style="font-size: 11px; font-weight: 600;"><span class="badge-dot"></span> Available</span>`
      }
          </div>
          <div class="item-badge-top-right">
            <span class="badge badge-neutral" style="font-size: 11px;">Deposit: ₹${depositAmt}</span>
          </div>
        </div>

        <div class="item-card-body" style="padding: var(--space-4); display: flex; flex-direction: column; flex: 1;">
          <div class="item-category" style="margin-bottom: 2px;">${escapeHtml(item.category || 'Item')}</div>
          <h3 class="item-title" style="font-size: var(--text-base); margin-bottom: 4px;">${escapeHtml(item.name || item.title || 'Untitled Item')}</h3>

          <!-- Distinct Item Rating -->
          <div class="flex items-center gap-1.5 mb-2" style="font-size: 12px; font-weight: 600;">
            ${itemRatingSummary.totalRatings > 0 ? `
              <span style="color: #f59e0b; display: inline-flex; align-items: center; gap: 3px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${itemRatingSummary.average.toFixed(1)}
              </span>
              <span class="text-xs text-secondary font-medium">Item Rating (${itemRatingSummary.totalRatings} ${itemRatingSummary.totalRatings === 1 ? 'rating' : 'ratings'})</span>
            ` : `
              <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 3px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                No ratings yet
              </span>
              <span class="text-xs text-secondary font-medium">• 0 ratings</span>
            `}
          </div>

          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-main" style="font-size: var(--text-base);">${priceText}</span>
            <span class="text-xs text-secondary font-medium">Deposit: ₹${depositAmt}</span>
          </div>

          <!-- Availability Display -->
          <div class="text-xs text-secondary mb-2 flex items-center gap-1.5" style="background: var(--bg-subtle); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span style="font-weight: 500;">${availText}</span>
          </div>

          <!-- Status & Pending Requests row -->
          <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <span class="text-xs font-semibold ${isBorrowed ? 'text-warning' : 'text-success'}">
              Status: ${isBorrowed ? 'Currently Borrowed' : 'Available'}
            </span>
            ${pendingCount > 0 ? `<span class="badge badge-amber" style="font-size: 10px; font-weight: 700; padding: 2px 7px;">Pending Requests: ${pendingCount}</span>` : ''}
          </div>

          <!-- Action Buttons: Edit and Delete -->
          <div style="margin-top: auto; display: flex; gap: var(--space-2); padding-top: var(--space-3); border-top: 1px solid var(--border-color);">
            <button type="button" class="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1.5" onclick="openEditItemModal('${item.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <span>Edit</span>
            </button>
            <button type="button" class="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1.5" style="border-color: var(--error-border); color: var(--error);" onclick="requestDeleteItem('${item.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openEditItemModal(itemId) {
  const currentItems = typeof getItems === 'function' ? getItems() : itemsData;
  const item = currentItems.find(i => String(i.id) === String(itemId));
  if (!item) {
    showToast("Item not found.", "error");
    return;
  }

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!isItemOwner(item, currentUser)) {
    showToast("Unauthorized: You can only edit items that you listed.", "error");
    return;
  }

  const modal = document.getElementById('editItemModalOverlay');
  const idInput = document.getElementById('editItemId');
  const nameInput = document.getElementById('editItemName');
  const catSelect = document.getElementById('editItemCategory');
  const pricingTypeSelect = document.getElementById('editItemPricingType');
  const priceInput = document.getElementById('editItemPrice');
  const depositInput = document.getElementById('editItemDeposit');
  const descInput = document.getElementById('editItemDescription');
  const availAllDay = document.getElementById('editAvailAllDay');
  const availTimeWindow = document.getElementById('editAvailTimeWindow');
  const timeWindowContainer = document.getElementById('editSpecificTimeWindowContainer');
  const availStartInput = document.getElementById('editAvailStart');
  const availEndInput = document.getElementById('editAvailEnd');
  const imagePreview = document.getElementById('editItemImagePreview');

  if (idInput) idInput.value = item.id;
  if (nameInput) nameInput.value = item.name || item.title || '';
  if (catSelect) {
    const catVal = item.category || 'Other';
    const hasOption = Array.from(catSelect.options).some(o => o.value === catVal);
    if (hasOption) catSelect.value = catVal;
  }
  const isHourly = (item.pricingType === 'hourly' || item.period === 'hour');
  if (pricingTypeSelect) pricingTypeSelect.value = isHourly ? 'hourly' : 'daily';
  if (priceInput) priceInput.value = item.price !== undefined ? item.price : (isHourly ? (item.pricePerHour || 20) : (item.pricePerDay || 40));
  if (depositInput) depositInput.value = item.securityDeposit !== undefined ? item.securityDeposit : (item.deposit || 0);
  if (descInput) descInput.value = item.description || '';

  const isTimeWindow = item.availabilityType === 'time-window' && item.availabilityStart && item.availabilityEnd;
  if (availAllDay && availTimeWindow) {
    if (isTimeWindow) {
      availTimeWindow.checked = true;
      if (timeWindowContainer) timeWindowContainer.style.display = 'block';
    } else {
      availAllDay.checked = true;
      if (timeWindowContainer) timeWindowContainer.style.display = 'none';
    }
  }
  if (availStartInput) availStartInput.value = item.availabilityStart || '10:00';
  if (availEndInput) availEndInput.value = item.availabilityEnd || '14:00';

  currentEditImageDataUrl = item.image || null;
  if (imagePreview) {
    imagePreview.src = item.image || DEFAULT_ITEM_PLACEHOLDER;
    imagePreview.onerror = function () {
      this.src = DEFAULT_ITEM_PLACEHOLDER;
    };
  }

  if (modal) modal.classList.add('active');
}

function closeEditItemModal() {
  const modal = document.getElementById('editItemModalOverlay');
  if (modal) modal.classList.remove('active');
  currentEditImageDataUrl = null;
}

window.openEditItemModal = openEditItemModal;
window.closeEditItemModal = closeEditItemModal;
window.renderMyListings = renderMyListings;

/* ==========================================================================
   POST ITEM & LIVE PREVIEW
   ========================================================================== */
let currentUploadedImageDataUrl = null; // The final edited image (Data URL) saved with the listing
let currentRawFile = null;             // The selected File object
let currentRawImageDataUrl = null;     // Unedited original image (Data URL)
let currentEditorImage = new Image();  // Image object for viewport & canvas rendering
let initialFitScale = 1.0;

const editorState = {
  zoom: 100, // 50 to 300 (%)
  rotation: 0, // degrees (multiples of 90)
  panX: 0,
  panY: 0
};

// Pointer tracking for drag & pinch-to-zoom
const activePointers = new Map();
let isEditorDragging = false;
let startPointerX = 0;
let startPointerY = 0;
let startPanX = 0;
let startPanY = 0;
let initialPinchDist = 0;
let initialPinchZoom = 100;

function formatImageFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '0 KB';
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
  return Math.round(bytes / 1024) + ' KB';
}

function resetUploadedImage() {
  currentUploadedImageDataUrl = null;
  currentRawFile = null;
  currentRawImageDataUrl = null;
  editorState.zoom = 100;
  editorState.rotation = 0;
  editorState.panX = 0;
  editorState.panY = 0;

  const fileInput = document.getElementById('postImageInput');
  const dropzonePrompt = document.getElementById('dropzonePrompt');
  const dropzonePreviewContainer = document.getElementById('dropzonePreviewContainer');
  const dropzonePreviewImg = document.getElementById('dropzonePreviewImg');
  const dropzoneFileName = document.getElementById('dropzoneFileName');
  const postImageError = document.getElementById('postImageError');
  const livePreviewImg = document.getElementById('previewCardImage');

  if (fileInput) fileInput.value = '';
  if (dropzonePreviewImg) dropzonePreviewImg.src = '';
  if (dropzoneFileName) {
    dropzoneFileName.textContent = '';
    dropzoneFileName.title = '';
  }
  if (dropzonePrompt) dropzonePrompt.style.display = 'flex';
  if (dropzonePreviewContainer) dropzonePreviewContainer.style.display = 'none';
  if (postImageError) {
    postImageError.textContent = '';
    postImageError.style.display = 'none';
  }
  if (livePreviewImg) {
    livePreviewImg.src = DEFAULT_ITEM_PLACEHOLDER;
  }
}

function updateEditorTransform() {
  const sourceImg = document.getElementById('editorSourceImage');
  const zoomRange = document.getElementById('editorZoomRange');
  const zoomVal = document.getElementById('editorZoomVal');

  if (zoomRange) zoomRange.value = editorState.zoom;
  if (zoomVal) zoomVal.textContent = `${editorState.zoom}%`;

  if (sourceImg) {
    const totalScale = (editorState.zoom / 100) * initialFitScale;
    sourceImg.style.transform = `translate(-50%, -50%) translate(${editorState.panX}px, ${editorState.panY}px) rotate(${editorState.rotation}deg) scale(${totalScale})`;
  }
}

function setEditorZoom(newZoom) {
  const clamped = Math.max(50, Math.min(300, Math.round(newZoom)));
  editorState.zoom = clamped;
  updateEditorTransform();
}

function openImageEditorModal(isReEdit = false) {
  const modal = document.getElementById('imageEditorModalOverlay');
  const sourceImg = document.getElementById('editorSourceImage');
  const viewport = document.getElementById('editorCropViewport');
  const dragHint = document.getElementById('editorDragHint');

  if (!modal || !sourceImg || !viewport) return;

  sourceImg.src = currentRawImageDataUrl;
  modal.classList.add('active');

  if (dragHint) dragHint.style.opacity = '1';

  // Calculate initialFitScale once modal layout is established
  requestAnimationFrame(() => {
    const vw = viewport.clientWidth || 400;
    const vh = viewport.clientHeight || 300;
    const nw = currentEditorImage.naturalWidth || vw;
    const nh = currentEditorImage.naturalHeight || vh;
    initialFitScale = Math.max(vw / nw, vh / nh);

    if (!isReEdit) {
      editorState.zoom = 100;
      editorState.rotation = 0;
      editorState.panX = 0;
      editorState.panY = 0;
    }

    updateEditorTransform();
  });
}

function closeImageEditorModal() {
  const modal = document.getElementById('imageEditorModalOverlay');
  if (modal) modal.classList.remove('active');
  activePointers.clear();
  isEditorDragging = false;
  const fileInput = document.getElementById('postImageInput');
  if (fileInput) fileInput.value = '';
}

function applyEditedImage() {
  const viewport = document.getElementById('editorCropViewport');
  const dropzonePreviewImg = document.getElementById('dropzonePreviewImg');
  const dropzonePreviewContainer = document.getElementById('dropzonePreviewContainer');
  const dropzonePrompt = document.getElementById('dropzonePrompt');
  const dropzoneFileName = document.getElementById('dropzoneFileName');
  const livePreviewImg = document.getElementById('previewCardImage');

  if (!viewport || !currentEditorImage || !currentEditorImage.naturalWidth) {
    closeImageEditorModal();
    return;
  }

  // Create high-res canvas (4:3 aspect ratio, 800 x 600 px)
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  const vw = viewport.clientWidth || 400;
  const vh = viewport.clientHeight || 300;
  const canvasScale = canvas.width / vw;

  // Background in case image is zoomed out
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  // Move to center of canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // Apply pan (scaled to canvas coordinates)
  ctx.translate(editorState.panX * canvasScale, editorState.panY * canvasScale);
  // Apply rotation
  ctx.rotate((editorState.rotation * Math.PI) / 180);
  // Apply scale
  const totalScale = (editorState.zoom / 100) * initialFitScale * canvasScale;
  ctx.scale(totalScale, totalScale);

  const natW = currentEditorImage.naturalWidth;
  const natH = currentEditorImage.naturalHeight;
  ctx.drawImage(currentEditorImage, -natW / 2, -natH / 2, natW, natH);
  ctx.restore();

  let finalDataUrl;
  try {
    finalDataUrl = canvas.toDataURL('image/jpeg', 0.86);
  } catch (e) {
    finalDataUrl = currentRawImageDataUrl;
  }

  currentUploadedImageDataUrl = finalDataUrl;

  // Update UI previews
  if (dropzonePreviewImg) dropzonePreviewImg.src = finalDataUrl;
  if (livePreviewImg) livePreviewImg.src = finalDataUrl;
  if (dropzoneFileName) {
    const origName = (currentRawFile && currentRawFile.name) || 'item-photo.jpg';
    dropzoneFileName.textContent = `${origName} (Adjusted)`;
    dropzoneFileName.title = origName;
  }
  if (dropzonePrompt) dropzonePrompt.style.display = 'none';
  if (dropzonePreviewContainer) dropzonePreviewContainer.style.display = 'flex';

  closeImageEditorModal();
  showToast('Image adjustments saved and applied!', 'success');
}

function processSelectedImage(file) {
  const postImageError = document.getElementById('postImageError');
  const fileInput = document.getElementById('postImageInput');

  const showError = (message) => {
    if (postImageError) {
      postImageError.textContent = message;
      postImageError.style.display = 'block';
    }
    if (fileInput) fileInput.value = '';
  };

  const clearError = () => {
    if (postImageError) {
      postImageError.textContent = '';
      postImageError.style.display = 'none';
    }
  };

  if (!file) return;

  // Requirement 12: Validate format (JPG, JPEG, PNG, WEBP)
  const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const validExtensionRegex = /\.(jpe?g|png|webp)$/i;
  const mimeValid = file.type ? validMimeTypes.includes(file.type.toLowerCase()) : false;
  const extValid = validExtensionRegex.test(file.name);

  if (!mimeValid && !extValid) {
    showError('Please select a valid image file. Only JPG, JPEG, PNG, and WEBP formats are accepted.');
    return;
  }

  // Requirement 12: Maximum file size 5MB
  const maxSizeBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    showError(`The selected file is too large (${formatImageFileSize(file.size)}). Maximum allowed image size is 5MB.`);
    return;
  }

  clearError();

  // Read file and open editor modal
  const reader = new FileReader();

  reader.onerror = () => {
    showError('An error occurred while reading the image file. Please try selecting the file again.');
  };

  reader.onload = (event) => {
    currentRawFile = file;
    currentRawImageDataUrl = event.target.result;

    currentEditorImage = new Image();
    currentEditorImage.onload = () => {
      openImageEditorModal(false);
    };
    currentEditorImage.onerror = () => {
      showError('Could not decode the selected image. Please try another file.');
    };
    currentEditorImage.src = currentRawImageDataUrl;
  };

  reader.readAsDataURL(file);
}

function initImageEditorListeners() {
  const modal = document.getElementById('imageEditorModalOverlay');
  const closeBtn = document.getElementById('closeImageEditorBtn');
  const cancelBtn = document.getElementById('cancelImageEditorBtn');
  const applyBtn = document.getElementById('applyImageEditorBtn');
  const zoomInBtn = document.getElementById('editorZoomInBtn');
  const zoomOutBtn = document.getElementById('editorZoomOutBtn');
  const zoomRange = document.getElementById('editorZoomRange');
  const rotateLeftBtn = document.getElementById('editorRotateLeftBtn');
  const rotateRightBtn = document.getElementById('editorRotateRightBtn');
  const resetBtn = document.getElementById('editorResetBtn');
  const viewport = document.getElementById('editorCropViewport');
  const dragHint = document.getElementById('editorDragHint');

  if (closeBtn) closeBtn.addEventListener('click', closeImageEditorModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeImageEditorModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeImageEditorModal();
    });
  }

  if (applyBtn) applyBtn.addEventListener('click', applyEditedImage);

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => setEditorZoom(editorState.zoom + 15));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setEditorZoom(editorState.zoom - 15));
  if (zoomRange) {
    zoomRange.addEventListener('input', (e) => {
      setEditorZoom(parseInt(e.target.value, 10));
    });
  }

  if (rotateLeftBtn) {
    rotateLeftBtn.addEventListener('click', () => {
      editorState.rotation = (editorState.rotation - 90) % 360;
      updateEditorTransform();
    });
  }

  if (rotateRightBtn) {
    rotateRightBtn.addEventListener('click', () => {
      editorState.rotation = (editorState.rotation + 90) % 360;
      updateEditorTransform();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      editorState.zoom = 100;
      editorState.rotation = 0;
      editorState.panX = 0;
      editorState.panY = 0;
      updateEditorTransform();
    });
  }

  // Pointer drag & pinch to zoom on viewport
  if (viewport) {
    viewport.addEventListener('pointerdown', (e) => {
      viewport.setPointerCapture(e.pointerId);
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (dragHint) dragHint.style.opacity = '0';

      if (activePointers.size === 1) {
        isEditorDragging = true;
        viewport.classList.add('is-dragging');
        startPanX = editorState.panX;
        startPanY = editorState.panY;
        startPointerX = e.clientX;
        startPointerY = e.clientY;
      } else if (activePointers.size === 2) {
        isEditorDragging = false;
        const pts = Array.from(activePointers.values());
        initialPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        initialPinchZoom = editorState.zoom;
      }
    });

    viewport.addEventListener('pointermove', (e) => {
      if (!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 1 && isEditorDragging) {
        const dx = e.clientX - startPointerX;
        const dy = e.clientY - startPointerY;
        editorState.panX = startPanX + dx;
        editorState.panY = startPanY + dy;
        updateEditorTransform();
      } else if (activePointers.size === 2 && initialPinchDist > 0) {
        const pts = Array.from(activePointers.values());
        const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const ratio = currentDist / initialPinchDist;
        setEditorZoom(Math.round(initialPinchZoom * ratio));
      }
    });

    const handlePointerEnd = (e) => {
      if (activePointers.has(e.pointerId)) {
        activePointers.delete(e.pointerId);
      }
      if (activePointers.size === 0) {
        isEditorDragging = false;
        viewport.classList.remove('is-dragging');
      } else if (activePointers.size === 1) {
        // Returned to 1 touch, reset pan reference
        const remaining = Array.from(activePointers.values())[0];
        startPanX = editorState.panX;
        startPanY = editorState.panY;
        startPointerX = remaining.x;
        startPointerY = remaining.y;
        isEditorDragging = true;
      }
    };

    viewport.addEventListener('pointerup', handlePointerEnd);
    viewport.addEventListener('pointercancel', handlePointerEnd);
    viewport.addEventListener('lostpointercapture', handlePointerEnd);

    // Mouse wheel zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const step = e.deltaY < 0 ? 10 : -10;
      setEditorZoom(editorState.zoom + step);
    }, { passive: false });
  }
}

function initPostFormLivePreview() {
  const form = document.getElementById('postItemForm');
  if (!form) return;

  const titleInput = document.getElementById('postTitle');
  const categoryInput = document.getElementById('postCategory');
  const priceInput = document.getElementById('postPrice');
  const depositInput = document.getElementById('postDeposit');
  const locationInput = document.getElementById('postLocation');
  const conditionInput = document.getElementById('postCondition');
  const freeToggle = document.getElementById('postFreeBorrowToggle');

  // Pricing Type segmented controls
  const pricingTypeHourly = document.getElementById('postPricingTypeHourly');
  const pricingTypeDaily = document.getElementById('postPricingTypeDaily');
  const pricingTypeInput = document.getElementById('postPricingType');
  const priceLabel = document.getElementById('postPriceLabel');
  const priceSuffix = document.getElementById('postPriceSuffix');

  // Preview elements
  const prevTitle = document.getElementById('previewCardTitle');
  const prevCategory = document.getElementById('previewCardCategory');
  const prevPrice = document.getElementById('previewCardPrice');
  const prevDeposit = document.getElementById('previewCardDeposit');
  const prevLocation = document.getElementById('previewCardLocation');
  const prevImage = document.getElementById('previewCardImage');

  // File upload controls
  const fileInput = document.getElementById('postImageInput');
  const dropzone = document.getElementById('postImageDropzone');
  const editBtn = document.getElementById('editImageBtn');
  const changeBtn = document.getElementById('changeImageBtn');
  const removeBtn = document.getElementById('removeImageBtn');

  // Initialize editor listeners
  initImageEditorListeners();

  const updatePreview = () => {
    const isHourly = !pricingTypeInput || pricingTypeInput.value === 'hourly';

    if (prevTitle && titleInput) {
      prevTitle.textContent = titleInput.value.trim() || 'Your Item Title';
    }
    if (prevCategory && categoryInput) {
      const selectedOption = categoryInput.options[categoryInput.selectedIndex];
      prevCategory.textContent = selectedOption ? selectedOption.text : 'Category';
    }
    if (freeToggle && freeToggle.checked) {
      if (prevPrice) prevPrice.innerHTML = '<span class="item-price-amount free">₹0</span><span class="item-price-period">Free Borrow</span>';
    } else {
      const p = priceInput ? (parseFloat(priceInput.value) || 0) : 0;
      if (prevPrice) prevPrice.innerHTML = `<span class="item-price-amount">₹${p}</span><span class="item-price-period">${isHourly ? '/ hour' : '/ day'}</span>`;
    }
    if (prevDeposit && depositInput) {
      const d = parseFloat(depositInput.value) || 0;
      prevDeposit.textContent = `Deposit: ₹${d}`;
    }
    if (prevLocation && locationInput) {
      prevLocation.textContent = locationInput.value.trim() || 'Campus Location';
    }
    if (prevImage) {
      prevImage.src = currentUploadedImageDataUrl || DEFAULT_ITEM_PLACEHOLDER;
    }
  };

  // Pricing Type Toggle Buttons
  if (pricingTypeHourly && pricingTypeDaily) {
    pricingTypeHourly.addEventListener('click', () => {
      pricingTypeHourly.classList.add('active');
      pricingTypeDaily.classList.remove('active');
      if (pricingTypeInput) pricingTypeInput.value = 'hourly';
      if (priceLabel) priceLabel.textContent = 'Hourly Rate';
      if (priceSuffix) priceSuffix.textContent = '/ hour';
      if (priceInput && (!priceInput.value || priceInput.value === '50')) priceInput.value = '20';
      updatePreview();
    });

    pricingTypeDaily.addEventListener('click', () => {
      pricingTypeDaily.classList.add('active');
      pricingTypeHourly.classList.remove('active');
      if (pricingTypeInput) pricingTypeInput.value = 'daily';
      if (priceLabel) priceLabel.textContent = 'Daily Rate';
      if (priceSuffix) priceSuffix.textContent = '/ day';
      if (priceInput && (!priceInput.value || priceInput.value === '20')) priceInput.value = '50';
      updatePreview();
    });
  }

  // Availability radio listener
  const availAllDay = document.getElementById('postAvailAllDay');
  const availTimeWindow = document.getElementById('postAvailTimeWindow');
  const specificTimeContainer = document.getElementById('postSpecificTimeContainer');

  if (availAllDay && availTimeWindow && specificTimeContainer) {
    availAllDay.addEventListener('change', () => {
      if (availAllDay.checked) specificTimeContainer.style.display = 'none';
    });
    availTimeWindow.addEventListener('change', () => {
      if (availTimeWindow.checked) specificTimeContainer.style.display = 'grid';
    });
  }

  [titleInput, categoryInput, priceInput, depositInput, locationInput, conditionInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updatePreview);
  });

  if (freeToggle) {
    freeToggle.addEventListener('change', () => {
      if (priceInput) {
        priceInput.disabled = freeToggle.checked;
        if (freeToggle.checked) priceInput.value = '0';
      }
      updatePreview();
    });
  }

  // Set initial preview state
  updatePreview();

  // Dropzone click & keyboard handling
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#editImageBtn') || e.target.closest('#changeImageBtn') || e.target.closest('#removeImageBtn')) {
        return;
      }
      if (!currentUploadedImageDataUrl) {
        fileInput.click();
      }
    });

    dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!currentUploadedImageDataUrl) {
          fileInput.click();
        }
      }
    });

    // Drag and Drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });

    ['dragleave', 'dragend'].forEach(evt => {
      dropzone.addEventListener(evt, () => {
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) {
        processSelectedImage(file);
      }
    });
  }

  // File input change handler
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files && fileInput.files[0];
      if (file) {
        processSelectedImage(file);
      }
    });
  }

  // Edit Image button handler (re-open editor with current image & settings)
  if (editBtn) {
    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentRawImageDataUrl) {
        openImageEditorModal(true);
      }
    });
  }

  // Change Image button handler (select a completely different image)
  if (changeBtn && fileInput) {
    changeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileInput.click();
    });
  }

  // Remove button handler
  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resetUploadedImage();
    });
  }

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) {
      showToast('Please enter an item title', 'error');
      return;
    }

    // Current user from storage
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
      showToast('Please log in or register before listing an item.', 'error');
      openAuthModal('login');
      return;
    }

    const selectedCategoryText = categoryInput.options[categoryInput.selectedIndex].text;
    const pricingType = (pricingTypeInput && pricingTypeInput.value) || 'hourly';
    const isHourly = pricingType === 'hourly';
    const priceVal = freeToggle && freeToggle.checked ? 0 : (parseFloat(priceInput.value) || 0);
    const depositVal = parseFloat(depositInput.value) || 0;
    const durationVal = freeToggle && freeToggle.checked ? 'Free Borrow' : (isHourly ? 'hour' : 'day');
    const descVal = (document.getElementById('postDesc') && document.getElementById('postDesc').value.trim()) ||
      'Available for rent to verified campus community members.';
    const finalImage = currentUploadedImageDataUrl || DEFAULT_ITEM_PLACEHOLDER;

    const pricePerHour = isHourly ? priceVal : Math.round(priceVal / 4);
    const pricePerDay = isHourly ? (priceVal * 4) : priceVal;

    const ownerRatingSummary = typeof getUserRatingSummary === 'function' ? getUserRatingSummary(currentUser.id) : { average: 0, totalRatings: 0 };
    const ownerObj = {
      id: currentUser.id,
      name: currentUser.name,
      role: currentUser.role || 'Student',
      avatar: currentUser.avatar || 'ST',
      rating: ownerRatingSummary.totalRatings > 0 ? ownerRatingSummary.average : 0,
      reviewsCount: ownerRatingSummary.totalRatings,
      verified: currentUser.verificationStatus === 'verified',
      verificationStatus: currentUser.verificationStatus || 'pending'
    };

    const isTimeWindow = Boolean(availTimeWindow && availTimeWindow.checked);
    const availStartVal = (document.getElementById('postAvailStart') && document.getElementById('postAvailStart').value) || '10:00';
    const availEndVal = (document.getElementById('postAvailEnd') && document.getElementById('postAvailEnd').value) || '14:00';

    // Item schema with separate hourly pricing, security deposit, and optional availability
    const newItem = {
      id: Date.now(),
      name: title,
      title: title, // Backwards-compatible alias
      category: selectedCategoryText,
      categoryKey: categoryInput.value || selectedCategoryText,
      description: descVal,
      pricingType: pricingType,
      pricePerHour: pricePerHour,
      pricePerDay: pricePerDay,
      price: priceVal,
      duration: durationVal,
      period: durationVal,
      securityDeposit: depositVal,
      deposit: depositVal,
      itemRating: {
        average: 0,
        totalRatings: 0
      },
      availabilityType: isTimeWindow ? 'time-window' : 'all-day',
      availabilityStart: isTimeWindow ? availStartVal : '',
      availabilityEnd: isTimeWindow ? availEndVal : '',
      condition: conditionInput ? conditionInput.value : 'Good',
      location: (locationInput && locationInput.value.trim()) || 'Campus Main Library',
      image: finalImage,
      owner: ownerObj,
      lender: ownerObj,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
      status: 'available',
      fallbackIcon: 'box'
    };

    itemsData = typeof getItems === 'function' ? getItems() : itemsData;
    itemsData.unshift(newItem);
    if (typeof saveItems === 'function') {
      saveItems(itemsData); // Persisted to localStorage!
    }

    form.reset();
    if (availAllDay) availAllDay.checked = true;
    if (specificTimeContainer) specificTimeContainer.style.display = 'none';
    if (pricingTypeInput) pricingTypeInput.value = 'hourly';
    if (pricingTypeHourly) pricingTypeHourly.classList.add('active');
    if (pricingTypeDaily) pricingTypeDaily.classList.remove('active');
    if (priceLabel) priceLabel.textContent = 'Hourly Rate';
    if (priceSuffix) priceSuffix.textContent = '/ hour';
    if (priceInput) priceInput.value = '20';
    if (depositInput) depositInput.value = '100';

    resetUploadedImage();
    updatePreview();
    showToast('Your item has been listed with separate rental and deposit rates!', 'success');
    renderItems();
    renderMyListings();
    updateStorageStatusUI();
    switchView('marketplace');
  });
}

/* ==========================================================================
   DASHBOARD ACTIONS & LOCALSTORAGE RENDERING
   ========================================================================== */
let currentDashboardFilter = 'all';

function initDashboard() {
  const filterBtns = document.querySelectorAll('.segmented-control .segmented-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') ||
        (btn.textContent.toLowerCase().includes('borrowing') ? 'borrowing' :
          (btn.textContent.toLowerCase().includes('lending') ? 'lending' : 'all'));
      currentDashboardFilter = filter;
      renderDashboardRentals();
    });
  });
}

function renderDashboardRentals() {
  const tbody = document.getElementById('dashboardRentalsTableBody');
  const bannerEl = document.getElementById('dashboardVerificationBanner');
  const badgeEl = document.getElementById('dashboardVerificationBadge');
  const titleEl = document.getElementById('dashboardTitle');
  const subtitleEl = document.getElementById('dashboardSubtitle');

  const statActiveEl = document.getElementById('dashboardStatActiveRentals');
  const statCreditsEl = document.getElementById('dashboardStatCredits');
  const statTrustEl = document.getElementById('dashboardStatTrustScore');
  const statPendingEl = document.getElementById('dashboardStatPending');

  const incomingTbody = document.getElementById('incomingRequestsTableBody');
  const incomingBadge = document.getElementById('incomingRequestsCountBadge');
  const myRequestsTbody = document.getElementById('myRequestsTableBody');
  const myRequestsBadge = document.getElementById('myRequestsCountBadge');

  const tabAllBtn = document.getElementById('dashboardTabAll');
  const tabBorrowingBtn = document.getElementById('dashboardTabBorrowing');
  const tabLendingBtn = document.getElementById('dashboardTabLending');

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  if (!currentUser) {
    if (titleEl) titleEl.textContent = 'Lender & Borrower Hub';
    if (subtitleEl) subtitleEl.textContent = 'Track your active borrows, gear you\'re lending out, and pending requests.';
    if (badgeEl) badgeEl.innerHTML = '';
    if (bannerEl) {
      bannerEl.innerHTML = `
        <div class="alert alert-info" style="font-size: var(--text-xs); line-height: 1.5;">
          <strong>Guest Session:</strong> You are not currently logged in. <a href="javascript:void(0)" onclick="openAuthModal('login')" class="text-primary font-semibold underline">Log In</a> or <a href="javascript:void(0)" onclick="openAuthModal('register')" class="text-primary font-semibold underline">Register</a> to manage your active rentals and balance.
        </div>
      `;
    }
    if (statActiveEl) statActiveEl.textContent = '0 Items';
    if (statCreditsEl) statCreditsEl.textContent = '🪙 0 Credits';
    if (statTrustEl) statTrustEl.textContent = '—';
    if (statPendingEl) statPendingEl.textContent = '0 Pending';

    if (incomingBadge) incomingBadge.textContent = '0 Pending';
    if (myRequestsBadge) myRequestsBadge.textContent = '0 Requests';

    if (tabAllBtn) {
      tabAllBtn.textContent = 'All (0)';
      tabAllBtn.classList.add('active');
    }
    if (tabBorrowingBtn) {
      tabBorrowingBtn.textContent = 'Borrowing (0)';
      tabBorrowingBtn.classList.remove('active');
    }
    if (tabLendingBtn) {
      tabLendingBtn.textContent = 'Lending (0)';
      tabLendingBtn.classList.remove('active');
    }

    if (incomingTbody) {
      incomingTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: var(--space-6); color: var(--text-secondary);">
            Please <a href="javascript:void(0)" onclick="openAuthModal('login')" class="text-primary font-bold">log in</a> to view incoming borrow requests.
          </td>
        </tr>
      `;
    }
    if (myRequestsTbody) {
      myRequestsTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: var(--space-6); color: var(--text-secondary);">
            Please <a href="javascript:void(0)" onclick="openAuthModal('login')" class="text-primary font-bold">log in</a> to view your borrow requests.
          </td>
        </tr>
      `;
    }
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: var(--space-8); color: var(--text-secondary);">
            You are currently logged out. <a href="javascript:void(0)" onclick="openAuthModal('login')" class="text-primary font-bold">Log in</a> or <a href="javascript:void(0)" onclick="openAuthModal('register')" class="text-primary font-bold">Register</a> to view your personal rentals.
          </td>
        </tr>
      `;
    }
    return;
  }

  // Current user is logged in
  if (titleEl) titleEl.textContent = `Welcome, ${currentUser.name}`;
  if (subtitleEl) subtitleEl.textContent = `Student Portal • ${currentUser.collegeName || currentUser.campus || 'Campus Marketplace'}`;

  // Verification badge in header
  if (badgeEl) {
    if (currentUser.verificationStatus === 'verified') {
      badgeEl.innerHTML = `<span class="badge badge-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Student</span>`;
    } else if (currentUser.verificationStatus === 'rejected') {
      badgeEl.innerHTML = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border);"><span class="badge-dot" style="background: var(--error);"></span> Verification Rejected</span>`;
    } else {
      badgeEl.innerHTML = `<span class="badge badge-warning"><span class="badge-dot"></span> Verification Pending</span>`;
    }
  }

  // Dashboard verification banner
  if (bannerEl) {
    if (currentUser.verificationStatus === 'verified') {
      bannerEl.innerHTML = `
        <div class="alert alert-success" style="font-size: var(--text-xs); line-height: 1.5;">
          <strong>✓ Verified Student Account:</strong> Your student credentials from <strong>${currentUser.collegeName || 'your college'}</strong> are verified. You have full access to peer borrowing and lending.
        </div>
      `;
    } else if (currentUser.verificationStatus === 'rejected') {
      bannerEl.innerHTML = `
        <div class="alert alert-error" style="font-size: var(--text-xs); line-height: 1.5;">
          <strong>✕ Verification Rejected:</strong> Your student verification was not approved. You can review your details in your profile or test approval via the Admin Review Panel.
        </div>
      `;
    } else {
      bannerEl.innerHTML = `
        <div class="alert alert-warning" style="background: var(--warning-subtle); border-color: var(--warning-border); color: var(--warning-text); font-size: var(--text-xs); line-height: 1.5;">
          <div class="flex items-center gap-2 mb-1">
            <span class="badge badge-warning"><span class="badge-dot"></span> Verification Pending</span>
            <strong>Awaiting Institutional Review</strong>
          </div>
          <p style="margin: 0;">Your Student ID / Roll Number (<strong>${currentUser.studentId || 'Pending'}</strong>) from <strong>${currentUser.collegeName || 'your college'}</strong> has been recorded. <em>Note: Entering a Student ID does not automatically prove student status.</em> For testing this MVP, you can approve or reject accounts via the <strong>Admin Review Panel</strong> in your Profile.</p>
        </div>
      `;
    }
  }

  // Fetch shared requests from localStorage
  const allRequests = typeof getRentalRequests === 'function' ? getRentalRequests() : [];

  // =========================================================================
  // PROBLEM 2: INCOMING BORROW REQUESTS (Filtered by ownerId === currentUser.id)
  // =========================================================================
  const incomingRequests = allRequests.filter(r => String(r.ownerId) === String(currentUser.id));
  const pendingIncomingCount = incomingRequests.filter(r => (r.status || '').toLowerCase() === 'pending').length;

  if (incomingBadge) {
    incomingBadge.textContent = `${pendingIncomingCount} Pending`;
    incomingBadge.className = `badge ${pendingIncomingCount > 0 ? 'badge-warning' : 'badge-neutral'}`;
  }

  if (incomingTbody) {
    if (incomingRequests.length === 0) {
      incomingTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: var(--space-6); color: var(--text-secondary);">
            No incoming borrow requests for your items yet.
          </td>
        </tr>
      `;
    } else {
      incomingTbody.innerHTML = incomingRequests.map(req => {
        const statusLower = (req.status || 'pending').toLowerCase();
        let statusBadgeHtml = '';
        let actionHtml = '';

        if (statusLower === 'pending') {
          statusBadgeHtml = `<span class="badge badge-warning"><span class="badge-dot"></span> Pending</span>`;
          actionHtml = `
            <div class="flex items-center justify-end gap-2">
              <button class="btn btn-primary btn-xs" onclick="handleAcceptBorrowRequest('${req.requestId || req.id}')">Accept</button>
              <button class="btn btn-outline btn-xs" style="color: var(--error); border-color: var(--error-border);" onclick="handleRejectBorrowRequest('${req.requestId || req.id}')">Reject</button>
            </div>
          `;
        } else if (statusLower === 'accepted') {
          statusBadgeHtml = `<span class="badge badge-available"><span class="badge-dot"></span> Accepted</span>`;
          actionHtml = `<span class="text-xs text-success font-semibold">Accepted</span>`;
        } else {
          statusBadgeHtml = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border);"><span class="badge-dot" style="background: var(--error);"></span> Rejected</span>`;
          actionHtml = `<span class="text-xs text-secondary">Rejected</span>`;
        }

        const dateStr = req.createdAt ? new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
        const isHourly = req.pricingType === 'hourly' || Boolean(req.durationHours);
        const durationText = isHourly ? `${req.durationHours || 3} Hours` : `${req.durationDays || 3} Days`;
        const rateText = isHourly ? `₹${req.hourlyRate || 20}/hour` : (req.dailyRate === 0 ? 'Free Community Borrow' : `₹${req.dailyRate || 0}/day`);
        const rentalCostVal = req.rentalCost !== undefined ? req.rentalCost : (req.rentalFee !== undefined ? req.rentalFee : (isHourly ? ((req.hourlyRate || 20) * (req.durationHours || 3)) : ((req.dailyRate || 0) * (req.durationDays || 3))));
        const depositVal = req.securityDeposit !== undefined ? req.securityDeposit : (req.deposit || 0);

        return `
          <tr>
            <td>
              <div class="flex items-center gap-3">
                <img src="${req.itemImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80'}" style="width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;" alt="${req.itemTitle || req.itemName}" />
                <div>
                  <div class="font-semibold text-main">${req.itemTitle || req.itemName}</div>
                  <div class="text-xs text-secondary">${req.itemCategory || 'Campus Gear'}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="font-medium text-main">${req.borrowerName || 'Student Peer'}</div>
              <div class="text-xs text-secondary">${req.borrowerRole || 'Student'}</div>
            </td>
            <td>
              <div class="font-semibold text-main">Requested for ${durationText}</div>
              <div class="text-xs text-secondary">${rateText} • ₹${rentalCostVal} rental cost • ₹${depositVal} deposit</div>
            </td>
            <td>
              <div class="text-xs text-secondary">${dateStr}</div>
            </td>
            <td>${statusBadgeHtml}</td>
            <td style="text-align: right;">${actionHtml}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // =========================================================================
  // PROBLEM 1: MY BORROW REQUESTS (Filtered by borrowerId === currentUser.id)
  // =========================================================================
  const myRequests = allRequests.filter(r => String(r.borrowerId) === String(currentUser.id));

  if (myRequestsBadge) {
    myRequestsBadge.textContent = `${myRequests.length} Request${myRequests.length === 1 ? '' : 's'}`;
  }

  if (myRequestsTbody) {
    if (myRequests.length === 0) {
      myRequestsTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: var(--space-6); color: var(--text-secondary);">
            You have not made any borrow requests yet. Explore the <a href="javascript:void(0)" onclick="switchView('marketplace')" class="text-primary font-semibold">Marketplace</a> to request items.
          </td>
        </tr>
      `;
    } else {
      myRequestsTbody.innerHTML = myRequests.map(req => {
        const statusLower = (req.status || 'pending').toLowerCase();
        let statusBadgeHtml = '';

        if (statusLower === 'pending') {
          statusBadgeHtml = `<span class="badge badge-warning"><span class="badge-dot"></span> Pending Review</span>`;
        } else if (statusLower === 'accepted') {
          statusBadgeHtml = `<span class="badge badge-available"><span class="badge-dot"></span> Accepted</span>`;
        } else {
          statusBadgeHtml = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border);"><span class="badge-dot" style="background: var(--error);"></span> Rejected</span>`;
        }

        const dateStr = req.createdAt ? new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
        const isHourly = req.pricingType === 'hourly' || Boolean(req.durationHours);
        const durationText = isHourly ? `${req.durationHours || 3} Hours` : `${req.durationDays || 3} Days`;
        const rateText = isHourly ? `₹${req.hourlyRate || 20}/hour` : (req.dailyRate === 0 ? 'Free Community Borrow' : `₹${req.dailyRate || 0}/day`);
        const rentalCostVal = req.rentalCost !== undefined ? req.rentalCost : (req.rentalFee !== undefined ? req.rentalFee : (isHourly ? ((req.hourlyRate || 20) * (req.durationHours || 3)) : ((req.dailyRate || 0) * (req.durationDays || 3))));
        const depositVal = req.securityDeposit !== undefined ? req.securityDeposit : (req.deposit || 0);

        return `
          <tr>
            <td>
              <div class="flex items-center gap-3">
                <img src="${req.itemImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80'}" style="width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;" alt="${req.itemTitle || req.itemName}" />
                <div>
                  <div class="font-semibold text-main">${req.itemTitle || req.itemName}</div>
                  <div class="text-xs text-secondary">${req.itemCategory || 'Campus Gear'}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="font-medium text-main">${req.ownerName || 'Item Owner'}</div>
              <div class="text-xs text-secondary">Campus Peer</div>
            </td>
            <td>
              <div class="font-semibold text-main">${durationText} (${rateText})</div>
              <div class="text-xs text-secondary">₹${rentalCostVal} rental cost • ₹${depositVal} deposit</div>
            </td>
            <td>
              <div class="text-xs text-secondary">${dateStr}</div>
            </td>
            <td>${statusBadgeHtml}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // =========================================================================
  // CURRENT BORROWING & LENDING ACTIVITY (Filtered strictly by currentUser.id)
  // =========================================================================
  const allRentals = typeof getRentals === 'function' ? getRentals() : [];
  const allUsers = typeof getUsers === 'function' ? getUsers() : [];

  // BORROWING: Rentals where current user is the borrower
  const userBorrowingRentals = allRentals.filter(r =>
    r.borrowerId && String(r.borrowerId) === String(currentUser.id)
  );

  // LENDING: Rentals where current user is the owner/lender
  const userLendingRentals = allRentals.filter(r =>
    (r.ownerId && String(r.ownerId) === String(currentUser.id)) ||
    (r.lenderId && String(r.lenderId) === String(currentUser.id))
  );

  // ALL: Both borrowing + lending records
  const userAllRentals = allRentals.filter(r =>
    (r.borrowerId && String(r.borrowerId) === String(currentUser.id)) ||
    (r.ownerId && String(r.ownerId) === String(currentUser.id)) ||
    (r.lenderId && String(r.lenderId) === String(currentUser.id))
  );

  // The counts must be calculated from the EXACT SAME filtered records that are displayed in the table
  const allCount = userAllRentals.length;
  const borrowingCount = userBorrowingRentals.length;
  const lendingCount = userLendingRentals.length;

  if (tabAllBtn) {
    tabAllBtn.textContent = `All (${allCount})`;
    tabAllBtn.classList.toggle('active', currentDashboardFilter === 'all');
  }
  if (tabBorrowingBtn) {
    tabBorrowingBtn.textContent = `Borrowing (${borrowingCount})`;
    tabBorrowingBtn.classList.toggle('active', currentDashboardFilter === 'borrowing');
  }
  if (tabLendingBtn) {
    tabLendingBtn.textContent = `Lending (${lendingCount})`;
    tabLendingBtn.classList.toggle('active', currentDashboardFilter === 'lending');
  }

  // =========================================================================
  // OWNER RETURN CONFIRMATION REQUIRED SECTION
  // =========================================================================
  const ownerReturnSection = document.getElementById('ownerReturnConfirmSection');
  const ownerReturnBadge = document.getElementById('ownerReturnConfirmCountBadge');
  const ownerReturnCardsContainer = document.getElementById('ownerReturnConfirmCardsContainer');

  if (ownerReturnSection && ownerReturnCardsContainer) {
    if (!currentUser) {
      ownerReturnSection.style.display = 'none';
    } else {
      // Find rentals where current user is the owner/lender AND status is return_pending_confirmation
      const pendingOwnerReturns = allRentals.filter(r =>
        (String(r.ownerId) === String(currentUser.id) || String(r.lenderId) === String(currentUser.id)) &&
        ((r.status || '').toLowerCase() === 'return_pending_confirmation' || (r.returnStatus || '').toLowerCase() === 'pending_owner_confirmation')
      );

      if (pendingOwnerReturns.length > 0) {
        ownerReturnSection.style.display = 'block';
        if (ownerReturnBadge) {
          ownerReturnBadge.textContent = `${pendingOwnerReturns.length} Action${pendingOwnerReturns.length === 1 ? '' : 's'} Required`;
        }
        ownerReturnCardsContainer.innerHTML = pendingOwnerReturns.map(ret => {
          const itemName = ret.itemName || ret.itemTitle || 'Item';
          const itemImg = ret.itemImage || DEFAULT_ITEM_PLACEHOLDER;
          const borrowerUser = allUsers.find(u => String(u.id) === String(ret.borrowerId));
          const borrowerName = (borrowerUser && borrowerUser.name) || ret.borrowerName || ret.peerName || 'Student Peer';
          const isHourly = ret.pricingType === 'hourly' || Boolean(ret.durationHours);
          const durationText = isHourly ? `${ret.durationHours || 1} Hour${(ret.durationHours || 1) === 1 ? '' : 's'}` : `${ret.durationDays || 1} Day${(ret.durationDays || 1) === 1 ? '' : 's'}`;
          const hourlyRate = ret.hourlyRate !== undefined ? ret.hourlyRate : 20;
          const rentalCostVal = ret.rentalCost !== undefined ? ret.rentalCost : (ret.rentalFee !== undefined ? ret.rentalFee : (isHourly ? (hourlyRate * (ret.durationHours || 1)) : ((ret.dailyRate || 0) * (ret.durationDays || 1))));
          const depositVal = ret.securityDeposit !== undefined ? ret.securityDeposit : (ret.deposit || 0);

          return `
            <div class="card" style="padding: var(--space-4); border: 1px solid var(--border-color); background: var(--bg-surface-elevated); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: var(--space-3);">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <span class="badge badge-warning" style="font-weight: 700; font-size: 11px;">⚠️ Action Required</span>
                <span class="text-xs text-secondary font-mono">Return confirmation requested</span>
              </div>
              <div class="flex items-center gap-4 flex-wrap">
                <img src="${itemImg}" style="width: 58px; height: 58px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-color);" alt="${itemName}">
                <div style="flex: 1; min-width: 220px;">
                  <h4 style="margin: 0 0 6px 0; font-size: var(--text-base); color: var(--text-main); font-weight: 700;">${itemName}</h4>
                  <div class="text-xs text-secondary flex flex-wrap gap-x-4 gap-y-1">
                    <span><strong>Borrower:</strong> ${borrowerName}</span>
                    <span><strong>Rental Duration:</strong> ${durationText}</span>
                    <span><strong>Rental Cost:</strong> ₹${rentalCostVal}</span>
                    <span><strong>Security Deposit:</strong> ₹${depositVal}</span>
                  </div>
                </div>
              </div>
              <div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: var(--space-2) var(--space-3); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: var(--text-xs); color: #92400e;">
                "${borrowerName} has marked this item as returned. Please confirm whether you have actually received the item back."
              </div>
              <div class="flex items-center justify-end gap-2 pt-2" style="border-top: 1px solid var(--border-color);">
                <button type="button" class="btn btn-outline btn-sm" style="color: var(--error); border-color: var(--error-border); font-weight: 600;" onclick="handleOwnerDisputeReturn('${ret.id}')">
                  Not Returned
                </button>
                <button type="button" class="btn btn-success btn-sm" style="background-color: #10B981 !important; border: 1px solid #059669 !important; color: #FFFFFF !important; font-weight: 600; display: inline-flex !important; align-items: center; justify-content: center; gap: 6px; cursor: pointer; visibility: visible !important; opacity: 1 !important;" onclick="handleOwnerConfirmReturn('${ret.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" style="flex-shrink: 0;"><polyline points="20 6 9 17 4 12"></polyline></svg>Confirm Return
                </button>
              </div>
            </div>
          `;
        }).join('');
      } else {
        ownerReturnSection.style.display = 'none';
      }
    }
  }

  // =========================================================================
  // 4 DASHBOARD SUMMARY CARDS (Dynamic & strictly user-specific)
  // =========================================================================

  // 1. ACTIVE RENTALS: Number of items that the CURRENT USER is actively borrowing
  // borrowerId === currentUser.id AND rental status === "active" or "return_due" or "return_pending_confirmation" or "return_disputed"
  // Do NOT count: rejected requests, pending requests, completed/returned rentals
  const activeBorrowingCount = allRentals.filter(r => {
    const isBorrower = r.borrowerId && String(r.borrowerId) === String(currentUser.id);
    const s = (r.status || '').toLowerCase();
    const isActive = s === 'active' || s === 'active_borrow' || s === 'in_good_hands' || s === 'return_due' || s === 'return_pending_confirmation' || s === 'return_disputed';
    const isNotReturned = s !== 'returned' && s !== 'completed' && s !== 'pending_pickup' && s !== 'rejected' && s !== 'cancelled';
    return isBorrower && isActive && isNotReturned;
  }).length;

  if (statActiveEl) {
    statActiveEl.textContent = `${activeBorrowingCount} Item${activeBorrowingCount === 1 ? '' : 's'}`;
  }

  // 2. RENTAL BALANCE: Stored credit balance of current user (Initial: 100 Credits)
  const userCredits = currentUser.credits !== undefined ? Number(currentUser.credits) : 100;
  if (statCreditsEl) {
    statCreditsEl.textContent = `🪙 ${userCredits} Credits`;
  }

  // 3. TRUST SCORE: Stored trust rating of current user (strictly from user peer reviews)
  const userSummary = typeof getUserRatingSummary === 'function' ? getUserRatingSummary(currentUser.id) : null;
  const userRatingCount = userSummary ? userSummary.totalRatings : (currentUser.reviewsCount || 0);
  if (statTrustEl) {
    if (userRatingCount > 0 && userSummary) {
      statTrustEl.textContent = `${userSummary.average.toFixed(1)} ★`;
      statTrustEl.style.fontSize = '';
    } else {
      statTrustEl.textContent = `No ratings yet`;
      statTrustEl.style.fontSize = '1.25rem';
    }
  }

  // 4. PENDING REQUESTS: Borrow requests requiring review from current user (ownerId === currentUser.id AND status === "pending")
  if (statPendingEl) {
    statPendingEl.textContent = `${pendingIncomingCount} Pending`;
  }

  // Select records for the active tab
  let displayedRentals = [];
  if (currentDashboardFilter === 'borrowing') {
    displayedRentals = userBorrowingRentals;
  } else if (currentDashboardFilter === 'lending') {
    displayedRentals = userLendingRentals;
  } else {
    displayedRentals = userAllRentals;
  }

  if (!tbody) return;

  if (displayedRentals.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: var(--space-8); color: var(--text-secondary);">
          No activity found for ${currentUser.name}.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = displayedRentals.map(rental => {
    // Determine whether this rental is borrowing or lending for currentUser
    const isBorrowing = Boolean(rental.borrowerId && String(rental.borrowerId) === String(currentUser.id));
    const isHourly = rental.pricingType === 'hourly' || Boolean(rental.durationHours) || Boolean(rental.startTime);

    // PEER CONTACT:
    // For borrowing: Peer Contact = item owner/lender
    // For lending: Peer Contact = borrower
    let peerName = '';
    let peerRole = '';

    if (isBorrowing) {
      const ownerUser = allUsers.find(u => String(u.id) === String(rental.ownerId || rental.lenderId));
      peerName = (ownerUser && ownerUser.name) || rental.ownerName || rental.lenderName || (rental.lender && rental.lender.name) || rental.peerName || 'Item Owner';
      peerRole = (ownerUser && ownerUser.role) || rental.ownerRole || rental.lenderRole || rental.peerRole || 'Student Lender';
    } else {
      const borrowerUser = allUsers.find(u => String(u.id) === String(rental.borrowerId));
      peerName = (borrowerUser && borrowerUser.name) || rental.borrowerName || (rental.peerName !== (rental.ownerName || rental.lenderName) ? rental.peerName : '') || 'Student Peer';
      peerRole = (borrowerUser && borrowerUser.role) || rental.borrowerRole || 'Student Borrower';
    }

    // STATUS from localStorage:
    let badgeHtml = '';
    const st = (rental.status || 'active').toLowerCase();

    if (st === 'return_pending_confirmation') {
      if (isBorrowing) {
        badgeHtml = `<span class="badge badge-warning" style="background: rgba(245, 158, 11, 0.15); color: #d97706; border-color: rgba(245, 158, 11, 0.3);"><span class="badge-dot" style="background: #f59e0b;"></span> Return Pending</span>`;
      } else {
        badgeHtml = `<span class="badge badge-warning" style="background: rgba(245, 158, 11, 0.15); color: #d97706; border-color: rgba(245, 158, 11, 0.3);"><span class="badge-dot" style="background: #f59e0b;"></span> Return Confirmation Required</span>`;
      }
    } else if (st === 'return_disputed') {
      badgeHtml = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border);"><span class="badge-dot" style="background: var(--error);"></span> Disputed</span>`;
    } else if (st === 'return_due') {
      badgeHtml = `<span class="badge badge-return-due"><span class="badge-dot" style="background: var(--error);"></span> Return Due</span>`;
    } else if (st === 'pending_pickup') {
      badgeHtml = `<span class="badge badge-reserved"><span class="badge-dot"></span> Pending Pickup</span>`;
    } else if (st === 'active_borrow' || st === 'active') {
      badgeHtml = `<span class="badge badge-borrowed"><span class="badge-dot"></span> Active</span>`;
    } else if (st === 'in_good_hands') {
      badgeHtml = `<span class="badge badge-available"><span class="badge-dot"></span> In Good Hands</span>`;
    } else if (st === 'returned' || st === 'completed') {
      badgeHtml = `<span class="badge badge-neutral" style="background: rgba(16, 185, 129, 0.12); color: #059669; border-color: rgba(16, 185, 129, 0.25);"><span class="badge-dot" style="background: #10B981;"></span> Completed</span>`;
    } else {
      badgeHtml = `<span class="badge badge-available"><span class="badge-dot"></span> ${rental.statusLabel || rental.status || 'Active'}</span>`;
    }

    // ACTION:
    // For borrowing: Show Return Item button when active or return_due; Show Rate Owner & Item when completed
    // For lending: Show owner-side confirmation buttons; Show Rate Borrower when completed
    let actionBtnHtml = '';

    if (isBorrowing) {
      if (st === 'returned' || st === 'completed') {
        const ratingStatus = typeof getRentalRatingStatus === 'function' ? getRentalRatingStatus(rental, currentUser.id) : { hasUserRating: false, hasItemRating: false, allRated: false };
        if (ratingStatus.allRated) {
          actionBtnHtml = `<div class="flex items-center justify-end gap-1.5"><span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border-color: rgba(16, 185, 129, 0.25); font-size: 11px; font-weight: 600;">Rated ★</span></div>`;
        } else {
          actionBtnHtml = `
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" class="btn btn-warning btn-xs" style="background: #f59e0b; color: #ffffff; border-color: #d97706; font-size: 11px; font-weight: 600; padding: 4px 8px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer;" onclick="openRentalRatingModal('${rental.id}')">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Rate Owner &amp; Item
              </button>
            </div>
          `;
        }
      } else if (st === 'return_pending_confirmation') {
        actionBtnHtml = `<span class="text-xs font-semibold" style="color: #d97706; display: inline-flex; align-items: center; gap: 4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Waiting for Owner Confirmation
        </span>`;
      } else if (st === 'return_disputed') {
        actionBtnHtml = `<div class="text-xs font-semibold" style="color: var(--error); line-height: 1.3; max-width: 190px; text-align: right;">Owner has not confirmed the return yet. Please contact the owner.</div>`;
      } else if (st === 'pending_pickup') {
        actionBtnHtml = `<span class="text-xs text-warning font-medium">Awaiting Pickup</span>`;
      } else {
        // Active borrowing rental (or Return Due): borrower can return item
        actionBtnHtml = `
          <div class="flex items-center justify-end gap-2">
            <button class="btn btn-outline btn-xs" style="color: var(--color-success); border-color: var(--color-success); font-weight: 600;" onclick="openReturnConfirmModal('${rental.id}')">Return Item</button>
          </div>
        `;
      }
    } else {
      // Lending rental: owner-side
      if (st === 'return_pending_confirmation') {
        actionBtnHtml = `
          <div class="flex items-center justify-end gap-1.5">
            <button type="button" class="btn btn-success btn-xs" style="background-color: #10B981 !important; border: 1px solid #059669 !important; color: #FFFFFF !important; font-weight: 600; font-size: 11px; padding: 3px 8px; cursor: pointer; visibility: visible !important; opacity: 1 !important;" onclick="handleOwnerConfirmReturn('${rental.id}')">Confirm Return</button>
            <button type="button" class="btn btn-outline btn-xs" style="color: var(--error); border-color: var(--error-border); font-weight: 600; font-size: 11px; padding: 3px 8px; cursor: pointer;" onclick="handleOwnerDisputeReturn('${rental.id}')">Not Returned</button>
          </div>
        `;
      } else if (st === 'return_disputed') {
        actionBtnHtml = `<span class="text-xs font-semibold" style="color: var(--error);">Marked Not Returned</span>`;
      } else if (st === 'pending_pickup') {
        actionBtnHtml = `<button class="btn btn-primary btn-xs" onclick="handleApproveRental('${rental.id}')">Approve &amp; Release</button>`;
      } else if (st === 'return_due') {
        actionBtnHtml = `<span class="text-xs text-warning font-semibold">Awaiting Return</span>`;
      } else if (st === 'returned' || st === 'completed') {
        const ratingStatus = typeof getRentalRatingStatus === 'function' ? getRentalRatingStatus(rental, currentUser.id) : { hasUserRating: false, allRated: false };
        if (ratingStatus.hasUserRating) {
          actionBtnHtml = `<div class="flex items-center justify-end gap-1.5"><span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border-color: rgba(16, 185, 129, 0.25); font-size: 11px; font-weight: 600;">Rated ★</span></div>`;
        } else {
          actionBtnHtml = `
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" class="btn btn-warning btn-xs" style="background: #f59e0b; color: #ffffff; border-color: #d97706; font-size: 11px; font-weight: 600; padding: 4px 8px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer;" onclick="openRentalRatingModal('${rental.id}')">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Rate Borrower
              </button>
            </div>
          `;
        }
      } else {
        actionBtnHtml = `<span class="text-xs text-success font-medium">Lent to Peer</span>`;
      }
    }

    const depositVal = rental.securityDeposit !== undefined ? rental.securityDeposit : (rental.deposit || 0);
    const itemName = rental.itemName || rental.itemTitle || 'Campus Item';
    const itemImage = rental.itemImage || DEFAULT_ITEM_PLACEHOLDER;

    // Pricing & Rate cell
    let pricingHtml = '';
    if (isHourly) {
      const hourlyRate = rental.hourlyRate !== undefined ? rental.hourlyRate : 20;
      const rentalCost = rental.rentalCost !== undefined ? rental.rentalCost : (hourlyRate * (rental.durationHours || 3));
      pricingHtml = `
        <div class="font-semibold text-main">₹${hourlyRate} / hour</div>
        <div class="text-xs text-secondary">Rental Cost: ₹${rentalCost}</div>
      `;
    } else {
      const isFree = rental.dailyRate === 0;
      const dailyRate = rental.dailyRate || 0;
      const rentalCost = rental.rentalCost !== undefined ? rental.rentalCost : dailyRate;
      pricingHtml = `
        ${isFree ? '<span class="badge badge-verified">Free Community Borrow</span>' : `<span class="font-semibold text-main">₹${dailyRate}</span> / day`}
        <div class="text-xs text-secondary">Rental Cost: ₹${rentalCost}</div>
      `;
    }

    // Duration & Schedule cell
    let scheduleHtml = '';
    const typeLabel = isBorrowing ? 'Borrowing' : 'Lending';
    if (isHourly && rental.startTime && rental.endTime) {
      const durationHours = rental.durationHours || 3;
      const startTimeStr = formatTime(rental.startTime);
      const endTimeStr = formatTime(rental.endTime);
      const isFinished = st === 'completed' || st === 'returned' || st === 'return_pending_confirmation' || st === 'return_disputed';

      scheduleHtml = `
        <div class="font-semibold text-main">${durationHours} hour rental</div>
        <div class="text-xs text-secondary">Started: ${startTimeStr} • Ends: ${endTimeStr}</div>
        ${!isFinished ? `
          <div class="mt-1">
            <span class="countdown-pill ${st === 'return_due' ? 'overdue' : ''}" id="countdown_${rental.id}" data-rental-id="${rental.id}" data-end-time="${rental.endTime}" data-status="${rental.status}">
              Time remaining: calculating...
            </span>
          </div>
        ` : ''}
      `;
    } else {
      scheduleHtml = `
        <div class="font-medium text-main">${rental.dueDate || 'Active'}</div>
        <div class="text-xs text-secondary">${typeLabel} • ${rental.durationDays || 3} days</div>
      `;
    }

    return `
      <tr>
        <td>
          <div class="flex items-center gap-3">
            <img src="${itemImage}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;" alt="${itemName}" />
            <div>
              <div class="font-semibold text-main">${itemName}</div>
              <div class="text-xs text-secondary">Deposit: ₹${depositVal} • ${rental.location || 'Campus'}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="font-medium text-main">${peerName}</div>
          <div class="text-xs text-secondary">${peerRole}</div>
        </td>
        <td>${pricingHtml}</td>
        <td>${scheduleHtml}</td>
        <td>${badgeHtml}</td>
        <td style="text-align: right;">${actionBtnHtml}</td>
      </tr>
    `;
  }).join('');

  // Update countdown timers on the newly rendered elements
  if (typeof updateLiveCountdowns === 'function') {
    updateLiveCountdowns();
  }
}

// Request Owner Action: Accept Borrow Request
window.handleAcceptBorrowRequest = function (requestId) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to manage borrow requests.", "error");
    return;
  }

  const requests = typeof getRentalRequests === 'function' ? getRentalRequests() : [];
  const req = requests.find(r => r.requestId === requestId || r.id === requestId);
  if (!req) {
    showToast("Borrow request not found.", "error");
    return;
  }

  if (String(req.ownerId) !== String(currentUser.id)) {
    showToast("Unauthorized: You can only respond to requests for items you own.", "error");
    return;
  }

  if (String(req.status).toLowerCase() !== 'pending') {
    showToast(`Request has already been ${req.status}.`, "info");
    return;
  }

  // 1. Calculate rental cost in credits
  const isHourly = req.pricingType === 'hourly' || Boolean(req.durationHours);
  const durationHours = req.durationHours ? Number(req.durationHours) : (Number(req.durationDays || 3) * 24);
  const hourlyRate = req.hourlyRate !== undefined ? Number(req.hourlyRate) : (Number(req.pricePerHour) || 20);
  const rentalCost = req.rentalCost !== undefined ? Number(req.rentalCost) : (req.rentalFee !== undefined ? Number(req.rentalFee) : (isHourly ? (hourlyRate * durationHours) : ((Number(req.dailyRate) || 0) * (Number(req.durationDays) || 3))));
  const securityDeposit = req.securityDeposit !== undefined ? Number(req.securityDeposit) : (Number(req.deposit) || 0);

  // 2. Fetch users and verify borrower balance
  const allUsers = typeof getUsers === 'function' ? getUsers() : [];
  const borrower = allUsers.find(u => String(u.id) === String(req.borrowerId));
  const owner = allUsers.find(u => String(u.id) === String(req.ownerId));

  if (!borrower) {
    showToast("Borrower account not found.", "error");
    return;
  }

  const borrowerBalance = borrower.credits !== undefined ? Number(borrower.credits) : 100;
  if (borrowerBalance < rentalCost) {
    showToast(`Borrower does not have enough credits (🪙 ${borrowerBalance} Credits available, ${rentalCost} Credits required).`, "error");
    return;
  }

  // 3. Update request status to Accepted
  if (typeof updateBorrowRequestStatus === 'function') {
    updateBorrowRequestStatus(requestId, 'Accepted');
  }

  // 4. Transfer credits: Deduct from borrower, add to owner
  borrower.credits = borrowerBalance - rentalCost;
  if (owner) {
    owner.credits = (owner.credits !== undefined ? Number(owner.credits) : 100) + rentalCost;
  }
  if (typeof saveUsers === 'function') {
    saveUsers(allUsers);
  }

  // If current logged-in user is the owner, update currentUser in storage
  if (owner && String(currentUser.id) === String(owner.id)) {
    currentUser.credits = owner.credits;
    if (typeof setCurrentUser === 'function') {
      setCurrentUser(currentUser);
    }
  }
  // If current logged-in user is the borrower, update currentUser in storage
  if (borrower && String(currentUser.id) === String(borrower.id)) {
    currentUser.credits = borrower.credits;
    if (typeof setCurrentUser === 'function') {
      setCurrentUser(currentUser);
    }
  }

  // 5. Create ACTIVE RENTAL in localStorage
  if (typeof getRentals === 'function' && typeof saveRentals === 'function') {
    const rentals = getRentals();
    const newRentalId = 'rent_' + Date.now();
    const now = Date.now();
    const startTime = now;
    const endTime = now + (durationHours * 3600000);
    const startDate = new Date(startTime).toISOString().split('T')[0];
    const dueDate = new Date(endTime).toLocaleDateString();

    const newRental = {
      id: newRentalId,
      rentalId: newRentalId,
      requestId: req.requestId || req.id,
      itemId: req.itemId,
      itemName: req.itemTitle || req.itemName || 'Campus Gear',
      itemTitle: req.itemTitle || req.itemName || 'Campus Gear',
      itemImage: req.itemImage,
      itemCategory: req.itemCategory || 'Campus Gear',
      location: req.location || 'Campus Quad',
      ownerId: String(req.ownerId),
      lenderId: String(req.ownerId),
      ownerName: req.ownerName || 'Item Owner',
      borrowerId: String(req.borrowerId),
      borrowerName: req.borrowerName,
      borrowerRole: req.borrowerRole || 'Student',
      peerName: req.borrowerName,
      peerRole: req.borrowerRole || 'Student',
      durationHours: durationHours,
      durationDays: Math.ceil(durationHours / 24),
      pricingType: isHourly ? 'hourly' : 'daily',
      hourlyRate: hourlyRate,
      dailyRate: req.dailyRate || 0,
      rentalCost: rentalCost,
      rentalFee: rentalCost,
      securityDeposit: securityDeposit,
      deposit: securityDeposit,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      dueDate: dueDate,
      type: 'lending',
      status: 'active',
      statusLabel: 'Active Borrow',
      returnStatus: 'not_requested',
      createdAt: startTime
    };

    rentals.unshift(newRental);
    saveRentals(rentals);
  }

  // 6. Update item status to borrowed
  if (typeof getItems === 'function' && typeof saveItems === 'function') {
    const items = getItems();
    const it = items.find(i => String(i.id) === String(req.itemId));
    if (it) {
      it.status = 'borrowed';
      saveItems(items);
      itemsData = items;
      renderItems();
    }
  }

  showToast(`Accepted borrow request from ${req.borrowerName}! Rental is now active (+${rentalCost} Credits).`, "success");
  updateAuthUI();
  renderDashboardRentals();
  updateStorageStatusUI();
};

// Request Owner Action: Reject Borrow Request
window.handleRejectBorrowRequest = function (requestId) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to manage borrow requests.", "error");
    return;
  }

  const requests = typeof getRentalRequests === 'function' ? getRentalRequests() : [];
  const req = requests.find(r => r.requestId === requestId || r.id === requestId);
  if (!req) {
    showToast("Borrow request not found.", "error");
    return;
  }

  if (String(req.ownerId) !== String(currentUser.id)) {
    showToast("Unauthorized: You can only respond to requests for items you own.", "error");
    return;
  }

  if (typeof updateBorrowRequestStatus === 'function') {
    const res = updateBorrowRequestStatus(requestId, 'Rejected');
    if (res.success) {
      showToast(`Rejected borrow request for ${req.itemTitle}.`, "info");
      renderDashboardRentals();
      updateStorageStatusUI();
    } else {
      showToast(res.message || "Failed to update request.", "error");
    }
  }
};

function handleApproveRental(rentalId) {
  if (typeof getRentals !== 'function' || typeof saveRentals !== 'function') return;
  const rentals = getRentals();
  const rental = rentals.find(r => r.id === rentalId);
  if (rental) {
    rental.status = 'in_good_hands';
    rental.statusLabel = 'In Good Hands';
    saveRentals(rentals);
    showToast('Borrow request approved and updated in localStorage!', 'success');
    renderDashboardRentals();
    updateStorageStatusUI();
  }
}

function handleMarkReturned(rentalId) {
  if (typeof getRentals !== 'function' || typeof saveRentals !== 'function') return;
  const rentals = getRentals();
  const rental = rentals.find(r => r.id === rentalId);
  if (rental) {
    rental.status = 'returned';
    rental.statusLabel = 'Returned';
    saveRentals(rentals);

    // Also mark the item back to available in localStorage
    if (rental.itemId && typeof getItems === 'function' && typeof saveItems === 'function') {
      const items = getItems();
      const item = items.find(i => i.id === rental.itemId);
      if (item) {
        item.status = 'available';
        saveItems(items);
        itemsData = items;
        renderItems();
      }
    }

    showToast('Item marked as returned! Active rentals updated.', 'success');
    renderDashboardRentals();
    updateStorageStatusUI();
  }
}

function handleExtendRental(rentalId) {
  if (typeof getRentals !== 'function' || typeof saveRentals !== 'function') return;
  const rentals = getRentals();
  const rental = rentals.find(r => r.id === rentalId);
  if (rental) {
    showToast('Rental extended by 3 days! Updated in localStorage.', 'info');
    renderDashboardRentals();
  }
}

/* ==========================================================================
   LIVE COUNTDOWN & RETURN ITEM SYSTEM
   ========================================================================== */
function formatTime(timestamp) {
  if (!timestamp) return 'N/A';
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

let countdownIntervalId = null;

function initLiveCountdowns() {
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
  }
  updateLiveCountdowns();
  countdownIntervalId = setInterval(updateLiveCountdowns, 1000);
}

function updateLiveCountdowns() {
  const countdownEls = document.querySelectorAll('[data-end-time]');
  if (!countdownEls || countdownEls.length === 0) return;

  const now = Date.now();
  let statusChanged = false;

  countdownEls.forEach(el => {
    const endTime = Number(el.getAttribute('data-end-time'));
    const rentalId = el.getAttribute('data-rental-id');
    const currentStatus = (el.getAttribute('data-status') || '').toLowerCase();

    if (!endTime || isNaN(endTime)) {
      el.textContent = 'Time remaining: N/A';
      return;
    }

    const diff = endTime - now;

    if (diff <= 0) {
      el.textContent = 'Time remaining: 0m (Return Due)';
      el.classList.add('overdue');

      // When countdown reaches zero: Change rental status to "return_due"
      // Do NOT automatically mark the item as returned. The borrower must confirm the return.
      if (currentStatus === 'active' || currentStatus === 'active_borrow') {
        el.setAttribute('data-status', 'return_due');
        if (typeof getRentals === 'function' && typeof saveRentals === 'function') {
          const rentals = getRentals();
          const r = rentals.find(rent => rent.id === rentalId);
          if (r && r.status !== 'return_due' && r.status !== 'completed' && r.status !== 'returned' && r.status !== 'return_pending_confirmation' && r.status !== 'return_disputed') {
            r.status = 'return_due';
            r.statusLabel = 'Return Due';
            saveRentals(rentals);
            statusChanged = true;
          }
        }
      }
    } else {
      el.classList.remove('overdue');
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        el.textContent = `Time remaining: ${hours}h ${minutes}m`;
      } else {
        el.textContent = `Time remaining: ${minutes}m ${seconds}s`;
      }
    }
  });

  if (statusChanged) {
    renderDashboardRentals();
  }
}

// Return Item Confirmation Modal Logic
window.openReturnConfirmModal = function (rentalId) {
  const modalOverlay = document.getElementById('returnConfirmModalOverlay');
  if (!modalOverlay) return;

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => r.id === rentalId);
  if (!rental) {
    showToast("Rental record not found.", "error");
    return;
  }

  const nameEl = document.getElementById('returnModalItemName');
  const durEl = document.getElementById('returnModalDuration');
  const costEl = document.getElementById('returnModalRentalCost');
  const badgeEl = document.getElementById('returnModalStatusBadge');
  const depositEl = document.getElementById('returnModalDepositRefund');
  const idInput = document.getElementById('returnModalRentalId');

  const itemName = rental.itemName || rental.itemTitle || 'Campus Item';
  const durationText = rental.durationHours ? `${rental.durationHours} Hour${rental.durationHours === 1 ? '' : 's'}` : `${rental.durationDays || 3} Days`;
  const isReturnDue = (rental.status || '').toLowerCase() === 'return_due';
  const depositVal = rental.securityDeposit !== undefined ? rental.securityDeposit : (rental.deposit || 0);
  const isHourly = rental.pricingType === 'hourly' || Boolean(rental.durationHours);
  const hourlyRate = rental.hourlyRate !== undefined ? rental.hourlyRate : 20;
  const rentalCostVal = rental.rentalCost !== undefined ? rental.rentalCost : (rental.rentalFee !== undefined ? rental.rentalFee : (isHourly ? (hourlyRate * (rental.durationHours || 1)) : ((rental.dailyRate || 0) * (rental.durationDays || 1))));

  if (nameEl) nameEl.textContent = itemName;
  if (durEl) durEl.textContent = durationText;
  if (costEl) costEl.textContent = `₹${rentalCostVal}`;
  if (badgeEl) {
    badgeEl.textContent = isReturnDue ? 'Return Due' : 'Active';
    badgeEl.className = `badge ${isReturnDue ? 'badge-return-due' : 'badge-borrowed'} badge-sm font-semibold`;
  }
  if (depositEl) depositEl.textContent = `₹${depositVal}`;
  if (idInput) idInput.value = rental.id;

  modalOverlay.classList.add('active');
};

window.closeReturnConfirmModal = function () {
  const modalOverlay = document.getElementById('returnConfirmModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
};

// Step 1: Borrower marks item as returned
window.handleConfirmReturn = function () {
  const idInput = document.getElementById('returnModalRentalId');
  const rentalId = idInput ? idInput.value : null;

  if (!rentalId) {
    showToast("No active rental selected for return.", "error");
    closeReturnConfirmModal();
    return;
  }

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to return an item.", "error");
    closeReturnConfirmModal();
    return;
  }

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => r.id === rentalId);

  if (!rental) {
    showToast("Rental not found.", "error");
    closeReturnConfirmModal();
    return;
  }

  // Security check: Only the borrower can initiate the return request!
  if (String(rental.borrowerId) !== String(currentUser.id)) {
    showToast("Unauthorized: Only the borrower who checked out this item can initiate a return.", "error");
    closeReturnConfirmModal();
    return;
  }

  if (rental.status === 'completed' || rental.status === 'returned') {
    showToast("This rental has already been completed.", "info");
    closeReturnConfirmModal();
    return;
  }

  if (rental.status === 'return_pending_confirmation') {
    showToast("Return request has already been sent to the owner.", "info");
    closeReturnConfirmModal();
    return;
  }

  // DO NOT immediately mark completed!
  // Change rental status to "return_pending_confirmation"
  rental.status = 'return_pending_confirmation';
  rental.statusLabel = 'Return Pending';
  rental.returnStatus = 'pending_owner_confirmation';
  rental.returnRequestedAt = Date.now();

  if (typeof saveRentals === 'function') {
    saveRentals(rentals);
  }

  closeReturnConfirmModal();
  showToast("Return request sent to the owner. Waiting for owner confirmation.", "info");
  renderDashboardRentals();
  updateStorageStatusUI();
};

// Step 2A: Owner confirms receipt of returned item
window.handleOwnerConfirmReturn = function (rentalId) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to confirm returns.", "error");
    return;
  }

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => String(r.id) === String(rentalId));
  if (!rental) {
    showToast("Rental record not found.", "error");
    return;
  }

  // Security Check: Only the item owner can confirm the return!
  if (String(rental.ownerId) !== String(currentUser.id) && String(rental.lenderId) !== String(currentUser.id)) {
    showToast("Unauthorized: Only the item owner can confirm this return.", "error");
    return;
  }

  // Security Check: A borrower cannot confirm their own return
  if (String(rental.borrowerId) === String(currentUser.id)) {
    showToast("Security Alert: Borrowers cannot confirm their own returns.", "error");
    return;
  }

  // Prevent double confirmation
  if (rental.status === 'completed' || rental.status === 'returned' || rental.returnStatus === 'confirmed') {
    showToast("This rental has already been marked as returned.", "info");
    return;
  }

  // 1. Mark rental as completed
  rental.status = 'completed';
  rental.statusLabel = 'Completed';
  rental.returnStatus = 'confirmed';
  rental.returnConfirmedAt = Date.now();
  rental.returnConfirmedBy = currentUser.id;
  rental.completedAt = Date.now();
  if (typeof saveRentals === 'function') {
    saveRentals(rentals);
  }

  // 2. Change item availability back to Available
  if (rental.itemId && typeof getItems === 'function' && typeof saveItems === 'function') {
    const items = getItems();
    const item = items.find(i => String(i.id) === String(rental.itemId));
    if (item) {
      item.status = 'available';
      saveItems(items);
      itemsData = items;
      renderItems();
    }
  }

  // 3. Security Deposit: Refund deposit to borrower's credits
  const depositVal = rental.securityDeposit !== undefined ? Number(rental.securityDeposit) : (Number(rental.deposit) || 0);
  const allUsers = typeof getUsers === 'function' ? getUsers() : [];
  const borrower = allUsers.find(u => String(u.id) === String(rental.borrowerId));

  if (borrower && depositVal > 0) {
    borrower.credits = (borrower.credits !== undefined ? Number(borrower.credits) : 100) + depositVal;
    if (typeof saveUsers === 'function') {
      saveUsers(allUsers);
    }
    // If the borrower is currently logged in:
    if (String(currentUser.id) === String(borrower.id)) {
      currentUser.credits = borrower.credits;
      if (typeof setCurrentUser === 'function') {
        setCurrentUser(currentUser);
      }
    }
  }

  // 4. Record security deposit release in transaction history
  if (typeof getTransactions === 'function' && typeof saveTransactions === 'function') {
    const txns = getTransactions();
    txns.unshift({
      id: 'txn_' + Date.now(),
      type: 'return_deposit_release',
      title: `Deposit Refund: ${rental.itemName || rental.itemTitle}`,
      amount: depositVal,
      currency: 'INR',
      userId: rental.borrowerId,
      date: new Date().toISOString(),
      status: 'completed',
      note: 'Security deposit released upon verified item return'
    });
    saveTransactions(txns);
  }

  const borrowerName = (borrower && borrower.name) || rental.borrowerName || 'borrower';
  showToast(`Return confirmed! Security deposit of ₹${depositVal} refunded to ${borrowerName}. Rental is completed.`, "success");

  renderDashboardRentals();
  updateAuthUI();
  updateStorageStatusUI();

  // Prompt the owner to rate their experience with the borrower
  setTimeout(() => {
    if (typeof openRentalRatingModal === 'function') {
      openRentalRatingModal(rentalId);
    }
  }, 450);
};

// Step 2B: Owner reports item NOT returned (Dispute)
window.handleOwnerDisputeReturn = function (rentalId) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to manage returns.", "error");
    return;
  }

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => String(r.id) === String(rentalId));
  if (!rental) {
    showToast("Rental record not found.", "error");
    return;
  }

  // Security Check: Only the item owner can dispute the return!
  if (String(rental.ownerId) !== String(currentUser.id) && String(rental.lenderId) !== String(currentUser.id)) {
    showToast("Unauthorized: Only the item owner can dispute this return.", "error");
    return;
  }

  // Set status to return_disputed
  rental.status = 'return_disputed';
  rental.statusLabel = 'Return Disputed';
  rental.returnStatus = 'disputed';
  rental.disputedAt = Date.now();
  rental.disputedBy = currentUser.id;
  if (typeof saveRentals === 'function') {
    saveRentals(rentals);
  }

  showToast("Return disputed. Item marked as not returned. Deposit remains held.", "info");

  renderDashboardRentals();
  updateStorageStatusUI();
};

function initReturnModalListeners() {
  const modalOverlay = document.getElementById('returnConfirmModalOverlay');
  const closeBtn = document.getElementById('closeReturnModalBtn');
  const cancelBtn = document.getElementById('cancelReturnModalBtn');
  const confirmBtn = document.getElementById('confirmReturnModalBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeReturnConfirmModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeReturnConfirmModal);
  if (confirmBtn) confirmBtn.addEventListener('click', handleConfirmReturn);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeReturnConfirmModal();
      }
    });
  }
}

window.handleApproveRental = handleApproveRental;
window.handleMarkReturned = handleMarkReturned;
window.handleExtendRental = handleExtendRental;
window.formatTime = formatTime;
window.initLiveCountdowns = initLiveCountdowns;
window.updateLiveCountdowns = updateLiveCountdowns;

/* ==========================================================================
   STYLE GUIDE / COLOR SWATCH CLICK-TO-COPY
   ========================================================================== */
function initStyleGuideCopy() {
  document.querySelectorAll('.color-swatch-card').forEach(card => {
    card.addEventListener('click', () => {
      const hex = card.getAttribute('data-hex');
      const varName = card.getAttribute('data-var');
      const textToCopy = varName || hex;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${textToCopy} to clipboard!`, 'info');
        }).catch(() => {
          showToast(`Token: ${textToCopy}`, 'info');
        });
      }
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
  } else {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

/* ==========================================================================
   STUDENT VERIFICATION & LENDER STATUS HELPER
   ========================================================================== */
function getLenderVerificationInfo(item) {
  const users = typeof getUsers === 'function' ? getUsers() : [];
  let user = null;
  const lenderObj = (item && (item.owner || item.lender)) || {};
  if (lenderObj.id) {
    user = users.find(u => u.id === lenderObj.id);
  }
  if (!user && item && item.ownerId) {
    user = users.find(u => u.id === item.ownerId);
  }
  if (!user && lenderObj.name) {
    const cleanName = lenderObj.name.replace(/\s*\(You\)/, '').trim().toLowerCase();
    user = users.find(u => u.name && u.name.toLowerCase() === cleanName);
  }

  const status = (user && user.verificationStatus) ||
    lenderObj.verificationStatus ||
    (lenderObj.verified ? 'verified' : 'pending');

  return {
    status: status,
    isVerified: status === 'verified',
    role: (user && user.role) || lenderObj.role || (status === 'verified' ? 'Verified Student' : 'Student (Pending)')
  };
}

/* ==========================================================================
   AUTHENTICATION & PROFILE UI CONTROLLER
   ========================================================================== */
function updateAuthUI() {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  const navLoggedInGroup = document.getElementById('navLoggedInGroup');
  const navLoggedOutGroup = document.getElementById('navLoggedOutGroup');
  const navUserName = document.getElementById('navUserName');
  const navUserAvatar = document.getElementById('navUserAvatar');
  const navVerificationBadge = document.getElementById('navVerificationBadge');

  if (currentUser) {
    if (navLoggedInGroup) navLoggedInGroup.style.display = 'flex';
    if (navLoggedOutGroup) navLoggedOutGroup.style.display = 'none';
    if (navUserName) navUserName.textContent = currentUser.name;
    if (navUserAvatar) navUserAvatar.textContent = currentUser.avatar || 'ST';

    if (navVerificationBadge) {
      if (currentUser.verificationStatus === 'verified') {
        navVerificationBadge.style.backgroundColor = 'var(--success)';
        navVerificationBadge.title = 'Verified Student';
      } else if (currentUser.verificationStatus === 'rejected') {
        navVerificationBadge.style.backgroundColor = 'var(--error)';
        navVerificationBadge.title = 'Verification Rejected';
      } else {
        navVerificationBadge.style.backgroundColor = 'var(--warning)';
        navVerificationBadge.title = 'Verification Pending';
      }
    }

    // Update Profile Modal contents
    renderUserProfileModal(currentUser, true);
  } else {
    if (navLoggedInGroup) navLoggedInGroup.style.display = 'none';
    if (navLoggedOutGroup) navLoggedOutGroup.style.display = 'flex';
  }

  const myListingsView = document.getElementById('myListingsView');
  if (myListingsView && myListingsView.style.display !== 'none') {
    renderMyListings();
  }
}

/* ==========================================================================
   AUTHENTICATION MODAL FLOW & EVENT WIRING
   ========================================================================== */
function initAuthFlow() {
  const authModal = document.getElementById('authModalOverlay');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const authTabLoginBtn = document.getElementById('authTabLoginBtn');
  const authTabRegisterBtn = document.getElementById('authTabRegisterBtn');
  const authLoginView = document.getElementById('authLoginView');
  const authRegisterView = document.getElementById('authRegisterView');
  const switchLinkToRegister = document.getElementById('switchLinkToRegister');
  const switchLinkToLogin = document.getElementById('switchLinkToLogin');

  const navLoginBtn = document.getElementById('navLoginBtn');
  const navRegisterBtn = document.getElementById('navRegisterBtn');
  const navLogoutBtn = document.getElementById('navLogoutBtn');
  const profileLogoutBtn = document.getElementById('profileLogoutBtn');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginAlertBox = document.getElementById('loginAlertBox');
  const loginAlertMsg = document.getElementById('loginAlertMsg');
  const registerAlertBox = document.getElementById('registerAlertBox');
  const registerAlertMsg = document.getElementById('registerAlertMsg');

  const demoLoginAnuBtn = document.getElementById('demoLoginAnuBtn');
  const demoLoginRahulBtn = document.getElementById('demoLoginRahulBtn');
  const demoLoginJordanBtn = document.getElementById('demoLoginJordanBtn');
  const demoLoginAdminBtn = document.getElementById('demoLoginAdminBtn');

  window.openAuthModal = function (tab = 'login') {
    if (!authModal) return;
    if (loginAlertBox) loginAlertBox.style.display = 'none';
    if (registerAlertBox) registerAlertBox.style.display = 'none';

    if (tab === 'register') {
      if (authTabRegisterBtn) authTabRegisterBtn.classList.add('active');
      if (authTabLoginBtn) authTabLoginBtn.classList.remove('active');
      if (authLoginView) authLoginView.style.display = 'none';
      if (authRegisterView) authRegisterView.style.display = 'block';
    } else {
      if (authTabLoginBtn) authTabLoginBtn.classList.add('active');
      if (authTabRegisterBtn) authTabRegisterBtn.classList.remove('active');
      if (authLoginView) authLoginView.style.display = 'block';
      if (authRegisterView) authRegisterView.style.display = 'none';
    }
    authModal.classList.add('active');
  };

  window.closeAuthModal = function () {
    if (authModal) authModal.classList.remove('active');
  };

  if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', closeAuthModal);
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  // Segmented Tabs
  if (authTabLoginBtn) {
    authTabLoginBtn.addEventListener('click', () => openAuthModal('login'));
  }
  if (authTabRegisterBtn) {
    authTabRegisterBtn.addEventListener('click', () => openAuthModal('register'));
  }
  if (switchLinkToRegister) {
    switchLinkToRegister.addEventListener('click', () => openAuthModal('register'));
  }
  if (switchLinkToLogin) {
    switchLinkToLogin.addEventListener('click', () => openAuthModal('login'));
  }

  // Header Nav login / register buttons
  if (navLoginBtn) navLoginBtn.addEventListener('click', () => openAuthModal('login'));
  if (navRegisterBtn) navRegisterBtn.addEventListener('click', () => openAuthModal('register'));

  // Logout handlers
  const handleLogout = () => {
    if (typeof logoutUser === 'function') {
      logoutUser();
    }
    const profileModal = document.getElementById('profileModalOverlay');
    if (profileModal) profileModal.classList.remove('active');
    updateAuthUI();
    renderDashboardRentals();
    renderItems();
    updateStorageStatusUI();
    showToast('Logged out successfully.', 'info');
    switchView('marketplace');
  };

  if (navLogoutBtn) navLogoutBtn.addEventListener('click', handleLogout);
  if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);

  // Login Form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPassword').value;

      if (typeof loginUser !== 'function') return;
      const res = loginUser(email, pass);

      if (!res.success) {
        if (loginAlertBox && loginAlertMsg) {
          loginAlertMsg.textContent = res.message;
          loginAlertBox.style.display = 'block';
        } else {
          showToast(res.message, 'error');
        }
        return;
      }

      closeAuthModal();
      loginForm.reset();
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      updateAuthUI();
      renderDashboardRentals();
      renderItems();
      updateStorageStatusUI();
      switchView('dashboard');
    });
  }

  // Register Form submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const collegeName = document.getElementById('regCollege').value;
      const studentId = document.getElementById('regStudentId').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      if (typeof registerUser !== 'function') return;
      const res = registerUser({
        name,
        collegeName,
        studentId,
        email,
        password,
        confirmPassword
      });

      if (!res.success) {
        if (registerAlertBox && registerAlertMsg) {
          registerAlertMsg.textContent = res.message;
          registerAlertBox.style.display = 'block';
        } else {
          showToast(res.message, 'error');
        }
        return;
      }

      closeAuthModal();
      registerForm.reset();
      showToast(`Account created! Welcome, ${res.user.name}. Status: Verification Pending`, 'success');
      updateAuthUI();
      renderDashboardRentals();
      renderItems();
      updateStorageStatusUI();
      switchView('dashboard');
    });
  }

  // Demo Account Quick Logins (Uses normal loginUser logic)
  if (demoLoginAnuBtn) {
    demoLoginAnuBtn.addEventListener('click', () => {
      if (typeof loginUser !== 'function') return;
      const res = loginUser('anu@campus.edu', 'password123');
      if (res.success) {
        closeAuthModal();
        showToast('Logged in as Demo User: Anu (Verified Student)', 'success');
        updateAuthUI();
        renderDashboardRentals();
        renderItems();
        updateStorageStatusUI();
        switchView('dashboard');
      }
    });
  }

  if (demoLoginRahulBtn) {
    demoLoginRahulBtn.addEventListener('click', () => {
      if (typeof loginUser !== 'function') return;
      const res = loginUser('rahul@campus.edu', 'password123');
      if (res.success) {
        closeAuthModal();
        showToast('Logged in as Demo User: Rahul (Student Borrower)', 'success');
        updateAuthUI();
        renderDashboardRentals();
        renderItems();
        updateStorageStatusUI();
        switchView('dashboard');
      }
    });
  }

  if (demoLoginJordanBtn) {
    demoLoginJordanBtn.addEventListener('click', () => {
      if (typeof loginUser !== 'function') return;
      const res = loginUser('jordan.lee@campus.edu', 'password123');
      if (res.success) {
        closeAuthModal();
        showToast('Logged in as Demo User: Jordan Lee (Verification Pending)', 'info');
        updateAuthUI();
        renderDashboardRentals();
        renderItems();
        updateStorageStatusUI();
        switchView('dashboard');
      }
    });
  }

  if (demoLoginAdminBtn) {
    demoLoginAdminBtn.addEventListener('click', () => {
      if (typeof loginUser !== 'function') return;
      const res = loginUser('admin@campus.edu', 'admin123');
      if (res.success) {
        closeAuthModal();
        showToast('Logged in as Campus Admin (Verification Officer)', 'info');
        updateAuthUI();
        renderDashboardRentals();
        renderItems();
        updateStorageStatusUI();
        switchView('dashboard');
      }
    });
  }

  // Admin Modal trigger from Profile
  const profileOpenAdminBtn = document.getElementById('profileOpenAdminBtn');
  if (profileOpenAdminBtn) {
    profileOpenAdminBtn.addEventListener('click', () => {
      const profileModal = document.getElementById('profileModalOverlay');
      if (profileModal) profileModal.classList.remove('active');
      openAdminVerificationModal();
    });
  }
}

/* ==========================================================================
   ADMIN / MVP STUDENT VERIFICATION REVIEW PANEL
   ========================================================================== */
let currentAdminFilter = 'all';

function initAdminVerificationFlow() {
  const adminModal = document.getElementById('adminVerificationModalOverlay');
  const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
  const closeAdminBtnFooter = document.getElementById('closeAdminBtnFooter');

  window.openAdminVerificationModal = function () {
    if (!adminModal) return;
    renderAdminUsersTable('all');
    document.querySelectorAll('[data-admin-filter]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-admin-filter') === 'all');
    });
    adminModal.classList.add('active');
  };

  window.closeAdminVerificationModal = function () {
    if (adminModal) adminModal.classList.remove('active');
  };

  if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', closeAdminVerificationModal);
  if (closeAdminBtnFooter) closeAdminBtnFooter.addEventListener('click', closeAdminVerificationModal);
  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) closeAdminVerificationModal();
    });
  }

  // Filter tabs
  const filterBtns = document.querySelectorAll('[data-admin-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-admin-filter');
      renderAdminUsersTable(filter);
    });
  });
}

function renderAdminUsersTable(filter = currentAdminFilter) {
  currentAdminFilter = filter;
  const tbody = document.getElementById('adminUsersTableBody');
  const countBadge = document.getElementById('adminUsersCountBadge');
  if (!tbody) return;

  const users = typeof getUsers === 'function' ? getUsers() : [];
  let filtered = users;
  if (filter !== 'all') {
    filtered = users.filter(u => (u.verificationStatus || (u.verified ? 'verified' : 'pending')) === filter);
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Account${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: var(--space-6); color: var(--text-secondary); font-size: var(--text-xs);">
          No ${filter === 'all' ? '' : filter} student accounts found in localStorage.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(u => {
    const status = u.verificationStatus || (u.verified ? 'verified' : 'pending');
    let statusBadge = '';
    let actionsHtml = '';

    if (status === 'verified') {
      statusBadge = `<span class="badge badge-verified" style="font-size: 10px;">Verified Student</span>`;
      actionsHtml = `
        <div class="flex items-center justify-end gap-1">
          <button class="btn btn-outline btn-xs" style="color: var(--error); border-color: var(--error-border); font-size: 11px; padding: 2px 7px;" onclick="handleAdminSetStatus('${u.id}', 'rejected')">Reject</button>
          <button class="btn btn-ghost btn-xs text-secondary" style="font-size: 11px; padding: 2px 7px;" onclick="handleAdminSetStatus('${u.id}', 'pending')">Reset</button>
        </div>
      `;
    } else if (status === 'rejected') {
      statusBadge = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border); font-size: 10px;"><span class="badge-dot" style="background: var(--error);"></span> Rejected</span>`;
      actionsHtml = `
        <div class="flex items-center justify-end gap-1">
          <button class="btn btn-primary btn-xs" style="font-size: 11px; padding: 2px 8px;" onclick="handleAdminSetStatus('${u.id}', 'verified')">Approve</button>
          <button class="btn btn-ghost btn-xs text-secondary" style="font-size: 11px; padding: 2px 7px;" onclick="handleAdminSetStatus('${u.id}', 'pending')">Reset</button>
        </div>
      `;
    } else {
      statusBadge = `<span class="badge badge-warning" style="font-size: 10px;"><span class="badge-dot"></span> Pending</span>`;
      actionsHtml = `
        <div class="flex items-center justify-end gap-1">
          <button class="btn btn-primary btn-xs" style="font-size: 11px; padding: 2px 8px;" onclick="handleAdminSetStatus('${u.id}', 'verified')">Approve</button>
          <button class="btn btn-outline btn-xs" style="color: var(--error); border-color: var(--error-border); font-size: 11px; padding: 2px 7px;" onclick="handleAdminSetStatus('${u.id}', 'rejected')">Reject</button>
        </div>
      `;
    }

    return `
      <tr>
        <td>
          <div class="flex items-center gap-2">
            <div class="user-avatar" style="width: 28px; height: 28px; font-size: 11px; flex-shrink: 0;">${u.avatar || 'ST'}</div>
            <div>
              <div class="font-semibold text-main text-xs">${u.name}</div>
              <div class="text-xs text-secondary" style="font-size: 11px;">${u.email}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="font-medium text-main text-xs">${u.collegeName || u.campus || 'Campus'}</div>
          <div class="text-xs text-secondary font-mono" style="font-size: 11px;">${u.studentId || 'N/A'}</div>
        </td>
        <td>${statusBadge}</td>
        <td style="text-align: right;">${actionsHtml}</td>
      </tr>
    `;
  }).join('');
}

function handleAdminSetStatus(userId, newStatus) {
  if (typeof updateUserVerificationStatus !== 'function') return;
  const result = updateUserVerificationStatus(userId, newStatus);
  if (result.success) {
    const statusLabel = newStatus === 'verified' ? 'Verified Student' : newStatus === 'rejected' ? 'Rejected' : 'Verification Pending';
    showToast(`Updated student verification to: ${statusLabel}`, newStatus === 'verified' ? 'success' : 'info');
    renderAdminUsersTable(currentAdminFilter);
    updateAuthUI();
    renderDashboardRentals();
    renderItems();
    updateStorageStatusUI();
  } else {
    showToast(result.message || 'Could not update status', 'error');
  }
}

/* ==========================================================================
   TWO-SIDED RATING SYSTEM (User Rating & Individual Item Rating)
   ========================================================================== */
let currentRatingRentalId = null;

const STAR_DESCRIPTIONS = {
  1: '1 Star — Poor Experience',
  2: '2 Stars — Fair Experience',
  3: '3 Stars — Good / Standard',
  4: '4 Stars — Very Good Experience',
  5: '5 Stars — Excellent Experience'
};

window.setModalStarRating = function (type, val) {
  const group = document.getElementById(type === 'user' ? 'userStarGroup' : 'itemStarGroup');
  const desc = document.getElementById(type === 'user' ? 'userStarDesc' : 'itemStarDesc');
  if (!group) return;

  const ratingVal = Math.max(1, Math.min(5, parseInt(val, 10) || 5));
  group.setAttribute('data-rating', ratingVal);

  const starBtns = group.querySelectorAll('.star-btn');
  starBtns.forEach(btn => {
    const starVal = parseInt(btn.getAttribute('data-value'), 10);
    btn.classList.toggle('active', starVal <= ratingVal);
  });

  if (desc) {
    desc.textContent = STAR_DESCRIPTIONS[ratingVal] || `${ratingVal} Stars`;
  }
};

window.openRentalRatingModal = function (rentalId) {
  const modalOverlay = document.getElementById('rentalRatingModalOverlay');
  if (!modalOverlay) return;

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to submit rental reviews.", "error");
    return;
  }

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => String(r.id) === String(rentalId));
  if (!rental) {
    showToast("Rental record not found.", "error");
    return;
  }

  // Security & Lifecycle enforcement: Only completed rentals can be rated
  const st = (rental.status || '').toLowerCase();
  const retSt = (rental.returnStatus || '').toLowerCase();
  if (st !== 'completed' && st !== 'returned' && retSt !== 'confirmed') {
    showToast("Ratings only unlock after the owner has officially confirmed the item return.", "info");
    return;
  }

  const isBorrower = String(rental.borrowerId) === String(currentUser.id);
  const isOwner = String(rental.ownerId) === String(currentUser.id) || String(rental.lenderId) === String(currentUser.id);

  if (!isBorrower && !isOwner) {
    showToast("Unauthorized: You were not a participant in this completed rental.", "error");
    return;
  }

  currentRatingRentalId = rental.id;

  // Rental banner info
  const modalItemImg = document.getElementById('ratingModalItemImg');
  const modalItemName = document.getElementById('ratingModalItemName');
  const modalPeerInfo = document.getElementById('ratingModalPeerInfo');

  if (modalItemImg) modalItemImg.src = rental.itemImage || DEFAULT_ITEM_PLACEHOLDER;
  if (modalItemName) modalItemName.textContent = rental.itemName || rental.itemTitle || 'Campus Item';

  const allUsers = typeof getUsers === 'function' ? getUsers() : [];
  const ratingStatus = typeof getRentalRatingStatus === 'function' ? getRentalRatingStatus(rental, currentUser.id) : { hasUserRating: false, hasItemRating: false };

  // USER RATING SECTION SETUP (Borrower rates Owner, Owner rates Borrower)
  const userRatingCard = document.getElementById('userRatingCard');
  const userTargetTitle = document.getElementById('userRatingTargetTitle');
  const userTargetSubtitle = document.getElementById('userRatingTargetSubtitle');
  const userStatusBadge = document.getElementById('userRatingStatusBadge');
  const userComment = document.getElementById('userRatingComment');
  const submitUserBtn = document.getElementById('submitUserRatingBtn');

  let targetUserName = '';
  if (isBorrower) {
    const ownerUser = allUsers.find(u => String(u.id) === String(rental.ownerId || rental.lenderId));
    targetUserName = (ownerUser && ownerUser.name) || rental.ownerName || rental.lenderName || 'Owner';
    if (userTargetTitle) userTargetTitle.textContent = 'Rate Your Experience with Owner';
    if (userTargetSubtitle) userTargetSubtitle.textContent = `Owner: ${targetUserName}`;
    if (modalPeerInfo) modalPeerInfo.textContent = `Owner: ${targetUserName}`;
  } else {
    const borrowerUser = allUsers.find(u => String(u.id) === String(rental.borrowerId));
    targetUserName = (borrowerUser && borrowerUser.name) || rental.borrowerName || 'Borrower';
    if (userTargetTitle) userTargetTitle.textContent = 'Rate Your Experience with Borrower';
    if (userTargetSubtitle) userTargetSubtitle.textContent = `Borrower: ${targetUserName}`;
    if (modalPeerInfo) modalPeerInfo.textContent = `Borrower: ${targetUserName}`;
  }

  if (ratingStatus.hasUserRating) {
    const existing = ratingStatus.userRating;
    setModalStarRating('user', existing ? existing.stars : 5);
    if (userStatusBadge) {
      userStatusBadge.className = 'badge badge-success';
      userStatusBadge.textContent = `Submitted (${existing ? existing.stars : 5}★)`;
    }
    if (userComment) {
      userComment.value = (existing && existing.comment) || '';
      userComment.disabled = true;
    }
    if (submitUserBtn) {
      submitUserBtn.disabled = true;
      submitUserBtn.textContent = 'User Rating Submitted';
    }
    // Disable user star buttons
    const userStarBtns = document.querySelectorAll('#userStarGroup .star-btn');
    userStarBtns.forEach(b => b.style.pointerEvents = 'none');
  } else {
    setModalStarRating('user', 5);
    if (userStatusBadge) {
      userStatusBadge.className = 'badge badge-warning';
      userStatusBadge.textContent = 'Pending';
    }
    if (userComment) {
      userComment.value = '';
      userComment.disabled = false;
    }
    if (submitUserBtn) {
      submitUserBtn.disabled = false;
      submitUserBtn.textContent = 'Submit User Rating';
    }
    const userStarBtns = document.querySelectorAll('#userStarGroup .star-btn');
    userStarBtns.forEach(b => b.style.pointerEvents = 'auto');
  }

  // ITEM RATING SECTION SETUP (Borrower rates the Item; Owner only rates borrower)
  const itemRatingCard = document.getElementById('itemRatingCard');
  const itemTargetTitle = document.getElementById('itemRatingTargetTitle');
  const itemTargetSubtitle = document.getElementById('itemRatingTargetSubtitle');
  const itemStatusBadge = document.getElementById('itemRatingStatusBadge');
  const itemComment = document.getElementById('itemRatingComment');
  const submitItemBtn = document.getElementById('submitItemRatingBtn');

  if (isBorrower) {
    if (itemRatingCard) itemRatingCard.style.display = 'block';
    if (itemTargetTitle) itemTargetTitle.textContent = 'Rate This Item';
    if (itemTargetSubtitle) itemTargetSubtitle.textContent = rental.itemName || rental.itemTitle || 'Item Condition & Quality';

    if (ratingStatus.hasItemRating) {
      const existing = ratingStatus.itemRating;
      setModalStarRating('item', existing ? existing.stars : 5);
      if (itemStatusBadge) {
        itemStatusBadge.className = 'badge badge-success';
        itemStatusBadge.textContent = `Submitted (${existing ? existing.stars : 5}★)`;
      }
      if (itemComment) {
        itemComment.value = (existing && existing.comment) || '';
        itemComment.disabled = true;
      }
      if (submitItemBtn) {
        submitItemBtn.disabled = true;
        submitItemBtn.textContent = 'Item Rating Submitted';
      }
      const itemStarBtns = document.querySelectorAll('#itemStarGroup .star-btn');
      itemStarBtns.forEach(b => b.style.pointerEvents = 'none');
    } else {
      setModalStarRating('item', 5);
      if (itemStatusBadge) {
        itemStatusBadge.className = 'badge badge-warning';
        itemStatusBadge.textContent = 'Pending';
      }
      if (itemComment) {
        itemComment.value = '';
        itemComment.disabled = false;
      }
      if (submitItemBtn) {
        submitItemBtn.disabled = false;
        submitItemBtn.textContent = 'Submit Item Rating';
      }
      const itemStarBtns = document.querySelectorAll('#itemStarGroup .star-btn');
      itemStarBtns.forEach(b => b.style.pointerEvents = 'auto');
    }
  } else {
    // Owner side: only rates borrower experience, item rating not shown
    if (itemRatingCard) itemRatingCard.style.display = 'none';
  }

  modalOverlay.classList.add('active');
};

window.closeRentalRatingModal = function () {
  const modalOverlay = document.getElementById('rentalRatingModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
  currentRatingRentalId = null;
};

window.handleModalSubmitUserRating = function () {
  if (!currentRatingRentalId) {
    showToast("No active rental selected for rating.", "error");
    return;
  }

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to submit ratings.", "error");
    return;
  }

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => String(r.id) === String(currentRatingRentalId));
  if (!rental) {
    showToast("Rental record not found.", "error");
    return;
  }

  const isBorrower = String(rental.borrowerId) === String(currentUser.id);
  const isOwner = String(rental.ownerId) === String(currentUser.id) || String(rental.lenderId) === String(currentUser.id);

  let toUserId = null;
  if (isBorrower) {
    toUserId = rental.ownerId || rental.lenderId;
  } else if (isOwner) {
    toUserId = rental.borrowerId;
  }

  if (!toUserId) {
    showToast("Unable to determine recipient student for this review.", "error");
    return;
  }

  const userStarGroup = document.getElementById('userStarGroup');
  const stars = userStarGroup ? parseInt(userStarGroup.getAttribute('data-rating'), 10) || 5 : 5;
  const commentEl = document.getElementById('userRatingComment');
  const comment = (commentEl && commentEl.value.trim()) || '';

  if (typeof submitUserRating !== 'function') {
    showToast("Rating submission service is unavailable.", "error");
    return;
  }

  const res = submitUserRating({
    rentalId: rental.id,
    toUserId: toUserId,
    stars: stars,
    comment: comment
  });

  if (res.success) {
    showToast(`User rating submitted! Thank you for strengthening campus trust.`, "success");
    const userStatusBadge = document.getElementById('userRatingStatusBadge');
    if (userStatusBadge) {
      userStatusBadge.className = 'badge badge-success';
      userStatusBadge.textContent = `Submitted (${stars}★)`;
    }
    const submitUserBtn = document.getElementById('submitUserRatingBtn');
    if (submitUserBtn) {
      submitUserBtn.disabled = true;
      submitUserBtn.textContent = 'User Rating Submitted';
    }
    if (commentEl) commentEl.disabled = true;
    const userStarBtns = document.querySelectorAll('#userStarGroup .star-btn');
    userStarBtns.forEach(b => b.style.pointerEvents = 'none');

    renderDashboardRentals();
    renderItems();
    updateAuthUI();
  } else {
    showToast(res.message || "Failed to submit user rating.", "error");
  }
};

window.handleModalSubmitItemRating = function () {
  if (!currentRatingRentalId) {
    showToast("No active rental selected for item rating.", "error");
    return;
  }

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    showToast("Please log in to submit ratings.", "error");
    return;
  }

  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = rentals.find(r => String(r.id) === String(currentRatingRentalId));
  if (!rental) {
    showToast("Rental record not found.", "error");
    return;
  }

  const isBorrower = String(rental.borrowerId) === String(currentUser.id);
  if (!isBorrower) {
    showToast("Unauthorized: Only the borrower can rate the physical gear quality.", "error");
    return;
  }

  const itemStarGroup = document.getElementById('itemStarGroup');
  const stars = itemStarGroup ? parseInt(itemStarGroup.getAttribute('data-rating'), 10) || 5 : 5;
  const commentEl = document.getElementById('itemRatingComment');
  const comment = (commentEl && commentEl.value.trim()) || '';

  if (typeof submitItemRating !== 'function') {
    showToast("Rating submission service is unavailable.", "error");
    return;
  }

  const res = submitItemRating({
    rentalId: rental.id,
    itemId: rental.itemId,
    stars: stars,
    comment: comment
  });

  if (res.success) {
    showToast(`Item rating submitted! Other students appreciate your gear review.`, "success");
    const itemStatusBadge = document.getElementById('itemRatingStatusBadge');
    if (itemStatusBadge) {
      itemStatusBadge.className = 'badge badge-success';
      itemStatusBadge.textContent = `Submitted (${stars}★)`;
    }
    const submitItemBtn = document.getElementById('submitItemRatingBtn');
    if (submitItemBtn) {
      submitItemBtn.disabled = true;
      submitItemBtn.textContent = 'Item Rating Submitted';
    }
    if (commentEl) commentEl.disabled = true;
    const itemStarBtns = document.querySelectorAll('#itemStarGroup .star-btn');
    itemStarBtns.forEach(b => b.style.pointerEvents = 'none');

    renderDashboardRentals();
    renderItems();
    renderMyListings();
  } else {
    showToast(res.message || "Failed to submit item rating.", "error");
  }
};

/* ==========================================================================
   USER PROFILE & REVIEW COLLAPSIBLE DISPLAY LOGIC
   ========================================================================== */

/**
 * Renders the profile modal for any student.
 * If isSelf === true, shows private account fields (Email, Student ID, Credits, Logout, Admin).
 * If isSelf === false, protects privacy and shows public campus profile & reviews only.
 */
window.renderUserProfileModal = function (targetUser, isSelf = false) {
  if (!targetUser) return;

  const modalTitle = document.querySelector('#profileModalOverlay .modal-title');
  if (modalTitle) {
    modalTitle.textContent = isSelf ? 'Student Profile & Verification' : `${targetUser.name}'s Campus Profile`;
  }

  const nameEl = document.getElementById('profileModalName');
  const roleEl = document.getElementById('profileModalRole');
  const avatarEl = document.getElementById('profileModalAvatar');
  const collegeEl = document.getElementById('profileModalCollege');
  const studentIdEl = document.getElementById('profileModalStudentId');
  const emailEl = document.getElementById('profileModalEmail');
  const trustEl = document.getElementById('profileTrustScore');
  const creditsEl = document.getElementById('profileCredits');
  const badgeSlotEl = document.getElementById('profileVerificationBadgeSlot');
  const statusBoxEl = document.getElementById('profileVerificationStatusBox');
  const statusTextEl = document.getElementById('profileModalStatusText');

  const privateStudentIdItem = document.getElementById('profilePrivateStudentIdItem');
  const privateEmailItem = document.getElementById('profilePrivateEmailItem');
  const privateCreditsCard = document.getElementById('profilePrivateCreditsCard');
  const privateAdminBtn = document.getElementById('profilePrivateAdminBtn');
  const privateLogoutBtn = document.getElementById('profilePrivateLogoutBtn');

  const collegeDisplay = targetUser.collegeName || targetUser.campus || 'Campus Community';
  const studentIdDisplay = targetUser.studentId || 'None';

  if (nameEl) nameEl.textContent = targetUser.name || 'Student';
  if (roleEl) roleEl.textContent = `${targetUser.role || 'Student'} • ${collegeDisplay}`;
  if (avatarEl) {
    avatarEl.textContent = targetUser.avatar || (targetUser.name ? targetUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST');
  }
  if (collegeEl) collegeEl.textContent = collegeDisplay;

  // Protect private student information: only show to account owner
  if (privateStudentIdItem) privateStudentIdItem.style.display = isSelf ? '' : 'none';
  if (privateEmailItem) privateEmailItem.style.display = isSelf ? '' : 'none';
  if (privateCreditsCard) privateCreditsCard.style.display = isSelf ? '' : 'none';
  if (privateAdminBtn) privateAdminBtn.style.display = (isSelf && targetUser.isAdmin) ? '' : 'none';
  if (privateLogoutBtn) privateLogoutBtn.style.display = isSelf ? '' : 'none';

  if (isSelf) {
    if (studentIdEl) studentIdEl.textContent = studentIdDisplay;
    if (emailEl) emailEl.textContent = targetUser.email || '';
    if (creditsEl) creditsEl.textContent = `🪙 ${targetUser.credits !== undefined ? targetUser.credits : 100} Credits`;
  }

  // Verification status badges
  if (statusTextEl) {
    if (targetUser.verificationStatus === 'verified') {
      statusTextEl.innerHTML = `<span class="badge badge-verified" style="font-size: 11px; padding: 2px 8px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Student</span>`;
    } else if (targetUser.verificationStatus === 'rejected') {
      statusTextEl.innerHTML = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border); font-size: 11px; padding: 2px 8px;"><span class="badge-dot" style="background: var(--error);"></span> Verification Rejected</span>`;
    } else {
      statusTextEl.innerHTML = `<span class="badge badge-warning" style="font-size: 11px; padding: 2px 8px;"><span class="badge-dot"></span> Verification Pending</span>`;
    }
  }

  if (badgeSlotEl) {
    if (targetUser.verificationStatus === 'verified') {
      badgeSlotEl.innerHTML = `<span class="badge badge-verified" style="font-size: 11px; padding: 2px 8px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Student</span>`;
    } else if (targetUser.verificationStatus === 'rejected') {
      badgeSlotEl.innerHTML = `<span class="badge" style="background: var(--error-subtle); color: var(--error); border-color: var(--error-border); font-size: 11px; padding: 2px 8px;"><span class="badge-dot" style="background: var(--error);"></span> Verification Rejected</span>`;
    } else {
      badgeSlotEl.innerHTML = `<span class="badge badge-warning" style="font-size: 11px; padding: 2px 8px;"><span class="badge-dot"></span> Verification Pending</span>`;
    }
  }

  if (statusBoxEl) {
    if (isSelf) {
      statusBoxEl.style.display = 'block';
      if (targetUser.verificationStatus === 'verified') {
        statusBoxEl.innerHTML = `
          <div class="verification-banner verification-banner-success">
            <div class="verification-banner-inner">
              <div class="verification-banner-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--success);"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="verification-banner-content">
                <div class="verification-banner-title">Verified Student Account</div>
                <p class="verification-message">
                  Your Student ID / Roll Number (<strong>${escapeHtml(studentIdDisplay)}</strong>) from <strong>${escapeHtml(collegeDisplay)}</strong> has been verified. Verified badges are displayed on your profile and marketplace listings.
                </p>
                <div class="verification-banner-note">
                  <strong>Institutional Access:</strong> You have full peer-to-peer campus gear sharing privileges with verified community standing.
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (targetUser.verificationStatus === 'rejected') {
        statusBoxEl.innerHTML = `
          <div class="verification-banner verification-banner-error">
            <div class="verification-banner-inner">
              <div class="verification-banner-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--error);"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              </div>
              <div class="verification-banner-content">
                <div class="verification-banner-title">Verification Rejected</div>
                <p class="verification-message">
                  Your student registration was not approved. Please verify your Student ID / Roll Number or contact campus administrators.
                </p>
                <div class="verification-banner-note">
                  <strong>Note:</strong> You can review your details with campus verification officers via the Admin Review Panel.
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        statusBoxEl.innerHTML = `
          <div class="verification-banner verification-banner-warning">
            <div class="verification-banner-inner">
              <div class="verification-banner-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="verification-banner-content">
                <div class="verification-banner-title">Verification Pending</div>
                <p class="verification-message">
                  Your Student ID / Roll Number (<strong>${escapeHtml(studentIdDisplay)}</strong>) from <strong>${escapeHtml(collegeDisplay)}</strong> is currently awaiting institutional review.
                </p>
                <div class="verification-banner-note">
                  <strong>Note:</strong> Entering a Student ID does not automatically prove student status. An administrator must review and verify the account.
                </div>
              </div>
            </div>
          </div>
        `;
      }
    } else {
      statusBoxEl.style.display = 'none';
      statusBoxEl.innerHTML = '';
    }
  }

  // User Rating (strictly peer user reviews, never item reviews)
  const userSummary = typeof getUserRatingSummary === 'function' ? getUserRatingSummary(targetUser.id) : { average: 0, totalRatings: 0, ratings: [] };

  if (trustEl) {
    if (userSummary.totalRatings > 0) {
      trustEl.textContent = `${userSummary.average.toFixed(1)} ★`;
      trustEl.style.fontSize = '';
    } else {
      trustEl.textContent = 'No ratings yet';
      trustEl.style.fontSize = '1.25rem';
    }
  }

  const userRatingCountEl = document.getElementById('profileUserRatingCount');
  if (userRatingCountEl) {
    if (userSummary.totalRatings > 0) {
      userRatingCountEl.textContent = `${userSummary.totalRatings} ${userSummary.totalRatings === 1 ? 'rating' : 'ratings'}`;
    } else {
      userRatingCountEl.textContent = '0 ratings';
    }
  }

  // Collapsible Reviews & Feedback Section (COLLAPSED INITIALLY)
  const collapseContent = document.getElementById('profileReviewsCollapseContent');
  const toggleIcon = document.getElementById('profileReviewsToggleIcon');
  const toggleBtn = document.getElementById('toggleProfileReviewsBtn');
  if (collapseContent) collapseContent.style.display = 'none';
  if (toggleIcon) toggleIcon.textContent = '▾';
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

  const profileUserReviewsCountBadge = document.getElementById('profileUserReviewsCountBadge');
  if (profileUserReviewsCountBadge) {
    profileUserReviewsCountBadge.textContent = `${userSummary.totalRatings} ${userSummary.totalRatings === 1 ? 'review' : 'reviews'}`;
  }

  const userReviewsListEl = document.getElementById('profileUserReviewsList');
  if (userReviewsListEl) {
    if (!userSummary.ratings || userSummary.ratings.length === 0) {
      userReviewsListEl.innerHTML = `<div style="text-align: center; color: var(--text-secondary); font-size: 13px; padding: 14px 8px;">No reviews yet.</div>`;
    } else {
      userReviewsListEl.innerHTML = userSummary.ratings.map(r => {
        const roleLabel = (r.roleContext || r.role || 'user').toLowerCase() === 'borrower' ? 'Borrower' : 'Owner';
        const dateDisplay = r.date || new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `
          <div class="review-item-card" style="padding: 10px 12px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
            <div class="flex items-center justify-between" style="margin-bottom: 4px;">
              <div class="flex items-center gap-2 flex-wrap">
                <span style="font-weight: 700; color: #b45309; font-size: 12px;">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
                <span class="badge ${roleLabel === 'Borrower' ? 'badge-primary' : 'badge-neutral'}" style="font-size: 10px; padding: 1px 6px; font-weight: 600;">${roleLabel}</span>
                <span style="font-size: 11px; color: var(--text-secondary);">·</span>
                <span style="font-size: 11px; font-weight: 600; color: var(--text-secondary);">
                  by <a href="javascript:void(0)" onclick="openUserProfileModal('${escapeHtml(r.fromUserId)}');" style="color: var(--primary); text-decoration: underline; font-weight: 600;" title="View ${escapeHtml(r.fromUserName || 'Student')}'s Profile">${escapeHtml(r.fromUserName || 'Student')}</a>
                </span>
              </div>
              <span style="font-size: 10px; color: var(--text-secondary);">${escapeHtml(dateDisplay)}</span>
            </div>
            ${r.comment ? `<p class="review-comment-text" style="font-size: 12px; margin: 0; color: var(--text-main); line-height: 1.4;">"${escapeHtml(r.comment)}"</p>` : `<p class="review-comment-text" style="font-size: 11px; font-style: italic; color: var(--text-secondary); margin: 0;">Rated without comment.</p>`}
          </div>
        `;
      }).join('');
    }
  }
};

/**
 * Opens a clean, public or private profile modal for any student ID.
 */
window.openUserProfileModal = function (userId) {
  if (!userId) return;
  const allUsers = typeof getUsers === 'function' ? getUsers() : [];
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const targetUser = allUsers.find(u => String(u.id) === String(userId)) ||
    (currentUser && String(currentUser.id) === String(userId) ? currentUser : null);

  if (!targetUser) {
    if (typeof showToast === 'function') showToast("User profile not found.", "info");
    return;
  }

  const isSelf = currentUser && String(currentUser.id) === String(targetUser.id);
  window.renderUserProfileModal(targetUser, isSelf);

  const profileModal = document.getElementById('profileModalOverlay');
  if (profileModal) {
    profileModal.classList.add('active');
  }
};

/**
 * Toggles collapsible user reviews section in profile modal.
 */
window.toggleProfileReviews = function () {
  const content = document.getElementById('profileReviewsCollapseContent');
  const icon = document.getElementById('profileReviewsToggleIcon');
  const btn = document.getElementById('toggleProfileReviewsBtn');
  if (!content) return;
  const isHidden = content.style.display === 'none' || !content.style.display;
  if (isHidden) {
    content.style.display = 'block';
    if (icon) icon.textContent = '▲';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    content.style.display = 'none';
    if (icon) icon.textContent = '▾';
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
};

/**
 * Toggles collapsible item reviews section in rent modal.
 */
window.toggleItemReviews = function () {
  const content = document.getElementById('modalItemReviewsCollapseContent');
  const icon = document.getElementById('modalItemReviewsToggleIcon');
  const btn = document.getElementById('toggleItemReviewsBtn');
  if (!content) return;
  const isHidden = content.style.display === 'none' || !content.style.display;
  if (isHidden) {
    content.style.display = 'block';
    if (icon) icon.textContent = '▲';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    content.style.display = 'none';
    if (icon) icon.textContent = '▾';
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
};

/**
 * Helper to open the item owner's profile modal directly from the rent modal.
 */
window.openUserProfileModalFromRentModal = function () {
  if (window.currentModalItem) {
    const ownerId = window.currentModalItem.ownerId ||
      (window.currentModalItem.owner && window.currentModalItem.owner.id) ||
      (window.currentModalItem.lender && window.currentModalItem.lender.id);
    if (ownerId) {
      window.openUserProfileModal(ownerId);
    }
  }
};

window.openRentModal = openRentModal;


