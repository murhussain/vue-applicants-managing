<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
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
    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Header -->
      <header class="bg-gray-200 h-16 flex items-center justify-between px-4">
        <div>
          Logo
        </div>
        <div>
          Menu
        </div>
      </header>

      <!-- Page Content -->
      <div class="bg-green-300 px-4 py-8">
        <!-- <slot></slot> -->
        <p>Here comes main content</p>
      </div>
    </main>
  </div>
</template>