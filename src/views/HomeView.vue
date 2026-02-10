<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Product Catalog
            </h1>
            <p class="text-gray-600 mt-1 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Discover amazing products
            </p>
          </div>
          
          <!-- Stats Badge -->
          <div class="hidden md:flex items-center gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ store.products.length }}</div>
              <div class="text-xs text-gray-500">Products</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ store.categories.length }}</div>
              <div class="text-xs text-gray-500">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters Card -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 backdrop-blur-sm bg-white/80">
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 class="text-lg font-semibold text-gray-800">Filter Products</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchFilter />
          <CategoryFilter />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex flex-col justify-center items-center py-20">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-gray-600 font-medium">Loading awesome products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6 shadow-lg">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-red-800 text-lg">Oops! Something went wrong</p>
            <p class="text-sm text-red-700 mt-1">{{ store.error }}</p>
          </div>
        </div>
      </div>

      <!-- Products -->
      <ProductGrid v-else :products="store.filteredProducts" />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-gray-500 text-sm">
          Built with ❤️ using Vue.js 3 & TailwindCSS
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import SearchFilter from '@/components/SearchFilter.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import ProductGrid from '@/components/ProductGrid.vue'

const store = useProductStore()

onMounted(async () => {
  await Promise.all([
    store.fetchProducts(),
    store.fetchCategories()
  ])
})
</script>