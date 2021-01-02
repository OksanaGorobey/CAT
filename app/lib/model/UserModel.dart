import 'dart:async';
import 'dart:convert';
import 'package:app_cat_7/lib/error.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class User{
  SharedPreferences sharedPreferences;

  Future<SignUpAction> makeSignUp(String email, String passwd, String name) async {
    final http.Response response = await http.post(
      'https://dev.cat.int10h.net/user/register',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'name': name,'email': email, 'passwd': passwd
      }),
    );

    if (response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
      return SignUpAction.fromJson(json.decode(response.body)['content']['data']);
    }
    else
    {
      throw CustomException( json.decode(response.body)['errors'][0]);
    }
  }

  Future<LogInAction> makeLogIn(String email, String passwd) async {

    sharedPreferences = await SharedPreferences.getInstance();

    final http.Response response = await http.post(
      'https://dev.cat.int10h.net/user/authorize',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email, 'passwd': passwd
      }),
    );

    if (response.statusCode == 200 && json.decode(response.body)['content'] != null )
    {
      sharedPreferences.setString('token', json.decode(response.body)['content']['data']['token'] );

      return LogInAction.fromJson(json.decode(response.body)['content']['data']);
    }
    else
    {
      throw CustomException( json.decode(response.body)['errors'][0] );
    }
  }

  Future logout() async
  {
    sharedPreferences = await SharedPreferences.getInstance();
    sharedPreferences.clear();
    sharedPreferences.commit();
  }
}

class SignUpAction {
  final String id;
  final String email;

  SignUpAction({this.id, this.email});

  factory SignUpAction.fromJson(Map<String, dynamic> json)
  {
    return SignUpAction(
        id    : json['id'],//dev.cat.int10h.net/user/authorize
        email : json['email']
    );
  }
}

class LogInAction {
  final String id;
  final String email;
  final String token;

  LogInAction({this.id, this.email, this.token});

  factory LogInAction.fromJson(Map<String, dynamic> json)
  {
    return LogInAction(
      id    : json['id'],//dev.cat.int10h.net/user/authorize
      email : json['email'],
      token : json['token'],
    );
  }
}