<template>
  <div class="job-feed">
	  <div class="container">
		  <div class="actions">
			  <div class="dropdown position-filter" @click="togglePositionFilters"> 
				  <p class="selected">Filter by position</p>
				  <div class="options" v-show="showPositionFilters" @click.stop="">
				      <ul>
						  <li v-for="positionFunction in positionFunctions"
							  :key="positionFunction.id">
							  <label :for="positionFunction.id">
								  <input type="checkbox" 
								  		 :value="positionFunction.id" 
										 :id="positionFunction.id"
										 v-model="selectedPositionFilters">
								  {{ positionFunction.name_en }}
							  </label>
							  <ul class="sub-filter" v-if="positionFunction.children">
								  <li v-for="subPositionFunction in positionFunction.children"
									  :key="subPositionFunction.id">
									  <label :for="subPositionFunction.id">
										  <input type="checkbox"
										  		 :value="subPositionFunction.id" 
												 :id="subPositionFunction.id"
												 v-model=selectedPositionFilters>
										  {{ subPositionFunction.name_en }}
									  </label>
								  </li>
							  </ul>
						  </li>
					  </ul>
				  </div>
			  </div>
			  <div class="dropdown count-per-page">
				  <p class="selected">5 per page</p>
			  </div>
		  </div>
		  <div class="job-list">
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { JobListing, PositionFunction } from '@/models/models';

@Component
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  private showPositionFilters: boolean = false;
  private selectedPositionFilters: Array<number> = [];

  @Watch('selectedPositionFilters')
  onSelectedFiltersChanged(newValue: Array<number>, oldValue: Array<number>): void {
	this.$emit('selected-filters', newValue);
  }

  public togglePositionFilters(): void {
	this.showPositionFilters = !this.showPositionFilters;
  }

  public addPositionFilter(e: Event, positionFilterId: number): void {
    console.log(e.target);
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

.job-list {
	display: flex;
	flex-direction: column
}

.job-feed .job-card {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	-webkit-box-shadow: 1px 8px 10px 5px rgba(0,0,0,0.29);
	box-shadow: 1px 8px 10px 5px rgba(0,0,0,0.29);
	margin: 15px 0;
	border-radius: 15px;
	padding: 20px 30px;
}

.actions {
	display: flex;
	justify-content: space-between
}

.dropdown {
	position: relative;
}

.dropdown ul {
	list-style: none;
	margin: 0;
	padding: 10px;
	text-align: start;
}

.dropdown .options {
	position: absolute;
	width: 500px;
	height: 500px;
	overflow-y: scroll;
	background-color: white;
	-webkit-box-shadow: 1px 8px 10px 5px rgba(0,0,0,0.29);
	box-shadow: 1px 8px 10px 5px rgba(0,0,0,0.29);
}
</style>
