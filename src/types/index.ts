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
}

export type ICardItem = ICard & IPlace;

export interface IBasket {
	list: HTMLElement[];
	price: number;
}

export type IBasketItem = Pick<ICardItem, 'id' | 'title' | 'price'>;

export interface IBasketView {
	items: HTMLElement[];
	price: number;
	selected: string[];
}

export type CashType = 'cash' | 'card' | null;

export interface IOrder {
	payment: CashType;
	address: string;
	email: string;
	phone: string;
  items: string;
}

export type IOderResult = {
  id: string;
  total: number;
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

export interface IAppState {
	catalog: ICardItem[];
	basket: ICardItem[];
	order: IOrder;
	orderResponse: IOderResult | null;
	preview: ICardItem;
	addToBasket(item: ICardItem): void
	removeFromBasket(itemId: number): void
	clearBasket(): void;
	isLotInBasket(item: ICardItem): boolean;
	getTotalAmount(): number;
	getBasketIds(): number;
	getBasketLength(): number;
	saveOrder(orderData: IOrder): void 
	clearOrder(): void 
}

export interface ModalView{
	 content: HTMLElement;
	 open(content: HTMLElement): void ;
	 close(): void;
	 setContent(content: HTMLElement): void;
	 clearContent(): void;
}
