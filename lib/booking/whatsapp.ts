export interface WhatsAppBookingParams {
  ownerName: string;
  petName: string;
  serviceTitle: string;
  date: string;
  time: string;
  requestCode: string;
  whatsappNumber: string;
}

export function buildWhatsAppBookingUrl(params: WhatsAppBookingParams): string {
  const cleanNumber = params.whatsappNumber.replace(/\D/g, '');
  const message = `Hello Bastet Small Animal Hospital, I submitted an appointment request.\n\n• Pet: ${params.petName}\n• Service: ${params.serviceTitle}\n• Date: ${params.date} at ${params.time}\n• Parent: ${params.ownerName}\n• Request ID: ${params.requestCode}\n\nPlease confirm availability. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
