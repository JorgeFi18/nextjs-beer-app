# Beer App

A Next.js application for browsing and ordering beers with cart functionality.

## Features

- Browse beer catalog
- View beer details
- Add beers to shopping cart
- Update quantities in cart
- Responsive design
- Firebase integration for data storage

## Requirements

- Node.js 18.x or later
- Yarn or npm
- Firebase project

## Environment Variables

This project uses environment variables for Firebase configuration. A sample `.env.local.example` file is provided in the repository.

1. Copy the example file to create your own `.env.local` file:

```bash
cp .env.local.example .env.local
```

2. Edit the `.env.local` file and replace the placeholder values with your Firebase configuration:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

You can find these values in your Firebase project settings under "Project settings" > "General" > "Your apps" > "SDK setup and configuration".

The Firebase configuration in `src/lib/firebaseConfig.ts` is set up to use these environment variables with fallbacks to default values for development. In production, make sure to set these environment variables in your hosting platform.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/JorgeFi18/beer-app.git
cd beer-app
```

### Install dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### Run the development server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build for production

```bash
# Using npm
npm run build
npm start

# Using yarn
yarn build
yarn start
```

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database in your project
3. Set up the security rules for Firestore
4. Create collections for `beers` and `orders` with the structure matching the application's data models
5. Copy your Firebase configuration to the `.env.local` file as shown above

### Seeding the Database

The application provides a seed endpoint to populate the database with sample beers. Visit `/seed` in your browser to trigger the seed process.

## Project Structure

```
├── src/
│   ├── app/                # Next.js application
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context for state management
│   │   ├── cart/           # Cart page
│   │   ├── beers/          # Beer details pages
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page
│   ├── lib/                # Utility functions
│   │   ├── firebaseConfig.ts  # Firebase configuration
│   │   ├── firestoreUtils.ts  # Firestore data fetching utilities
│   │   └── utils.ts        # General utility functions
```

## Main Components

- **BeerCard**: Displays beer information in a card format
- **CartButton**: Shows the current number of items in the cart
- **QuantitySelector**: Allows users to adjust quantities
- **OrderButton**: Adds beers to the cart
- **StarRating**: Visual representation of ratings

## State Management

The application uses React Context for state management, specifically:

- **CartContext**: Manages the shopping cart state across the application

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Firebase/Firestore
- Lucide React (for icons)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Available Pages

- **Home Page (`/`)**: Browse featured beers and the beer catalog
- **Beer Detail Page (`/beers/[id]`)**: View detailed information about a specific beer, with the ability to select quantity and add to cart
- **Cart Page (`/cart`)**: View, manage, and checkout items in the shopping cart
- **Seed Page (`/seed`)**: Utility page to populate the database with sample data

## Main Functionality

- **Beer Browsing**: Users can browse through the beer catalog from the home page
- **Beer Details**: Detailed view of each beer with description, price, and ratings
- **Shopping Cart**: Full shopping cart functionality with:
  - Add to cart from beer detail page
  - Update quantities
  - Remove items
  - View total price
- **Cart Persistence**: Cart state is saved to localStorage, so items remain in the cart even if the user refreshes the page

## Data Models

### Beer
```typescript
interface Beer {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    rating?: number;
    reviews?: number;
    alcoholContent?: number;
    origin?: string;
    ingredients?: string;
}
```

### Cart Item
```typescript
interface CartItem {
    beer: Beer;
    quantity: number;
}
```

### Order
```typescript
interface OrderItem {
    name: string;
    quantity: number;
    price?: number;
}

interface OrderRound {
    created: string;
    items: OrderItem[];
}

interface Order {
    id: string;
    created: string;
    paid: boolean;
    subtotal: number;
    taxes: number;
    discounts: number;
    items: OrderItem[];
    rounds: OrderRound[];
    displayName?: string;
    totalItems?: number;
}
```

## Future Improvements

- **User Authentication**: Implement login and registration functionality
- **Order History**: Allow users to view their past orders
- **Payment Processing**: Integrate with payment gateways like Stripe
- **Beer Reviews**: Enable users to leave reviews and ratings
- **Admin Panel**: Create an admin interface for managing beers and orders
- **Search Functionality**: Implement search and filtering options
- **Beer Recommendations**: Add a recommendation system based on user preferences
- **Responsive Images**: Replace placeholder images with actual beer images
- **Performance Optimizations**: Implement caching and code splitting
- **Unit and Integration Tests**: Add comprehensive test coverage

## Testing

The project includes comprehensive unit tests using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## CI/CD

This project uses GitHub Actions for continuous integration to ensure code quality.

### Workflows

- **Test**: Runs on pushes to main, master, and develop branches, and on pull requests. The workflow runs all tests against Node.js v18.x and v20.x and archives test coverage reports.

- **Lint**: Runs on pushes to main, master, and develop branches, and on pull requests. The workflow validates code quality by running the linting process.

### Running Workflows Manually

Both workflows can be triggered manually from the Actions tab in the GitHub repository.
