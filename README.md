# Punta Cana Adventures

Welcome to the Punta Cana Adventures project! This is a frontend-only e-commerce website designed for a tour vendor specializing in tropical excursions in the Dominican Republic, particularly in Bavaro and Punta Cana.

## Project Structure

The project is organized as follows:

```
punta-cana-adventures
├── src
│   ├── main.tsx               # Entry point of the application
│   ├── App.tsx                # Main application component with routing
│   ├── pages
│   │   ├── Home.tsx           # Homepage layout with hero and marketing sections
│   │   ├── Tours.tsx          # Page listing available excursions
│   │   └── Contact.tsx        # Contact form and vendor information
│   ├── components
│   │   ├── layout
│   │   │   ├── Header.tsx     # Navigation header component
│   │   │   └── Footer.tsx     # Footer component with copyright info
│   │   ├── ui
│   │   │   ├── Button.tsx     # Reusable button component
│   │   │   └── Icon.tsx       # Reusable icon component
│   │   ├── Hero.tsx           # Hero section component
│   │   ├── TourCard.tsx       # Component for displaying individual tours
│   │   ├── Testimonials.tsx    # Component for customer testimonials
│   │   ├── Features.tsx       # Component highlighting key tour features
│   │   ├── ParallaxSection.tsx # Parallax section component for visual depth
│   │   └── ContactForm.tsx    # Contact form component
│   ├── data
│   │   └── tours.ts           # Data file containing tour information
│   ├── hooks
│   │   └── useParallax.ts     # Custom hook for parallax effects
│   ├── styles
│   │   └── globals.css        # Global styles and TailwindCSS imports
│   └── utils
│       └── whatsapp.ts        # Utility function for WhatsApp messaging
├── public                      # Directory for static assets
├── index.html                 # Main HTML file for the React application
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
├── tailwind.config.cjs        # TailwindCSS configuration file
├── postcss.config.cjs         # PostCSS configuration file
├── vite.config.ts             # Vite configuration file
└── README.md                  # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd punta-cana-adventures
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- **Responsive Design:** The website is fully responsive and looks great on mobile, tablet, and desktop devices.
- **Tropical Aesthetic:** The design incorporates a tropical color palette and adventurous imagery to reflect the essence of Punta Cana tourism.
- **Dynamic Tour Listings:** The Tours page dynamically lists available excursions with options to book via WhatsApp.
- **Contact Form:** A professional contact form for inquiries, along with vendor contact information and social media links.
- **Smooth Animations:** The site features smooth animations for hover effects, button interactions, and scroll-based transitions.

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Vite
- PostCSS

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to explore the code and contribute to the project!