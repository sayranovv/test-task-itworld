<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <div class="flex-1 overflow-hidden pr-2">
        <SidebarTrigger class="ml-4 mt-4" />
        <RouterView />
        <Toaster />
      </div>
    </SidebarProvider>
  </div>
</template>
