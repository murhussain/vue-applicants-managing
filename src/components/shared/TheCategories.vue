<template>
  <div class="grid grid-cols-3 gap-6">

    <div class="space-y-4">
      <!-- The category header of New Applicants -->
      <CategoryCard title="New" :completedTasks="3" totalTasks="5" bgColor="bg-[#c8cff7] dark:bg-[#363C5D]" 
        levelColor="bg-primary" statColor="text-primary"
      >
        <template #icon>
          <IconStar />
        </template>
      </CategoryCard>
      
      <!-- The Applicants list -->
      <div class="applicant-card-list">
        <ApplicantCard
          v-for="(applicant, index) in newApplicants"
          :key="index"
          :name="applicant.name"
          :position="applicant.position"
          :skills="applicant.skills"
        />
      </div>
    </div>

    <div class="space-y-4">
      <!-- The category header of Shortlisted Applicants -->
      <CategoryCard title="Shortlisted" :completedTasks="5" totalTasks="10" bgColor="bg-secondary-accent 
        dark:bg-[#603920]" levelColor="bg-secondary" statColor="text-secondary"
      >
        <template #icon>
          <IconCheck />
        </template>
      </CategoryCard>

      <!-- The Applicants list -->
      <div class="applicant-card-list">
        <ApplicantCard
          v-for="(applicant, index) in shortlistedApplicants"
          :key="index"
          :name="applicant.name"
          :position="applicant.position"
          :skills="applicant.skills"
        />
      </div>
    </div>

    <div class="space-y-4">
      <!-- The category header of Interviewed Applicants -->
      <CategoryCard title="Interviewed" :completedTasks="7" totalTasks="10" bgColor="bg-third-accent 
        dark:bg-[#295255]" levelColor="bg-third" statColor="text-third"
      >
        <template #icon>
          <IconUserTick />
        </template>
      </CategoryCard>

      <!-- The Applicants list -->
      <div class="applicant-card-list">
        <ApplicantCard
          v-for="(applicant, index) in interviewedApplicants"
          :key="index"
          :name="applicant.name"
          :position="applicant.position"
          :skills="applicant.skills"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryCard from '@/components/shared/CategoryCard.vue'
import ApplicantCard from '@/components/shared/ApplicantCard.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconUserTick from '@/components/icons/IconUserTick.vue'
import { useApplicantsStore } from '@/stores/ApplicantsStore.js';
import { computed, onMounted } from 'vue';

const applicantsStore = useApplicantsStore();

const newApplicants = computed(() => applicantsStore.newApplicants);
const shortlistedApplicants = computed(() => applicantsStore.shortlistedApplicants);
const interviewedApplicants = computed(() => applicantsStore.interviewedApplicants);

onMounted(async () => {
  await applicantsStore.fetchAndSetApplicants();
});
</script>