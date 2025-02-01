import { IBasketItem, ICard } from '../../types';

export interface IBasketModel {
	// карточки корзины
	cardsList: ICard[]
	// добавление товара
	setCards(items: ICard[]): void
	// получение товаров
	getCards(): ICard[]
	// количество всех товаров
	getTotalCardsCount(): number
	// цена всех товаров
	getTotalCardsPrice(): number
	// добавление карточки в корзину
	setCardToBasket(card: ICard): void
	// удаляем карточку из корзины
	deleteCardFromBasket(item: ICard): void
	// очищает корзину
	clearBasket(): void
}

export class BasketModel implements IBasketModel {
	cardsList: IBasketModel['cardsList'];
	constructor() {
		this.cardsList = [];
	}
	
	setCards(items: IBasketModel['cardsList']): void {
		this.cardsList = items;
	}
	
	getCards(): ICard[] {
		return this.cardsList;
	}
	
	getTotalCardsCount(): number {
		return this.cardsList.length;
	}
	
	getTotalCardsPrice(): number {
		return this.cardsList.reduce((acc: number, {price}: ICard) => acc + price, 0);
	}
	
	setCardToBasket(card: ICard): void {
		this.cardsList.push(card);
	}
	
	deleteCardFromBasket(deletedCard: ICard): void {
    const index = this.cardsList.findIndex((card: ICard) => card === deletedCard);
    if (index > -1) {
      this.cardsList.splice(index, 1);
    }
  }
	
	clearBasket(): void {
		this.cardsList = [];
	}
	
}