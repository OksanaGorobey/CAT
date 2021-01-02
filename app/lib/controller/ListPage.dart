import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/lib/common.dart';
import 'package:app_cat_7/config/routing_consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:app_cat_7/model/UserModel.dart';
import 'package:flutter/material.dart';
import '../model/TaskModel.dart';


class ListPage extends StatefulWidget {
@override
_ListPageState createState() => _ListPageState();
}
///////////////////////////////////////////////////////////////////////////////
class _ListPageState extends State<ListPage> {
  Future<List<TasksList>> _futureTasksList;
  final Tasks httpService = Tasks();
  final User httpServiceUser = User();

  void initState() {
    super.initState();
    _futureTasksList = httpService.getTasks( 0 );

    _futureTasksList.catchError((error)
    {
      if( !error.toString().contains(TASKS_GETLIST_VALIDATE_ERROR_TOKEN.toString()) &&
          !error.toString().contains(TASKS_GETLIST_REQUIRED_ERROR_TOKEN.toString()) &&
          !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
      )
      {
        mainAlert(context, error.toString(), LoginViewRoute, null, ALERT_ERROR)
        .then((onValue)
        {
          Navigator.pushNamed(
              context,
              LoginViewRoute
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
    return Scaffold(
      backgroundColor: Color.fromRGBO(27, 42, 33, 1.0),
      appBar:
      AppBar(
        leading: new Container(),
        elevation: 0.1,
        backgroundColor: Color.fromRGBO(27, 42, 33, 1.0),
        title: Text(i18n['list_title'],
            style: TextStyle(
              color: Colors.white,
              letterSpacing: 1.0,
            )
        ),
          actions: <Widget>[
          IconButton(
            icon: Icon(Icons.exit_to_app, color: Colors.white , size: 30),
            onPressed:() async {
                await httpServiceUser.logout();
                Navigator.pushNamed(
                    context,
                    LoginViewRoute
                );
              },
          )
        ],
      ),
      body: FutureBuilder(
        future: _futureTasksList,
        builder: (BuildContext context, AsyncSnapshot<List<TasksList>> snapshot) {
          if (snapshot.hasData)
          {
            List<TasksList> posts = snapshot.data;
            return ListView(
              children: posts
                  .map(
                    (TasksList item) =>
                        Card(
                          elevation: 8.0,
                          margin: new EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
                          child: Container(
                            decoration: BoxDecoration(color: Color.fromRGBO(49, 73, 54, 1.0)),
                            child: ListTile(
                              leading: Container(
                                padding: EdgeInsets.only(right: 12.0),
                                decoration: new BoxDecoration(
                                    border: new Border(
                                        right: new BorderSide(width: 1.0, color: Colors.white24))),
                                child:IconButton(
                                  icon: Icon(Icons.delete, color:  item.status == ACTIVE_STATUS ? Colors.grey : Colors.white , size: 30),
                                  onPressed:
                                  ( item.status == ACTIVE_STATUS )
                                      ? () {}
                                      : () async {
                                            await httpService.deleteTask(item.id)
                                                .then((val)
                                                {
                                                  Navigator.pushNamed(
                                                      context,
                                                      TaskListRoute,
                                                  );
                                                })
                                                .catchError((error)
                                                {
                                                  if( !error.toString().contains(TASKS_DELETE_VALIDATE_ERROR_TOKEN.toString()) &&
                                                    !error.toString().contains(TASKS_DELETE_REQUIRED_ERROR_TOKEN.toString()) &&
                                                    !error.toString().contains(GENERAL_CODE_EMPTY_TOKEN_ERROR.toString())
                                                  )
                                                  {
                                                    mainAlert(context, error.toString(), '', null, ALERT_ERROR);
                                                  }
                                                  else
                                                  {
                                                    Navigator.pushNamed(
                                                        context,
                                                        LoginViewRoute
                                                    );
                                                  }
                                                });
                                  },
                                ),
                              ),
                              title: Text("${item.title}",style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),),
                              subtitle: Row(
                                children: <Widget>[
                                  Icon(Icons.linear_scale, color: item.status == ACTIVE_STATUS ? Colors.green : Colors.yellowAccent ),
                                  Text( i18n['status_' + item.status.toString() ], style: TextStyle(color: Colors.white))
                                ],
                              ),
                              trailing: Icon(Icons.keyboard_arrow_right,  size: 30.0, color: Colors.white,),
                              onTap: () {
                                Navigator.pushNamed(
                                    context,
                                    TaskViewRoute,
                                    arguments: item.id
                                );
                              },
                            )
                          ),
                        )
                  ).toList(),
              );
          }
          else
          {
              return Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed:() {
          Navigator.pushNamed(
              context,
              TaskAddRoute
          );
        },
        child: Icon(Icons.add, size: 45, ),
        backgroundColor: Color.fromRGBO(49, 73, 54, 1.0)
      ),
    );
  }
}
