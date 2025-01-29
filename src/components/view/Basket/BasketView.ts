import { IBasketItem } from '../../../types';
import { IEvents } from '../../base/events';
import { createElement } from '../../../utils/utils';
import { settings } from '../../../utils/constants';

interface IBasket {
	ctx: HTMLElement;
	title: HTMLElement;
	list: HTMLElement;
	button: HTMLButtonElement;
	totalPrice: HTMLElement;
	headerBtn: HTMLButtonElement;
	headerCount: HTMLElement;
	setCardsCount(count: number): void;
	setTotalCardsPrice(sum: number): void
	render(): HTMLElement;
}

export class BasketView implements IBasket {
	ctx: HTMLElement;
	title: HTMLElement;
	headerBtn: HTMLButtonElement;
	headerCount: HTMLElement;
	button: HTMLButtonElement;
	list: HTMLElement;
	totalPrice: HTMLElement;
	
	_items: HTMLElement[] = []
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents
		) {
		this.ctx = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
		this.title = this.ctx.querySelector('.modal__title');
		this.headerBtn = document.querySelector('.header__basket');
		this.headerCount = document.querySelector('.header__basket-counter');
		this.button = this.ctx.querySelector('.basket__button');
		this.list = this.ctx.querySelector('.basket__list');
		this.totalPrice = this.ctx.querySelector('.basket__price');
		
		this.button.addEventListener('click', () => {
			this.events.emit(settings.orderOpened)
		})
		
		this.headerBtn.addEventListener('click', () => {
			this.events.emit(settings.basketOpened)
		})
	}
	
	setItems(items: HTMLElement[]): void {
		if (items.length) {
			this.list.replaceChildren(...items)
			this.button.removeAttribute('disabled');
		} else {
			this.button.setAttribute('disabled', 'true');
			const emptyBasketTitleElement = createElement('p', {textContent: 'Корзина пуста'})
			this.list.replaceChildren(...items, emptyBasketTitleElement)
		}
	}
	
	setCardsCount(count: number): void {
		this.headerCount.textContent = `${count}`
	}
	
	setTotalCardsPrice(sum: number): void {
		this.totalPrice.textContent = `${sum} синапсов`
	}
	
	render(): HTMLElement {
		this.title.textContent = 'Корзина';
		return this.ctx;
	}
}
