const IconSales = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" />
    </svg>
  </div>
);

const IconTransactions = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-warning-400 to-warning-500 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 18H17V16H7V18Z" />
      <path d="M7 14H17V12H7V14Z" />
    </svg>
  </div>
);

const IconStock = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" />
    </svg>
  </div>
);

const IconNotifications = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-danger-400 to-danger-500 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 19V20H3V19L5 17V11C5 7.9 7.03 5.17 10 4.29C10 4.19 10 4.1 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.1 14 4.19 14 4.29C16.97 5.17 19 7.9 19 11V17L21 19ZM14 21C14 22.1 13.1 23 12 23S10 22.1 10 21" />
    </svg>
  </div>
);

const IconCrossPlatform = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-success-400 to-success-500 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 10.5V7C17 4.24 14.76 2 12 2S7 4.24 7 7V10.5C6.45 10.5 6 10.95 6 11.5V17.5C6 18.05 6.45 18.5 7 18.5H17C17.55 18.5 18 18.05 18 17.5V11.5C18 10.95 17.55 10.5 17 10.5M15.5 10.5H8.5V7C8.5 5.07 10.07 3.5 12 3.5S15.5 5.07 15.5 7V10.5Z" />
    </svg>
  </div>
);

export {
  IconSales,
  IconTransactions,
  IconStock,
  IconNotifications,
  IconCrossPlatform,
};
