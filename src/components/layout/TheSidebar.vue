<template>
  <div class="bg-gray text-primary w-64 flex-shrink-0 h-screen">
    <div class="p-4 flex justify-between items-center">
      <span class="text-lg font-bold">Dashboard</span>
      <button class="text-primary focus:outline-none">
        <!-- Add a hamburger menu icon here -->
      </button>
    </div>
    <ul class="p-2">
      <li class="flex items-center mb-4">
        <svg
          class="h-6 w-6 fill-current text-gray-400 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <!-- Add a dashboard icon here -->
        </svg>
        <a href="#" class="text-gray-400 hover:text-primary">Dashboard</a>
      </li>
      <li class="flex items-center mb-4">
        <svg
          class="h-6 w-6 fill-current text-gray-400 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <!-- Add a user icon here -->
        </svg>
        <a href="#" class="text-gray-400 hover:text-primary">Profile</a>
      </li>
      <li class="flex items-center mb-4">
        <svg
          class="h-6 w-6 fill-current text-gray-400 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <!-- Add a settings icon here -->
        </svg>
        <a href="#" class="text-gray-400 hover:text-primary">Settings</a>
      </li>
    </ul>
  </div>
</template>