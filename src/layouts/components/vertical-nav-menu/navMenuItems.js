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
        url: null,
        name: 'Refrigeración',
        icon: 'ChevronRightIcon',
        submenu: [
          {
            url: '/tienda/refrigeracion-cpu',
            slug: 'refcpi',
            name: 'CPU'
          },
          {
            url: '/tienda/refrigeracion-gabinete',
            slug: 'refgabinete',
            name: 'Gabinete'
          },
        ]
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
    url: '/contacto',
    name: 'Contacto',
    icon: 'PhoneIcon'
  },
]

