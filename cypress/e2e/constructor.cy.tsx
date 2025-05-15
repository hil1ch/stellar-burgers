describe('Проверка функциональности конструктора бургеров', () => {
  beforeEach(() => {
    // Загрузка моковых данных из файлов
    cy.fixture('ingredients.json');
    cy.fixture('feed.json');
    cy.fixture('user.json');
    cy.fixture('order.json');

    // Настройка перехвата запросов
    cy.intercept(
      { method: 'GET', url: 'api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.intercept(
      { method: 'GET', url: 'api/auth/user' },
      { fixture: 'user.json' }
    ).as('user');
    cy.intercept(
      { method: 'GET', url: 'api/orders/all' },
      { fixture: 'feed.json' }
    ).as('feed');
    cy.intercept(
      { method: 'POST', url: 'api/orders' },
      { fixture: 'order.json' }
    ).as('order');

    // Подставление моковых токенов для авторизации
    cy.setCookie('accessToken', 'mockToken');
    localStorage.setItem('refreshToken', 'mockToken');

    cy.visit('/');
  });

  // Тест проверки корректности перехвата запросов
  it('Проверка корректности перехвата запросов', () => {
    cy.wait('@getIngredients');
    cy.wait('@user');
  });

  // Тест добавления булки в конструктор
  it('Добавление булки в конструктор', () => {
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    // Проверка, что булка добавилась в нижнюю часть конструктора
    cy.get('[data-cy="constructor-module"]')
      .find('[data-cy="bun-bottom"]')
      .should('contain.text', 'булка');

    // Проверка, что булка добавилась в верхнюю часть конструктора
    cy.get('[data-cy="constructor-module"]')
      .find('[data-cy="bun-top"]')
      .should('contain.text', 'булка');
  });

  // Тест добавления ингредиента в конструктор
  it('Добавление ингредиента в конструктор', () => {
    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    // Проверка, что исчезла подпись "Выберите начинку"
    cy.get('[data-cy="ingredients-module"]')
      .contains('Выберите начинку')
      .should('not.exist');

    // Проверка, что модуль ингредиентов существует
    cy.get('[data-cy="ingredients-module"]').should(
      'have.length.greaterThan',
      0
    );
  });

  // Тест открытия модального окна с деталями ингредиента
  it('Проверка открытия модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-modal"]').first().click();

    cy.get(`[data-cy='modal']`).should('be.visible');

    cy.get('[data-cy="modal"]').should('contain.text', 'Детали ингредиента');
  });

  // Тест закрытия модального окна через крестик
  it('Проверка закрытия модального окна по клику на "крестик"', () => {
    cy.get('[data-cy="ingredient-modal"]').first().click();

    cy.get(`[data-cy='modal']`).find('button').click();

    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  // Тест закрытия модального окна через клик на оверлей
  it('Проверка закрытия модального окна по клику на оверлей', () => {
    cy.get('[data-cy="ingredient-modal"]').first().click();

    cy.get(`[data-cy='modalOverlay']`).click('top', { force: true });

    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  // Тест полного цикла создания заказа
  it('Подтверждение заказа и проверка модального окна', () => {
    // Добавление булки в конструктор
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    // Клик по кнопке создания заказа
    cy.get('[data-cy="constructor-module"]').find('button').click();

    // Ожидание выполнения запроса создания заказа
    cy.wait('@order').then((interception) => {
      const orderNumber = interception.response?.body?.order?.number;

      cy.get(`[data-cy='modal']`).should('be.visible');

      cy.get('[data-cy="order-number"]').should('contain.text', orderNumber);

      cy.get(`[data-cy='modal']`).find('button').click();

      cy.get(`[data-cy='modal']`).should('not.exist');

      // Проверяем, что конструктор очистился
      cy.get('[data-cy="constructor-module"]')
        .find('[data-cy="bun-top"]')
        .should('not.exist');

      cy.get('[data-cy="constructor-module"]')
        .find('[data-cy="bun-bottom"]')
        .should('not.exist');

      // Проверяем, что отображаются стандартные подписи
      cy.get('[data-cy="constructor-module"]')
        .contains('Выберите булки')
        .should('exist');

      cy.get('[data-cy="constructor-module"]')
        .contains('Выберите начинку')
        .should('exist');
    });
  });

  // Тест проверки авторизации пользователя
  it('Проверка авторизации пользователя в профиле', () => {
    cy.visit('/profile');

    cy.get(`[data-cy='input-profile-name'] input`).should('have.value', 'User');
  });
});
