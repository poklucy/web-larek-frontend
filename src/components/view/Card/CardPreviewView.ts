import { ICard } from '../../../types';
import { CardView } from './CardView';
import { IEvents } from '../../base/events';
import { settings } from '../../../utils/constants';

export interface ICardPreview {
	btn: HTMLElement;
	text: HTMLElement;
	render(card: ICard): HTMLElement;
}

export class CardPreviewView extends CardView implements ICardPreview  {
	btn: HTMLElement;
	text: HTMLElement;
	
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		super(template, actions);
		this.text = this.ctx.querySelector('.card__text');
		this.btn = this.ctx.querySelector('.card__button');
		this.btn.addEventListener('click', () => {
			this.events.emit(settings.cardAddToBasket);
		})
	}
	
	_setBtnText(card: ICard) {
		const isAvailable = Boolean(card.price);
		
		if (isAvailable) {
			return 'Купить'
		}
		
		this.btn.setAttribute('disabled', 'true')
		return 'Не продаётся'
	}
	
	render(card: ICard): HTMLElement {
		this.category.textContent = card.category
		this._setCategory(card.category);
		this.title.textContent = card.title;
		this.image.src = card.image;
		this.image.alt = this.title.textContent;
		this.price.textContent = this._setPrice(card.price);
		this.text.textContent = card.description;
		this.btn.textContent = this._setBtnText(card)
		
		return this.ctx
	}
}
