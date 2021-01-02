import 'package:app_cat_7/config/routing_consts.dart';
import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/model/UserModel.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import '../lib/common.dart';
import '../lib/customFilters.dart';
import 'package:flutter_svg/flutter_svg.dart';


class LogIn extends StatefulWidget {
  @override
  LogInState createState() {
    return new LogInState();
  }
}

class LogInState extends State<LogIn> {
  final User httpService = User();

  Future<LogInAction> _futureLogInAction;
  final _formKey = new GlobalKey<FormState>();
  String _email;
  String _password;

  void validateAndLogIn()
  {
    final form = _formKey.currentState;

    if(form.validate())
    {
      setState(() {
        _futureLogInAction = httpService.makeLogIn(_email, _password);
      });
      _futureLogInAction
        .then((val)
        {
          Navigator.pushNamed(
            context,
            TaskListRoute,
            arguments: val.token
          );
        })
        .catchError((error)
        {
          mainAlert(context, error.toString(), '', null, ALERT_ERROR);
        });
    }
    else
    {
      mainAlert(context, i18n['not_valid'], '', null, ALERT_ERROR);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Image.asset(
          "images/background.png",
          height: MediaQuery
              .of(context)
              .size
              .height,
          width: MediaQuery
              .of(context)
              .size
              .width,
          fit: BoxFit.cover,
        ),
        Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            leading: Container(),
            backgroundColor: Colors.transparent,
            elevation: 0.0,
          ),
          body: Center(
            child: Container(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  FloatingActionButton.extended(
                    onPressed: () {
                      Navigator.pushReplacementNamed(context, SignUpViewRoute);
                    },
                    label: Text(i18n['signup_button']),
                    backgroundColor: Colors.black.withOpacity(0.3),
                  ),
                  Form(
                      key: _formKey,
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: <Widget>[
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                vertical: 15.0,
                                horizontal: 25.0,
                              ),
                              child: Text(i18n['login_title'],
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16.0,
                                    letterSpacing: 1.0,
                                  )),
                            ),
                            //input field for email
                            Card(
                              margin: EdgeInsets.symmetric(
                                vertical: 10.0,
                                horizontal: 25.0,
                              ),
                              child: ListTile(
                                leading: Icon(
                                  Icons.email,
                                  color: Colors.grey.shade600,
                                ),
                                title: TextFormField(
                                  decoration: new InputDecoration(
                                    border: InputBorder.none,
                                    hintText: i18n['label_email'],
                                  ),
                                  onChanged: (input) => _email = input,
                                  validator: (value) => validateEmail(value),
                                ),
                              ),
                            ),
                            Card(
                              margin: EdgeInsets.symmetric(
                                vertical: 10.0,
                                horizontal: 25.0,
                              ),
                              child: ListTile(
                                leading: Icon(
                                  Icons.visibility_off, //enhanced_encryption - lock lock_open   visibility - visibility_off
                                  color: Colors.grey.shade600,
                                ),
                                title: TextFormField(
                                  decoration: new InputDecoration(
                                    border: InputBorder.none,
                                    hintText: i18n['label_password'],
                                  ),
                                  onChanged: (input) => _password = input,
                                  validator: ( val ) => validatePasswd( val ) ,
                                  obscureText: true,
                                ),
                              ),
                            ),
                          ]
                      )
                  ),
                  SvgPicture.asset("images/catShape.svg",color: Colors.white, height: 260, width: 260,),
                ],
              ),
            ),
          ),

          bottomNavigationBar: BottomAppBar(
            shape: const CircularNotchedRectangle(),
            child: Container(height: 50.0,),
            color: Colors.black.withOpacity(0.3),
          ),
          floatingActionButton: FloatingActionButton(
            heroTag: i18n['login_tag'],
            onPressed: validateAndLogIn,
            tooltip: i18n['login_tag'],
            child: Text(i18n['login_button']),
            backgroundColor: Colors.black.withOpacity(0.3),
            elevation: 0.01,
          ),
          floatingActionButtonLocation: FloatingActionButtonLocation
              .centerDocked,
        ),
      ],
    );
  }
}
