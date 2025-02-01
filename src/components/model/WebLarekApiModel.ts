import { ICard, IOrder, OrderResult } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export interface IWebLarekApiModel {
	cdn: string
	items: ICard[]
	getItemsList(): Promise<ICard[]>
	postOrder(order: IOrder): Promise<OrderResult>
}

export class WebLarekApiModel extends Api implements IWebLarekApiModel {
	cdn: IWebLarekApiModel['cdn']
	items: IWebLarekApiModel['items']
	
	constructor(
		cdn: string,
		baseUrl: string,
		options?: RequestInit
	) {
		super(baseUrl, options)
		this.cdn = cdn
	}
	
	getItemsList(): Promise<IWebLarekApiModel['items']> {
		return this.get('/product')
			.then((data: ApiListResponse<ICard>) =>
				data.items.map((item) => ({...item, image: `${this.cdn}${item.image}`}))
			);
	}
	
	postOrder(order: IOrder): Promise<OrderResult> {
		return this.post('/order', order,).then((response: OrderResult) => response)
	}
}
