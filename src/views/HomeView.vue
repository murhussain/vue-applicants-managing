<template>
  <TheCategories />
  <div>
    <ul>
      <li v-for="applicant in applicants" :key="applicant.id">
        <h2>{{ applicant.name }}</h2>
        <p>{{ applicant.position }}</p>
        <p>Skills: {{ applicant.skills.map(skill => skill.name).join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import TheCategories from '@/components/shared/TheCategories.vue';
import { useApplicantsStore } from '@/stores/ApplicantsStore.js';
import { computed, onMounted } from 'vue';

const store = useApplicantsStore();

const applicants = computed(() => store.applicants);

onMounted(async () => {
  await store.fetchAndSetApplicants();
});
</script>