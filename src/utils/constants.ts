export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	// Корзина
	basketOpened: 'basket:opened',
	basketRemoveCard: 'basket:removeCard',
	// Заказ
	orderOnSetPayment: 'order:payment',
	orderIsReady: 'order:isReady',
	orderOnEditAddress: 'order:onEditAddress',
	orderOpened: 'order:opened',
	orderSuccessClosed: 'orderSuccess:closed',
	orderSuccessOpened: 'orderSuccess:opened',
	// Модальное окно
	modalClosed: 'modal:closed',
	modalOpened: 'modal:opened',
	// Контакты
	contactsOpened: 'contacts:opened',
	contactsInputChange: 'contacts:inputChange',
	// Ошибки формы
	formErrorsAddressAndPayment: 'formErrors:addressAndPayment',
	formErrorsContacts: 'formErrors:contacts',
	// Карточки
	cardsGet: 'cards:get',
	cardAddToBasket: 'card:addToBasket',
	cardSelect: 'card:select',
	cardPreviewOpened: 'card:previewOpened',
};
