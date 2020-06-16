
<template>
    <div>
        <ais-instant-search
            :search-client="searchClient"
            index-name="instant_search" id="algolia-instant-search-demo">

            <!-- AIS CONFIG -->
            <ais-configure :hits-per-page.camel="9" />

            <div class="algolia-header mb-4">
                <div class="flex md:items-end items-center justify-between flex-wrap">
                    <!-- TOGGLE SIDEBAR BUTTON -->
                    <feather-icon
                        class="inline-flex lg:hidden cursor-pointer mr-4"
                        icon="MenuIcon"
                        @click.stop="toggleFilterSidebar" />

                    <p class="lg:inline-flex hidden font-semibold algolia-filters-label">Filtros</p>

                    <div class="flex justify-between items-end flex-grow">
                        <!-- Stats -->
                        <ais-stats>
                            <p  class="font-semibold md:block hidden">
                                {{totalProducts}} resultados encontrados 
                            </p>
                        </ais-stats>

                        <div class="flex flex-wrap">

                            <!-- SORTING -->
                                <vs-select
                                    :value="order"
                                    @input="(val) => changeOrder(val)"
                                    class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48">
                                    <vs-select-item v-for="item in orders" :key="item.value" :value="item.value" :text="item.label" />
                                </vs-select>

                            <!-- ITEM VIEW - GRID/LIST -->
                            <div>
                                <feather-icon
                                    icon="GridIcon"
                                    @click="currentItemView='item-grid-view'"
                                    class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                                    :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}" />
                                <feather-icon
                                    icon="ListIcon"
                                    @click="currentItemView='item-list-view'"
                                    class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                                    :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="algolia-content-container" class="relative clearfix">
                <vs-sidebar
                    class="items-no-padding vs-sidebar-rounded background-absolute"
                    parent="#algolia-content-container"
                    :click-not-close="clickNotClose"
                    :hidden-background="clickNotClose"
                    v-model="isFilterSidebarActive">

                    <div class="p-6 filter-container">

                        <!-- MULTI RANGE -->
                        <h6 class="font-bold mb-3">Rango de precios</h6>
                        <ais-numeric-menu attribute="price" :items="numericItems">
                            <ul slot-scope="{ items, refine, createURL }">
                                <li
                                    v-for="item in items"
                                    :key="item.value"
                                    class="flex items-center cursor-pointer py-1"
                                    @click="refine(item.value)">

                                    <feather-icon icon="CircleIcon" :svgClasses="[{ 'text-primary fill-current': item.isRefined}, 'h-5 w-5']" />
                                    <span class="ml-2" :class="{'text-primary': item.isRefined}">{{ item.label }}</span>
                                </li>
                            </ul>
                        </ais-numeric-menu>

                        <ais-range-input attribute="price">
                            <div slot-scope="{ currentRefinement, range, refine }">
                                <vs-slider
                                    class="algolia-price-slider"
                                    text-fixed="$"
                                    :min="range.min"
                                    :max="range.max"
                                    :value="toValue(currentRefinement, range)"
                                    @input="refine({min: $event[0], max: $event[1]})" />
                            </div>
                        </ais-range-input>

                        <vs-divider />

                        <!-- Brands -->
                        <div class="flex justify-between">
                          <h6 class="font-bold mb-4">Marcas</h6>
                          <feather-icon class="" v-if="marca != '' " icon="XIcon" svgClasses="h-6 w-6" @click="resetMarca()"/>
                        </div>
                        <ais-refinement-list attribute="brand">
                            <div slot-scope="{
                              items,
                              isFromSearch,
                            }">
                                <ul>
                                    <li v-if="isFromSearch && !products.length">No hay resultados.</li>
                                    <li v-for="item in marcas" :key="item.id" class="mb-2 flex items-center justify-between">
                                        <vs-radio v-model="marca" :vs-value="item.marca" class="ml-0">{{ item.marca }}</vs-radio>
                                    </li>
                                    
                                </ul>
                            </div>
                        </ais-refinement-list>
                        <vs-divider />

                        <!-- Rating -->
                        <h6 class="font-bold mb-3">Rating</h6>
                        <ais-rating-menu attribute="rating">
                            <ul slot-scope="{ items, refine, createURL }">
                                <li v-for="item in items" :key="item.value" class="mb-2">
                                    <div @click.prevent="refine(item.value)" class="flex justify-between items-center">
                                        <div class="flex items-center flex-wrap">
                                            <feather-icon icon="StarIcon" :svgClasses="[{'text-warning': full, 'text-grey': !full, 'ml-1' : index}, 'cursor-pointer stroke-current h-6 w-6']" v-for="(full, index) in item.stars" :key="index" />
                                            <span class="ml-2"></span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </ais-rating-menu>

                        <vs-divider />

                        <ais-clear-refinements class="flex justify-center">
                            <vs-button class="w-full" slot-scope="{ canRefine, refine, createURL }" @click.prevent="refine" :disabled="!canRefine">Remove Filters</vs-button>
                        </ais-clear-refinements>
                    </div>
                </vs-sidebar>

                <!-- RIGHT COL -->
                <div :class="{'sidebar-spacer-with-margin': clickNotClose}">

                    <!-- SEARCH BAR -->
                        <div>
                            <div class="relative mb-8">

                                <!-- SEARCH INPUT -->
                                <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg" placeholder="Buscar" v-model="searchQuery" @input="search()" size="large" />

                                <!-- SEARCH ICON -->
                                <div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6" v-show="searchQuery.length == 0">
                                    <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
                                </div>

                                <!-- CLEAR INPUT ICON -->
                                <div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="searchQuery.length > 0">
                                    <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="resetSearch()" />
                                </div>
                            </div>
                        </div>

                    <!-- SEARCH RESULT -->
                    <ais-hits>
                        <div>

                            <!-- GRID VIEW -->
                            <template v-if="currentItemView == 'item-grid-view'">
                                <div class="items-grid-view vx-row match-height">
                                    <div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="item in products" :key="item.id">

                                        <item-grid-view :item="item">

                                            <!-- SLOT: ACTION BUTTONS -->
                                            <template slot="action-buttons">
                                                <div class="flex flex-wrap">

                                                    <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                                                    <div
                                                        class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                                                        @click="toggleItemInWishList(item)">
                                                        <feather-icon icon="HeartIcon" :svgClasses="[{'text-danger fill-current' : isInWishList(item.objectID)}, 'h-4 w-4']" />

                                                        <span class="text-sm font-semibold ml-2">WISHLIST</span>
                                                    </div>

                                                    <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                                                    <div
                                                        class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                                                        @click="cartButtonClicked(item)">
                                                        <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                                        <span class="text-sm font-semibold ml-2" v-if="isInCart(item.objectID)">Ver en el carrito</span>
                                                        <span class="text-sm font-semibold ml-2" v-else>Agregar al carrito</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </item-grid-view>

                                    </div>
                                </div>
                            </template>

                            <!-- LIST VIEW -->
                            <template v-else>
                                <div class="items-list-view mb-base" v-for="item in products" :key="item.id">

                                    <item-list-view :item="item">

                                        <!-- SLOT: ACTION BUTTONS -->
                                        <template slot="action-buttons">
                                            <div
                                                class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                                                @click="toggleItemInWishList(item)">
                                                <feather-icon icon="HeartIcon" :svgClasses="[{'text-danger fill-current' : isInWishList(item.objectID)}, 'h-4 w-4']" />
                                                <span class="text-sm font-semibold ml-2">WISHLIST</span>
                                            </div>
                                            <div
                                                class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                                                @click="cartButtonClicked(item)">
                                                <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                                <span class="text-sm font-semibold ml-2" v-if="isInCart(item.objectID)">Ver en el carrito</span>
                                                <span class="text-sm font-semibold ml-2" v-else>Agregar al carrito</span>
                                            </div>
                                        </template>
                                    </item-list-view>

                                </div>
                            </template>
                        </div>
                    </ais-hits>

                    <!-- PAGINATION -->
                        <div 
                        >

                        <vs-pagination
                            :total="totalPages"
                            :max="7"
                            :value="page"
                            @input="(val) => changePage(val)" />
                        </div>
                    <div class="flex mt-4 mx-auto h-8"/>
                </div>
            </div>
        </ais-instant-search>
    </div>
</template>

<script>
import {
  AisClearRefinements,
  AisConfigure,
  AisHierarchicalMenu,
  AisHits,
  AisInstantSearch,
  AisNumericMenu,
  AisPagination,
  AisRangeInput,
  AisRatingMenu,
  AisRefinementList,
  AisSearchBox,
  AisSortBy,
  AisStats
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite';
import http from '@/http/banitotServices';
import debounce from 'lodash.debounce';

export default {
  components: {
    ItemGridView: () => import('./components/ItemGridView.vue'),
    ItemListView: () => import('./components/ItemListView.vue'),
    AisClearRefinements,
    AisConfigure,
    AisHierarchicalMenu,
    AisHits,
    AisInstantSearch,
    AisNumericMenu,
    AisPagination,
    AisRangeInput,
    AisRatingMenu,
    AisRefinementList,
    AisSearchBox,
    AisSortBy,
    AisStats
  },
  data () {
    return {
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
      // Filter Sidebar
      isFilterSidebarActive: true,
      clickNotClose: true,
      currentItemView: 'item-grid-view',
      numericItems: [
        { label: 'Todos' },
        { label: '<= $10', end: 10 },
        { label: '$10 - $100', start: 10, end: 100 },
        { label: '$100 - $500', start: 100, end: 500 },
        { label: '>= $500', start: 500 }
      ],
      algoliaCategories: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2',
        'hierarchicalCategories.lvl3'
      ],
      products:[],
      page: 1,
      totalPages: 0,
      totalProducts: 0,
      searchQuery: "",
      orders:[
        { value: 'instant_search', label: 'Ordenar por' },
        { value: 'ASC', label: 'Precio mas bajo' },
        { value: 'DESC', label: 'Precio mas alto' },
      ],
      order:'instant_search',
      marcas:'',
      marca:''
    }
  },
  beforeMount(){
    this.fetchProducts = debounce(this.fetchProducts,200)
    this.fetchProducts();
  },

  computed: {
    toValue () {
      return (value, range) => [
        value.min !== null ? value.min : range.min,
        value.max !== null ? value.max : range.max
      ]
    },

    // GRID VIEW
    isInCart () {
      return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
    },
    isInWishList () {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    },
    windowWidth () { return this.$store.state.windowWidth }
  },
  watch: {
    windowWidth () {
      this.setSidebarWidth()
    },
    page() {
      this.fetchProducts()
    },
    order(){
      this.page = 1;
      this.fetchProducts()
    },
    marca(){
      this.fetchProducts()
    }
  },
  methods: {
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isFilterSidebarActive = this.clickNotClose = false
      } else {
        this.isFilterSidebarActive = this.clickNotClose = true
      }
    },

    changePage(val){
      this.page = val;
    },

    changeOrder(val){
      this.order = val;
    },

    resetSearch(){
      this.searchQuery = ""
      this.search();
    },

    resetMarca(){
      this.marca = ""
    },

    search(){
      this.fetchProducts();
    },

    fetchProducts() {
      http.services.getAllArticulos(this.page, this.order, this.searchQuery, this.marca)
      .then(res => {
        this.products = res.data.articulos.data;
        this.totalPages = res.data.articulos.last_page;
        this.totalProducts = res.data.articulos.total;
        this.marcas = res.data.marcas
      })
      .catch(error => {
        console.log(error)
      })
    },

    // GRID VIEW - ACTIONS
    toggleFilterSidebar () {
      if (this.clickNotClose) return
      this.isFilterSidebarActive = !this.isFilterSidebarActive
    },
    toggleItemInWishList (item) {
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    additemInCart (item) {
      this.$store.dispatch('eCommerce/additemInCart', item)
    },
    cartButtonClicked (item) {
      this.isInCart(item.objectID) ? this.$router.push('/apps/eCommerce/checkout').catch(() => {}) : this.additemInCart(item)
    }
  },
  created () {
    this.setSidebarWidth()
  }
}

</script>


<style lang="scss">
#algolia-instant-search-demo {
  .algolia-header {
    .algolia-filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #algolia-content-container {

    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .algolia-search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .algolia-price-slider {
    min-width: unset;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #algolia-instant-search-demo {
    #algolia-content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: .5rem;
    }

    .vs-sidebar--items {
      border-radius: .5rem;
    }
  }
}

@media (max-width: 992px) {
  #algolia-content-container {
    .vs-sidebar {
      position: absolute !important;
      float: none !important;
    }
  }
}

</style>

