import './scss/styles.scss';
import { WebLarekApiModel } from './components/model/WebLarekApiModel';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { StoreModel } from './components/model/StoreModel';
import { ModalView } from './components/view/ModalView';
import { ensureElement } from './utils/utils';
import { BasketView } from './components/view/Basket/BasketView';
import { BasketModel } from './components/model/BasketModel';
import { FormModel } from './components/model/FormModel';
import { OrderView } from './components/view/Order/OrderView';
import { ContactsView } from './components/view/Form/ContactsView';
import { CardView } from './components/view/Card/CardView';
import { CashType, ICard, IOrder, OrderEntity } from './types';
import { CardPreviewView } from './components/view/Card/CardPreviewView';
import { BasketItemView } from './components/view/Basket/BasketItemView';
import { OrderSuccess } from './components/view/Order/Success';
import { Page } from './components/view/Page/Page';

const events = new EventEmitter();


// QUERY-SELECTORS
const basketTemplateElement = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplateElement = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplateElement = document.querySelector('#contacts') as HTMLTemplateElement;
const cardCatalogTemplateElement = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplateElement = document.querySelector('#card-preview') as HTMLTemplateElement;
const successTemplateElement = document.querySelector('#success') as HTMLTemplateElement;
const cardBasketTemplateElement = document.querySelector('#card-basket') as HTMLTemplateElement;
const modalContainerTemplateElement = document.querySelector('#modal-container') as HTMLTemplateElement;

// MODELS
const webLarekApiModel = new WebLarekApiModel(CDN_URL, API_URL);
const storeModel = new StoreModel(events);
const basketModel = new BasketModel()
const formModel = new FormModel(events)

// VIEW
const basketView = new BasketView(basketTemplateElement, events)
const orderView = new OrderView(orderTemplateElement, events)
const contactsView = new ContactsView(contactsTemplateElement, events)
const modalView = new ModalView(modalContainerTemplateElement, events)
const orderSuccess = new OrderSuccess(successTemplateElement, events);
const page = new Page();


webLarekApiModel.getItemsList()
  .then((items: ICard[]) => {
    storeModel.setCardList(items)
  })
  .catch(console.error);

events.on(settings.cardsGet, () => {
  storeModel.cardList.forEach(card => {
    const cardEntity = new CardView(
      cardCatalogTemplateElement,
      {
        onClick: () => events.emit(settings.cardSelect, card)
      },
    );
    const newCard = cardEntity.render(card);
    page.appendToGallery(newCard);
  });
});


events.on(settings.cardSelect, (card: ICard) => {
	storeModel.setPreviewCard(card)
})


events.on(settings.cardPreviewOpened, (card: ICard) => {
	const cardPreview = new CardPreviewView(
		cardPreviewTemplateElement,
		events
	)
	
	// const cardContent = cardPreview.render(card)
	modalView.setContent(cardPreview.render(card))
	modalView.open()
})

// Обработчик удаления товара из корзины
events.on(settings.basketRemoveCard, (card: ICard) => {
  basketModel.deleteCardFromBasket(card);
	basketView.updateBasketView(basketModel, cardBasketTemplateElement);
});

// Обработчик открытия корзины
events.on(settings.basketOpened, () => {
  const basketContent = basketView.render();
  modalView.setContent(basketContent);
  modalView.render();
	basketView.updateBasketView(basketModel, cardBasketTemplateElement);
});

// Обработчик добавления товара в корзину
events.on(settings.cardAddToBasket, () => {
  const selectedCard = storeModel.selectedCard;
  basketModel.setCardToBasket(selectedCard); // Добавляем карту в корзину

  const totalCardsCount = basketModel.getTotalCardsCount(); // Получаем общее количество карт в корзине
  basketView.setCardsCount(totalCardsCount); // Передаем это количество в setCardsCount
});

events.on(settings.orderOpened, () => {
	const orderContent = orderView.render()
	modalView.setContent(orderContent)
	modalView.render();
	
	//const basketCardsListIds = basketModel.cardsList.map(({id}) => id)
	//formModel.setItems(basketCardsListIds)
})


events.on(settings.orderOnSetPayment, (button: HTMLButtonElement) => {
  formModel.setPayment(button.name as CashType);
});

events.on(settings.contactsOpened, () => {
	const contactsContent = contactsView.render()
	modalView.setContent(contactsContent)
})


// Изменение адреса
events.on(settings.orderOnEditAddress, (orderData: OrderEntity) => {
	formModel.setAddressAndPaymentData(orderData.field, orderData.value)
})

//
events.on(settings.formErrorsAddressAndPayment, (errors: Partial<IOrder>) => {
	const {address, payment} = errors
	orderView.isValid((!address && !payment))
	orderView.errors.textContent = [address, payment]
		.filter(Boolean)
		.join('; ');
})

// Изменение контактов
events.on(settings.contactsInputChange, (orderData: OrderEntity)=> {
	formModel.setContactsData(orderData.field, orderData.value)
})

// ошибки в форме контакты
events.on(settings.formErrorsContacts, (errors: Partial<IOrder>) => {
	const {email, phone} = errors
	contactsView.isValid((!email && !phone))
	contactsView.errors.textContent = [email, phone]
		.filter(Boolean)
		.join('; ');
})

events.on(settings.orderSuccessOpened, () => {
  const basketCardsListIds = basketModel.cardsList.map(({id}) => id)
	formModel.setItems(basketCardsListIds)
  const totalItemsPrice = basketModel.getTotalCardsPrice()
	formModel.setTotal(totalItemsPrice)
  const order = formModel.getOrder();
  const totalCardsPrice = basketModel.getTotalCardsPrice();

  webLarekApiModel.postOrder(order)
    .then(() => {
      const orderSuccessContent = orderSuccess.render(totalCardsPrice);
      modalView.setContent(orderSuccessContent);

      basketModel.clearBasket();
      const totalCardsCount = basketModel.getTotalCardsCount();
      basketView.setCardsCount(totalCardsCount);

      modalView.render();
    })
    .catch(console.error);
});

events.on(settings.modalOpened, () => {
	modalView.setPageStatus(true)
})

events.on(settings.modalClosed, () => {
	modalView.setPageStatus(false)
})