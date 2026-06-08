import { createRouter, createWebHashHistory } from 'vue-router'

// Hash history keeps the app deployable to any static host (or opened directly)
// with no server rewrite rules — true "just a link that opens the app".
export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/library', name: 'library', component: () => import('@/views/LibraryView.vue') },
    { path: '/plan', name: 'plan', component: () => import('@/views/PlanView.vue') },
    { path: '/builder', name: 'builder', component: () => import('@/views/BuilderView.vue') },
    { path: '/phrasebook', name: 'phrasebook', component: () => import('@/views/PhrasebookView.vue') },
    { path: '/vocabulary', name: 'vocabulary', component: () => import('@/views/VocabularyView.vue') },
    { path: '/verbs', name: 'verbs', component: () => import('@/views/VerbsView.vue') },
    { path: '/pronunciation', name: 'pronunciation', component: () => import('@/views/PronunciationView.vue') },
    { path: '/scenario/:id', name: 'scenario', component: () => import('@/views/ScenarioView.vue') },
    { path: '/converse/:id', name: 'converse', component: () => import('@/views/ConversationView.vue') },
    { path: '/review', name: 'review', component: () => import('@/views/ReviewView.vue') },
    { path: '/progress', name: 'progress', component: () => import('@/views/ProgressView.vue') },
    { path: '/settings', name: 'settings', component: () => import('@/views/SettingsView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
