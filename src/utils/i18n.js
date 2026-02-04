const LANGUAGE_KEY = 'app_language';

// Translations
export const translations = {
  uz: {
    // Common
    welcome: "Xush kelibsiz",
    loading: "Yuklanmoqda...",
    save: "Saqlash",
    cancel: "Bekor qilish",
    delete: "O'chirish",
    edit: "Tahrirlash",
    close: "Yopish",
    logout: "Chiqish",
    profile: "Profil",
    
    // Dashboard
    myOrders: "Mening buyurtmalarim",
    driverPanel: "Haydovchi paneli",
    adminDashboard: "Admin panel",
    newOrder: "Yangi buyurtma",
    allOrders: "Barcha buyurtmalar",
    availableOrders: "Mavjud buyurtmalar",
    myOrdersFilter: "Mening buyurtmalarim",
    
    // Status
    pending: "Kutilmoqda",
    inProgress: "Jarayonda",
    delivered: "Yetkazildi",
    all: "Hammasi",
    
    // Order
    orderName: "Buyurtma nomi",
    from: "Qayerdan",
    to: "Qayerga",
    weight: "Og'irligi",
    price: "Narx",
    description: "Tavsif",
    customer: "Mijoz",
    driver: "Haydovchi",
    status: "Holat",
    
    // Actions
    accept: "Qabul qilish",
    markAsDelivered: "Yetkazildi deb belgilash",
    rateDriver: "Haydovchini baholash",
    comments: "Izohlar",
    exportCSV: "CSV yuklab olish",
    printPDF: "Chop etish",
    calculatePrice: "Narxni hisoblash",
    
    // Analytics
    showAnalytics: "Statistikani ko'rsatish",
    hideAnalytics: "Statistikani yashirish",
    totalOrders: "Jami buyurtmalar",
    totalRevenue: "Jami daromad",
    avgOrderValue: "O'rtacha buyurtma qiymati",
    completionRate: "Bajarilish foizi",
    
    // Profile
    myAccount: "Mening akkauntim",
    fullName: "To'liq ism",
    email: "Email",
    password: "Parol",
    phone: "Telefon",
    memberSince: "A'zo bo'lgan sana",
    rating: "Reyting",
    statistics: "Statistika",
    editProfile: "Profilni tahrirlash",
    saveChanges: "O'zgarishlarni saqlash",
    
    // Notifications
    notifications: "Bildirishnomalar",
    markAllAsRead: "Hammasini o'qilgan deb belgilash",
    noNotifications: "Bildirishnomalar yo'q",
    
    // Messages
    orderCreated: "Buyurtma yaratildi",
    orderAccepted: "Buyurtma qabul qilindi",
    orderDelivered: "Buyurtma yetkazildi",
    deleteConfirm: "O'chirishni tasdiqlaysizmi?",
    fillAllFields: "Barcha maydonlarni to'ldiring",
    success: "Muvaffaqiyatli",
    error: "Xatolik",
    
    // Stats
    completed: "Bajarildi",
    total: "Jami",
    
    // Leaderboard
    topDrivers: "Eng yaxshi haydovchilar",
    reviews: "ta sharh",
    
    // Price Calculator
    priceCalculator: "Narx kalkulyatori",
    distance: "Masofa",
    calculate: "Hisoblash",
    
    // Order Notes
    typeMessage: "Xabar yozing...",
    send: "Yuborish",
    
    // Other
    noOrdersFound: "Buyurtmalar topilmadi",
    createFirstOrder: "Birinchi buyurtmangizni yarating!",
    kg: "kg",
    km: "km"
  },
  
  ru: {
    // Common
    welcome: "Добро пожаловать",
    loading: "Загрузка...",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    close: "Закрыть",
    logout: "Выйти",
    profile: "Профиль",
    
    // Dashboard
    myOrders: "Мои заказы",
    driverPanel: "Панель водителя",
    adminDashboard: "Админ панель",
    newOrder: "Новый заказ",
    allOrders: "Все заказы",
    availableOrders: "Доступные заказы",
    myOrdersFilter: "Мои заказы",
    
    // Status
    pending: "Ожидание",
    inProgress: "В процессе",
    delivered: "Доставлено",
    all: "Все",
    
    // Order
    orderName: "Название заказа",
    from: "Откуда",
    to: "Куда",
    weight: "Вес",
    price: "Цена",
    description: "Описание",
    customer: "Клиент",
    driver: "Водитель",
    status: "Статус",
    
    // Actions
    accept: "Принять",
    markAsDelivered: "Отметить как доставлено",
    rateDriver: "Оценить водителя",
    comments: "Комментарии",
    exportCSV: "Экспорт CSV",
    printPDF: "Печать",
    calculatePrice: "Рассчитать цену",
    
    // Analytics
    showAnalytics: "Показать аналитику",
    hideAnalytics: "Скрыть аналитику",
    totalOrders: "Всего заказов",
    totalRevenue: "Общий доход",
    avgOrderValue: "Средняя стоимость заказа",
    completionRate: "Процент выполнения",
    
    // Profile
    myAccount: "Мой аккаунт",
    fullName: "Полное имя",
    email: "Email",
    password: "Пароль",
    phone: "Телефон",
    memberSince: "Член с",
    rating: "Рейтинг",
    statistics: "Статистика",
    editProfile: "Редактировать профиль",
    saveChanges: "Сохранить изменения",
    
    // Notifications
    notifications: "Уведомления",
    markAllAsRead: "Отметить все как прочитанное",
    noNotifications: "Нет уведомлений",
    
    // Messages
    orderCreated: "Заказ создан",
    orderAccepted: "Заказ принят",
    orderDelivered: "Заказ доставлен",
    deleteConfirm: "Подтвердить удаление?",
    fillAllFields: "Заполните все поля",
    success: "Успешно",
    error: "Ошибка",
    
    // Stats
    completed: "Завершено",
    total: "Всего",
    
    // Leaderboard
    topDrivers: "Лучшие водители",
    reviews: "отзывов",
    
    // Price Calculator
    priceCalculator: "Калькулятор цены",
    distance: "Расстояние",
    calculate: "Рассчитать",
    
    // Order Notes
    typeMessage: "Напишите сообщение...",
    send: "Отправить",
    
    // Other
    noOrdersFound: "Заказы не найдены",
    createFirstOrder: "Создайте свой первый заказ!",
    kg: "кг",
    km: "км"
  },
  
  en: {
    // Common
    welcome: "Welcome",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    logout: "Logout",
    profile: "Profile",
    
    // Dashboard
    myOrders: "My Orders",
    driverPanel: "Driver Panel",
    adminDashboard: "Admin Dashboard",
    newOrder: "New Order",
    allOrders: "All Orders",
    availableOrders: "Available Orders",
    myOrdersFilter: "My Orders",
    
    // Status
    pending: "Pending",
    inProgress: "In Progress",
    delivered: "Delivered",
    all: "All",
    
    // Order
    orderName: "Order Name",
    from: "From",
    to: "To",
    weight: "Weight",
    price: "Price",
    description: "Description",
    customer: "Customer",
    driver: "Driver",
    status: "Status",
    
    // Actions
    accept: "Accept",
    markAsDelivered: "Mark as Delivered",
    rateDriver: "Rate Driver",
    comments: "Comments",
    exportCSV: "Export CSV",
    printPDF: "Print",
    calculatePrice: "Calculate Price",
    
    // Analytics
    showAnalytics: "Show Analytics",
    hideAnalytics: "Hide Analytics",
    totalOrders: "Total Orders",
    totalRevenue: "Total Revenue",
    avgOrderValue: "Avg Order Value",
    completionRate: "Completion Rate",
    
    // Profile
    myAccount: "My Account",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    phone: "Phone",
    memberSince: "Member Since",
    rating: "Rating",
    statistics: "Statistics",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    
    // Notifications
    notifications: "Notifications",
    markAllAsRead: "Mark all as read",
    noNotifications: "No notifications",
    
    // Messages
    orderCreated: "Order created",
    orderAccepted: "Order accepted",
    orderDelivered: "Order delivered",
    deleteConfirm: "Confirm deletion?",
    fillAllFields: "Fill all fields",
    success: "Success",
    error: "Error",
    
    // Stats
    completed: "Completed",
    total: "Total",
    
    // Leaderboard
    topDrivers: "Top Drivers",
    reviews: "reviews",
    
    // Price Calculator
    priceCalculator: "Price Calculator",
    distance: "Distance",
    calculate: "Calculate",
    
    // Order Notes
    typeMessage: "Type your message...",
    send: "Send",
    
    // Other
    noOrdersFound: "No orders found",
    createFirstOrder: "Create your first order!",
    kg: "kg",
    km: "km"
  }
};

// Get current language
export const getCurrentLanguage = () => {
  return localStorage.getItem(LANGUAGE_KEY) || 'uz';
};

// Set language
export const setLanguage = (lang) => {
  localStorage.setItem(LANGUAGE_KEY, lang);
  window.location.reload(); // Reload to apply changes
};

// Get translation
export const t = (key) => {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || key;
};

// Hook for translations (React)
export const useTranslation = () => {
  const lang = getCurrentLanguage();
  
  return {
    t: (key) => translations[lang]?.[key] || key,
    currentLang: lang,
    setLang: setLanguage,
    languages: {
      uz: "O'zbek",
      ru: "Русский",
      en: "English"
    }
  };
};