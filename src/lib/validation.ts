import { z } from "zod";

// Matches the backend rule: any 6 or more characters.
const passwordRule = z.string().min(6, "Password must be at least 6 characters");

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Please provide full name").max(100, "Full name cannot exceed 100 characters"),
    email: z.string().email("Please enter a valid email address").toLowerCase().trim(),
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase().trim(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase().trim(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, "Reset token authorization is required"),
    newPassword: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(150),
  email: z.string().trim().min(1, "Please enter your email address.").email("Enter a valid email address.").toLowerCase(),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().min(2, "Please enter a subject.").max(200),
  message: z.string().trim().min(10, "Please enter a message of at least 10 characters.").max(5000),
});

export const wishlistToggleSchema = z.object({
  productId: z.string().trim().min(1, "Product ID is required"),
});

export const trackOrderSchema = z.object({
  orderId: z.string().trim().min(1, "Please enter your Order ID"),
  email: z.string().trim().min(1, "Please enter the email used for the order").email("Enter a valid email address").toLowerCase(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "processing", "out_for_delivery", "delivered", "cancelled"], {
    message: "Invalid order status",
  }),
  note: z.string().trim().max(500).optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Full Name must be at least 2 characters long").max(100),
  avatar: z
    .union([z.string().trim().url("Avatar must be a valid URL").max(500), z.literal("")])
    .optional(),
});
