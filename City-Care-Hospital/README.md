# 🏥 MediCare Hospital – Multi-Page Website

A fully responsive, professionally designed hospital website built with HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5.

---

## 🌟 Features Implemented

### ✅ General Design
- Modern, clean professional hospital theme
- Consistent color scheme: Blue (`#1a6fc4`), White, Light Green (`#27ae60`)
- Fully responsive (mobile, tablet, desktop)
- Sticky navigation bar with active link highlighting
- Preloader animation on all pages
- Scroll-to-top button
- Emergency banner on all pages
- Fade-up animation on scroll (Intersection Observer)
- Animated counter statistics

### ✅ Pages (8 pages total)
| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services, departments, doctors, testimonials, CTA |
| About Us | `about.html` | Introduction, mission/vision/values, facilities, accreditations |
| Departments | `departments.html` | 10 specialty departments with icons, tags, and booking buttons |
| Doctors | `doctors.html` | 12 doctor profiles with department filter |
| Gallery | `gallery.html` | Masonry grid with category filter + custom lightbox |
| Contact | `contact.html` | Contact cards, embedded Google Map, validated form |
| Appointment | `appointment.html` | 4-step booking wizard with confirmation modal |

### ✅ Navigation
- Responsive navbar with hamburger toggle on mobile
- Active page detection and highlighting
- "Book Appointment" CTA button in nav
- Complete footer with quick links, department links, contact info, social icons

### ✅ Home Page
- Animated hero section with gradient background
- Floating stat cards
- 8 service overview cards
- 6 key department mini-cards
- 4 featured doctor cards
- 3-column testimonials
- CTA banner section
- Why Choose Us section

### ✅ About Us Page
- Hospital introduction with 25-year badge
- Animated stat counters (500K patients, 120 doctors, 40 departments, 98% success)
- Mission, Vision, Values cards
- Facilities & Infrastructure section with feature list
- Patient care focus section
- Accreditation badges (JCI, ISO, NABH, WHO, Teaching)

### ✅ Departments Page
- 10 department cards: Cardiology, Neurology, Pediatrics, Orthopedics, General Medicine, Gynecology, Dermatology, Pulmonology, Ophthalmology, Oncology
- Colored top borders and icon badges per specialty
- Service tags for each department
- Specialist count + inline "Book Now" button
- Stats banner section

### ✅ Doctors Page
- 12 doctor profiles with real photo placeholders (Unsplash)
- Info: Name, specialization badge, qualifications, visiting hours, rating
- Department filter buttons (7 categories + All)
- Social link icons (LinkedIn, Email, Book)
- No-results message for empty filters

### ✅ Gallery Page
- 16 hospital images in masonry grid layout
- Category filters: Building, Wards, Equipment, Lab, Medical Team
- Hover zoom overlay with caption
- Custom JavaScript lightbox with:
  - Previous/Next navigation
  - Keyboard arrow keys + Escape
  - Click-outside to close

### ✅ Contact Page
- 4 contact info cards (Address, Phone, Email, Hours)
- Validated contact form (name, email, phone, subject, message)
- Embedded Google Maps iframe
- Getting here: Subway, Bus, Car, Taxi directions
- Quick contact section (Call, Book, Emergency)

### ✅ Appointment Booking Page
- **4-step wizard** with visual step indicator
- Step 1: Patient info (name, email, phone, age, gender, appointment type, notes)
- Step 2: Department selection → dynamic doctor dropdown (JS logic for 7 departments)
- Step 3: Date picker + time input + visual time slot picker (with unavailable slots)
- Step 4: Full summary review before submission
- **Confirmation Modal** with appointment ID, all details, and success alert
- Full form validation on every step
- Form resets after confirmation modal closes

---

## 📁 File Structure

```
/
├── index.html              # Home Page
├── about.html              # About Us Page
├── departments.html        # Departments Page
├── doctors.html            # Doctors Page
├── gallery.html            # Gallery Page
├── contact.html            # Contact Us Page
├── appointment.html        # Appointment Booking Page
├── css/
│   └── style.css           # Main custom stylesheet (~600+ lines)
├── js/
│   ├── main.js             # Shared JS: preloader, navbar, scroll, fade-up, counters, form validation
│   └── appointment.js      # Appointment JS: dept→doctor logic, summary, confirmation
└── README.md
```

---

## 🛠️ Technology Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Semantic markup, accessibility |
| CSS3 | Custom properties, animations, responsive grid |
| JavaScript (ES6+) | DOM manipulation, Intersection Observer, form validation |
| Bootstrap 5.3.2 | Grid, navbar, modals, badges, forms |
| Font Awesome 6.5 | Icons throughout |
| Google Fonts (Inter) | Typography |
| Unsplash | Placeholder images |
| Google Maps Embed API | Location map on contact page |

---

## 🎨 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#1a6fc4` | Buttons, links, accents |
| Primary Dark | `#0d4f9e` | Hover states, hero gradient |
| Accent Green | `#27ae60` | Success, tags, CTA |
| Light Blue | `#e8f1fb` | Card backgrounds |
| Light Green | `#eafaf1` | Badge backgrounds |
| Dark | `#1a1a2e` | Headings, footer |

---

## 📱 Responsive Breakpoints

- **Mobile**: < 480px — single column, collapsed nav
- **Tablet**: 480–992px — 2-column cards, expanded layout
- **Desktop**: > 992px — full multi-column layouts, floating cards

---

## 🚀 Getting Started

1. Open `index.html` in any modern browser
2. All assets load via CDN — no build step required
3. Navigate between pages using the top navbar

---

## 📋 Pages & URLs

| Page | URL |
|------|-----|
| Home | `index.html` |
| About | `about.html` |
| Departments | `departments.html` |
| Doctors | `doctors.html` |
| Gallery | `gallery.html` |
| Contact | `contact.html` |
| Appointment | `appointment.html` |

---

## 🔮 Potential Next Steps

- [ ] Add a patient login/portal page
- [ ] Connect appointment form to a backend API or REST table
- [ ] Add a blog/news section
- [ ] Implement telemedicine video consultation scheduling
- [ ] Add a search functionality
- [ ] Create a 404 error page
- [ ] Add PWA (Progressive Web App) support
- [ ] Integrate online payment for appointments

---

## 📄 License

© 2025 MediCare Hospital. All rights reserved. Built for demonstration purposes.
