<script setup>
import CategoryCard from '@/components/shared/CategoryCard.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconUserTick from '@/components/icons/IconUserTick.vue'
import TheApplicants from '@/components/shared/TheApplicants.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-6">

    <div class="space-y-4">
      <!-- The category header of single category -->
      <CategoryCard title="New" :completedTasks="3" totalTasks="5" bgColor="bg-[#c8cff7]" 
        levelColor="bg-primary" statColor="text-primary"
      >
        <template #icon>
          <IconStar />
        </template>
      </CategoryCard>
      
      <!-- The Applicants list -->
      <TheApplicants />
    </div>

    <div class="space-y-4">
      <!-- The category header of single category -->
      <CategoryCard title="Shortlisted" :completedTasks="5" totalTasks="10" bgColor="bg-secondary-accent" 
        levelColor="bg-secondary" statColor="text-secondary"
      >
        <template #icon>
          <IconCheck />
        </template>
      </CategoryCard>

      <!-- The Applicants list -->
      <TheApplicants />
    </div>

    <div class="space-y-4">
      <!-- The category header of single category -->
      <CategoryCard title="Interviewed" :completedTasks="7" totalTasks="10" bgColor="bg-third-accent" 
        levelColor="bg-third" statColor="text-third"
      >
        <template #icon>
          <IconUserTick />
        </template>
      </CategoryCard>

      <!-- The Applicants list -->
      <TheApplicants />
    </div>
  </div>
</template>