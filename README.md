# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

Описание проекта  

Web-Larek — это веб-приложение, предназначенное для управления каталогом товаров, корзиной и оформлением заказов. Проект включает инструменты для динамической работы, чтобы пользователь мог посмотреть каталог товаров, добавить выбранные товары в корзину и оформить заказ.

Приложение реализовано по MVP архитектуре и состоит из классы моделей и классов представления.
В приложении используется событийно-ориентированный подход. 
Разделение по группам:

1. МОДЕЛИ (Model):
   - IAppState

2. ПРЕДСТАВЛЕНИЯ (View):
  - ICard
   - ICardItem
   - IBasket
   - IBasketItem
   - IOrder
   - IOderResult
   - IBasketView
   - IPage
   - IPageElements
   - Modal
   - FormState

Взаимодействие между моделями и представлениями организуется с помощью событий через EventEmitter.

#### Класс EventEmitter
   - Предназначение:  
     Обеспечивает работу с событиями приложения. Используется для передачи и обработки событий между компонентами.

   - Функции:  
     - Установка слушателей на события (on).  
     - Снятие слушателей с событий (off).  
     - Вызов слушателей при возникновении события (emit).
     
---

Основной функционал приложения 

Главная страница:
-На главной странице отображается список товаров, который загружается с сервера.  
-Счётчик на кнопке корзины отображает общее количество товаров, добавленных в корзину.  
-Два модельных окна с карточкой товара и окном корзины, которые закрываются по клику вне модального окна, по клику на крестик.

Карточка товара:
-Отображение полной информации
-В модальном окне при нажатии на кнопку «Купить» товар добавляется в корзину

Корзина:
- В модальном окне отображается список товаров, добавленных в корзину:  
  - Указаны названия товаров и их стоимость.  
  - При нажатии на кнопку удаления товар удаляется из корзины.  
  - После удаления автоматически обновля.тся cуммарная стоимость товаров и счётчик товаров на кнопке корзины.  
  - При нажатии на активную кнопку «Оформить» открывается модальное окно для выбора способа оплаты и адреса доставки.  

Оформление заказа:
-Выбор способа оплаты осуществляется нажатием на кнопку «Далее»
-Валидация формы

Завершение заказа:
-При нажатии на кнопку оплаты происходит отправка запроса на сервер.
-После успешного завершения запроса корзина очищается, сбрасывается, счётчик товаров на кнопке корзины, происходит переход на модальное окно, подтверждающее оформление заказа.


### Классы модели  
Классы модели (Model) отвечают за работу с данными и бизнес-логикой приложения.

#### Класс IAppState
- Предназначение:  
  Содержит текущее состояние приложения.  

- Свойства:
  - catalog: ICardItem[] — каталог товаров.  
  - basket: ICardItem[] — корзина товаров.  
  - order: IOrder — текущий заказ.  
  - preview: ICardItem — предварительно выбранный товар.  

Функции:

- Методы работы с корзиной:  
  - addToBasket(item: ICardItem): void — добавляет товар в корзину.  
  - removeFromBasket(itemId: number): void — удаляет товар из корзины по его идентификатору (или целиком).  
  - clearBasket(): void — полностью очищает корзину.  
  - isLotInBasket(item: ICardItem): boolean — проверяет, находится ли товар в корзине.  
  - getTotalAmount(): number — возвращает общую стоимость товаров в корзине.  
  - getBasketIds(): number[] — возвращает массив идентификаторов товаров в корзине.  
  - getBasketLength(): number — возвращает количество товаров в корзине.  

- Методы работы с заказом:  
  - clearOrder(): void — сбрасывает текущий заказ.  

  - Методы работы с формой:  
  - updateFormState(valid: boolean, errors: string[]): void — обновляет состояние формы (валидность и ошибки).  

---

### Классы представления  
Классы представления (View) управляют графическим слоем и взаимодействием с пользователем.

#### Класс BasketView  
- Предназначение:  
  Управляет отображением корзины товаров.  

- Свойства:  
  - items: HTMLElement[] — массив DOM-элементов товаров.  
  - price: number — общая стоимость товаров в корзине.  
  - selected: string[] — массив идентификаторов выбранных товаров.  

- Методы:
  - renderBasket(items: IBasketItem[]): void — отображает товары в корзине.  
  - updateTotalPrice(total: number): void — обновляет и отображает общую стоимость корзины.  
  - highlightSelected(ids: string[]): void — подчеркивает или выделяет выбранные товары в интерфейсе.  
  - clearBasketView(): void — очищает представление корзины

### Класс ModalView:

---

Предназначение:  
 Отвечает за открытие, закрытие и управление содержимым модального окна, работая исключительно с DOM-элементами.

Свойства:
  - content: HTMLElement — содержимое модального окна.  

Функции:
  - open(content: HTMLElement): void — открывает модальное окно и задает его содержимое.  
  - close(): void — закрывает модальное окно и очищает содержимое.  
  - clearContent(): void — очищает содержимое модального окна.  


---

#### Класс FormOrderView  
- Предназначение:  
  Отвечает за отображение формы оформления заказа.  

- Свойства:  
  - formContainer: HTMLElement — контейнер для формы заказа.  
  - inputs: { [key: string]: HTMLInputElement } — элементы ввода формы (имя, адрес, телефон, комментарий и пр.).  
  - errorsContainer: HTMLElement — блок для отображения ошибок формы.  

- Методы:  
  - renderForm(orderData?: IOrder): void — отображает форму оформления заказа с данными текущего заказа (опционально).  
  - updateErrors(errors: string[]): void — обновляет и отображает список ошибок валидации на форме.  
  - clearForm(): void — очищает все поля формы.  
  - getFormData(): IOrder — получает данные заказа из формы.  
  - disableForm(): void — блокирует форму (например, при отправке).  
  - enableForm(): void — разблокирует форму.  

---