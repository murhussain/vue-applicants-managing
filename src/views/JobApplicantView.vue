<template>
  <div v-if="loading" class="h-full grid place-content-center">
    <LoaderXl />
  </div>
  <div v-show="!loading" class="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
          :position="applicant.position"
          :skills="applicant.skills"
        />
        <p class="text-center text-black dark:text-d-white-accent" 
          v-show="!hasNewApplicants"
        >
          No new applicants for this job
        </p>
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
          :position="applicant.position"
          :skills="applicant.skills"
        />
        <p class="text-center text-black dark:text-d-white-accent" 
          v-show="!hasShortlistedApplicants"
        >
          No shortlisted applicants for this job
        </p>
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
          :position="applicant.position"
          :skills="applicant.skills"
        />
        <p class="text-center text-black dark:text-d-white-accent" 
          v-show="!hasInterviewedApplicants"
        >
          No interviewed applicants for this job
        </p>
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
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import LoaderXl from '@/components/spiners/LoaderXl.vue';


const applicantsStore = useApplicantsStore();
const { loading } = storeToRefs(useApplicantsStore());

const tApplicants = computed(() => applicantsStore.totalApplicants);
const newApplicants = computed(() => applicantsStore.newApplicants);
const tNew = computed(() => applicantsStore.totalNewApplicants);
const shortlistedApplicants = computed(() => applicantsStore.shortlistedApplicants);
const tShortlisted = computed(() => applicantsStore.totalShortlistedApplicants);
const interviewedApplicants = computed(() => applicantsStore.interviewedApplicants);
const tInterviewed = computed(() => applicantsStore.totalInterviewedApplicants);
const route = useRoute();


// Checking the presence of applicants in each category
const hasNewApplicants = computed(() => { return newApplicants.value.length > 0; });
const hasInterviewedApplicants = computed(() => { return interviewedApplicants.value.length > 0; });
const hasShortlistedApplicants = computed(() => { return shortlistedApplicants.value.length > 0; });

// Getting the selected job code and save it in variable
const selectedJobCode = computed(() => {return route.params.code;});

onMounted(async () => {
  // Fetch the applicants based on the selected job code
  await applicantsStore.fetchAndSetApplicantsCategory(selectedJobCode.value);
});

// Watch for changes in the selected job code and fetch the applicants again
watch(selectedJobCode, async (newCode) => {
  await applicantsStore.fetchAndSetApplicantsCategory(newCode);
});
</script>