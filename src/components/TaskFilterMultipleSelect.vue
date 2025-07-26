<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

defineProps<{
  items: string[]
  placeholder?: string
  label?: string
}>()
</script>

<template>
  <Select multiple>
    <SelectTrigger>
      <SelectValue v-if="placeholder" :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel v-if="label">{{ label }}</SelectLabel>
        <SelectItem v-for="item in items" :value="item.toLowerCase()"> {{ item }} </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
