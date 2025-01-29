import { IEvents } from '../../base/events';
import { ICard } from '../../../types';

export interface IBasketItem {
	ctx: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	btnDelete: HTMLButtonElement;
	render(card: ICard, index: number): HTMLElement;
}

export class BasketItemView implements IBasketItem {
	ctx: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	btnDelete: HTMLButtonElement;
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		console.log(template)
		this.ctx = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.index = this.ctx.querySelector('.basket__item-index');
		this.title = this.ctx.querySelector('.card__title');
		this.price = this.ctx.querySelector('.card__price');
		this.btnDelete = this.ctx.querySelector('.basket__item-delete');
		
		if (actions?.onClick) {
			this.btnDelete.addEventListener('click', actions.onClick)
		}
	}
	
	_setPrice(price: number | null) {
		if (price === null) {
			return 'Бесценно'
		}
		return `${price} синапсов`
	}
	
  render({ title, price }: ICard, index: number): HTMLElement {
      this.index.textContent = index.toString();
			this.title.textContent = title;
			this.price.textContent = this._setPrice(price);
			return this.ctx
  }
}
