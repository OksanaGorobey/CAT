import 'package:app_cat_7/controller/Undefined.dart';
import 'package:app_cat_7/controller/AddPage.dart';
import 'package:app_cat_7/controller/TaskPage.dart';
import 'package:app_cat_7/controller/SignUp.dart';
import 'package:app_cat_7/controller/LogIn.dart';
import 'package:app_cat_7/controller/ListPage.dart';
import 'package:flutter/material.dart';
import 'routing_consts.dart';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case LoginViewRoute:
      return MaterialPageRoute(builder: (context) => LogIn());
    case SignUpViewRoute:
      return MaterialPageRoute(builder: (context) => SignUp());
    case TaskListRoute:
      return MaterialPageRoute(builder: (context) => ListPage());
    case TaskAddRoute:
      return MaterialPageRoute(builder: (context) => AddPage());
    case TaskViewRoute:
      return MaterialPageRoute(builder: (context) => TaskPage(id: settings.arguments));
    default:
      return MaterialPageRoute(builder: (context) => UndefinedView(name: settings.name,));
  }
}