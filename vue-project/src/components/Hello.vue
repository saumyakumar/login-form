<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4 d-flex justify-space-between align-center" cols="12">
        <h3 class="display-2 font-weight-bold mb-3">Welcome {{ userEmail }}</h3>
        <v-btn color="secondary" dark @click="logout"
          >Logout
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-data-table
          :headers="headers"
          :items="tableContents"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50, -1],
          }"
          class="elevation-1"
          :server-items-length="totalNumberOfItems"
          :options.sync="pagination"
          @update:options="paginate"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    dataEndpoint: `https://jsonplaceholder.typicode.com/posts`,
    totalNumberOfItems: 0,
    pagination: {
      descending: false,
      page: 1,
    },
    userEmail: null,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      {
        text: "Title",
        sortable: true,
        value: "title",
      },
      { text: "Body", sortable: true, value: "body" },
    ],
    tableContents: [],
  }),
  created() {
    this.userEmail = JSON.parse(localStorage.getItem("email"));
  },
  methods: {
    logout() {
      localStorage.removeItem("email");
      this.$router.push({ path: "/" });
    },
    paginate(page) {
      if (page.sortBy.length > 0) {
        this.loadData(page, page.itemsPerPage);
      } else {
        this.loadData(page, page.itemsPerPage);
      }
    },
    loadData(page, itemsPerPage) {
      axios.get(this.dataEndpoint).then(({ data }) => {
        if (page.page === 1) {
          this.tableContents = this.customSort(
            data,
            page.sortBy,
            page.sortDesc
          ).splice(0, itemsPerPage);
        } else {
          const begin = page.page - 1;
          this.tableContents = this.customSort(
            data,
            page.sortBy,
            page.sortDesc
          ).splice(begin * itemsPerPage, itemsPerPage);
        }
        this.totalNumberOfItems = data.length;
      });
    },
    customSort(items, sortBy, isDescending) {
      items.sort((a, b) => {
        if (sortBy?.[0]) {
          if (isDescending?.[0] === true) {
            if (a[sortBy?.[0]] > b[sortBy?.[0]]) {
              return -1;
            }
            if (a[sortBy?.[0]] < b[sortBy?.[0]]) {
              return 1;
            }
            return 0;
          } else if (isDescending?.[0] === false) {
            if (a[sortBy?.[0]] < b[sortBy?.[0]]) {
              return -1;
            }
            if (a[sortBy?.[0]] > b[sortBy?.[0]]) {
              return 1;
            }
            return 0;
          }
        }
      });
      return items;
    },
  },
};
</script>
