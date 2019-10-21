const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('pages/Index.vue'),
      },
      {
        path: '/students',
        name: 'students',
        component: () => import('pages/Students.vue'),
      },
      {
        path: '/academic-years',
        name: 'academic-years',
        component: () => import('pages/AcademicYears.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
