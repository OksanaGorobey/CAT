
import 'package:app_cat_7/lib/consts.dart';

const i18n =
{
  'list_title'                                              : 'Список задач',

  'login_button'                                            : 'Увійти',
  'login_title'                                             : 'Використовуйте свій обліковий запис',
  'login_tag'                                               : 'Login',

  'signup_button'                                           : 'Зарєєструватися',
  'signup_title'                                            : 'Створити власный обліковий запис',
  'signup_successful'                                       : 'Ви успішно зареєстровані, будь ласка увійдйть',
  'signup_tag'                                              : 'SignUp',

  'successful'                                              : 'Вітаю!',
  'error'                                                   : 'Помилка.',

  'label_email'                                             : 'Email',
  'label_password'                                          : 'Пароль',
  'label_name'                                              : 'Ім\'я',

  'not_valid'                                               : 'Поля заповнені не валідно',

  'next_button'                                             : 'Далі',
  'close_button'                                            : 'Закрити',
  'view_button'                                             : 'Перегляд',
  'edit_button'                                             : 'Редагування',
  'add_button'                                              : 'Додати',
  'update_button'                                           : 'Змінити',

  'task_title'                                              : 'Задача: ',

  'label_id'                                                : 'ID: ',
  'label_title'                                             : 'Назва: ',
  'label_status'                                            : 'Стан: ',
  'label_user_id'                                           : 'Користувач(Id): ',
  'label_created_date'                                      : 'Дата створення: ',
  'label_updated_date'                                      : 'Дата оновлення: ',

  'add_title'                                               : 'Створити задачу',

  'status_1'                                                : 'Aктивний',
  'status_2'                                                : 'Виконаний',
  'status_0'                                                : 'Видалений',

  'or_delimeter'                                            : 'АБО',
  'add_page_successful'                                     : 'Запис успішно додано.',
  'edit_page_successful'                                    : 'Запис успішно відредаговано.',

  'auth_email_required'                                     : 'Поле "Email" обов\'язкове для заповнення',
  'auth_email_not_valid'                                    : 'Будь ласка, вкажіть Email правильно',
  'auth_email_max_length'                                   : 'Максимальна кількість символів 128',

  'auth_passwd_required'                                    : 'Поле "Пароль" обов\'язкове для заповнення',
  'auth_passwd_not_valid'                                   : 'Допустимі символи _, -, A-Za-z, 0-9',
  'auth_passwd_min_length'                                  : 'Мінімальна кількість символів 8',
  'auth_passwd_max_length'                                  : 'Максимальна кількість символів 32',

  'name_required'                                           : 'Поле "Ім\'я" обов\'язкове для заповнення',
  'name_min_length'                                         : 'Мінімальна кількість символів 2',
  'name_max_length'                                         : 'Максимальна кількість символів 128',

  'title_required'                                          : 'Поле "Назва" обов\'язкове для заповнення',
  'title_min_length'                                        : 'Мінімальна кількість символів 2',
  'title_max_length'                                        : 'Максимальна кількість символів 128',

  'errors_$GENERAL_CODE_VALIDATE_PARAMS_ERROR'              : 'Помилка. Не вірні параметри.',
  'errors_$GENERAL_CODE_DATABASE_ERROR'                     : 'Помилка БД.',
  'errors_$GENERAL_CODE_REQUEST_ERROR'                      : 'Помилка запиту.',
  'errors_$GENERAL_CODE_EMPTY_TOKEN_ERROR'                  : 'Помилка. Не вказано токен.',
  'errors_$GENERAL_CODE_INVALID_OR_EXPIRED_TOKEN_ERROR'     : 'Помилка. Невірний токен.',

  'errors_$USERS_CREATE_VALIDATE_ERROR_NAME'                : 'Помилка. Не вірно заповнено поле "Ім\'я".',
  'errors_$USERS_CREATE_VALIDATE_ERROR_EMAIL'               : 'Помилка. Не вірно вказано email.',
  'errors_$USERS_CREATE_VALIDATE_ERROR_PASSWD '             : 'Помилка. Не вірно введений пароль.',
  'errors_$USERS_CREATE_VALIDATE_ERROR_ADDITIONALFIELDS'    : 'Помилка. Не вірно введені дані.',
  'errors_$USERS_CREATE_REQUIRED_ERROR_NAME'                : 'Помилка. Поле "Ім\'я" обов\'язкове.',
  'errors_$USERS_CREATE_REQUIRED_ERROR_EMAIL'               : 'Помилка. Поле "Еmail" обов\'язкове.',
  'errors_$USERS_CREATE_REQUIRED_ERROR_PASSWD'              : 'Помилка. Поле "Пароль" обов\'язкове.',
  'errors_$USERS_CREATE_UNIQUE_ERROR_EMAIL'                 : 'Помилка. Користувач з таком email вже зареєстрований.',

  'errors_$USERS_AUTHORIZE_VALIDATE_ERROR_EMAIL'            : 'Помилка. Не вірно вказано email.',
  'errors_$USERS_AUTHORIZE_VALIDATE_ERROR_PASSWD'           : 'Помилка. Не вірно введений пароль.',
  'errors_$USERS_AUTHORIZE_VALIDATE_ERROR_ADDITIONALFIELDS' : 'Помилка. Не вірно введені дані.',
  'errors_$USERS_AUTHORIZE_REQUIRED_ERROR_EMAIL'            : 'Помилка. Поле "Еmail" обов\'язкове.',
  'errors_$USERS_AUTHORIZE_REQUIRED_ERROR_PASSWD'           : 'Помилка. Поле "Пароль" обов\'язкове.',

  'errors_$TASKS_CREATE_VALIDATE_ERROR_TOKEN'               : 'Помилка. Невірний токен.',
  'errors_$TASKS_CREATE_VALIDATE_ERROR_TITLE'               : 'Помилка. Невірне значення поля "Назва".',
  'errors_$TASKS_CREATE_VALIDATE_ERROR_ADDITIONALFIELDS'    : 'Помилка. Не вірно введені дані.',
  'errors_$TASKS_CREATE_REQUIRED_ERROR_TOKEN'               : 'Помилка. Не вказано токен.',
  'errors_$TASKS_CREATE_REQUIRED_ERROR_TITLE'               : 'Помилка. Поле "Назва" обов\'язкове.',

  'errors_$TASKS_UPDATE_VALIDATE_ERROR_TOKEN'               : 'Помилка. Невірний токен.',
  'errors_$TASKS_UPDATE_VALIDATE_ERROR_ID'                  : 'Помилка. Невірний ID.',
  'errors_$TASKS_UPDATE_VALIDATE_ERROR_TITLE'               : 'Помилка. Невірне значення поля "Назва".',
  'errors_$TASKS_UPDATE_VALIDATE_ERROR_STATUS'              : 'Помилка. Невірне значення поля "Стан".',
  'errors_$TASKS_UPDATE_VALIDATE_ERROR_ADDITIONALFIELDS'    : 'Помилка. Не вірно введені дані.',
  'errors_$TASKS_UPDATE_REQUIRED_ERROR_TOKEN'               : 'Помилка. Не вказано токен.',
  'errors_$TASKS_UPDATE_REQUIRED_ERROR_ID'                  : 'Помилка. Не вказано ID.',

  'errors_$TASKS_DELETE_VALIDATE_ERROR_TOKEN'               : 'Помилка. Невірний токен.',
  'errors_$TASKS_DELETE_VALIDATE_ERROR_ID'                  : 'Помилка. Невірний ID.',
  'errors_$TASKS_DELETE_VALIDATE_ERROR_ADDITIONALFIELDS'    : 'Помилка. Не вірно введені дані.',
  'errors_$TASKS_DELETE_REQUIRED_ERROR_TOKEN'               : 'Помилка. Не вказано токен.',
  'errors_$TASKS_DELETE_REQUIRED_ERROR_ID'                  : 'Помилка. Не вказано ID.',

  'errors_$TASKS_GETONE_VALIDATE_ERROR_TOKEN'               : 'Помилка. Невірний токен.',
  'errors_$TASKS_GETONE_VALIDATE_ERROR_ID'                  : 'Помилка. Невірний ID.',
  'errors_$TASKS_GETONE_VALIDATE_ERROR_ADDITIONALFIELDS'    : 'Помилка. Не вірно введені дані.',
  'errors_$TASKS_GETONE_REQUIRED_ERROR_TOKEN'               : 'Помилка. Не вказано токен.',
  'errors_$TASKS_GETONE_REQUIRED_ERROR_ID'                  : 'Помилка. Не вказано ID.',

  'errors_$TASKS_GETLIST_VALIDATE_ERROR_TOKEN'              : 'Помилка. Невірний токен.',
  'errors_$TASKS_GETLIST_VALIDATE_ERROR_LIMIT'              : 'Помилка. Невірне значення поля "Ліміт".',
  'errors_$TASKS_GETLIST_VALIDATE_ERROR_OFFSET'             : 'Помилка. Не вірне значення зміщення від початку таблиці.',
  'errors_$TASKS_GETLIST_VALIDATE_ERROR_ADDITIONALFIELDS'   : 'Помилка. Не вірно введені дані.',
  'errors_$TASKS_GETLIST_REQUIRED_ERROR_TOKEN'              : 'Помилка. Не вказано токен.',
  'errors_$TASKS_GETLIST_REQUIRED_ERROR_LIMIT'              : 'Помилка. Поле "Ліміт" обов\'язкове.',
  'errors_$TASKS_GETLIST_REQUIRED_ERROR_OFFSET'             : 'Помилка. Не вказано значення зміщення від початку таблиці.',

  'errors_$USERS_AUTHORIZE_USER_NOT_FOUND'                  : 'Помилка. Користувача не знайдено.',
  'errors_$USERS_AUTHORIZE_USER_NOT_ACTIVE'                 : 'Помилка. Користувач не активний.',
  'errors_$USERS_AUTHORIZE_USER_NOT_VALID_PASSWD'           : 'Помилка. Не вірно вказано пароль чи еmail.',

  'errors_$TASKS_UPDATE_TASK_NOT_FOUND'                     : 'Помилка. Запис не знайдено.',
  'errors_$TASKS_DELETE_TASK_NOT_FOUND'                     : 'Помилка. Запис не знайдено.',
  'errors_$TASKS_GETONE_TASK_NOT_FOUND'                     : 'Помилка. Запис не знайдено.',

};



