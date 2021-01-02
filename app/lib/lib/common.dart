import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:flutter/material.dart';
import 'package:commons/commons.dart';
import 'package:flutter_svg/flutter_svg.dart';

Future<void> mainAlert( context, String str, String route, argument, type ) async {
  return dialog(
      context,
      type == ALERT_SUCCESS ? Color.fromRGBO(49, 73, 54, 1.0) : Color.fromRGBO(150, 40, 27, 1),
      type == ALERT_SUCCESS ? i18n['successful'] : i18n['error'],
      str,
      false,
      true,
      customIcon:  SvgPicture.asset( type == ALERT_SUCCESS ? "images/check.svg" :  "images/warning.svg",color: Colors.white, height: 260, width: 260,),
      positiveText: i18n['close_button'],
      positiveAction: () {
        if( route == '' )
        {
          Navigator.of(context).pop();
        }
        else if( route != '' && argument != null)
        {
          Navigator.pushNamed(
              context,
              route,
              arguments: argument
          );
        }
        else
        {
          Navigator.pushNamed(context, route);
        }
      }
  );
}

