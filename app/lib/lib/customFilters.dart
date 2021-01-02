import 'consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';

String validateEmail(String value)
{
  Pattern pattern =
      r'^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$';
  RegExp regex = new RegExp(pattern);

  if (value.isEmpty)
  {
    return i18n['auth_email_required'];
  }
  else if (value.length > 128 )
  {
    return i18n['auth_email_max_length'];
  }
  else
  {
    if (!regex.hasMatch(value))
      return i18n['auth_email_not_valid'];
    else
      return null;
  }
}

String validatePasswd(String value)
{
  Pattern pattern =
      r'^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$';
  RegExp regex = new RegExp(pattern);

  if (value.isEmpty)
  {
    return i18n['auth_passwd_required'];
  }
  else
  {
    if ( value.length < 8 )
    {
      return i18n['auth_passwd_min_length'];
    }
    else if (value.length > 32 )
    {
      return i18n['auth_passwd_max_length'];
    }
    else
    {
      if (!regex.hasMatch(value))
        return i18n['auth_passwd_not_valid'];
      else
        return null;
    }
  }
}

String validateName(String value)
{
  if (value.isEmpty)
  {
    return i18n['name_required'];
  }
  else
  {
    if ( value.length < 2 )
    {
      return i18n['name_min_length'];
    }
    else if (value.length > 128 )
    {
      return i18n['name_max_length'];
    }
    else
    {
      return null;
    }
  }
}

String validateTitle(String value)
{
  if (value.isEmpty)
  {
    return i18n['title_required'];
  }
  else
  {
    if ( value.length < 2 )
    {
      return i18n['title_min_length'];
    }
    else if ( value.length > GENERAL_MAXLENGTH_HALFINPUT )
    {
      return i18n['title_max_length'];
    }
    else
    {
      return null;
    }
  }
}
