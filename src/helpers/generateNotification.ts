interface Notification {
  category_name?: string;
  provider_name?: string;
  services?: string;
}

export function generateAcceptRequestNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name +
    ' ' +
    services +
    ': ' +
    provider_name +
    ' accepted your request';
  const providerNotif = 'You accepted ' + category_name + ' ' + services;
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
export function generateOnCodeSubmitNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name +
    ' ' +
    services +
    ': ' +
    provider_name +
    '`s' +
    ' code was verified';
  const providerNotif =
    'Your code was verified against ' + category_name + ' ' + services;
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
export function generateBeforeWorkImageSubmitNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name +
    ' ' +
    services +
    ': ' +
    provider_name +
    ' uploaded before work image';
  const providerNotif =
    category_name +
    ' ' +
    services +
    ': Before word image was submitted to customer';
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
export function generateAfterWorkImageSubmitNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name +
    ' ' +
    services +
    ': ' +
    provider_name +
    ' uploaded after work image';
  const providerNotif =
    category_name +
    ' ' +
    services +
    ': After work image was submitted to customer';
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
export function generatePauseBookingNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name +
    ' ' +
    services +
    ': ' +
    provider_name +
    ' paused the booking time';
  const providerNotif =
    category_name + ' ' + services + ': You paused your timer.';
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
export function generateCompleteBookingNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name +
    ' ' +
    services +
    ': ' +
    provider_name +
    '`s  booking was marked as complete';
  const providerNotif =
    category_name + ' ' + services + ': Your booking was marked as complete.';
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
export function generateReviewNotification(data: Notification) {
  const {provider_name, category_name, services} = data;
  const customerNotif =
    category_name + ' ' + services + ': ' + provider_name + 'left you a review';
  const providerNotif = category_name + ' ' + services + ': You left a review.';
  return {
    customer: customerNotif,
    provider: providerNotif,
  };
}
