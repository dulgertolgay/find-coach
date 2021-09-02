import { createRouter, createWebHistory } from 'vue-router';

import Detail from './pages/coaches/Detail.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import Contact from './pages/requests/Contact.vue';
import Requests from './pages/requests/Requests.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: Detail,
      props: true,
      children: [
        { path: 'contact', component: Contact }, // /coaches/c1/contact
      ],
    },
    { path: '/register', component: CoachRegister },
    { path: '/requests', component: Requests },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
