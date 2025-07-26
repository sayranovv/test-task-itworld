<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <div class="flex-1 overflow-hidden pr-2">
        <SidebarTrigger class="ml-4 mt-4" />
        <RouterView />
      </div>
    </SidebarProvider>
  </div>
</template>
