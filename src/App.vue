<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import ExportDialog from './components/ExportDialog.vue'
import CreateTaskDialog from './components/CreateTaskDialog.vue'
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <div class="flex-1 overflow-hidden pr-2">
        <!--панель с триггером сайдбара и кнопками -->
        <div class="mx-4 mt-4 flex justify-between">
          <SidebarTrigger />
          <div class="flex items-center gap-2">
            <div class="block sm:hidden">
              <CreateTaskDialog button-title="+" />
            </div>
            <ExportDialog type="export" />
            <ExportDialog type="import" />
          </div>
        </div>
        <RouterView />
        <!-- тостер-соннер для уведомленийи -->
        <Toaster />
      </div>
    </SidebarProvider>
  </div>
</template>
