import { z } from 'zod';

export function normalizeIndianPhone(phone: string): string | null {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Matches: +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, or 10-digit XXXXXXXXXX where first digit is 6-9
  const match = cleaned.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  if (match) {
    return `+91${match[1]}`;
  }
  return null;
}

export const bookingSchema = z.object({
  ownerName: z
    .string({ required_error: 'Please provide your full name' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name cannot exceed 60 characters'),
  phone: z
    .string({ required_error: 'Please provide a valid Indian mobile number' })
    .trim()
    .refine((val) => normalizeIndianPhone(val) !== null, {
      message: 'Enter a valid 10-digit Indian phone number (starts with 6, 7, 8, or 9)',
    })
    .transform((val) => normalizeIndianPhone(val) || val),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  animal: z.string().default('dog'),
  petName: z
    .string({ required_error: "Please enter your pet's name" })
    .trim()
    .min(1, "Please enter your pet's name")
    .max(40, "Pet's name cannot exceed 40 characters"),
  breed: z.string().trim().max(60, 'Breed name is too long').optional().or(z.literal('')),
  petAge: z.string().trim().max(30).optional().or(z.literal('')),
  service: z
    .string({ required_error: 'Please select a clinical service' })
    .min(1, 'Please select a clinical service'),
  doctor: z.string().optional().default('no-preference'),
  date: z
    .string({ required_error: 'Please select an appointment date' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date (YYYY-MM-DD)'),
  time: z
    .string({ required_error: 'Please select a preferred time slot' })
    .regex(/^\d{2}:\d{2}$/, 'Please select a valid time slot (HH:mm)'),
  message: z.string().trim().max(500, 'Notes cannot exceed 500 characters').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to be contacted via call or WhatsApp regarding this appointment request',
    }),
  }),
  hp: z.string().optional().or(z.literal('')),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;
