<script setup>
import CategoryCard from '@/components/shared/CategoryCard.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconUserTick from '@/components/icons/IconUserTick.vue'
import ApplicantCard from '@/components/shared/ApplicantCard.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <div class="space-y-4">
      <CategoryCard title="New" :completedTasks="3" totalTasks="5" bgColor="bg-[#c8cff7]" 
        levelColor="bg-primary" statColor="text-primary"
      >
        <template #icon>
          <IconStar />
        </template>
      </CategoryCard>
      
      <div class="applicant-card-list space-y-2">
        <ApplicantCard />
        <div class="applicant-card"></div>
        <div class="applicant-card"></div>
      </div>
    </div>

    <div class="space-y-4">
      <CategoryCard title="Shortlisted" :completedTasks="5" totalTasks="10" bgColor="bg-secondary-accent" 
        levelColor="bg-secondary" statColor="text-secondary"
      >
        <template #icon>
          <IconCheck />
        </template>
      </CategoryCard>

      <div class="applicant-card-list">
        hello here comes list
      </div>
    </div>

    <div class="space-y-4">
      <CategoryCard title="Interviewed" :completedTasks="7" totalTasks="10" bgColor="bg-third-accent" 
        levelColor="bg-third" statColor="text-third"
      >
        <template #icon>
          <IconUserTick />
        </template>
      </CategoryCard>

      <div class="applicant-card-list">
        hello here comes list
      </div>
    </div>
  </div>
</template>