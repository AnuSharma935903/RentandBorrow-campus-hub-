# Rent & Borrow Application — Visual Design System Specification

## 1. Overview & Core Philosophy

The **Rent & Borrow** visual design system is designed specifically for a modern student and community marketplace. The aesthetic balances **academic credibility and trustworthy peer-to-peer sharing** with a **youthful, modern, hackathon-grade UI**.

- **Not childish**: No cartoonish elements, bubble fonts, or saturated rainbow palettes.
- **Not overly colorful**: Color is used purposefully to guide attention and indicate state.
- **Trustworthy & Clean**: Crisp white card surfaces on a very light slate neutral canvas, subtle layered shadows, and clear visual hierarchy.

All CSS variables are centralized in [`css/tokens.css`](file:///c:/Users/anuan/OneDrive/Documents/yehihoga/css/tokens.css). **Every new feature added later must follow this same design system.**

---

## 2. Color Palette & CSS Variables

| Token Name | Hex Code | Semantic Role & Usage |
| :--- | :--- | :--- |
| `--primary-600` | `#4F46E5` | **Core Brand Primary**: Deep Indigo / Blue for primary buttons, active tabs, brand accents |
| `--primary-700` | `#4338CA` | **Primary Hover / Active**: Deep Indigo for hover states, focus rings, emphasis |
| `--primary-50` | `#EEF2FF` | **Primary Subtle**: Soft indigo background for chips, selected table rows, active nav states |
| `--primary-200` | `#C7D2FE` | **Primary Border**: Subtle border for primary containers |
| `--secondary-600` | `#7C3AED` | **Brand Secondary**: Violet accent for youthful community energy, "Free Borrow" badges |
| `--secondary-50` | `#F5F3FF` | **Secondary Subtle**: Soft violet tint for category tags and highlight pills |
| `--bg-page` | `#F8FAFC` | **Background Canvas**: Very light neutral (Slate 50) |
| `--bg-surface` | `#FFFFFF` | **Cards & Dialogs**: Pure white for all elevated cards, containers, and inputs |
| `--bg-subtle` | `#F1F5F9` | **Secondary Surface**: Slate 100 for search inputs, table headers, dropzones |
| `--text-main` | `#0F172A` | **Main Text**: Dark navy / charcoal (Slate 900) for headlines and high contrast labels |
| `--text-body` | `#334155` | **Body Text**: Slate 700 for descriptions and paragraph copy |
| `--text-secondary`| `#64748B` | **Secondary Text**: Slate 500 for metadata, timestamps, location tags |
| `--text-muted` | `#94A3B8` | **Muted Text**: Slate 400 for input placeholders and disabled elements |
| `--border-color` | `#E2E8F0` | **Standard Border**: Clean Slate 200 border for cards and inputs |
| `--border-hover` | `#CBD5E1` | **Hover Border**: Slate 300 on interactive hover |
| `--success` | `#10B981` | **Success Green**: Available items, verified badges, successful actions |
| `--success-subtle`| `#ECFDF5` | **Success Background**: Soft emerald tint for availability badges |
| `--warning` | `#F59E0B` | **Warning Amber**: Pending requests, due soon alerts, caution banners |
| `--warning-subtle`| `#FFFBEB` | **Warning Background**: Soft amber tint for pending badges |
| `--error` | `#EF4444` | **Error Red**: Overdue items, validation errors, destructive actions |
| `--error-subtle` | `#FEF2F2` | **Error Background**: Soft red tint for error alerts |
| `--info` | `#0284C7` | **Info Sky Blue**: Campus alerts, guidelines, tips |

---

## 3. Typography Hierarchy

The design system uses **Inter** for readable body and form text, paired with **Plus Jakarta Sans** for modern headings.

- **Font Family (Heading)**: `var(--font-heading)` -> `'Plus Jakarta Sans', 'Inter', sans-serif`
- **Font Family (Body)**: `var(--font-sans)` -> `'Inter', -apple-system, sans-serif`

| Scale Token | Size (px / rem) | Typical Usage |
| :--- | :--- | :--- |
| `--text-xs` | `12px` / `0.75rem` | Badges, metadata, input hints, table headers |
| `--text-sm` | `14px` / `0.875rem` | Form inputs, buttons, table cell content, secondary copy |
| `--text-base`| `16px` / `1rem` | Standard body text, search inputs, modal text |
| `--text-lg` | `18px` / `1.125rem` | Subheadings, item card pricing |
| `--text-xl` | `20px` / `1.25rem` | Modal titles, subsection headers |
| `--text-2xl`| `24px` / `1.5rem` | Stat card numbers, card group titles |
| `--text-3xl`| `30px` / `1.875rem` | Page titles, dashboard headlines |
| `--text-4xl`| `36px` / `2.25rem` | Hero title |

---

## 4. Spacing System

All padding, margins, and gaps follow an exact 4px/8px modular scale:

- `--space-1`: `4px` (`0.25rem`)
- `--space-2`: `8px` (`0.5rem`)
- `--space-3`: `12px` (`0.75rem`)
- `--space-4`: `16px` (`1rem`)
- `--space-5`: `20px` (`1.25rem`)
- `--space-6`: `24px` (`1.5rem`)
- `--space-8`: `32px` (`2rem`)
- `--space-10`: `40px` (`2.5rem`)
- `--space-12`: `48px` (`3rem`)
- `--space-16`: `64px` (`4rem`)

---

## 5. Border Radius Standards

Consistent curvature maintains the friendly, modern aesthetic:

- `--radius-xs`: `4px` (keyboard shortcuts, inner small tags)
- `--radius-sm`: `8px` (button small, table thumbnail images)
- `--radius-md`: `12px` (standard buttons, form controls, stat icons)
- `--radius-lg`: `16px` (item cards, dashboard tables, standard card containers)
- `--radius-xl`: `20px` (modal dialogs, floating panels)
- `--radius-2xl`: `24px` (hero containers)
- `--radius-full`: `9999px` (badges, avatars, search inputs, pill filters)

---

## 6. Shadows & Depth

Layered, ambient shadows without harsh black borders:

- `--shadow-xs`: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`
- `--shadow-sm`: `0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`
- `--shadow-card`: `0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 0 1px 1px rgba(15, 23, 42, 0.03)`
- `--shadow-card-hover`: `0 14px 28px -6px rgba(15, 23, 42, 0.09), 0 6px 12px -4px rgba(15, 23, 42, 0.05)`
- `--shadow-primary`: `0 8px 20px -4px rgba(79, 70, 229, 0.35)`
- `--shadow-focus`: `0 0 0 3px rgba(99, 102, 241, 0.25)`

---

## 7. Component Usage Guidelines

### Buttons
- **Primary**: `.btn.btn-primary` (Deep indigo background, white text, subtle gradient sheen)
- **Secondary**: `.btn.btn-secondary` (Violet accent background, white text)
- **Outline**: `.btn.btn-outline` (White background, Slate 200 border, slate text)
- **Subtle**: `.btn.btn-primary-subtle` (Indigo 50 background, Indigo 700 text)
- **Sizes**: `.btn-xs`, `.btn-sm`, `.btn-md`, `.btn-lg`

### Cards
- Base: `.card` with `background-color: var(--bg-surface)`, `border: 1px solid var(--border-color)`, `border-radius: var(--radius-lg)`.
- Interactive: `.card-hoverable` lifts on hover with `-3px` translateY and elevated shadow.

### Item Cards
- `.item-card`: Includes responsive image container with status badge (Available / Borrowed), category indicator, location pin, lender trust avatar with verified badge, daily rate or "Free Borrow" badge, and action button.

### Form Inputs
- `.form-control`: Height `44px`, border `1px solid var(--border-color)`, radius `--radius-md` (12px).
- Focus state: Border changes to `--primary-500` with soft glowing focus ring `--shadow-focus`.

### Status Badges
- `.badge.badge-available`: Emerald 50 bg + emerald dot + emerald 800 text.
- `.badge.badge-borrowed`: Amber 50 bg + amber dot + amber 800 text.
- `.badge.badge-reserved`: Indigo 50 bg + indigo dot + indigo 700 text.
- `.badge.badge-verified`: Violet 50 bg + violet 700 text.

---

## 8. Rules for New Features

1. **Never hardcode hex values in component CSS**: Always use `var(--color-name)`.
2. **Never change background or surface colors per page**: All pages must use `--bg-page` (`#F8FAFC`) and `--bg-surface` (`#FFFFFF`).
3. **Use consistent border radii**: Elements must use `--radius-sm` (8px), `--radius-md` (12px), or `--radius-lg` (16px).
4. **Maintain visual trust**: Lender verification indicators and deposit breakdowns must accompany every borrowing action.

---

## 9. Centralized Data Layer (`js/storage.js`)

All client-side data persistence is managed through `js/storage.js` via browser `localStorage` using `JSON.stringify()` and `JSON.parse()`:

- **Users**: `getUsers()`, `saveUsers(users)`
- **Current User**: `getCurrentUser()`, `setCurrentUser(user)`, `clearCurrentUser()`
- **Items**: `getItems()`, `saveItems(items)`
- **Rental Requests**: `getRentalRequests()`, `saveRentalRequests(requests)`
- **Rentals**: `getRentals()`, `saveRentals(rentals)`
- **Transactions**: `getTransactions()`, `saveTransactions(transactions)`
- **Ratings**: `getRatings()`, `saveRatings(ratings)`
- **Reset/Seed**: `initializeStorage()`, `resetStorageToDefaults()`
