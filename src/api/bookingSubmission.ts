import {del, get, post} from './requestStructure';

export interface bookingSubmission {
  booking_id: string;
  provider_id: string;
  before_work_image?: string;
  after_work_image?: string;
  time_taken?: string;
}

const endpoint = 'booking-submission';

export async function createBookingSubmission(data: bookingSubmission) {
  const res = await post(endpoint, data);
  return res;
}

export async function showBookingSubmissionByPIDnBID(data: {
  provider_id: string;
  booking_id: string;
}) {
  var endpoint = 'show-booking-submission';
  const res = await post(endpoint, data);
  return res;
}
