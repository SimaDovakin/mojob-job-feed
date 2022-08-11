import { AxiosStatic } from 'axios';
import { IPage, PositionFunction, JobListing } from '@/models/models';

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data);

  /**
   * TIP: Create a function called getJobListings
   * Use our public api documentation to find out what endpoint to use
   * https://test-api.mojob.io/public/docs/
   */

  public getJobListings = (
	  usePagination: boolean = true,
	  page: number = 1,
	  pageSize: number = 5,
	  positionFunctions: number[] = []
  ): Promise<IPage<JobListing>> =>

	this.axios
      .get(
		  `${this.baseUrl}job/listings/?position_functions=${[...new Set(positionFunctions)].join()}&include_open=False&page=${page}&page_size=${pageSize}&use_mojob_feed_filter=True&use_pagination=${usePagination ? 'True' : 'False'}`
	  )
	  .then((response) => response.data);
}
