<template>
  <div class="home">
    <job-feed
	  @selected-filters="setSelectedFilters"
	  @changed-page-setting="setPageSize"
      :jobListings="jobListings"
      :positionFunctions="positionFunctionFilters"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JobFeed from '@/components/JobFeed.vue';
import BaseApi from '@/api-requests/api';
import { IPage, PositionFunction, JobListing } from '@/models/models';

@Component({
  components: {
    JobFeed,
  },
})
export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  private positionFunctionFilters: PositionFunction[] = [];
  private jobListings: JobListing[] = [];
  private selectedPositionFilters: number[] = [];
  private selectedPageSize: number = 5;
  private usePagination: boolean = true;
  private page: number = 1;

  /**
   * Here you can do necessary request to our
   * public test-API in order to retrieve a list of job listings and a list of
   * position function filters.
   *
   * You can test the endpoints and see the documentation at:
   * https://test-api.mojob.io/public/docs/
   *
   * @private
   */
  private async mounted() {
    // Here is an example on how to retrieve job position function filters
	this.mojobApi = this.setUpApi();

	await this.fetchJobListings();

	try {
      const jobListingsResponsePage: IPage<JobListing> =
        await this.mojobApi.getJobListings();
		if (jobListingsResponsePage.results) {
          this.jobListings = jobListingsResponsePage.results;
          console.log(JSON.stringify(this.jobListings));
          console.log(this.jobListings);
		} else {
          console.log('Failed loading job listings');
		}
	} catch (e) {
	  console.log('Failed loading job listings');
      console.log(e);
	}
  }

  public async setSelectedFilters(selectedFilters: Array<number>) {
	console.log('From Home.vue:', selectedFilters);
	this.selectedPositionFilters = selectedFilters;

	await this.fetchJobListings();
  }

  public async setPageSize(pageSize: number) {
	console.log('From Home.vue (page size):', pageSize);

	const processedPageSize: number = pageSize > 0 ? pageSize : 5;
	const usePagination: boolean = pageSize > 0 ? true : false;

	this.selectedPageSize = processedPageSize;
	this.usePagination = usePagination;

	await this.fetchJobListings();	
  }

  public async fetchJobListings() {
	this.mojobApi = this.setUpApi();
	
	try {
      const jobListingsResponsePage: IPage<JobListing> =
		await this.mojobApi.getJobListings(this.usePagination, this.page, this.selectedPageSize, this.selectedPositionFilters);
		if (jobListingsResponsePage.results) {
          this.jobListings = jobListingsResponsePage.results;
          console.log(JSON.stringify(this.jobListings));
          console.log(this.jobListings);
		} else if (!this.usePagination && jobListingsResponsePage) {
		  this.jobListings = jobListingsResponsePage;
          console.log(JSON.stringify(this.jobListings));
          console.log(this.jobListings);
		} else {
          console.log('Failed loading job listings');
		}
	} catch (e) {
	  console.log('Failed loading job listings');
      console.log(e);
	}
  }

  public setUpApi(): BaseApi {
	if (this.mojobApi == null) {	
	  this.mojobApi = new BaseApi(
	    'https://test-api.mojob.io/public/',
		this.axios
	  );

	  return this.mojobApi;
	}

	return this.mojobApi;
  }
}
</script>
