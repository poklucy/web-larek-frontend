export type CategoryType = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';

export interface ICard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: CategoryType;
  price: number | null; 
  selected: boolean;
}

export interface IPlace {
	isOrdered: boolean;
	placeInBasket: () => void;
	removeFromBasket: () => void;
}

export type ICardItem = ICard & IPlace;


export type CashType = 'cash' | 'card' | null;

export interface IOrder {
	payment: CashType;
	address: string;
	email: string;
	phone: string;
  items: string;
}

export interface IPage {
	counter: number;
	store: HTMLElement[];
	locked: boolean;
}

export interface IPageElements {
	counter: HTMLElement;
	wrapper: HTMLElement;
	basket: HTMLElement;
	store: HTMLElement;
}

export type FormState = {
	valid: boolean;
	errors: string[];
}

export type TOrderResult = {
  id: string;
  total: number;
}

export interface IBasket {
	list: HTMLElement[];
	price: number;
}

export interface IAppState {
	catalog: ICardItem[];
	basket: ICardItem[];
	order: ICardItem;
	preview: ICardItem;
	isLotInBasket(item: ICardItem): boolean;
	clearBasket(): void;
	getTotalAmount(): number;
	getBasketIds(): number;
	getBasketLength(): number;
	initOrder(): IOrder;
}
