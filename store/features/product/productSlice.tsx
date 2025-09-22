import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    products: any[];
    filteredProducts: any[];
    searchQuery: string;
    filterCategory: string;
    sortOrder: string;
    currentPage: number;
    itemsPerPage: number;
}

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    filteredProducts: [],
    searchQuery: '',
    filterCategory: 'all',
    sortOrder: 'asc',
    currentPage: 1,
    itemsPerPage: 10,
  } as ProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  setProducts,
  setSearchQuery,
  setFilterCategory,
  setSortOrder,
  setCurrentPage,
  setItemsPerPage,
} = productSlice.actions;

export default productSlice.reducer;