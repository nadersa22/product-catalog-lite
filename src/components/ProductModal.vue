<template>
  <!-- Modal Backdrop -->
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeModal"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

      <!-- Modal Container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- Modal Content -->
        <div
          class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto transform transition-all"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Body -->
          <div class="grid md:grid-cols-2 gap-8 p-8">
            <!-- Left: Image -->
            <div class="flex items-center justify-center bg-gray-50 rounded-xl p-8">
              <img
                :src="product.image"
                :alt="product.title"
                class="max-h-96 object-contain"
              />
            </div>

            <!-- Right: Details -->
            <div class="flex flex-col">
              <!-- Category Badge -->
              <div class="mb-3">
                <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                  {{ product.category }}
                </span>
              </div>

              <!-- Title -->
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                {{ product.title }}
              </h2>

              <!-- Rating -->
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center gap-1">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-5 h-5"
                    :class="star <= Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-gray-600 text-sm">
                  {{ product.rating.rate }} / 5 ({{ product.rating.count }} reviews)
                </span>
              </div>

              <!-- Price -->
              <div class="mb-6">
                <p class="text-4xl font-bold text-blue-600">
                  ${{ product.price.toFixed(2) }}
                </p>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ product.description }}
                </p>
              </div>

              <!-- Actions -->
              <div class="mt-auto space-y-3">
                <button
                  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add to Cart
                </button>
                <button
                  @click="closeModal"
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { Product } from '@/types/product'

defineProps<{
  product: Product
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}


const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>