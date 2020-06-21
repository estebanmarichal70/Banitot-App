/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/',
    name: 'Inicio',
    icon: 'HomeIcon'
  },
  {
    header: 'Hardware',
    icon: 'CpuIcon',
    i18n: 'Apps',
    items: [
      {
        url: '/tienda/procesadores',
        slug: 'procesadores',
        name: 'Procesadores',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/motherboards',
        slug: 'motherboards',
        name: 'Motherboards',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/rams',
        slug: 'rams',
        name: 'Memorias RAM',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/tarjetas-graficas',
        slug: 'gpu',
        name: 'Tarjetas Gráficas',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/refrigeracion',
        slug: 'refrigeracion',
        name: 'Refrigeración',
        icon: 'ChevronRightIcon'
      },
      {
        url: null,
        name: 'Almacenamiento',
        icon: 'ChevronRightIcon',
        submenu: [
          {
            url: '/tienda/hdd',
            slug: 'hdd',
            name: 'HDD'
          },
          {
            url: '/tienda/ssd',
            slug: 'ssd',
            name: 'SSD'
          },
        ]
      },
      {
        url: '/tienda/fuentes',
        slug: 'fuentes',
        name: 'Fuentes',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/gabinetes',
        slug: 'gabinetes',
        name: 'Gabinetes',
        icon: 'ChevronRightIcon'
      },
    ]
  },
  {
    header: 'Perifericos',
    icon: 'HeadphonesIcon',
    items: [
      {
        url: '/tienda/mouse',
        slug: 'mouse',
        name: 'Mouse',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/mousepad',
        slug: 'mousepad',
        name: 'Mousepad',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/teclados',
        slug: 'teclados',
        name: 'Teclados',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/auriculares',
        slug: 'auriculares',
        name: 'Auriculares',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/microfonos',
        slug: 'microfonos',
        name: 'Micrófonos',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/joysticks-y-gamepads',
        slug: 'joysticks',
        name: 'Joysticks y Gamepads',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/camaras-web',
        slug: 'camaras',
        name: 'Camaras Web',
        icon: 'ChevronRightIcon'
      },
      {
        url: '/tienda/parlantes',
        slug: 'parlantes',
        name: 'Parlantes',
        icon: 'ChevronRightIcon'
      },
    ]
  },
  {
    header: 'Oficina & Hogar',
    icon: 'PrinterIcon',
    items: [
          {
            url: '/tienda/portatiles',
            slug: 'portatiles',
            name: 'Portátiles',
            icon: 'ChevronRightIcon',
          },
          {
            url: '/tienda/monitores',
            slug: 'monitores',
            name: 'Monitores y TV',
            icon: 'ChevronRightIcon',
          },
          {
            url: '/tienda/sillas',
            slug: 'sillas',
            name: 'Sillas',
            icon: 'ChevronRightIcon',
          },
          {
            url: '/tienda/escritorios',
            name: 'Escritorios',
            slug: 'escritorios',
            icon: 'ChevronRightIcon',
          }
        ]
  },
  {
    header: 'Nosotros',
    icon: 'UsersIcon',
    i18n: 'Pages',
    items: [
      {
        url: '/pages/profile',
        slug: 'page-profile',
        name: 'Profile',
        icon: 'UserIcon',
        i18n: 'Profile'
      },
      {
        url: '/pages/user-settings',
        slug: 'page-user-settings',
        name: 'User Settings',
        icon: 'SettingsIcon',
        i18n: 'UserSettings'
      },
      {
        url: '/pages/faq',
        slug: 'page-faq',
        name: 'FAQ',
        icon: 'HelpCircleIcon',
        i18n: 'FAQ'
      },
      {
        url: '/pages/knowledge-base',
        slug: 'page-knowledge-base',
        name: 'Knowledge Base',
        icon: 'InfoIcon',
        i18n: 'KnowledgeBase'
      },
      {
        url: '/pages/search',
        slug: 'page-search',
        name: 'Search',
        icon: 'SearchIcon',
        i18n: 'Search'
      },
      {
        url: '/pages/invoice',
        slug: 'page-invoice',
        name: 'Invoice',
        icon: 'InfoIcon',
        i18n: 'Invoice'
      },
      {
        url: null,
        name: 'Authentication',
        icon: 'PieChartIcon',
        i18n: 'Authentication',
        submenu: [
          {
            url: '/pages/login',
            name: 'Login',
            slug: 'pages-login',
            i18n: 'Login',
            target: '_blank'
          },
          {
            url: '/pages/register',
            name: 'Register',
            slug: 'pages-register',
            i18n: 'Register',
            target: '_blank'
          },
          {
            url: '/pages/forgot-password',
            name: 'Forgot Password',
            slug: 'pages-forgot-password',
            i18n: 'ForgotPassword',
            target: '_blank'
          },
          {
            url: '/pages/reset-password',
            name: 'Reset Password',
            slug: 'pages-reset-password',
            i18n: 'ResetPassword',
            target: '_blank'
          },
          {
            url: '/pages/lock-screen',
            name: 'Lock Screen',
            slug: 'pages-lock-screen',
            i18n: 'LockScreen',
            target: '_blank'
          }
        ]
      },
      {
        url: null,
        name: 'Miscellaneous',
        icon: 'CoffeeIcon',
        i18n: 'Miscellaneous',
        submenu: [
          {
            url: '/pages/not-authorized',
            name: 'Not Authorized',
            slug: 'page-not-authorized',
            icon: 'XCircleIcon',
            i18n: 'NotAuthorized',
            target: '_blank'
          },
          {
            url: '/pages/maintenance',
            name: 'Maintenance',
            slug: 'page-maintenance',
            icon: 'AnchorIcon',
            i18n: 'Maintenance',
            target: '_blank'
          },
          {
            url: '/pages/comingsoon',
            slug: 'page-coming-soon',
            name: 'Coming Soon',
            icon: 'ClockIcon',
            i18n: 'ComingSoon',
            target: '_blank'
          },
          {
            url: '/pages/error-404',
            name: '404',
            slug: 'page-error-404',
            i18n: '404',
            target: '_blank'
          },
          {
            url: '/pages/error-500',
            name: '500',
            slug: 'page-error-500',
            i18n: '500',
            target: '_blank'
          }
        ]
      }
    ]
  },
  {
    header: 'Contacto',
    icon: 'PhoneIcon',
    i18n: 'ChartsAndMaps',
    items: [
      {
        url: null,
        name: 'Charts',
        icon: 'PieChartIcon',
        tag: '3',
        tagColor: 'success',
        i18n: 'Charts',
        submenu: [
          {
            url: '/charts-and-maps/charts/apex-charts',
            name: 'Apex Charts',
            slug: 'extra-component-charts-apex-charts',
            i18n: 'ApexCharts'
          },
          {
            url: '/charts-and-maps/charts/chartjs',
            name: 'chartjs',
            slug: 'extra-component-charts-chartjs',
            i18n: 'chartjs'
          },
          {
            url: '/charts-and-maps/charts/echarts',
            name: 'echarts',
            slug: 'extra-component-charts-echarts',
            i18n: 'echarts'
          }
        ]
      },
      {
        url: '/charts-and-maps/maps/google-map',
        name: 'Google Map',
        icon: 'MapIcon',
        slug: 'extra-component-maps-google-map',
        i18n: 'GoogleMap'
      }
    ]
  },
  {
    header: 'Others',
    icon: 'MoreHorizontalIcon',
    i18n: 'Others',
    items: [
      {
        url: null,
        name: 'Menu Levels',
        icon: 'MenuIcon',
        i18n: 'MenuLevels',
        submenu: [
          {
            url: null,
            name: 'Menu Level 2.1',
            i18n: 'MenuLevel2p1'
          },
          {
            url: null,
            name: 'Menu Level 2.2',
            i18n: 'MenuLevel2p2',
            submenu: [
              {
                url: null,
                name: 'Menu Level 3.1',
                i18n: 'MenuLevel3p1'
              },
              {
                url: null,
                name: 'Menu Level 3.2',
                i18n: 'MenuLevel3p2'
              }
            ]
          }
        ]
      },
      {
        url: null,
        name: 'Disabled Menu',
        icon: 'EyeOffIcon',
        i18n: 'DisabledMenu',
        isDisabled: true
      },
      {
        url: null,
        name: 'Support',
        icon: 'SmileIcon',
        i18n: 'Support',
        submenu: [
          {
            url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/',
            name: 'Documentation',
            icon: 'BookOpenIcon',
            slug: 'external',
            i18n: 'Documentation',
            target: '_blank'
          },
          {
            url: 'https://pixinvent.ticksy.com/',
            name: 'Raise Support',
            icon: 'LifeBuoyIcon',
            slug: 'external',
            i18n: 'RaiseSupport',
            target: '_blank'
          }
        ]
      }
    ]
  }
]

