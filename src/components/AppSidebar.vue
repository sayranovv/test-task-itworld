<script setup lang="ts">
import { Calendar1, CalendarDays, Inbox, CircleCheck, Settings, Trash } from 'lucide-vue-next'
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
import { Button } from '@/components/ui/button'

const items = [
  {
    title: 'Inbox',
    url: '/',
    icon: Inbox,
  },
  {
    title: 'Today',
    url: '/today',
    icon: Calendar1,
  },
  {
    title: 'Upcoming',
    url: '/upcoming',
    icon: CalendarDays,
  },
  {
    title: 'Completed',
    url: '/completed',
    icon: CircleCheck,
  },
  {
    title: 'Trash',
    url: '/trash',
    icon: Trash,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
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
            <Button>New project</Button>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/settings">
                  <component :is="Settings" />
                  <span>Settings</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>
  </Sidebar>
</template>
