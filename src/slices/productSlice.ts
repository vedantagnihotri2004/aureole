import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  available?: boolean;
  discountPercentage?: number;
  originalPrice?: number;
  details?: string[];
  images?: string[];
  reviews?: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface ProductsState {
  items: Product[];
  featured: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  categories: string[];
}

const initialState: ProductsState = {
  items: [],
  featured: [],
  loading: false,
  error: null,
  selectedProduct: null,
  categories: [],
};

// Async thunks would be implemented here for fetching products from Firebase
// Example: export const fetchProducts = createAsyncThunk('products/fetchProducts', ...)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      // Extract categories from products
      const categorySet = new Set<string>();
      action.payload.forEach(product => {
        categorySet.add(product.category);
      });
      state.categories = Array.from(categorySet);
      
      // Set featured products
      state.featured = action.payload.filter(product => product.featured);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featured = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      // This is a placeholder for actual filtering logic
      // Actual implementation would depend on how you want to filter
    },
    sortProducts: (state, action: PayloadAction<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>) => {
      const sortType = action.payload;
      
      switch (sortType) {
        case 'price-asc':
          state.items.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          state.items.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          state.items.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          state.items.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }
  },
  // Extra reducers for async thunks would be added here
});

export const { 
  setProducts, 
  setSelectedProduct, 
  setFeaturedProducts, 
  setLoading, 
  setError,
  filterProducts,
  sortProducts
} = productSlice.actions;
export default productSlice.reducer;
