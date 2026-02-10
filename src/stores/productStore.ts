import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export const useProductStore = defineStore('products', () => {
 
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
 
  const searchQuery = ref('')
  const selectedCategory = ref('')

  
  const filteredProducts = computed(() => {
    let result = products.value

   
    if (searchQuery.value) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    
    if (selectedCategory.value) {
      result = result.filter(product => product.category === selectedCategory.value)
    }

    return result
  })

 
  async function fetchProducts() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      
      products.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error('Error fetching products:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      
      categories.value = await response.json()
    } catch (e) {
      console.error('Error fetching categories:', e)
    }
  }

  return {
    
    products,
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    filteredProducts,
    
    
    fetchProducts,
    fetchCategories
  }
})