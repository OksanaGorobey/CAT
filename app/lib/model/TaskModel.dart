import 'dart:async';
import 'dart:convert';
import 'package:app_cat_7/lib/error.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';


class Tasks {
  SharedPreferences sharedPreferences;

  Future<List<TasksList>> getTasks( offset ) async {

    sharedPreferences = await SharedPreferences.getInstance();

    final token = sharedPreferences.getString('token');

    http.Response response = await http.get("https://dev.cat.int10h.net/tasks?limit=100&offset=$offset", headers: {'x-token': token });

    if ( response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
      print( jsonDecode(response.body)['content']['count']);
      List<dynamic> body = jsonDecode(response.body)['content']['data'];

      List<TasksList> tasks = body
          .map((dynamic item) => TasksList.fromJson(item))
          .toList();

      return tasks;
    }
    else
    {
        throw CustomException( json.decode(response.body)['errors'][0] );
    }
  }

  Future<void> deleteTask(String id) async {
    sharedPreferences = await SharedPreferences.getInstance();

    final token = sharedPreferences.getString('token');


    http.Response response = await http.delete("https://dev.cat.int10h.net/task/$id", headers: {'x-token': token });

    if ( response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
        return json.decode(response.body)['content']['data']['id'];
    }
    else
    {
        throw CustomException( json.decode(response.body)['errors'][0] );
    }
  }

  Future<TasksView> getViewTasks( String id) async {

    sharedPreferences = await SharedPreferences.getInstance();

    final token = sharedPreferences.getString('token');

    http.Response response = await http.get("https://dev.cat.int10h.net/task/$id", headers: {'x-token': token });

    if ( response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
      return TasksView.fromJson(json.decode(response.body)['content']['data']);
    }
    else
    {
      throw CustomException( json.decode(response.body)['errors'][0] );
    }
  }

  Future<AddPageAction> addPage(String title ) async {
    sharedPreferences = await SharedPreferences.getInstance();

    final token = sharedPreferences.getString('token');

    http.Response response = await http.post("https://dev.cat.int10h.net/task", headers: {'x-token': token, 'Content-Type': 'application/json; charset=UTF-8' }, body: jsonEncode(<String, String>{ 'title': title }));

    if (response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
      return AddPageAction.fromJson(json.decode(response.body)['content']['data']);
    }
    else
    {
        throw CustomException( json.decode(response.body)['errors'][0] );
    }

  }

  Future<UpdatePageAction> updatePage(String id,  String field, value ) async {

    sharedPreferences = await SharedPreferences.getInstance();

    final token = sharedPreferences.getString('token');

    http.Response response = await http.put("https://dev.cat.int10h.net/task/$id", headers: {'x-token': token, 'Content-Type': 'application/json; charset=UTF-8' }, body: jsonEncode(<String, dynamic>{ field: value }));

    if (response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
      return UpdatePageAction.fromJson(json.decode(response.body)['content']['data']);
    }
    else
    {
        throw CustomException( json.decode(response.body)['errors'][0] );
    }

  }
}

class TasksList {
  final String id;
  final String title;
  final int status;

  TasksList({
    @required this.id,
    @required this.title,
    @required this.status
  });

  factory TasksList.fromJson(Map<String, dynamic> json) {
    return TasksList(
      id    : json['id'] as String,
      title : json['title'] as String,
      status: json['status'] as int,
    );
  }
}

class TasksView {
  final String id;
  final String userId;
  final String title;
  final int status;
  final String createdDate;
  final String updatedDate;
  final String deletedDate;

  TasksView({
    @required this.id,
    @required this.userId,
    @required this.title,
    @required this.status,
    @required this.createdDate,
    @required this.updatedDate,
    @required this.deletedDate
  });

  factory TasksView.fromJson(Map<String, dynamic> json) {
    return TasksView(
      id         : json['id'] as String,
      userId     : json['user_id'] as String,
      title      : json['title'] as String,
      status     : json['status'] as int,
      createdDate: json['created_date'] ?? '-',
      updatedDate: json['updated_date'] ?? '-',
      deletedDate: json['deleted_date'] ?? '-',
    );
  }
}

class AddPageAction {
  final String id;

  AddPageAction({ this.id });

  factory AddPageAction.fromJson(Map<String, dynamic> json)
  {
    return AddPageAction(
      id    : json['id'],//dev.cat.int10h.net/user/authorize
    );
  }
}

class UpdatePageAction {
  final String id;
  final String userId;

  UpdatePageAction({ this.id, this.userId });

  factory UpdatePageAction.fromJson(Map<String, dynamic> json)
  {
    return UpdatePageAction(
      id    : json['id'],//dev.cat.int10h.net/user/authorize
      userId: json['user_id'],//dev.cat.int10h.net/user/authorize
    );
  }
}