export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(value: string, rules: ValidationRule): ValidationResult {
  if (rules.required && !value.trim()) {
    return {
      isValid: false,
      error: rules.message || 'Este campo é obrigatório',
    };
  }

  if (rules.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      error: rules.message || `Mínimo de ${rules.minLength} caracteres`,
    };
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      error: rules.message || `Máximo de ${rules.maxLength} caracteres`,
    };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return {
      isValid: false,
      error: rules.message || 'Formato inválido',
    };
  }

  if (rules.custom && !rules.custom(value)) {
    return {
      isValid: false,
      error: rules.message || 'Valor inválido',
    };
  }

  return { isValid: true };
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

export function validateEmail(email: string): ValidationResult {
  return validateField(email, {
    required: true,
    pattern: emailPattern,
    message: 'Email inválido',
  });
}

export function validatePassword(password: string): ValidationResult {
  return validateField(password, {
    required: true,
    minLength: 6,
    message: 'A senha deve ter no mínimo 6 caracteres',
  });
}

