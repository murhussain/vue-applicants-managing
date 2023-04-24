<template>
   <div v-if="loading" class="h-full grid place-content-center">
    <LoaderXl />
  </div>
  <div v-show="!loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
    <div class="applicant-card-list"
      @drop="onDrop('new', $event)" 
      @dragover.prevent
    >
      <h2 class="text-lg font-bold mb-4">New Applicants</h2>
      <!-- <ul class="space-y-2">
        <li 
          v-for="applicant in getApplicantsByCategory('new')" 
          :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" 
          :data-category="'new'"
        >
          <h3 class="font-medium">{{ applicant.name }}</h3>
          <p class="text-sm">{{ applicant.position }}</p>
        </li>
      </ul> -->
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
    <div class="applicant-card-list"
      @drop="onDrop('shortlisted', $event)" 
      @dragover.prevent
    >
      <h2 class="text-lg font-bold mb-4">Shortlisted Applicants</h2>
      <!-- <ul class="space-y-2">
        <li 
          v-for="applicant in getApplicantsByCategory('shortlisted')" 
          :key="applicant.id" 
          :draggable="true" 
          @dragstart="onDragStart(applicant, $event)" 
          :data-category="'shortlisted'"
        >
          <h3 class="font-medium">{{ applicant.name }}</h3>
          <p class="text-sm">{{ applicant.position }}</p>
        </li>
      </ul> -->
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
    <div class="applicant-card-list"
      @drop="onDrop('interviewed', $event)" 
      @dragover.prevent
    >
      <h2 class="text-lg font-bold mb-4">Interviewed Applicants</h2>
      <!-- <ul class="space-y-2">
        <li 
          v-for="applicant in getApplicantsByCategory('interviewed')" 
          :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" 
          :data-category="'interviewed'"
        >
          <h3 class="font-medium">{{ applicant.name }}</h3>
          <p class="text-sm">{{ applicant.position }}</p>
        </li>
      </ul> -->
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
</template>

<script setup>
import { useApplicantsStore } from '@/stores/ApplicantsStore.js';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import LoaderXl from '@/components/spiners/LoaderXl.vue';
import ApplicantCard from '@/components/shared/ApplicantCard.vue'

const applicantsStore = useApplicantsStore();
const { applicants, loading } = storeToRefs(useApplicantsStore());


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
