import 'dart:ui';
import 'package:app_cat_7/config/routing_consts.dart';
import 'package:app_cat_7/controller/TaskEdit.dart';
import 'package:app_cat_7/controller/TaskView.dart';
import 'package:app_cat_7/messages/translateUk.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class TaskPage extends StatelessWidget {
  final String id;

  TaskPage({Key key, this.id}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Image.asset("images/background.png", fit: BoxFit.fitHeight),
        DefaultTabController(
          length: 2,
          child: Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              leading: InkWell(
                child: Icon(Icons.arrow_back),
                onTap: () {
                  Navigator.pushNamed(
                      context,
                      TaskListRoute
                  );
                },
              ),
              bottom: TabBar(
                tabs: [
                  Tab(text: i18n['view_button']),
                  Tab(text: i18n['edit_button'])
                ],
              ),
              title: Text( i18n['task_title'].toString() + id.substring(0, 18) + '...'),
              backgroundColor:Colors.black.withOpacity(0.5),
            ),
            body: TabBarView(
              children: [
                TaskView( id : id ),
                TaskEdit( id : id )
              ],
            ),
          ),
        )
      ],
    );
  }
}