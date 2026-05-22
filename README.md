<!-- # Sembark - E-Commerce Website -->
This is a simple e-commerce website built using React, TypeScript, and Bootstrap. I made this for my project assignment. It connects to a dummy API to fetch products and lets users browse them, filter by categories, and add items to a shopping cart.

<!-- Features -->

<!-- Product list  -->
Shows all the products fetched from the API.
<!-- Product list  -->

<!-- Search -->
You can type in the search bar to find products quickly.
<!-- Search -->

<!-- Multi-category filter -->
You can tick checkboxes of different categories at the same time to see only those products.
<!-- Multi-category filter -->

<!-- Sort by price -->
You can sort products from lowest price to highest price, or highest to lowest.
<!-- Sort by price -->

<!-- Detail page -->
Click on any product to see its full details and slides of all its images.
<!-- Detail page -->

<!-- Cart management -->
You can add items to the cart, change quantities, or remove items.
<!-- Cart management -->

<!-- Persistent cart -->
The cart is saved in the browser, so your items won't disappear when you refresh the page.
<!-- Persistent cart -->

<!-- URL search sharing -->
The filters and search terms are saved in the URL, so you can share the link with a friend and they will see the same filtered products.
<!-- URL search sharing -->

<!-- How to Set Up the Project -->
Follow these steps to run the project on your computer:

<!-- Prerequisites -->
Make sure you have Node.js installed on your computer.
<!-- Prerequisites -->

<!-- Step 1: Install Dependencies -->
Open your terminal in the project folder and run:
```bash
npm install
```

<!-- Step 2: Set up Environment Variables -->
Create a file named `.env` in the main folder (where `package.json` is). Add this line inside it:
```env
VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
```
<!-- Step 2: Set up Environment Variables -->

<!-- Step 3: Run the Website -->
To start the local development server, run:
```bash
npm run dev
```
Now, open your browser and go to the link shown in the terminal (usually http://localhost:5173).

<!-- Step 4: Build for Production (Optional) -->
If you want to build the project for production, run:
```bash
npm run build
```
This will compile all the TypeScript and Vite files and create a `dist` folder.
