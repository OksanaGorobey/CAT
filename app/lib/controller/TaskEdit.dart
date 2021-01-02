
import 'dart:ui';
import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/lib/common.dart';
import 'package:app_cat_7/lib/customFilters.dart';
import 'package:app_cat_7/config/routing_consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../model/TaskModel.dart';

class TaskEdit extends StatefulWidget {
  final String id;
  TaskEdit({Key key, this.id}) : super(key: key);

  @override
  _TaskEditState createState() => _TaskEditState();
}
///////////////////////////////////////////////////////////////////////////////
class _TaskEditState extends State<TaskEdit> {
  Future<UpdatePageAction> _futureUpdatePageAction;
  Future<TasksView> _futureTasksView;

  final _formKey = new GlobalKey<FormState>();
  final Tasks httpService = Tasks();

  String _title;
  int _selectedItem = 0 ;

  void initState() {
    super.initState();
    _futureTasksView = httpService.getViewTasks( widget.id );

    _futureTasksView.catchError((error)
    {
      if( !error.toString().contains(TASKS_GETONE_VALIDATE_ERROR_TOKEN.toString()) &&
          !error.toString().contains(TASKS_GETONE_REQUIRED_ERROR_TOKEN.toString()) &&
          !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
      )
      {
        mainAlert(context, error.toString(), TaskListRoute, null, ALERT_ERROR)
            .then((val)
            {
              Navigator.pushNamed(
                  context,
                  TaskViewRoute,
                  arguments: widget.id
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

  void sendUpdate(String field, value)
  {
    setState(() {
      _futureUpdatePageAction = httpService.updatePage( widget.id, field, value );
    });

    _futureUpdatePageAction
        .then((val)
        {
          var id = val.id;
          mainAlert(context, i18n['edit_page_successful'], TaskViewRoute, id, ALERT_SUCCESS)
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
          if( !error.toString().contains(TASKS_UPDATE_VALIDATE_ERROR_TOKEN.toString()) &&
              !error.toString().contains(TASKS_UPDATE_REQUIRED_ERROR_TOKEN.toString()) &&
              !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
          )
          {
            mainAlert(context, error.toString(), '', null, ALERT_ERROR)
                .then((val)
                {
                  Navigator.of(context).pop();
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

  void validate()
  {
    final form = _formKey.currentState;

    if(form.validate())
    {
      sendUpdate('title', _title );
    }
    else
    {
      mainAlert(context, i18n['not_valid'], '', null, ALERT_ERROR)
          .then((val)
          {
            Navigator.of(context).pop();
          });
    }
  }

  Future delete() async
  {
    await httpService.deleteTask(widget.id)
        .then((val)
        {
          mainAlert(context, i18n['edit_page_successful'], TaskListRoute,  null, ALERT_SUCCESS )
              .then((val)
              {
                Navigator.pushNamed(
                    context,
                    TaskListRoute
                );
              });
        })
        .catchError((error)
        {
          if( !error.toString().contains(TASKS_DELETE_VALIDATE_ERROR_TOKEN.toString()) &&
              !error.toString().contains(TASKS_DELETE_REQUIRED_ERROR_TOKEN.toString()) &&
              !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
          )
          {
            mainAlert(context, error.toString(), '', null, ALERT_ERROR)
                .then((val)
                {
                  Navigator.of(context).pop();
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

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      backgroundColor: Color.fromRGBO(27, 42, 33, 1.0),
      body: Center(
        child: Container(
          child: FutureBuilder<TasksView>(
            future: _futureTasksView,
            builder: (context, snapshot) {
              if (snapshot.hasData)
              {
                _selectedItem = snapshot.data.status;

                return Column(
                  children: <Widget>[
                    Column(
                      children: <Widget>[
                        Divider(
                          height: 50,
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
                                        controller: TextEditingController(text: snapshot.data.title,),
                                        decoration: new InputDecoration(
                                          border: InputBorder.none,
                                          hintText:  i18n['label_title'],
                                        ),
                                        onChanged: (input) => _title = input,
                                        validator: ( val ) => validateTitle( val ) ,
                                      ),
                                    ),
                                  ),
                                ]
                            )
                        ),
                        Divider(),
                        FloatingActionButton.extended(
                          onPressed: validate,
                          label: Text( i18n['update_button'] ),
                          icon: Icon(Icons.thumb_up),
                          backgroundColor:  Color.fromRGBO(49, 73, 54, 1.0),
                        ),
                        Divider(
                          height: 25,
                        ),
                        Row(children: <Widget>[
                          Expanded(
                            child: new Container(
                                margin: const EdgeInsets.only(left: 10.0, right: 15.0),
                                child: Divider(
                                  color: Colors.white,
                                  height: 50,
                                )),
                          ),
                          Text( i18n['or_delimeter'],
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16.0,
                                letterSpacing: 1.0,
                              )
                          ),
                          Expanded(
                            child: new Container(
                                margin: const EdgeInsets.only(left: 15.0, right: 10.0),
                                child: Divider(
                                  color: Colors.white,
                                  height: 50,
                                )),
                          ),
                        ]),
                        Divider(
                          height: 25,
                        ),
                        Text('Стан',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16.0,
                              letterSpacing: 1.0,
                            )),
                        Divider(
                          height: 15,
                        ),
                        Wrap(
                            alignment: WrapAlignment.center,
                            spacing: 12.0,
                            children: <Widget>[
                              FilterChip(
                                backgroundColor: Colors.grey[400],
                                checkmarkColor: Colors.white,
                                label: Text(i18n['status_1'],
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 16.0,
                                      letterSpacing: 1.0,
                                    )
                                ),
                                selectedColor: Color.fromRGBO(49, 73, 54, 1.0),
                                selected: _selectedItem == ACTIVE_STATUS ? true : false ,
                                onSelected: (bool selected) {
                                  setState(() {
                                    _selectedItem = selected ? ACTIVE_STATUS : null;
                                  });
                                  sendUpdate('status', ACTIVE_STATUS );
                                },
                              ),
                              FilterChip(
                                backgroundColor: Colors.grey[400],
                                checkmarkColor: Colors.white,
                                label: Text(i18n['status_2'],
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 16.0,
                                      letterSpacing: 1.0,
                                    )
                                ),
                                selectedColor: Color.fromRGBO(49, 73, 54, 1.0),
                                selected: _selectedItem == DONE_STATUS ? true : false ,
                                onSelected: (bool selected) {
                                  setState(() {
                                    _selectedItem = selected ? DONE_STATUS : null;
                                  });
                                  sendUpdate('status', DONE_STATUS );
                                },
                              ),
                              _selectedItem != ACTIVE_STATUS
                                  ?
                                    FilterChip(
                                      backgroundColor: Colors.grey[400],
                                      checkmarkColor: Colors.white,
                                      label: Text(i18n['status_0'],
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 16.0,
                                            letterSpacing: 1.0,
                                          )
                                      ),
                                      selectedColor: Color.fromRGBO(49, 73, 54, 1.0),
                                      selected:  _selectedItem == DELETED_STATUS ? true : false ,
                                      onSelected: (bool selected) {
                                        setState(() {
                                          _selectedItem = selected ? DELETED_STATUS : null;
                                          delete();
                                        });
                                      },
                                    )
                                  :
                                    Divider(
                                      height: 25,
                                    ),
                            ]
                        ),
                      ],
                    ),
                  ],
                );
              }
              // By default, show a loading spinner.
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}