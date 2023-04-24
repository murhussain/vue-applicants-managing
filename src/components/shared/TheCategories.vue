<template>
  <div v-if="loading" class="h-full grid place-content-center">
    <LoaderXl />
  </div>
  <div v-show="!loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      <div class="applicant-card-list"
        @drop="onDrop('new', $event)" 
        @dragover.prevent
      >
        <ApplicantCard
          v-for="applicant in getApplicantsByCategory('new')" 
          :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" 
          :data-category="'new'"
          :name="applicant.name"
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
      <div class="applicant-card-list"
        @drop="onDrop('shortlisted', $event)" 
        @dragover.prevent
      >
        <ApplicantCard
          v-for="applicant in getApplicantsByCategory('shortlisted')" 
          :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" 
          :data-category="'new'"
          :name="applicant.name"
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
      <div class="applicant-card-list"
        @drop="onDrop('interviewed', $event)" 
        @dragover.prevent
      >
        <ApplicantCard
          v-for="applicant in getApplicantsByCategory('interviewed')" 
          :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" 
          :data-category="'new'"
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
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import LoaderXl from '../spiners/LoaderXl.vue';

const applicantsStore = useApplicantsStore();
const { applicants, loading } = storeToRefs(useApplicantsStore());
const tApplicants = computed(() => applicantsStore.totalApplicants);
const tNew = computed(() => applicantsStore.totalNewApplicants);
const tShortlisted = computed(() => applicantsStore.totalShortlistedApplicants);
const tInterviewed = computed(() => applicantsStore.totalInterviewedApplicants);

onMounted(async () => {
  await applicantsStore.fetchAndSetApplicants();
});

function getApplicantsByCategory(category) {
  return applicants.value.filter(a => a.category === category)
}

function onDragStart(applicant, event) {
  event.dataTransfer.setData('text/plain', applicant.id)
}

function onDrop(category, event) {
  const applicantId = event.dataTransfer.getData('text/plain')
  const applicant = applicants.value.find(a => a.id.toString() === applicantId)

  if (applicant.category !== category) {
    applicant.category = category
    applicantsStore.updateApplicantCategory(applicant.id, category)
  }

  event.target.appendChild(document.getElementById(applicantId))
}
</script>