<template>
  <div class="grid grid-cols-3 gap-6">

    <div class="space-y-4">
      <!-- The category header of New Applicants -->
      <CategoryCard 
        title="New" 
        :applicantsCategory="tNew" 
        :totalApplicants="tApplicants" 
        bgColor="bg-[#c8cff7] dark:bg-[#363C5D]" 
        levelColor="bg-primary" 
        statColor="text-primary"
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
          :email="applicant.email"
          :position="applicant.position"
          :skills="applicant.skills"
        />
      </div>
    </div>

    <div class="space-y-4">
      <!-- The category header of Shortlisted Applicants -->
      <CategoryCard 
        title="Shortlisted" 
        :applicantsCategory="tShortlisted" 
        :totalApplicants="tApplicants" 
        bgColor="bg-secondary-accent dark:bg-[#603920]" 
        levelColor="bg-secondary" 
        statColor="text-secondary"
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
          :email="applicant.email"
          :position="applicant.position"
          :skills="applicant.skills"
        />
      </div>
    </div>

    <div class="space-y-4">
      <!-- The category header of Interviewed Applicants -->
      <CategoryCard 
        title="Interviewed" 
        :applicantsCategory="tInterviewed" 
        :totalApplicants="tApplicants" 
        bgColor="bg-third-accent dark:bg-[#295255]" 
        levelColor="bg-third" 
        statColor="text-third"
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
          :email="applicant.email"
          :position="applicant.position"
          :skills="applicant.skills"
        />
      </div>
      <p>Hussein: {{selectedJobCode}}</p>
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
const tApplicants = computed(() => applicantsStore.totalApplicants);
const tNew = computed(() => applicantsStore.totalNewApplicants);
const tShortlisted = computed(() => applicantsStore.totalShortlistedApplicants);
const tInterviewed = computed(() => applicantsStore.totalInterviewedApplicants);


onMounted(async () => {
  await applicantsStore.fetchAndSetApplicantsCategory(this.selectedJobCode);
});

</script>