<template>
  <div class="job-feed">
	  <div class="container">
		  <div v-for="job in jobListings" :key="job.job.id" class="job-card">
			  <h3 class="job-title">{{ job.job.title }}</h3>
			  <div class="job-info">
				  <p>
					  <span class="company-name">{{ job.job.unit.name }}</span>
					  &bull;
					  <span class="position-function">{{ job.job.position_function.name_en }}</span>
					  &bull;
					  <span class="due-date">{{ job.job.due_date }}</span>
				  </p>
			  </div>
		  </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { JobListing, PositionFunction } from '@/models/models';

@Component
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  private mounted() {
    console.log('From JobFeed.vue');
	console.log(this.jobListings);
	console.log(this.positionFunctions);
  }
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	max-width: 1080px;
	margin: 25px auto;
}

.job-feed .job-card {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	-webkit-box-shadow: 1px 8px 10px 5px rgba(0,0,0,0.29);
	box-shadow: 1px 8px 10px 5px rgba(0,0,0,0.29);
	margin: 15px;
	border-radius: 15px;
	padding: 20px 30px;
}
</style>
