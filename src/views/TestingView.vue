<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-gray rounded-xl p-4" ref="newColumn" @drop="onDrop('new', $event)" @dragover.prevent>
      <h2 class="text-lg font-bold mb-4">New Applicants</h2>
      <ul class="space-y-2" ref="newList">
        <li v-for="applicant in getApplicantsByCategory('new')" :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" :data-category="'new'">
          <h3 class="font-medium">{{ applicant.name }}</h3>
          <p class="text-sm">{{ applicant.position }}</p>
        </li>
      </ul>
    </div>
    <div class="bg-gray rounded-xl p-4" ref="shortlistedColumn" @drop="onDrop('shortlisted', $event)" @dragover.prevent>
      <h2 class="text-lg font-bold mb-4">Shortlisted Applicants</h2>
      <ul class="space-y-2" ref="shortlistedList">
        <li v-for="applicant in getApplicantsByCategory('shortlisted')" :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" :data-category="'shortlisted'">
          <h3 class="font-medium">{{ applicant.name }}</h3>
          <p class="text-sm">{{ applicant.position }}</p>
        </li>
      </ul>
    </div>
    <div class="bg-gray rounded-xl p-4" ref="interviewedColumn" @drop="onDrop('interviewed', $event)" @dragover.prevent>
      <h2 class="text-lg font-bold mb-4">Interviewed Applicants</h2>
      <ul class="space-y-2" ref="interviewedList">
        <li v-for="applicant in getApplicantsByCategory('interviewed')" :key="applicant.id" 
          :draggable="true" @dragstart="onDragStart(applicant, $event)" :data-category="'interviewed'">
          <h3 class="font-medium">{{ applicant.name }}</h3>
          <p class="text-sm">{{ applicant.position }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useApplicantsStore } from '@/stores/ApplicantsStore.js';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';


const applicantsStore = useApplicantsStore();
const { applicants } = storeToRefs(useApplicantsStore());


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
