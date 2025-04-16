import { db } from "./firebaseConfig";
import { collection, getDocs, doc, getDoc, query, where, addDoc, orderBy, limit, startAfter, QueryDocumentSnapshot } from "firebase/firestore";

export interface Beer {
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
    [key: string]: string | number | boolean | undefined; // More specific than any
}

export interface OrderItem {
    name: string;
    quantity: number;
    price?: number;
}

export interface OrderRound {
    created: {
        nanoseconds: number;
        seconds: number;
    };
    items: OrderItem[];
}

export interface Order {
    id: string;
    created: string;
    paid: boolean;
    subtotal: number;
    taxes: number;
    discounts: number;
    items: OrderItem[];
    rounds: OrderRound[];
    // For displaying random food names on the orders page
    displayName?: string;
    totalItems?: number;
}

// Helper function to calculate total items
export function calculateTotalItems(rounds: OrderRound[]): number {
    let totalItems = 0;
    if (rounds && Array.isArray(rounds)) {
        rounds.forEach((round: OrderRound) => {
            if (round.items && Array.isArray(round.items)) {
                round.items.forEach((item: OrderItem) => {
                    totalItems += item.quantity;
                });
            }
        });
    }
    return totalItems;
}

export async function getBeers(itemLimit = 20, startAfterId?: string): Promise<{ beers: Beer[], lastDoc: QueryDocumentSnapshot | null }> {
    try {
        const beersCollection = collection(db, "beers");
        let q = query(beersCollection, orderBy("name"), limit(itemLimit));

        if (startAfterId) {
            const lastDocRef = doc(db, "beers", startAfterId);
            const lastDocSnap = await getDoc(lastDocRef);
            if (lastDocSnap.exists()) {
                q = query(q, startAfter(lastDocSnap));
            }
        }

        const beerSnapshot = await getDocs(q);
        const lastVisible = beerSnapshot.docs.length > 0 ? beerSnapshot.docs[beerSnapshot.docs.length - 1] : null;

        const beerList = beerSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Beer[];

        return { beers: beerList, lastDoc: lastVisible };
    } catch (error) {
        console.error("Error fetching beers:", error);
        return { beers: [], lastDoc: null };
    }
}

export async function getBeerById(id: string): Promise<Beer | null> {
    try {
        const beerRef = doc(db, "beers", id);
        const beerDoc = await getDoc(beerRef);
        
        if (!beerDoc.exists()) {
            return null;
        }
        
        return {
            id: beerDoc.id,
            ...beerDoc.data()
        } as Beer;
    } catch (error) {
        console.error(`Error fetching beer ${id}:`, error);
        return null;
    }
}

// Random food names for display
const foodNames = [
    "Avosalado", "Kopi Kudda", "Es Tong-Tong", "Bwang Puttie", 
    "Mie Goreng", "Nasi Uduk", "Sate Padang", "Rendang Special",
    "Bakso Solo", "Gado-Gado", "Soto Ayam", "Bubur Sumsum"
];

// Get all orders
export async function getOrders(): Promise<Order[]> {
    try {
        const ordersCollection = collection(db, "orders");
        const orderSnapshot = await getDocs(ordersCollection);
        
        return orderSnapshot.docs.map((doc, index) => {
            const data = doc.data() as Omit<Order, 'id' | 'displayName' | 'totalItems'>;
            // Assign a random food name to each order for display
            const displayName = foodNames[index % foodNames.length];
            
            // Count total items
            const totalItems = calculateTotalItems(data.rounds);
            
            return {
                id: doc.id,
                ...data,
                displayName,
                totalItems
            };
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

// Get orders filtered by paid status
export async function getOrdersByStatus(isPaid: boolean): Promise<Order[]> {
    try {
        const ordersCollection = collection(db, "orders");
        const q = query(
            ordersCollection, 
            where("paid", "==", isPaid),
            orderBy("created", "desc")
        );
        const orderSnapshot = await getDocs(q);
        
        return orderSnapshot.docs.map((doc, index) => {
            const data = doc.data() as Omit<Order, 'id' | 'displayName' | 'totalItems'>;
            // Assign a random food name to each order for display
            const displayName = foodNames[index % foodNames.length];
            
            // Count total items
            const totalItems = calculateTotalItems(data.rounds);
            
            return {
                id: doc.id,
                ...data,
                displayName,
                totalItems
            };
        });
    } catch (error) {
        console.error(`Error fetching orders with paid=${isPaid}:`, error);
        return [];
    }
}

// Get a single order by ID
export async function getOrderById(id: string): Promise<Order | null> {
    try {
        const orderRef = doc(db, "orders", id);
        const orderDoc = await getDoc(orderRef);
        
        if (!orderDoc.exists()) {
            return null;
        }
        
        const data = orderDoc.data() as Omit<Order, 'id' | 'displayName' | 'totalItems'>;
        
        // Determine index based on ID to get consistent random name
        const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const displayName = foodNames[idSum % foodNames.length];
        
        // Count total items
        const totalItems = calculateTotalItems(data.rounds);
        
        return {
            id: orderDoc.id,
            ...data,
            displayName,
            totalItems
        };
    } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
        return null;
    }
}

// Sample beer names
const beerNames = [
    "Corona", "Heineken", "Stella Artois", "Club Colombia",
    "Aguila", "Budweiser", "Poker", "Peroni",
    "Guinness", "Modelo", "Blue Moon", "Sierra Nevada"
];

// Function to seed sample orders into Firebase
export async function seedOrders() {
    try {
        // Create 4 sample orders: 2 paid, 2 unpaid
        const sampleOrders = [
            {
                created: new Date().toISOString(),
                paid: false,
                subtotal: 45000,
                taxes: 5000,
                discounts: 0,
                items: [],
                rounds: [
                    {
                        created: new Date().toISOString(),
                        items: [
                            { name: beerNames[0], quantity: 2, price: 15000 },
                            { name: beerNames[1], quantity: 1, price: 15000 }
                        ]
                    }
                ]
            },
            {
                created: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                paid: false,
                subtotal: 75000,
                taxes: 7500,
                discounts: 5000,
                items: [],
                rounds: [
                    {
                        created: new Date(Date.now() - 86400000).toISOString(),
                        items: [
                            { name: beerNames[2], quantity: 3, price: 15000 },
                            { name: beerNames[3], quantity: 2, price: 15000 }
                        ]
                    }
                ]
            },
            {
                created: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                paid: true,
                subtotal: 60000,
                taxes: 6000,
                discounts: 0,
                items: [],
                rounds: [
                    {
                        created: new Date(Date.now() - 172800000).toISOString(),
                        items: [
                            { name: beerNames[4], quantity: 2, price: 15000 },
                            { name: beerNames[5], quantity: 2, price: 15000 }
                        ]
                    }
                ]
            },
            {
                created: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
                paid: true,
                subtotal: 90000,
                taxes: 9000,
                discounts: 10000,
                items: [],
                rounds: [
                    {
                        created: new Date(Date.now() - 259200000).toISOString(),
                        items: [
                            { name: beerNames[6], quantity: 4, price: 15000 },
                            { name: beerNames[7], quantity: 2, price: 15000 }
                        ]
                    }
                ]
            }
        ];

        const ordersCollection = collection(db, "orders");
        
        // Add each sample order to Firestore
        const results = [];
        for (const order of sampleOrders) {
            const docRef = await addDoc(ordersCollection, order);
            results.push(docRef.id);
        }
        
        return `Added 4 sample orders to Firestore: ${results.join(', ')}`;
    } catch (error) {
        console.error("Error seeding orders:", error);
        return `Error seeding orders: ${error instanceof Error ? error.message : String(error)}`;
    }
}
