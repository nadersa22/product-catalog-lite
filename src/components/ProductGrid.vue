<template>
  <div>
    <!-- View Toggle & Results Count -->
    <div class="flex justify-between items-center mb-6">
      <!-- Results Count -->
      <div class="text-gray-600">
        <span class="font-semibold text-gray-900">{{ products.length }}</span> products found
      </div>

      <!-- View Toggle -->
      <div class="inline-flex rounded-xl border border-gray-200 p-1 bg-white shadow-sm">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium',
            viewMode === 'grid'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Grid
        </button>
        <button
          @click="viewMode = 'list'"
          :class="[
            'px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium',
            viewMode === 'list'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          List
        </button>
      </div>
    </div>

    <!-- Products Grid/List -->
    <div
      :class="[
        'transition-all duration-300',
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'
      ]"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @view-details="openModal"
      />
    </div>

    <!-- Empty State -->
    <div
      v-if="products.length === 0"
      class="text-center py-20"
    >
      <div class="inline-block p-8 bg-gray-50 rounded-full mb-4">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
      <p class="text-gray-500">Try adjusting your search or filters</p>
    </div>

    <!-- Product Modal -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'
import ProductModal from './ProductModal.vue'
import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()

const viewMode = ref<'grid' | 'list'>('grid')
const selectedProduct = ref<Product | null>(null)
const isModalOpen = ref(false)

const openModal = (product: Product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedProduct.value = null
  }, 300) 
}
</script>