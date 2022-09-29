import 'dart:convert';

import 'package:amazon_clone/common/widgets/bottom_bar.dart';
import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/global_variables.dart';
import 'package:amazon_clone/constants/show_snackbar.dart';
import 'package:amazon_clone/models/user.dart';
import 'package:amazon_clone/providers/user_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../home/screens/home_screen.dart';

class AuthService {
  // Sign up user
  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(
        email: email,
        name: name,
        password: password,
        id: '',
        address: '',
        type: '',
        token: '',
      );
//$uri
      http.Response res = await http.post(Uri.parse('$uri/api/v1/auth/signup'),
          body: user.toJson(),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          });
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            print('Your account has been created. Login to proceed');
            // showSnackBar(
            //     context, 'Your account has been created. Login to proceed');
          });
    } catch (e) {
      print(e.toString());
      // showSnackBar(context, e.toString());
    }
  }

  // Sign in user
  void signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try {
//$uri
      http.Response res = await http.post(Uri.parse('$uri/api/v1/auth/signin'),
          body: jsonEncode({
            'email': email,
            'password': password,
          }),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          });

      // print(res.body);
      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () async {
          // showSnackBar(context, 'Login successful');
          SharedPreferences prefs = await SharedPreferences.getInstance();

          Provider.of<UserProvider>(context, listen: false).setUser(res.body);
          await prefs.setString('x-auth-token', jsonDecode(res.body)['token']);

          Navigator.pushNamedAndRemoveUntil(
            context,
            BottomBar.routeName,
            (route) => false,
          );
        },
      );
    } catch (e) {
      print(e.toString());
      // showSnackBar(context, e.toString());
    }
  }

  // get user data on initial installation or on load
  void getUserData(BuildContext context) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? token = prefs.getString('x-auth-token');

      if (token == null) {
        prefs.setString('x-auth-token', '');
      }

      http.Response tokenResponse = await http.post(
        Uri.parse('$uri/api/v1/auth/tokenIsValid'),

        // Pass x-auth-token in the header
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': token!
        },
      );

      var response = jsonDecode(tokenResponse.body);

      // Response can either be true or false as per the tokenIsValid API endpoint
      if (response == true) {
        // Get user data
        http.Response userResponse = await http.get(
          Uri.parse('$uri/api/v1/auth/'),
          // Pass x-auth-token in the header
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
            'x-auth-token': token
          },
        );

        var userProvider = Provider.of<UserProvider>(context, listen: false);
        userProvider.setUser(userResponse.body);
      }
    } catch (e) {
      print(e.toString());
      // showSnackBar(context, e.toString());
    }
  }
}
