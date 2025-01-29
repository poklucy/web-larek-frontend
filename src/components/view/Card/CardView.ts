import { CategoryType, ICard } from '../../../types';

const INITIAL_COLORS: Record<CategoryType, string> = {
	'софт-скил': 'soft',
	'кнопка': 'button',
	'хард-скил': 'hard',
	'дополнительное': 'additional',
	'другое': 'other'
};

export interface InterfaceCard {
	render(card: ICard): HTMLElement;
}

export class CardView implements InterfaceCard {
	ctx: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;
	colors: Record<CategoryType, string> = INITIAL_COLORS;
	
	constructor(
		template: HTMLTemplateElement,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		this.ctx = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
		this.category = this.ctx.querySelector('.card__category');
		this.title = this.ctx.querySelector('.card__title');
		this.image = this.ctx.querySelector('.card__image');
		this.price = this.ctx.querySelector('.card__price');
		
		if (actions?.onClick) {
			this.ctx.addEventListener('click', actions.onClick)
		}
	}
	
	_setTextContent(el: HTMLElement, text: any): HTMLElement {
		if (!el) return
		return el.textContent = text.toString()
	}
	
	_setCategory(category: CategoryType | null): void {
		this._setTextContent(this.category, category);
		this.category.className = `card__category card__category_${this.colors[category]}`
	}
	
	_setPrice(price: number | null = null): string {
		if (price === null) {
			return 'Бесценно'
		}
		
		return `${price} синапсов`
	}
	
	
	render(card: ICard): HTMLElement {
      this.category.textContent = card.category;
			this._setCategory(card.category);
			this.title.textContent = card.title;
			this.image.src = card.image;
			this.image.alt = this.title.textContent;
			this.price.textContent = this._setPrice(card.price);
			return this.ctx
  }
}
