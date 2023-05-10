<template>
  <div v-if="loading" class="h-full grid place-content-center">
    <LoaderXl />
  </div>
  <div v-show="!loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
    <div class="applicant-card-list"
      @drop="onDrop('new', $event)" 
      @dragover.prevent="onDragOver('new', $event)"
    >
      <h2 class="text-lg font-bold mb-4">New Applicants</h2>
      <ApplicantCard
        v-for="applicant in getApplicantsByCategory('new')" 
        :key="applicant.id" 
        :draggable="true" @dragstart="onDragStart(applicant, $event)" 
        :data-category="'new'"
        :name="applicant.name"
        :position="applicant.position"
        :skills="applicant.skills"
      />
      <div class="placeholder" ref="newPlaceholder" />
    </div>
    <div class="applicant-card-list"
      @drop="onDrop('shortlisted', $event)" 
      @dragover.prevent="onDragOver('shortlisted', $event)"
    >
      <h2 class="text-lg font-bold mb-4">Shortlisted Applicants</h2>
      <ApplicantCard
        v-for="applicant in getApplicantsByCategory('shortlisted')" 
        :key="applicant.id" 
        :draggable="true" @dragstart="onDragStart(applicant, $event)" 
        :data-category="'new'"
        :name="applicant.name"
        :position="applicant.position"
        :skills="applicant.skills"
      />
      <div class="placeholder" ref="shortlistedPlaceholder" />
    </div>
    <div class="applicant-card-list"
      @drop="onDrop('interviewed', $event)" 
      @dragover.prevent="onDragOver('interviewed', $event)"
    >
      <h2 class="text-lg font-bold mb-4">Interviewed Applicants</h2>
      <ApplicantCard
        v-for="applicant in getApplicantsByCategory('interviewed')" 
        :key="applicant.id" 
        :draggable="true" @dragstart="onDragStart(applicant, $event)" 
        :data-category="'new'"
        :name="applicant.name"
        :position="applicant.position"
        :skills="applicant.skills"
      />
      <div class="placeholder" ref="interviewedPlaceholder" />
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

let draggedApplicant = null;

onMounted(async () => {
  await applicantsStore.fetchAndSetApplicants();
});

function getApplicantsByCategory(category) {
  return applicants.value.filter(a => a.category === category)
}

function onDragStart(applicant, event) {
  event.dataTransfer.setData('text/plain', applicant.id);
  draggedApplicant = applicant;
  event.dataTransfer.setDragImage(0, 0, 0);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(category, event) {
  event.preventDefault();
  const applicantId = event.dataTransfer.getData('text/plain');
  const applicant = applicants.value.find(a => a.id.toString() === applicantId);
  if (applicant.category !== category) {
    applicant.category = category;
    applicantsStore.updateApplicantCategory(applicant.id, category);
  }
  const targetElement = event.target.closest('.applicant-card-list');
  if (targetElement) {
    const targetCategory = targetElement.dataset.category;
    if (draggedApplicant && targetCategory !== draggedApplicant.category) {
      const newApplicant = {
        id: Date.now(),
        name: '',
        position: '',
        skills: '',
        category: targetCategory
      };
      applicantsStore.addApplicant(newApplicant);
      draggedApplicant = newApplicant;
    }
    event.target.appendChild(document.getElementById(applicantId));
  }
}

defineExpose({ getApplicantsByCategory });
</script>
