/**
 * Validation - Czech Translations
 * Translations for general validation error messages
 */
export const validationTranslations = {
  // General validation
  VALIDATION_ERROR: 'Chyba validace formuláře',
  VALIDATION_NO_DATA_SUBMITTED: 'Nebyla odeslána žádná data',

  // Email validation
  VALIDATION_EMAIL_INVALID: 'Zadejte prosím platnou e-mailovou adresu',
  VALIDATION_EMAIL_REQUIRED: 'E-mail je povinný',

  // Password validation
  VALIDATION_PASSWORD_REQUIRED: 'Heslo je povinné',
  VALIDATION_PASSWORD_TOO_SHORT: 'Heslo musí mít alespoň 8 znaků',
  VALIDATION_PASSWORD_TOO_WEAK:
    'Heslo musí obsahovat velké písmeno, malé písmeno, číslici a speciální znak',

  // Name validation
  VALIDATION_NAME_REQUIRED: 'Jméno je povinné',
  VALIDATION_NAME_TOO_SHORT: 'Jméno musí mít alespoň 2 znaky',

  // Generic field validation
  VALIDATION_FIELD_REQUIRED: 'Toto pole je povinné',
  VALIDATION_FIELD_TOO_SHORT: 'Toto pole je příliš krátké',
  VALIDATION_FIELD_TOO_LONG: 'Toto pole je příliš dlouhé',
  VALIDATION_FIELD_INVALID_FORMAT: 'Neplatný formát',
  VALIDATION_UUID_INVALID: 'Neplatné UUID',
  VALIDATION_URL_INVALID: 'Neplatná URL adresa',
};
