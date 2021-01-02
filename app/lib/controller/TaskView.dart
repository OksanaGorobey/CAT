import 'dart:ui';
import 'package:app_cat_7/config/routing_consts.dart';
import 'package:app_cat_7/lib/common.dart';
import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../model/TaskModel.dart';

class TaskView extends StatefulWidget {
  final String id;
  TaskView({Key key, this.id}) : super(key: key);

  @override
  _TaskViewState createState() => _TaskViewState();
}
///////////////////////////////////////////////////////////////////////////////
class _TaskViewState extends State<TaskView> {
  final Tasks httpService = Tasks();
  Future<TasksView> _futureTasksView;

  void initState() {
    super.initState();
    _futureTasksView = httpService.getViewTasks( widget.id );

    _futureTasksView.catchError((error)
    {
      if( !error.toString().contains(TASKS_CREATE_VALIDATE_ERROR_TOKEN.toString()) &&
          !error.toString().contains(TASKS_GETONE_REQUIRED_ERROR_TOKEN.toString()) &&
          !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
      )
      {
        mainAlert(context, error.toString(), TaskListRoute, null, ALERT_ERROR)
            .then((val)
            {
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

  @override
  Widget build(BuildContext context) {
    return new Container(
        child: new Stack(
            fit: StackFit.expand,
            children: <Widget>[
              new Image.asset("images/background.png", fit: BoxFit.fitHeight,),
              new Scaffold(
                backgroundColor: Colors.transparent,
                body: new Center(
                  child: new Center(
                    child: new BackdropFilter(
                      filter: ImageFilter.blur(
                        sigmaX: 6.0,
                        sigmaY: 6.0,
                      ),
                      child: new Container(
                        margin: EdgeInsets.all(20.0),
                        padding: EdgeInsets.all(20.0),
                        decoration: BoxDecoration(
                          color: const Color(0xFFB4C56C).withOpacity(0.01),
                          borderRadius: BorderRadius.all(Radius.circular(50.0)),
                        ),
                        child: FutureBuilder<TasksView>(
                          future: _futureTasksView,
                          builder: (context, snapshot) {
                            if (snapshot.hasData)
                            {
                              return Column(
                                children: <Widget>[
                                  Card(
                                    color: Colors.black.withOpacity(0.5),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.center,
                                      children: <Widget>[
                                        ListTile(
                                          title: Text( i18n['label_id'],
                                              style: TextStyle(
                                                color: const Color(0xFFB4C56C),
                                                fontSize: 16.0,
                                                letterSpacing: 1.0,
                                              )
                                          ),
                                          subtitle: Text(snapshot.data.id, textAlign: TextAlign.center,
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16.0,
                                                letterSpacing: 1.0,
                                              )
                                          ),
                                        ),
                                        ListTile(
                                          title: Text( i18n['label_title'],
                                              style: TextStyle(
                                                color: const Color(0xFFB4C56C),
                                                fontSize: 16.0,
                                                letterSpacing: 1.0,
                                              )
                                          ),
                                          subtitle: Text(snapshot.data.title, textAlign: TextAlign.center,
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16.0,
                                                letterSpacing: 1.0,
                                              )
                                          ),
                                        ),
                                        ListTile(
                                          title: Text( i18n['label_status'],
                                              style: TextStyle(
                                                color: const Color(0xFFB4C56C),
                                                fontSize: 16.0,
                                                letterSpacing: 1.0,
                                              )
                                          ),
                                          subtitle: Text( i18n['status_' + snapshot.data.status.toString() ], textAlign: TextAlign.center,
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16.0,
                                                letterSpacing: 1.0,
                                              )
                                          ),
                                        ),
                                      ],
                                    ),
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
                  ),
                ),
              )
            ]
        )
    );
  }
}