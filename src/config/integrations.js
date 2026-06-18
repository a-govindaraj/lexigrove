// Third-party integration endpoints.
//
// Subscriber capture posts to a Google Apps Script web app backed by a Google
// Sheet (free, you own the data). See scripts/google-apps-script.gs and
// scripts/EMAIL_SETUP.md for the copy-paste setup.
//
// Paste your deployed Apps Script /exec URL below (the bare URL, no ?key=).
// Until then the Subscribe form shows a "launching soon" note instead of
// silently dropping signups.
export const SUBSCRIBE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxi9xSyaS7xC1AKToSDucabiuD8MQGMt3JMv4ZNiBGY8HtZvk-qsmvDak5do1geF7cq/exec'; // e.g. 'https://script.google.com/macros/s/AKfy.../exec'

export const isSubscribeConfigured = () => Boolean(SUBSCRIBE_ENDPOINT);
