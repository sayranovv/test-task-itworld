<script setup lang="ts">
import { Clock, Circle, Inbox, CircleCheck, Settings, Trash } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import CreateTaskDialog from './CreateTaskDialog.vue'

const items = [
  {
    title: 'Все задачи',
    url: '/',
    icon: Inbox,
  },
  {
    title: 'К выполнению',
    url: '/todo',
    icon: Circle,
  },
  {
    title: 'В процессе',
    url: '/inprogress',
    icon: Clock,
  },
  {
    title: 'Завершено',
    url: '/completed',
    icon: CircleCheck,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Задачи</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu class="space-y-2">
            <CreateTaskDialog />

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="#">
                  <component :is="Settings" />
                  <span>Настройки</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>
  </Sidebar>
</template>
