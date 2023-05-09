<template>
  <div v-if="loading" class="h-full grid place-content-center">
    <LoaderXl />
  </div>
  <div v-show="!loading" class="h-full lg:grid lg:place-content-center overflow-y-auto scrollbar-hide">
    <div class="sm:w-[40rem] sm:mx-auto lg:w-96 px-2 sm:px-6 pb-8 pt-4 bg-body dark:bg-d-body-accent 
      rounded-lg shadow-sm flex flex-col items-center space-y-4"
    >
      <h3 class="capitalize text-xl lg:text-[24px] text-black dark:text-body font-medium">
        {{$t("pages.updateJob")}}
      </h3>
      <form v-if="job" @submit.prevent="onSubmit" class="sm:space-y-6 space-y-5" noValidate>
        <div class="grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-1 lg:space-y-none">
          <label for="name" class="block">
            <span class="label">{{$t("job.name")}}:</span>
            <input type="text" required id="name" v-model="job.name" class="input-type"/>
          </label>
          <label for="code" class="block">
            <span class="label">{{$t("job.code")}}:</span>
            <input type="text" required id="code" v-model="job.code" class="input-type"/>
          </label>
          <label for="initSalary" class="block">
            <span class="label">{{$t("job.initSalary")}}:</span>
            <input type="number" required id="initSalary" v-model="job.initSalary" class="input-type"/>
          </label>
          <label for="maxSalary" class="block">
            <span class="label">{{$t("job.maxSalary")}}:</span>
            <input type="number" id="maxSalary" v-model="job.maxSalary" class="input-type"/>
          </label>
        </div>
        <div>
          <button
            className="w-full bg-primary hover:bg-primary-dark transition-all py-2.5 px-10 rounded-md
            text-white font-bold text-lg text-center"
            type="submit"
          >
            {{ $t('pages.updateBtn') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/JobStore.js';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useFlash } from '@/composables/useFlash';
import LoaderXl from '@/components/spiners/LoaderXl.vue';

const { flash } = useFlash();
const { job, loading } = storeToRefs(useJobStore());
const { fetchAndSetJob, updateJobById } = useJobStore();
const route = useRoute();
const router = useRouter();
const jobId = computed(() => route.params.jobId);

onMounted(async () => {
  await fetchAndSetJob(jobId.value);
});

async function onSubmit() {
  // Check if any of the required fields is empty
  if (!job.value.name || !job.value.code || !job.value.initSalary) {
    flash('Invalid Data','Some of the required input fields are left blank', 'error')
    return;
  }
  await updateJobById(jobId.value, job.value);
  router.push('/');
  flash('Success', `The job has successfully updated`, 'success')
}
</script>
