import 'config/routing_consts.dart';
import 'controller/Undefined.dart';
import 'package:flutter/material.dart';
import 'config/router.dart' as router;


void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CaT',
      theme: new ThemeData(primaryColor: Color.fromRGBO(27, 42, 33, 1.0)),
      onGenerateRoute: router.generateRoute,
      onUnknownRoute: (settings) =>
          MaterialPageRoute(
              builder: (context) =>
                  UndefinedView(
                    name: settings.name,
                  )
          ),
      initialRoute: LoginViewRoute,
    );
  }
}