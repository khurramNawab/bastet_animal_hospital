import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(150, 'Email is too long'),
  name: z
    .string()
    .trim()
    .max(100, 'Name cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .trim()
    .max(20, 'Phone number is too long')
    .regex(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,12}$|^$/,
      'Please enter a valid phone number',
    )
    .optional()
    .or(z.literal('')),
  animal: z.string({ required_error: 'Species is required' }).min(1, 'Species is required').max(50),
  // Honeypot field for spam prevention - must remain empty
  hp: z.string().max(0, 'Spam detection triggered').optional().or(z.literal('')),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
