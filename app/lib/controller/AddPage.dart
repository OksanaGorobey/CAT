import 'package:app_cat_7/lib/customFilters.dart';
import 'package:app_cat_7/config/routing_consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/lib/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import '../model/TaskModel.dart';

class AddPage extends StatefulWidget {
  @override
  _AddPageState createState() => new _AddPageState();
}

///////////////////////////////////////////////////////////////////////////////
class _AddPageState extends State<AddPage> {
  Future<AddPageAction> _futureAddPageAction;
  final _formKey = new GlobalKey<FormState>();
  String _title;
  final Tasks httpService = Tasks();

  void validate()
  {
    final form = _formKey.currentState;

    if(form.validate())
    {
      setState(() {
        _futureAddPageAction = httpService.addPage( _title);
      });

      _futureAddPageAction
          .then((val)
          {
            var id = val.id;
             mainAlert(context, i18n['add_page_successful'], TaskViewRoute, id, ALERT_SUCCESS)
                 .then((val)
                 {
                   Navigator.pushNamed(
                       context,
                       TaskViewRoute,
                       arguments: id
                   );
                 });
          })
          .catchError((error)
          {
            if( !error.toString().contains(TASKS_CREATE_VALIDATE_ERROR_TOKEN.toString()) &&
                !error.toString().contains(TASKS_CREATE_REQUIRED_ERROR_TOKEN.toString()) &&
                !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
            )
            {
              mainAlert(context, error.toString(), TaskListRoute, null, ALERT_ERROR)
                  .then((val) {
                    Navigator.pushNamed(
                        context,
                        TaskListRoute
                    );
                  });
            }
            else
            {
              Navigator.pushNamed(
                  context,
                  LoginViewRoute
              );
            }
          });
    }
    else
    {
      mainAlert(context, i18n['not_valid'], '', null, ALERT_ERROR);
    }
  }

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      backgroundColor: Color.fromRGBO(27, 42, 33, 1.0),
      appBar:
      AppBar(
        elevation: 0.1,
        leading: InkWell(
          child: Icon(Icons.arrow_back),
          onTap: () {
            Navigator.pushNamed(
                context,
                TaskListRoute
            );
          },
        ),
        backgroundColor: Color.fromRGBO(27, 42, 33, 1.0),
        title: Text( i18n['add_title'],
            style: TextStyle(
              color: Colors.white,
              letterSpacing: 1.0,
            )
        ),
      ),
      body: Center(
        child: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
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
                          child: Text( i18n['label_title'],
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
                            title: TextFormField(
                              decoration: new InputDecoration(
                                border: InputBorder.none,
                                hintText: i18n['label_title'],
                              ),
                              onChanged: (input) => _title = input,
                              validator: ( val ) => validateTitle( val ) ,
                            ),
                          ),
                        ),
                      ]
                  )
              )
            ],
          ),
        ),
      ),

    floatingActionButton: FloatingActionButton.extended(
    onPressed: validate,
        label: Text( i18n['add_button']),
        icon: Icon(Icons.thumb_up),
        backgroundColor:  Color.fromRGBO(49, 73, 54, 1.0),
      ),
    );
  }
}