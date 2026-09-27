export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type PaymentState =
  | {
      status: "idle";
    }
  | {
      status: "processing";
    }
  | {
      status: "success";
      message: string;
      sessionId: string;
    }
  | {
      status: "error";
      code: string;
      message: string;
    };

export interface PaymentFormData {
  email: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  disabled?: boolean;
  resetKey?: number;
}

export type PaymentResult =
  | { status: "success"; sessionId: string }
  | { status: "error"; code: string; message: string };

export type PaymentField = {
  name: keyof PaymentFormData;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  len?: number;
};

export interface DateSelectProps {
  month: string;
  year: string;
  monthError?: string;
  yearError?: string;
  disabled?: boolean;
  onChange: (field: "expiryMonth" | "expiryYear", value: string) => void;
}

export interface CheckoutResultScreenProps {
  message: string;
  sessionId?: string;
  product: Product;
  status: "success" | "error";
  errorCode?: string;
  onRetry?: () => void;
}

export type CloseReason = "user_closed" | "auto_closed";

export interface UseCheckoutMessagingProps {
  onProductRequest: (productId: string) => void;
  paymentState: PaymentState;
}
