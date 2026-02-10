<template>
  <div class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
    <!-- Image Container -->
    <div class="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden">
      <img
        :src="product.image"
        :alt="product.title"
        class="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
      />
      <!-- Category Badge -->
      <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm capitalize">
        {{ product.category }}
      </div>
      <!-- Rating Badge -->
      <div class="absolute top-3 left-3 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
        <span>⭐</span>
        <span>{{ product.rating.rate }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-base font-semibold text-gray-800 line-clamp-2 mb-3 min-h-[3rem] group-hover:text-blue-600 transition-colors">
        {{ product.title }}
      </h3>
      
      <!-- Price and Reviews -->
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-2xl font-bold text-blue-600">
            ${{ product.price.toFixed(2) }}
          </p>
        </div>
        <div class="text-xs text-gray-500">
          {{ product.rating.count }} reviews
        </div>
      </div>

      <!-- View Details Button -->
      <button
        @click="$emit('view-details', product)"
        class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()

defineEmits<{
  'view-details': [product: Product]
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>