<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import ExportDialog from './components/ExportDialog.vue'
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <div class="flex-1 overflow-hidden pr-2">
        <div class="mx-4 mt-4 flex justify-between">
          <SidebarTrigger class="" />
          <div class="space-x-2">
            <ExportDialog type="export" />
            <ExportDialog type="import" />
          </div>
        </div>
        <RouterView />
        <Toaster />
      </div>
    </SidebarProvider>
  </div>
</template>
